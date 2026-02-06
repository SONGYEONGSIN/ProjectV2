import { NextRequest, NextResponse } from "next/server";

const HOSPITAL_API_KEY = process.env.PHARMACY_API_KEY; // 동일 키 사용
const BASE_URL = "http://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList";

interface HospitalItem {
    yadmNm: string;      // 병원명
    addr: string;        // 주소
    telno: string;       // 전화번호
    clCd: string;        // 종별코드
    clCdNm: string;      // 종별코드명 (종합병원, 병원, 의원 등)
    sidoCd: string;      // 시도코드
    sgguCd: string;      // 시군구코드
}

interface HospitalResponse {
    response: {
        header: {
            resultCode: string;
            resultMsg: string;
        };
        body: {
            items: {
                item: HospitalItem | HospitalItem[];
            };
            numOfRows: number;
            pageNo: number;
            totalCount: number;
        };
    };
}

/**
 * 병원명으로 병원 정보 검색
 * POST /api/hospital
 * Body: { name: string } - 검색할 가맹점명
 * Response: { isHospital: boolean, hospitalName?: string, type?: string }
 */
export async function POST(request: NextRequest) {
    try {
        if (!HOSPITAL_API_KEY) {
            return NextResponse.json(
                { error: "HOSPITAL_API_KEY not configured" },
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

        // 가맹점명에서 병원/의원 키워드 체크 (빠른 필터링)
        const hospitalKeywords = ["병원", "의원", "클리닉", "치과", "한의원", "안과", "피부과", "정형외과", "내과", "외과", "소아과", "산부인과"];
        const hasHospitalKeyword = hospitalKeywords.some(keyword =>
            name.toLowerCase().includes(keyword.toLowerCase())
        );

        if (!hasHospitalKeyword) {
            return NextResponse.json({
                isHospital: false,
                reason: "no_hospital_keyword"
            });
        }

        // 병원 API 호출
        const encodedKey = encodeURIComponent(HOSPITAL_API_KEY);
        // 병원명에서 검색 키워드 추출 (예: "한가람 메디즈 의원" → "한가람")
        const searchName = name.split(/\s+/)[0];
        const encodedName = encodeURIComponent(searchName);

        const url = `${BASE_URL}?serviceKey=${encodedKey}&pageNo=1&numOfRows=10&yadmNm=${encodedName}&_type=json`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            console.error("[Hospital API] HTTP Error:", response.status);
            return NextResponse.json({
                isHospital: hasHospitalKeyword,
                reason: "api_fallback",
                message: "API 호출 실패, 키워드 기반 판단"
            });
        }

        const data: HospitalResponse = await response.json();

        if (data.response?.header?.resultCode !== "00") {
            console.error("[Hospital API] API Error:", data.response?.header?.resultMsg);
            return NextResponse.json({
                isHospital: hasHospitalKeyword,
                reason: "api_error",
                message: data.response?.header?.resultMsg
            });
        }

        const totalCount = data.response?.body?.totalCount || 0;

        if (totalCount === 0) {
            return NextResponse.json({
                isHospital: hasHospitalKeyword,
                reason: "keyword_only",
                message: "API 검색 결과 없음, 키워드 기반 판단"
            });
        }

        const items = data.response?.body?.items?.item;
        const hospitalList = Array.isArray(items) ? items : [items];
        const firstMatch = hospitalList[0];

        return NextResponse.json({
            isHospital: true,
            hospitalName: firstMatch?.yadmNm,
            type: firstMatch?.clCdNm,
            address: firstMatch?.addr,
            phone: firstMatch?.telno,
            totalMatches: totalCount,
            reason: "api_confirmed"
        });

    } catch (error) {
        console.error("[Hospital API] Error:", error);
        return NextResponse.json(
            { error: "Internal server error", isHospital: false },
            { status: 500 }
        );
    }
}

/**
 * 여러 가맹점명 일괄 체크
 * PUT /api/hospital
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

        const hospitalKeywords = ["병원", "의원", "클리닉", "치과", "한의원", "안과", "피부과", "정형외과", "내과", "외과", "소아과", "산부인과", "이비인후과", "비뇨기과", "메디컬"];

        const results = names.map(name => {
            const isHospital = hospitalKeywords.some(keyword =>
                name.toLowerCase().includes(keyword.toLowerCase())
            );
            return {
                name,
                isHospital,
                reason: isHospital ? "keyword_match" : "no_keyword"
            };
        });

        const hospitalCount = results.filter(r => r.isHospital).length;

        return NextResponse.json({
            results,
            summary: {
                total: names.length,
                hospitalCount,
                nonHospitalCount: names.length - hospitalCount
            }
        });

    } catch (error) {
        console.error("[Hospital API Batch] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
