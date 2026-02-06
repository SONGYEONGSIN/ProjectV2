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
 * 약국명으로 약국 정보 검색
 * POST /api/pharmacy
 * Body: { name: string } - 검색할 가맹점명
 * Response: { isPharmacy: boolean, pharmacyName?: string, address?: string }
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

        // 가맹점명에서 약국 키워드 체크 (빠른 필터링)
        const pharmacyKeywords = ["약국", "pharmacy", "팜"];
        const hasPharmacyKeyword = pharmacyKeywords.some(keyword =>
            name.toLowerCase().includes(keyword.toLowerCase())
        );

        if (!hasPharmacyKeyword) {
            // 약국 키워드가 없으면 바로 false 반환 (API 호출 절약)
            return NextResponse.json({
                isPharmacy: false,
                reason: "no_pharmacy_keyword"
            });
        }

        // 약국 API 호출 - 약국명으로 검색
        const encodedKey = encodeURIComponent(PHARMACY_API_KEY);
        const encodedName = encodeURIComponent(name.replace(/약국.*$/, "약국")); // "○○약국 △△점" → "○○약국"

        const url = `${BASE_URL}?serviceKey=${encodedKey}&pageNo=1&numOfRows=10&yadmNm=${encodedName}&_type=json`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            console.error("[Pharmacy API] HTTP Error:", response.status);
            // API 실패 시에도 키워드 기반으로 판단
            return NextResponse.json({
                isPharmacy: hasPharmacyKeyword,
                reason: "api_fallback",
                message: "API 호출 실패, 키워드 기반 판단"
            });
        }

        const data: PharmacyResponse = await response.json();

        // 응답 확인
        if (data.response?.header?.resultCode !== "00") {
            console.error("[Pharmacy API] API Error:", data.response?.header?.resultMsg);
            return NextResponse.json({
                isPharmacy: hasPharmacyKeyword,
                reason: "api_error",
                message: data.response?.header?.resultMsg
            });
        }

        const totalCount = data.response?.body?.totalCount || 0;

        if (totalCount === 0) {
            // 검색 결과 없음 → 키워드 기반 판단
            return NextResponse.json({
                isPharmacy: hasPharmacyKeyword,
                reason: "keyword_only",
                message: "API 검색 결과 없음, 키워드 기반 판단"
            });
        }

        // 검색 결과 있음 → 약국 확인
        const items = data.response?.body?.items?.item;
        const pharmacyList = Array.isArray(items) ? items : [items];
        const firstMatch = pharmacyList[0];

        return NextResponse.json({
            isPharmacy: true,
            pharmacyName: firstMatch?.yadmNm,
            address: firstMatch?.addr,
            phone: firstMatch?.telno,
            totalMatches: totalCount,
            reason: "api_confirmed"
        });

    } catch (error) {
        console.error("[Pharmacy API] Error:", error);
        return NextResponse.json(
            { error: "Internal server error", isPharmacy: false },
            { status: 500 }
        );
    }
}

/**
 * 여러 가맹점명 일괄 체크
 * PUT /api/pharmacy
 * Body: { names: string[] } - 체크할 가맹점명 배열
 * Response: { results: { name: string, isPharmacy: boolean }[] }
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

        // 각 가맹점명에 대해 약국 키워드 체크 (API 호출 없이 빠른 판단)
        const pharmacyKeywords = ["약국", "pharmacy", "팜"];

        const results = names.map(name => {
            const isPharmacy = pharmacyKeywords.some(keyword =>
                name.toLowerCase().includes(keyword.toLowerCase())
            );
            return {
                name,
                isPharmacy,
                reason: isPharmacy ? "keyword_match" : "no_keyword"
            };
        });

        const pharmacyCount = results.filter(r => r.isPharmacy).length;

        return NextResponse.json({
            results,
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
