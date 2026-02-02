/**
 * 세금 데이터 저장소
 * localStorage를 사용하여 Admin, Calculator, Dashboard 간 데이터 공유
 */

import { TaxData } from "./ai-recommendation";

const STORAGE_KEY = "taxai_tax_data";
const ADMIN_STORAGE_KEY_PREFIX = "taxai_admin_data_"; // 연도별: taxai_admin_data_2024, taxai_admin_data_2025 ...

/**
 * Admin 페이지 데이터 인터페이스
 */
export interface AdminData {
    year: number;
    salary: {
        // 월별 데이터 (1~12월)
        monthly?: {
            [month: number]: {
                totalSalary: string;
                mealAllowance: string;
                nationalPension: string;
                healthInsurance: string;
                longTermCare: string;
                employmentInsurance: string;
                bonus: string;             // 상여금
                childTuition: string;      // 자녀학자금
                prepaidTax: string;        // 기납부세액 (소득세)
                localIncomeTax: string;    // 기납부세액 (지방소득세)
            }
        };
        // 연간 합계 (계산기로 전달용)
        totalSalary: number;       // 총급여 (세전)
        mealAllowance: number;     // 비과세 식대 (연간)
        childrenUnder6: number;    // 6세 이하 자녀 수 (보육수당)
        nationalPension: number;   // 국민연금
        healthInsurance: number;   // 건강보험
        longTermCare: number;      // 노인장기요양보험
        employmentInsurance: number; // 고용보험
        prepaidTax?: number;       // 기납부세액 (소득세, 연간)
        localIncomeTax?: number;   // 기납부세액 (지방소득세, 연간)
    };
    spending: {
        creditCard: number;        // 신용카드
        debitCard: number;         // 체크카드
        cash: number;              // 현금영수증
        publicTransport: number;   // 대중교통
        traditionalMarket: number; // 전통시장
        culture: number;           // 문화비
    };
    // 지출 항목 원본 (UI 복원용)
    spendingItems?: Array<{
        id: string;
        name: string;
        amount: string;
        month: number;
    }>;
    // 가족정보 (기본공제 - 본인 제외)
    family: {
        spouse: boolean;           // 배우자 유무
        children: number;          // 자녀 (만 20세 이하)
        childrenUnder6: number;    // 6세 이하 자녀 수 (보육수당 및 카드한도 확대용)
        childrenOver8?: number;    // 8세 이상 자녀 수 (자녀세액공제)
        birthAdoption?: "none" | "first" | "second" | "third1" | "third2" | "third3";  // 출생·입양자
        parents: number;           // 직계존속 (만 60세 이상)
        siblings: number;          // 형제자매 (만 20세 이하 또는 만 60세 이상)
        foster: number;            // 위탁아동 (6개월 이상)
        recipient: number;         // 기초생활수급자
        disabled?: number;         // 장애인
        seniorOver70?: number;     // 70세 이상
        singleParent?: boolean;    // 한부모
    };
    // 추가 공제 항목들
    deductions: {
        medical: number;           // 의료비
        education: number;         // 교육비
        housing: number;           // 주택마련저축
        pension: number;           // 연금저축/IRP
        insurance: number;         // 보험료
        donation: number;          // 기부금
    };
    updatedAt: string;
}

/**
 * 공제 항목 분석 결과 인터페이스
 */
export interface DeductionAnalysis {
    id: string;
    category: string;
    type: "소득공제" | "세액공제";
    amount: number;
    limit: number;
    status: "optimal" | "good" | "warning" | "critical";
    thresholdInfo?: string; // 문턱 정보 (신용카드 25%, 의료비 3% 등)
}

/**
 * 세금 데이터 저장
 */
export function saveTaxData(data: TaxData): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save tax data:", error);
    }
}

/**
 * 세금 데이터 불러오기
 */
export function loadTaxData(): TaxData | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored) as TaxData;
        }
        return null;
    } catch (error) {
        console.error("Failed to load tax data:", error);
        return null;
    }
}

/**
 * 세금 데이터 삭제
 */
export function clearTaxData(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear tax data:", error);
    }
}

/**
 * 세금 데이터 존재 여부 확인
 */
export function hasTaxData(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
        return false;
    }
}

// ==================== Admin 데이터 함수 ====================

/**
 * Admin 데이터 저장 (연도별)
 */
export function saveAdminData(year: number, data: AdminData): void {
    try {
        const key = `${ADMIN_STORAGE_KEY_PREFIX}${year}`;
        console.log("[DEBUG] saveAdminData called for year:", year);
        localStorage.setItem(key, JSON.stringify(data));
        console.log("[DEBUG] Admin data saved successfully! Key:", key);
    } catch (error) {
        console.error("[ERROR] Failed to save admin data:", error);
    }
}

/**
 * Admin 데이터 불러오기 (연도별)
 */
export function loadAdminData(year: number): AdminData | null {
    try {
        const key = `${ADMIN_STORAGE_KEY_PREFIX}${year}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored) as AdminData;
        }
        return null;
    } catch (error) {
        console.error("Failed to load admin data:", error);
        return null;
    }
}

/**
 * Admin 데이터 존재 여부 확인 (연도별)
 */
export function hasAdminData(year: number): boolean {
    try {
        const key = `${ADMIN_STORAGE_KEY_PREFIX}${year}`;
        return localStorage.getItem(key) !== null;
    } catch {
        return false;
    }
}

/**
 * Admin 데이터를 공제 분석 항목으로 변환
 */
export function generateDeductionAnalysis(adminData: AdminData): DeductionAnalysis[] {
    const salary = adminData.salary.totalSalary - adminData.salary.mealAllowance;
    const spending = adminData.spending;
    const deductions = adminData.deductions;

    // 신용카드 등 소득공제 계산
    const totalCardSpending = spending.creditCard + spending.debitCard + spending.cash +
        spending.publicTransport + spending.traditionalMarket + spending.culture;
    const minSpending = salary * 0.25; // 25% 문턱

    // 카드 사용 상태: 문턱 대비 얼마나 사용했는지
    const cardProgress = minSpending > 0 ? totalCardSpending / minSpending : 0;
    const getCardStatus = (): "optimal" | "good" | "warning" | "critical" => {
        if (cardProgress >= 1.3) return "optimal"; // 문턱 초과 + 여유
        if (cardProgress >= 1.0) return "good";    // 문턱 도달
        if (cardProgress >= 0.7) return "warning"; // 문턱 근접
        return "critical";                          // 문턱까지 멀음
    };

    const getStatus = (ratio: number): "optimal" | "good" | "warning" | "critical" => {
        if (ratio >= 0.95) return "optimal";
        if (ratio >= 0.7) return "good";
        if (ratio >= 0.4) return "warning";
        return "critical";
    };

    // 카드공제 한도: 기본 600만 + 자녀시 100만 (최대)
    const hasChildren = adminData.family?.children >= 1;
    const cardLimit = hasChildren ? 7000000 : 6000000;

    const items: DeductionAnalysis[] = [
        {
            id: "1",
            category: "신용카드 등 사용금액",
            type: "소득공제",
            amount: totalCardSpending,                    // 실제 사용액
            limit: cardLimit,                             // 기본 600만 + 자녀 100만 = 최대 700만원
            status: getCardStatus(),
            thresholdInfo: `25% 문턱: ${Math.round(minSpending).toLocaleString("ko-KR")}원`,
        },
        {
            id: "2",
            category: "주택마련저축",
            type: "소득공제",
            amount: deductions.housing,
            limit: 3000000,                               // 고정 한도 300만원
            status: getStatus(deductions.housing / 3000000),
        },
        {
            id: "3",
            category: "의료비",
            type: "세액공제",
            amount: deductions.medical,                   // 실제 의료비 지출
            limit: 7000000,                               // 고정 한도 700만원
            status: deductions.medical > salary * 0.03 ? "good" : "warning",
            thresholdInfo: `3% 문턱: ${Math.round(salary * 0.03).toLocaleString("ko-KR")}원`,
        },
        {
            id: "4",
            category: "교육비",
            type: "세액공제",
            amount: deductions.education,
            limit: 3000000,                               // 고정 한도 300만원
            status: getStatus(deductions.education / 3000000),
        },
        {
            id: "5",
            category: "기부금",
            type: "세액공제",
            amount: deductions.donation,
            limit: 200000,                                // 고정 한도 20만원 (정치+고향)
            status: getStatus(deductions.donation / 200000),
        },
        {
            id: "6",
            category: "연금저축/IRP",
            type: "세액공제",
            amount: deductions.pension,
            limit: 9000000,                               // 고정 한도 900만원
            status: getStatus(deductions.pension / 9000000),
        },
        {
            id: "7",
            category: "보험료",
            type: "세액공제",
            amount: deductions.insurance,
            limit: 1000000,                               // 고정 한도 100만원
            status: getStatus(deductions.insurance / 1000000),
        },
    ];


    return items;
}
