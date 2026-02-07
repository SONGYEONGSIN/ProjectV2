import { NextRequest, NextResponse } from "next/server";

const PHARMACY_API_KEY = process.env.PHARMACY_API_KEY;
const BASE_URL = "http://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList";

interface PharmacyItem {
    yadmNm: string;      // 약국명
    addr: string;        // 주소
    telno: string;       // 전화번호
    XPos: string;        // 경도
    YPos: string;        // 위도
}

interface PharmacyResponse {
    response: {
        header: {
            resultCode: string;
            resultMsg: string;
        };
        body: {
            items: {
                item: PharmacyItem | PharmacyItem[];
            };
            numOfRows: number;
            pageNo: number;
            totalCount: number;
        };
    };
}

/**
 * 약국명으로 약국 정보 검색 (단건)
 * POST /api/pharmacy
 */
export async function POST(request: NextRequest) {
    try {
        if (!PHARMACY_API_KEY) {
            return NextResponse.json(
                { error: "PHARMACY_API_KEY not configured" },
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

        const result = await checkPharmacyByApi(name);
        return NextResponse.json(result);

    } catch (error) {
        console.error("[Pharmacy API] Error:", error);
        return NextResponse.json(
            { error: "Internal server error", isPharmacy: false },
            { status: 500 }
        );
    }
}

/**
 * 여러 가맹점명 일괄 체크 (실제 API 호출)
 * PUT /api/pharmacy
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

        if (!PHARMACY_API_KEY) {
            console.warn("[Pharmacy API Batch] API key not configured, falling back to keyword matching");
            const fallbackKeywords = ["약국", "pharmacy", "팜"];
            const results = names.map(name => ({
                name,
                isPharmacy: fallbackKeywords.some(kw => name.toLowerCase().includes(kw.toLowerCase())),
                reason: "keyword_fallback"
            }));
            const pharmacyCount = results.filter(r => r.isPharmacy).length;
            return NextResponse.json({
                results,
                summary: { total: names.length, pharmacyCount, nonPharmacyCount: names.length - pharmacyCount }
            });
        }

        // 실제 API 호출로 각 가맹점 검증
        // API 과부하 방지를 위해 5개씩 병렬 처리
        const BATCH_SIZE = 5;
        const allResults: { name: string; isPharmacy: boolean; reason: string; pharmacyName?: string }[] = [];

        for (let i = 0; i < names.length; i += BATCH_SIZE) {
            const batch = names.slice(i, i + BATCH_SIZE);
            const batchResults = await Promise.all(
                batch.map(name => checkPharmacyByApi(name))
            );
            allResults.push(...batchResults);
        }

        const pharmacyCount = allResults.filter(r => r.isPharmacy).length;

        console.log(`[Pharmacy API Batch] 검증 완료: ${pharmacyCount}/${names.length}개 약국 확인`);

        return NextResponse.json({
            results: allResults,
            summary: {
                total: names.length,
                pharmacyCount,
                nonPharmacyCount: names.length - pharmacyCount
            }
        });

    } catch (error) {
        console.error("[Pharmacy API Batch] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * 개별 가맹점명을 실제 약국 API로 검증
 */
async function checkPharmacyByApi(name: string): Promise<{ name: string; isPharmacy: boolean; reason: string; pharmacyName?: string }> {
    try {
        const searchName = extractSearchName(name);

        if (!searchName || searchName.length < 2) {
            return { name, isPharmacy: false, reason: "name_too_short" };
        }

        const encodedKey = encodeURIComponent(PHARMACY_API_KEY!);
        const encodedName = encodeURIComponent(searchName);

        const url = `${BASE_URL}?serviceKey=${encodedKey}&pageNo=1&numOfRows=10&yadmNm=${encodedName}&_type=json`;

        const response = await fetch(url, {
            method: "GET",
            headers: { "Accept": "application/json" },
        });

        if (!response.ok) {
            console.error(`[Pharmacy API] HTTP Error for "${name}":`, response.status);
            return { name, isPharmacy: false, reason: "api_http_error" };
        }

        const data: PharmacyResponse = await response.json();

        if (data.response?.header?.resultCode !== "00") {
            console.error(`[Pharmacy API] API Error for "${name}":`, data.response?.header?.resultMsg);
            return { name, isPharmacy: false, reason: "api_error" };
        }

        const totalCount = data.response?.body?.totalCount || 0;

        if (totalCount === 0) {
            return { name, isPharmacy: false, reason: "api_no_result" };
        }

        const items = data.response?.body?.items?.item;
        const pharmacyList = Array.isArray(items) ? items : [items];
        const firstMatch = pharmacyList[0];

        return {
            name,
            isPharmacy: true,
            reason: "api_confirmed",
            pharmacyName: firstMatch?.yadmNm
        };

    } catch (error) {
        console.error(`[Pharmacy API] Error checking "${name}":`, error);
        return { name, isPharmacy: false, reason: "api_exception" };
    }
}

/**
 * 가맹점명에서 API 검색용 이름 추출
 */
function extractSearchName(merchant: string): string {
    const parts = merchant.replace(/_/g, " ").trim().split(/\s+/);
    if (parts.length > 1 && parts[0].length <= 2) {
        return parts.slice(0, 2).join("");
    }
    return parts[0];
}
