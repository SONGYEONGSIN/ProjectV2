// AI 추천 관련 타입 및 유틸리티

export interface TaxData {
    annualSalary: number;
    salary: number;
    withheldTax: number;
    dependents: number;
    spouse: number;
    children: number;
    nationalPension: number;
    healthInsurance: number;
    creditCard: number;
    debitCard: number;
    cash: number;
    traditionalMarket: number;
    publicTransport: number;
    medical: number;
    education: number;
    housingSubscription: number;
    monthlyRent: number;
    pensionSavings: number;
    irp: number;
    generalInsurance: number;
    politicalDonation: number;
    hometownDonation: number;
    designatedDonation: number;
}

export interface TaxRecommendation {
    id: string;
    title: string;
    description: string;
    potentialSaving: number;
    priority: 'high' | 'medium' | 'low';
    category: string;
}

// AI 추천 생성 함수 (기본 구현)
export function generateRecommendations(data: TaxData): TaxRecommendation[] {
    const recommendations: TaxRecommendation[] = [];

    // 연금저축 추천
    if (data.pensionSavings < 6000000) {
        recommendations.push({
            id: 'pension-savings',
            title: '연금저축 납입 확대',
            description: `현재 연금저축 ${(data.pensionSavings / 10000).toFixed(0)}만원 → 연 600만원까지 납입 시 추가 세액공제 가능`,
            potentialSaving: Math.round((6000000 - data.pensionSavings) * 0.165),
            priority: 'high',
            category: '연금',
        });
    }

    // IRP 추천
    if (data.irp < 3000000) {
        recommendations.push({
            id: 'irp',
            title: 'IRP 납입 확대',
            description: `현재 IRP ${(data.irp / 10000).toFixed(0)}만원 → 연 300만원까지 추가 납입 권장`,
            potentialSaving: Math.round((3000000 - data.irp) * 0.165),
            priority: 'medium',
            category: '연금',
        });
    }

    // 고향사랑기부금 추천
    if (data.hometownDonation < 100000) {
        recommendations.push({
            id: 'hometown-donation',
            title: '고향사랑기부금',
            description: '10만원 기부 시 전액 세액공제 + 3만원 상당 답례품 수령 가능',
            potentialSaving: 100000,
            priority: 'high',
            category: '기부금',
        });
    }

    // 정치자금 기부금 추천
    if (data.politicalDonation < 100000) {
        recommendations.push({
            id: 'political-donation',
            title: '정치자금 기부금',
            description: '10만원 기부 시 전액 세액공제 (100/110 적용)',
            potentialSaving: Math.round(100000 * (100 / 110)),
            priority: 'medium',
            category: '기부금',
        });
    }

    // 신용카드 vs 체크카드 사용 비율 권고
    const totalCard = data.creditCard + data.debitCard + data.cash;
    const debitRatio = (data.debitCard + data.cash) / totalCard;
    if (debitRatio < 0.5 && totalCard > 0) {
        recommendations.push({
            id: 'card-usage',
            title: '체크카드/현금영수증 사용 비율 증가',
            description: '체크카드/현금영수증은 30% 공제율로 신용카드(15%)보다 유리',
            potentialSaving: Math.round(data.creditCard * 0.15),
            priority: 'medium',
            category: '소비',
        });
    }

    return recommendations.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}
