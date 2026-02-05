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
        bonus: number;             // 상여금 (연간)
        childTuition: number;      // 자녀학자금 (연간)
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
        housing: number;           // 주택마련저축 (레거시, 청약저축으로 이관)
        housingSubscription: number;  // 주택자금(청약저축) - 소득공제
        housingRent: number;          // 주택자금(월세) - 세액공제
        housingLoan: number;          // 주택자금(임차차입금) - 소득공제
        housingMortgage: number;      // 주택자금(장기주택저당차입금) - 소득공제
        pension: number;           // 연금저축/IRP
        insurance: number;         // 보험료
        donation: number;          // 기부금 (총합, 레거시 호환)
        donationPolitical: number;     // 기부금(정치자금)
        donationHometown: number;      // 기부금(고향사랑)
        donationDisaster: number;      // 기부금(고향사랑특별재난)
        donationSpecial: number;       // 기부금(특례기부금)
        donationStock: number;         // 기부금(우리사주조합)
        donationReligious: number;     // 기부금(일반기부금(종교))
        donationNonReligious: number;  // 기부금(일반기부금(종교 외))
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
    maxBenefit?: number; // 최대 공제 혜택 (활용률 계산용)
    earnedIncome?: number; // 근로소득금액 (기부금 한도 계산용)
    donationLimits?: {
        politicalFund: number;        // 정치자금: 근로소득금액 전액
        hometownDisaster: number;     // 고향사랑/특별재난: 합산 200만원
        specialDonation: number;      // 특례기부금: 근로소득금액 전액
        employeeStock: number;        // 우리사주조합: 근로소득금액의 30%
        generalReligious: number;     // 일반기부금(종교): 근로소득금액의 10%
        generalNonReligious: number;  // 일반기부금(종교외): 근로소득금액의 30%
    };
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
    // 총급여액 = 급여(totalSalary) + 상여금(bonus) + 자녀학자금(childTuition) - 비과세(mealAllowance + 보육수당)
    const childcareAllowance = (adminData.salary.childrenUnder6 || 0) * 200000 * 12; // 6세 이하 자녀당 월 20만원
    const totalNonTaxable = (adminData.salary.mealAllowance || 0) + childcareAllowance;
    const salary = (adminData.salary.totalSalary || 0) +
        (adminData.salary.bonus || 0) +
        (adminData.salary.childTuition || 0) -
        totalNonTaxable;
    const spending = adminData.spending;
    const deductions = adminData.deductions;

    // 신용카드 등 소득공제 계산
    const totalCardSpending = spending.creditCard + spending.debitCard + spending.cash +
        spending.publicTransport + spending.traditionalMarket + spending.culture;
    const minSpending = salary * 0.25; // 25% 문턱

    // 실제 공제액 계산 (25% 문턱 초과분에 공제율 적용)
    let cardDeduction = 0;
    if (totalCardSpending > minSpending) {
        let remaining = minSpending;

        // 25% 문턱 소진 순서: 신용카드 → 직불카드 → 현금영수증 → 대중교통 → 전통시장 → 문화비
        // 1. 신용카드 (15%)
        const creditUsed = Math.min(spending.creditCard, remaining);
        remaining -= creditUsed;
        const creditExcess = spending.creditCard - creditUsed;
        cardDeduction += creditExcess * 0.15;

        // 2. 직불카드 (30%)
        const debitUsed = Math.min(spending.debitCard, remaining);
        remaining -= debitUsed;
        const debitExcess = spending.debitCard - debitUsed;
        cardDeduction += debitExcess * 0.30;

        // 3. 현금영수증 (30%)
        const cashUsed = Math.min(spending.cash, remaining);
        remaining -= cashUsed;
        const cashExcess = spending.cash - cashUsed;
        cardDeduction += cashExcess * 0.30;

        // 4. 대중교통 (80%)
        const transportUsed = Math.min(spending.publicTransport, remaining);
        remaining -= transportUsed;
        const transportExcess = spending.publicTransport - transportUsed;
        cardDeduction += transportExcess * 0.80;

        // 5. 전통시장 (40%)
        const marketUsed = Math.min(spending.traditionalMarket, remaining);
        remaining -= marketUsed;
        const marketExcess = spending.traditionalMarket - marketUsed;
        cardDeduction += marketExcess * 0.40;

        // 6. 문화비 (30%)
        const cultureUsed = Math.min(spending.culture, remaining);
        remaining -= cultureUsed;
        const cultureExcess = spending.culture - cultureUsed;
        cardDeduction += cultureExcess * 0.30;
    }

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

    // 한도 적용
    const finalCardDeduction = Math.min(cardDeduction, cardLimit);

    // 4대보험 합계
    const socialInsurance = adminData.salary.nationalPension +
        adminData.salary.healthInsurance +
        (adminData.salary.longTermCare || 0) +
        (adminData.salary.employmentInsurance || 0);

    // 인적공제 (부양가족 수)
    const dependents = 1 +
        (adminData.family?.spouse ? 1 : 0) +
        (adminData.family?.children || 0) +
        (adminData.family?.parents || 0) +
        (adminData.family?.siblings || 0) +
        (adminData.family?.foster || 0) +
        (adminData.family?.recipient || 0);
    const personalDeduction = dependents * 1500000;

    // 근로소득금액 계산 (총급여 - 근로소득공제)
    let incomeDeduction = 0;
    if (salary <= 5000000) {
        incomeDeduction = salary * 0.7;
    } else if (salary <= 15000000) {
        incomeDeduction = 3500000 + (salary - 5000000) * 0.4;
    } else if (salary <= 45000000) {
        incomeDeduction = 7500000 + (salary - 15000000) * 0.15;
    } else if (salary <= 100000000) {
        incomeDeduction = 12000000 + (salary - 45000000) * 0.05;
    } else {
        incomeDeduction = 14750000 + (salary - 100000000) * 0.02;
    }
    const earnedIncome = Math.round(salary - incomeDeduction); // 근로소득금액


    const items: DeductionAnalysis[] = [
        {
            id: "0",
            category: "기본공제 (인적공제)",
            type: "소득공제",
            amount: personalDeduction,
            limit: personalDeduction,  // 한도 없음, 부양가족 수에 따라 결정
            status: "optimal",
            thresholdInfo: `부양가족 ${dependents}명 × 150만원`,
        },
        {
            id: "0-1",
            category: "4대보험",
            type: "소득공제",
            amount: socialInsurance,
            limit: socialInsurance,    // 전액 공제, 한도 없음
            status: "optimal",
            thresholdInfo: "납부액 전액 공제",
        },
        {
            id: "1",
            category: "신용카드 등 사용금액",
            type: "소득공제",
            amount: finalCardDeduction,                    // 25% 초과분에 공제율 적용한 실제 공제액
            limit: cardLimit,                             // 기본 600만 + 자녀 100만 = 최대 700만원
            status: getCardStatus(),
            thresholdInfo: `25% 문턱: ${Math.round(minSpending).toLocaleString("ko-KR")}원\n지출: ${totalCardSpending.toLocaleString("ko-KR")}원\n초과분: ${Math.max(0, totalCardSpending - Math.round(minSpending)).toLocaleString("ko-KR")}원`,
        },
        {
            id: "2",
            category: "주택자금(청약저축)",
            type: "소득공제",
            amount: deductions.housingSubscription || deductions.housing || 0,
            limit: 3000000,                               // 고정 한도 300만원
            status: getStatus((deductions.housingSubscription || deductions.housing || 0) / 3000000),
            thresholdInfo: "연 300만원 한도, 40% 공제",
        },
        {
            id: "2-1",
            category: "주택자금(임차차입금)",
            type: "소득공제",
            amount: deductions.housingLoan || 0,
            limit: 4000000,                               // 고정 한도 400만원
            status: getStatus((deductions.housingLoan || 0) / 4000000),
            thresholdInfo: "연 400만원 한도, 40% 공제",
        },
        {
            id: "2-2",
            category: "주택자금(장기주택저당차입금)",
            type: "소득공제",
            amount: deductions.housingMortgage || 0,
            limit: 18000000,                              // 고정 한도 1,800만원
            status: getStatus((deductions.housingMortgage || 0) / 18000000),
            thresholdInfo: "연 300~1,800만원 한도\n이자 전액 공제",
        },
        {
            id: "2-3",
            category: "월세 세액공제",
            type: "세액공제",
            amount: Math.min(deductions.housingRent || 0, 10000000) * 0.17,  // 17% 세액공제율 적용
            limit: 10000000,                                                  // 납입 한도: 1,000만원
            status: getStatus((deductions.housingRent || 0) / 10000000),
            thresholdInfo: "연 1,000만원 한도 × 17%",
            maxBenefit: 10000000 * 0.17, // 최대 170만원
        },
        {
            id: "3",
            category: "의료비",
            type: "세액공제",
            amount: Math.max(0, deductions.medical - salary * 0.03) * 0.15,  // 3% 문턱 초과분 × 15%
            limit: 7000000,                                                   // 공제 대상 한도: 700만원
            status: deductions.medical > salary * 0.03 ? "good" : "warning",
            thresholdInfo: `3% 문턱: ${Math.round(salary * 0.03).toLocaleString("ko-KR")}원\n지출: ${deductions.medical.toLocaleString("ko-KR")}원\n초과분: ${Math.max(0, deductions.medical - Math.round(salary * 0.03)).toLocaleString("ko-KR")}원\n\n난임시술비: 해당금액 × 30%\n미숙아·선천성: 해당금액 × 20%\n본인/장애/만65/6세: 해당금액 × 15%\n그 밖의 부양가족: 해당금액 × 15%`,
            maxBenefit: 7000000 * 0.15, // 최대 105만원 (그 밖의 부양가족 기준)
        },
        {
            id: "4",
            category: "교육비",
            type: "세액공제",
            amount: Math.min(deductions.education, 3000000) * 0.15,          // 15% 세액공제율 적용
            limit: 3000000,                                                   // 납입 한도: 300만원
            status: getStatus(deductions.education / 3000000),
            thresholdInfo: "본인: 해당금액 × 15%\n미취학·초중고: 해당금액 × 15%\n대학: 해당금액 × 15%",
            maxBenefit: 3000000 * 0.15, // 최대 45만원 (미취학/초중고 기준)
        },
        {
            id: "5",
            category: "기부금",
            type: "세액공제",
            amount: (() => {
                // 정치자금: 10만원이하 100/110, 초과 15%, 3천만원초과 25%
                const political = deductions.donationPolitical || 0;
                let politicalCredit = 0;
                if (political <= 100000) {
                    politicalCredit = Math.round(political * 100 / 110);
                } else if (political <= 30000000) {
                    politicalCredit = Math.round(100000 * 100 / 110) + Math.round((political - 100000) * 0.15);
                } else {
                    politicalCredit = Math.round(100000 * 100 / 110) + Math.round(29900000 * 0.15) + Math.round((political - 30000000) * 0.25);
                }

                // 고향사랑: 10만원이하 100/110, 초과 15%
                const hometown = deductions.donationHometown || 0;
                let hometownCredit = 0;
                if (hometown <= 100000) {
                    hometownCredit = Math.round(hometown * 100 / 110);
                } else {
                    hometownCredit = Math.round(100000 * 100 / 110) + Math.round((hometown - 100000) * 0.15);
                }

                // 고향사랑특별재난: 10만원이하 100/110, 초과 30%
                const disaster = deductions.donationDisaster || 0;
                let disasterCredit = 0;
                if (disaster <= 100000) {
                    disasterCredit = Math.round(disaster * 100 / 110);
                } else {
                    disasterCredit = Math.round(100000 * 100 / 110) + Math.round((disaster - 100000) * 0.3);
                }

                // 특례기부금: 1천만원이하 15%, 초과 30%
                const special = deductions.donationSpecial || 0;
                let specialCredit = 0;
                if (special <= 10000000) {
                    specialCredit = Math.round(special * 0.15);
                } else {
                    specialCredit = Math.round(10000000 * 0.15) + Math.round((special - 10000000) * 0.3);
                }

                // 우리사주조합: 1천만원이하 15%, 초과 30%
                const stock = deductions.donationStock || 0;
                let stockCredit = 0;
                if (stock <= 10000000) {
                    stockCredit = Math.round(stock * 0.15);
                } else {
                    stockCredit = Math.round(10000000 * 0.15) + Math.round((stock - 10000000) * 0.3);
                }

                // 일반기부금(종교): 1천만원이하 15%, 초과 30%
                const religious = deductions.donationReligious || 0;
                let religiousCredit = 0;
                if (religious <= 10000000) {
                    religiousCredit = Math.round(religious * 0.15);
                } else {
                    religiousCredit = Math.round(10000000 * 0.15) + Math.round((religious - 10000000) * 0.3);
                }

                // 일반기부금(종교 외): 1천만원이하 15%, 초과 30%
                const nonReligious = deductions.donationNonReligious || 0;
                let nonReligiousCredit = 0;
                if (nonReligious <= 10000000) {
                    nonReligiousCredit = Math.round(nonReligious * 0.15);
                } else {
                    nonReligiousCredit = Math.round(10000000 * 0.15) + Math.round((nonReligious - 10000000) * 0.3);
                }

                return politicalCredit + hometownCredit + disasterCredit + specialCredit + stockCredit + religiousCredit + nonReligiousCredit;
            })(),
            limit: earnedIncome,
            status: getStatus((deductions.donationPolitical || 0) + (deductions.donationHometown || 0) + (deductions.donationDisaster || 0) + (deductions.donationSpecial || 0) + (deductions.donationStock || 0) + (deductions.donationReligious || 0) + (deductions.donationNonReligious || 0) / earnedIncome),
            thresholdInfo: `정치자금: ${(deductions.donationPolitical || 0).toLocaleString("ko-KR")}원\n고향사랑: ${(deductions.donationHometown || 0).toLocaleString("ko-KR")}원\n고향사랑특별재난: ${(deductions.donationDisaster || 0).toLocaleString("ko-KR")}원\n특례기부금: ${(deductions.donationSpecial || 0).toLocaleString("ko-KR")}원\n우리사주조합: ${(deductions.donationStock || 0).toLocaleString("ko-KR")}원\n일반기부(종교): ${(deductions.donationReligious || 0).toLocaleString("ko-KR")}원\n일반기부(종교 외): ${(deductions.donationNonReligious || 0).toLocaleString("ko-KR")}원`,
            maxBenefit: earnedIncome * 0.3,
            earnedIncome: earnedIncome,
            donationLimits: {
                politicalFund: earnedIncome,
                hometownDisaster: 2000000,
                specialDonation: earnedIncome,
                employeeStock: Math.round(earnedIncome * 0.3),
                generalReligious: Math.round(earnedIncome * 0.1),
                generalNonReligious: Math.round(earnedIncome * 0.3),
            },
        },
        {
            id: "6",
            category: "연금저축/IRP",
            type: "세액공제",
            amount: Math.min(deductions.pension, 9000000) * 0.12,            // 12% 세액공제율 적용
            limit: 9000000,                                                   // 납입 한도: 900만원
            status: getStatus(deductions.pension / 9000000),
            thresholdInfo: `${Math.min(deductions.pension, 9000000).toLocaleString("ko-KR")}원 × 12%`,
            maxBenefit: 9000000 * 0.12, // 최대 108만원
        },
        {
            id: "7",
            category: "보험료",
            type: "세액공제",
            amount: Math.min(deductions.insurance, 1000000) * 0.12,          // 12% 세액공제율 적용
            limit: 1000000,                                                   // 납입 한도: 100만원
            status: getStatus(deductions.insurance / 1000000),
            thresholdInfo: `${Math.min(deductions.insurance, 1000000).toLocaleString("ko-KR")}원 × 12%`,
            maxBenefit: 1000000 * 0.12, // 최대 12만원
        },
    ];


    return items;
}
