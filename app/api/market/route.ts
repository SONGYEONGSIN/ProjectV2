import { NextRequest, NextResponse } from "next/server";

const MARKET_API_KEY = process.env.MARKET_API_KEY;
// 최신 버전 (20250731) - 소상공인시장진흥공단_전국 온누리상품권 가맹점 현황
const BASE_URL = "https://api.odcloud.kr/api/3060079/v1/uddi:7ffa42f8-01d1-4329-aa94-aefb67c53cf1";

interface MarketMerchantItem {
    가맹점명: string;
    "소속 시장명(또는 상점가)": string;
    소재지: string;
    취급품목?: string;
    등록년도?: number;
}

interface MarketResponse {
    currentCount: number;
    data: MarketMerchantItem[];
    matchCount: number;
    page: number;
    perPage: number;
    totalCount: number;
}

/**
 * 가맹점명으로 전통시장 가맹점 여부 확인 (단건)
 * POST /api/market
 * Body: { name: string }
 */
export async function POST(request: NextRequest) {
    try {
        if (!MARKET_API_KEY) {
            return NextResponse.json(
                { error: "MARKET_API_KEY not configured" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json(
                { error: "name is required" },
                { status: 400 }
            );
        }

        const result = await checkMarketMerchantByApi(name);
        return NextResponse.json(result);

    } catch (error) {
        console.error("[Market API] Error:", error);
        return NextResponse.json(
            { error: "Internal server error", isMarket: false },
            { status: 500 }
        );
    }
}

/**
 * 여러 가맹점명 일괄 체크 (실제 API 호출)
 * PUT /api/market
 * Body: { names: string[] }
 */
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { names } = body;

        if (!names || !Array.isArray(names)) {
            return NextResponse.json(
                { error: "names array is required" },
                { status: 400 }
            );
        }

        if (!MARKET_API_KEY) {
            console.warn("[Market API Batch] API key not configured, falling back to keyword matching");
            const fallbackKeywords = ["시장", "전통시장", "재래시장", "5일장", "오일장"];
            const results = names.map(name => ({
                name,
                isMarket: fallbackKeywords.some(kw => name.toLowerCase().includes(kw.toLowerCase())),
                reason: "keyword_fallback"
            }));
            const marketCount = results.filter(r => r.isMarket).length;
            return NextResponse.json({
                results,
                summary: { total: names.length, marketCount, nonMarketCount: names.length - marketCount }
            });
        }

        // 실제 API 호출로 각 가맹점 검증
        // API 과부하 방지를 위해 3개씩 배치 처리
        const BATCH_SIZE = 3;
        const allResults: { name: string; isMarket: boolean; reason: string; marketName?: string; belongsTo?: string; address?: string }[] = [];

        for (let i = 0; i < names.length; i += BATCH_SIZE) {
            const batch = names.slice(i, i + BATCH_SIZE);
            const batchResults = await Promise.all(
                batch.map(name => checkMarketMerchantByApi(name))
            );
            allResults.push(...batchResults);
        }

        const marketCount = allResults.filter(r => r.isMarket).length;

        console.log(`[Market API Batch] 검증 완료: ${marketCount}/${names.length}개 전통시장 가맹점 확인`);

        return NextResponse.json({
            results: allResults,
            summary: {
                total: names.length,
                marketCount,
                nonMarketCount: names.length - marketCount
            }
        });

    } catch (error) {
        console.error("[Market API Batch] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * 개별 가맹점명을 전통시장 가맹점 API로 검증
 * cond[가맹점명::LIKE] 로 15만+ 가맹점 DB에서 검색
 */
async function checkMarketMerchantByApi(name: string): Promise<{ name: string; isMarket: boolean; reason: string; marketName?: string; belongsTo?: string; address?: string }> {
    try {
        const searchName = extractSearchName(name);

        if (!searchName || searchName.length < 2) {
            return { name, isMarket: false, reason: "name_too_short" };
        }

        // cond[가맹점명::LIKE] 파라미터로 가맹점명 부분 검색
        const encodedName = encodeURIComponent(searchName);
        const condParam = encodeURIComponent("cond[가맹점명::LIKE]");
        const url = `${BASE_URL}?page=1&perPage=10&serviceKey=${MARKET_API_KEY}&${condParam}=%25${encodedName}%25`;

        const response = await fetch(url, {
            method: "GET",
            headers: { "Accept": "application/json" },
        });

        if (!response.ok) {
            console.error(`[Market API] HTTP Error for "${name}":`, response.status);
            return { name, isMarket: false, reason: "api_http_error" };
        }

        const data: MarketResponse = await response.json();

        if (!data.data || data.matchCount === 0) {
            return { name, isMarket: false, reason: "api_no_result" };
        }

        // 검색 결과에서 가맹점명이 실제로 일치하는지 확인
        const matchedMerchant = findBestMerchantMatch(name, data.data);

        if (matchedMerchant) {
            return {
                name,
                isMarket: true,
                reason: "api_confirmed",
                marketName: matchedMerchant.가맹점명,
                belongsTo: matchedMerchant["소속 시장명(또는 상점가)"],
                address: matchedMerchant.소재지
            };
        }

        return { name, isMarket: false, reason: "api_no_match" };

    } catch (error) {
        console.error(`[Market API] Error checking "${name}":`, error);
        return { name, isMarket: false, reason: "api_exception" };
    }
}

/**
 * 가맹점명에서 핵심 이름 추출 (검색용)
 * 예: "훈훈한과일 중앙점" → "훈훈한과일"
 * 예: "남대문시장정육점" → "남대문시장정육점"
 * 예: "광장시장_먹거리" → "광장시장"
 */
function extractSearchName(merchant: string): string {
    // 언더스코어를 공백으로
    let cleaned = merchant.replace(/_/g, " ").trim();

    // 지점명 접미사 제거 (중앙점, 본점, 1호점 등)
    cleaned = cleaned.replace(/\s+(중앙점|본점|분점|\d+호점|점)$/, "").trim();

    // 공백 있으면 첫 단어만 사용 (보통 가맹점 이름)
    const parts = cleaned.split(/\s+/);
    if (parts.length > 1) {
        return parts[0];
    }

    return cleaned;
}

/**
 * API 검색 결과에서 가맹점명과 가장 유사한 항목 찾기
 */
function findBestMerchantMatch(merchantName: string, merchants: MarketMerchantItem[]): MarketMerchantItem | null {
    const normalizedInput = merchantName.replace(/_/g, "").replace(/\s+/g, "").toLowerCase();
    const searchCoreName = extractSearchName(merchantName).toLowerCase();

    // 1차: 정확히 일치 (공백/특수문자 무시)
    for (const m of merchants) {
        const normalizedApi = m.가맹점명.replace(/\s+/g, "").toLowerCase();
        if (normalizedInput === normalizedApi) {
            return m;
        }
    }

    // 2차: 입력 가맹점명이 API 가맹점명에 포함 (또는 반대)
    for (const m of merchants) {
        const normalizedApi = m.가맹점명.replace(/\s+/g, "").toLowerCase();
        if (normalizedInput.includes(normalizedApi) || normalizedApi.includes(normalizedInput)) {
            return m;
        }
    }

    // 3차: 핵심 이름으로 매칭
    for (const m of merchants) {
        const normalizedApi = m.가맹점명.replace(/\s+/g, "").toLowerCase();
        if (searchCoreName.length >= 2 && normalizedApi.includes(searchCoreName)) {
            return m;
        }
    }

    return null;
}
