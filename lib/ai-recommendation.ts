/**
 * AI 절세 추천 서비스
 * 사용자의 세금 데이터를 분석하여 개인화된 절세 추천을 생성합니다.
 */

export interface TaxData {
    // 총급여 관련
    annualSalary: number;       // 연봉
    salary: number;             // 총급여액 (비과세 제외)
    withheldTax: number;        // 기납부세액

    // 인적공제
    dependents: number;         // 총 부양가족 수
    spouse: number;             // 배우자
    children: number;           // 자녀

    // 4대보험
    nationalPension: number;    // 국민연금
    healthInsurance: number;    // 건강보험료

    // 카드 사용
    creditCard: number;         // 신용카드
    debitCard: number;          // 체크카드
    cash: number;               // 현금영수증
    traditionalMarket: number;  // 전통시장
    publicTransport: number;    // 대중교통

    // 의료비
    medical: number;            // 의료비 합계

    // 교육비
    education: number;          // 교육비 합계

    // 주택자금
    housingSubscription: number; // 주택청약저축
    monthlyRent: number;         // 월세

    // 연금/보험
    pensionSavings: number;     // 연금저축
    irp: number;                // 퇴직연금(IRP)
    generalInsurance: number;   // 일반 보장성 보험료

    // 기부금
    politicalDonation: number;  // 정치자금 기부금
    hometownDonation: number;   // 고향사랑 기부금
    designatedDonation: number; // 일반 기부금
}

export interface AIRecommendation {
    id: string;
    priority: "high" | "medium" | "low";
    category: string;
    message: string;
    detail: string;
    potentialSaving: number;    // 예상 절세 금액 (원)
    action?: string;            // 실행 가이드
}

/**
 * 세금 데이터를 분석하여 AI 절세 추천을 생성합니다.
 */
export function generateRecommendations(data: TaxData): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    let idCounter = 1;

    // 1. 신용카드 등 사용금액 분석
    const minCardSpending = data.salary * 0.25;
    const totalCardSpending = data.creditCard + data.debitCard + data.cash + data.traditionalMarket + data.publicTransport;
    const cardUtilization = totalCardSpending / minCardSpending;

    if (cardUtilization < 1) {
        // 최소 사용금액 미달
        const shortage = minCardSpending - totalCardSpending;
        const potentialDeduction = shortage * 0.15; // 신용카드 공제율
        const potentialSaving = Math.round(potentialDeduction * 0.15); // 세율 15% 가정

        recommendations.push({
            id: String(idCounter++),
            priority: "high",
            category: "신용카드",
            message: `신용카드 ${formatWon(shortage)} 추가 사용 시 공제 시작`,
            detail: `현재 카드 사용액이 총급여의 25%인 ${formatWon(minCardSpending)}에 미달합니다. 문턱을 넘어야 공제가 시작됩니다.`,
            potentialSaving,
            action: "체크카드(30%) 또는 전통시장(40%)을 활용하면 공제율이 높습니다."
        });
    } else if (cardUtilization >= 0.95 && cardUtilization < 1.3) {
        // 문턱 근처 - 추가 사용 권장
        const additionalNeeded = minCardSpending * 0.1;
        const potentialSaving = Math.round(additionalNeeded * 0.3 * 0.15); // 체크카드 공제율

        recommendations.push({
            id: String(idCounter++),
            priority: "high",
            category: "신용카드",
            message: `체크카드/현금 ${formatWon(additionalNeeded)} 추가 사용 추천`,
            detail: `공제 문턱을 넘었습니다! 체크카드(30%)나 현금영수증(30%)을 활용하면 더 큰 공제를 받을 수 있습니다.`,
            potentialSaving,
            action: "신용카드보다 체크카드를 사용하세요."
        });
    }

    // 2. 연금저축/IRP 분석
    const pensionTotal = data.pensionSavings + data.irp;
    const pensionLimit = 9000000; // 연금저축+IRP 합산 한도
    const pensionUtilization = pensionTotal / pensionLimit;

    if (pensionUtilization < 0.5) {
        const shortage = pensionLimit - pensionTotal;
        const taxCreditRate = data.salary <= 55000000 ? 0.165 : 0.132;
        const potentialSaving = Math.round(shortage * taxCreditRate);

        recommendations.push({
            id: String(idCounter++),
            priority: "high",
            category: "연금저축",
            message: `연금저축/IRP ${formatWon(shortage)} 추가 납입 추천`,
            detail: `연간 최대 900만원까지 세액공제 가능합니다. 현재 ${Math.round(pensionUtilization * 100)}%만 활용 중입니다.`,
            potentialSaving,
            action: "IRP는 연금저축보다 납입 한도가 높습니다."
        });
    } else if (pensionUtilization < 1) {
        const shortage = pensionLimit - pensionTotal;
        const taxCreditRate = data.salary <= 55000000 ? 0.165 : 0.132;
        const potentialSaving = Math.round(shortage * taxCreditRate);

        recommendations.push({
            id: String(idCounter++),
            priority: "medium",
            category: "연금저축",
            message: `연금저축/IRP ${formatWon(shortage)} 추가 납입 가능`,
            detail: `현재 ${Math.round(pensionUtilization * 100)}% 활용 중. 한도까지 납입하면 추가 세액공제를 받을 수 있습니다.`,
            potentialSaving,
            action: "연말 전 납입하세요."
        });
    }

    // 3. 의료비 분석 (총급여 3% 초과분만 공제)
    const medicalThreshold = data.salary * 0.03;
    const medicalExcess = data.medical - medicalThreshold;

    if (data.medical > 0 && medicalExcess < 0) {
        const shortage = Math.abs(medicalExcess);
        recommendations.push({
            id: String(idCounter++),
            priority: "low",
            category: "의료비",
            message: `의료비 ${formatWon(shortage)} 추가 시 공제 시작`,
            detail: `의료비는 총급여의 3%(${formatWon(medicalThreshold)})를 초과해야 공제됩니다. 현재 ${formatWon(shortage)} 부족합니다.`,
            potentialSaving: Math.round(shortage * 0.15),
            action: "안경, 치과, 건강검진 등을 연내 진행하세요."
        });
    }

    // 4. 기부금 분석
    const totalDonation = data.politicalDonation + data.hometownDonation + data.designatedDonation;

    if (data.politicalDonation < 100000) {
        const shortage = 100000 - data.politicalDonation;
        recommendations.push({
            id: String(idCounter++),
            priority: "medium",
            category: "기부금",
            message: `정치자금 기부금 ${formatWon(shortage)} 납입으로 전액 공제`,
            detail: `정치자금 10만원까지는 전액 세액공제됩니다. 가장 효율적인 절세 방법 중 하나입니다.`,
            potentialSaving: shortage,
            action: "정당 후원금 또는 후원회 기부금"
        });
    }

    if (data.hometownDonation < 100000) {
        const shortage = 100000 - data.hometownDonation;
        recommendations.push({
            id: String(idCounter++),
            priority: "medium",
            category: "기부금",
            message: `고향사랑 기부금 ${formatWon(shortage)} 납입으로 전액 공제`,
            detail: `고향사랑 기부금 10만원까지는 전액 세액공제 + 답례품도 받을 수 있습니다.`,
            potentialSaving: shortage,
            action: "고향사랑e음 사이트에서 기부"
        });
    }

    // 5. 주택청약저축 분석
    const housingLimit = 3000000; // 연 300만원 납입한도
    if (data.housingSubscription < housingLimit) {
        const shortage = housingLimit - data.housingSubscription;
        const potentialSaving = Math.round(shortage * 0.4 * 0.15); // 40% 소득공제

        recommendations.push({
            id: String(idCounter++),
            priority: "low",
            category: "주택자금",
            message: `주택청약 ${formatWon(shortage)} 추가 납입 가능`,
            detail: `주택청약저축 납입액의 40%가 소득공제됩니다. 연 최대 300만원까지 가능합니다.`,
            potentialSaving,
            action: "무주택 세대주만 해당됩니다."
        });
    }

    // 6. 보험료 분석
    const insuranceLimit = 1000000;
    if (data.generalInsurance < insuranceLimit) {
        const shortage = insuranceLimit - data.generalInsurance;
        const potentialSaving = Math.round(shortage * 0.12); // 12% 세액공제

        recommendations.push({
            id: String(idCounter++),
            priority: "low",
            category: "보험료",
            message: `보장성보험 ${formatWon(shortage)} 추가 납입 가능`,
            detail: `보장성보험료는 연 100만원까지 12% 세액공제됩니다.`,
            potentialSaving
        });
    }

    // 우선순위순 정렬 (high > medium > low) 및 절세금액 기준 정렬
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recommendations.sort((a, b) => {
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return b.potentialSaving - a.potentialSaving;
    });

    return recommendations;
}

/**
 * 총 예상 절세 금액을 계산합니다.
 */
export function calculateTotalPotentialSaving(recommendations: AIRecommendation[]): number {
    return recommendations.reduce((sum, rec) => sum + rec.potentialSaving, 0);
}

/**
 * 원화 포맷팅 헬퍼
 */
function formatWon(num: number): string {
    if (num >= 10000) {
        return `${Math.round(num / 10000)}만원`;
    }
    return `${num.toLocaleString("ko-KR")}원`;
}

/**
 * 기본 추천 (데이터가 없을 경우)
 */
export function getDefaultRecommendations(): AIRecommendation[] {
    return [
        {
            id: "default-1",
            priority: "medium",
            category: "시작하기",
            message: "절세 시뮬레이션을 시작하세요",
            detail: "계산기에서 급여 및 공제 정보를 입력하면 맞춤형 절세 추천을 받을 수 있습니다.",
            potentialSaving: 0,
            action: "계산기로 이동"
        },
        {
            id: "default-2",
            priority: "low",
            category: "팁",
            message: "연금저축/IRP는 최대 900만원까지 세액공제",
            detail: "총급여 5,500만원 이하는 16.5%, 초과는 13.2% 세액공제됩니다.",
            potentialSaving: 0
        },
        {
            id: "default-3",
            priority: "low",
            category: "팁",
            message: "정치자금·고향사랑 기부금 각 10만원 전액 공제",
            detail: "가장 효율적인 절세 방법입니다. 고향사랑 기부금은 답례품도 받을 수 있습니다.",
            potentialSaving: 0
        }
    ];
}
