module.exports = [
"[project]/lib/tax-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 세금 데이터 저장소
 * localStorage를 사용하여 Admin, Calculator, Dashboard 간 데이터 공유
 */ __turbopack_context__.s([
    "clearTaxData",
    ()=>clearTaxData,
    "generateDeductionAnalysis",
    ()=>generateDeductionAnalysis,
    "hasAdminData",
    ()=>hasAdminData,
    "hasTaxData",
    ()=>hasTaxData,
    "loadAdminData",
    ()=>loadAdminData,
    "loadTaxData",
    ()=>loadTaxData,
    "saveAdminData",
    ()=>saveAdminData,
    "saveTaxData",
    ()=>saveTaxData
]);
const STORAGE_KEY = "taxai_tax_data";
const ADMIN_STORAGE_KEY_PREFIX = "taxai_admin_data_"; // 연도별: taxai_admin_data_2024, taxai_admin_data_2025 ...
function saveTaxData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save tax data:", error);
    }
}
function loadTaxData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return null;
    } catch (error) {
        console.error("Failed to load tax data:", error);
        return null;
    }
}
function clearTaxData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear tax data:", error);
    }
}
function hasTaxData() {
    try {
        return localStorage.getItem(STORAGE_KEY) !== null;
    } catch  {
        return false;
    }
}
function saveAdminData(year, data) {
    try {
        const key = `${ADMIN_STORAGE_KEY_PREFIX}${year}`;
        console.log("[DEBUG] saveAdminData called for year:", year);
        localStorage.setItem(key, JSON.stringify(data));
        console.log("[DEBUG] Admin data saved successfully! Key:", key);
    } catch (error) {
        console.error("[ERROR] Failed to save admin data:", error);
    }
}
function loadAdminData(year) {
    try {
        const key = `${ADMIN_STORAGE_KEY_PREFIX}${year}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
        return null;
    } catch (error) {
        console.error("Failed to load admin data:", error);
        return null;
    }
}
function hasAdminData(year) {
    try {
        const key = `${ADMIN_STORAGE_KEY_PREFIX}${year}`;
        return localStorage.getItem(key) !== null;
    } catch  {
        return false;
    }
}
function generateDeductionAnalysis(adminData) {
    // 총급여액 = 급여(totalSalary) + 상여금(bonus) + 자녀학자금(childTuition) - 비과세(mealAllowance + 보육수당)
    const childcareAllowance = (adminData.salary.childrenUnder6 || 0) * 200000 * 12; // 6세 이하 자녀당 월 20만원
    const totalNonTaxable = (adminData.salary.mealAllowance || 0) + childcareAllowance;
    const salary = (adminData.salary.totalSalary || 0) + (adminData.salary.bonus || 0) + (adminData.salary.childTuition || 0) - totalNonTaxable;
    const spending = adminData.spending;
    const deductions = adminData.deductions;
    // spendingItems에서 직접 금액을 계산하는 헬퍼 (레거시 데이터 호환용)
    const getSpendingItemAmount = (name)=>{
        if (!adminData.spendingItems) return 0;
        return adminData.spendingItems.filter((i)=>i.name && i.name.includes(name)).reduce((sum, item)=>{
            const amount = typeof item.amount === 'string' ? parseInt(item.amount.replace(/[^0-9]/g, '')) || 0 : item.amount || 0;
            return sum + amount;
        }, 0);
    };
    // 신용카드 등 소득공제 계산
    const totalCardSpending = spending.creditCard + spending.debitCard + spending.cash + spending.publicTransport + spending.traditionalMarket + spending.culture;
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
    const getCardStatus = ()=>{
        if (cardProgress >= 1.3) return "optimal"; // 문턱 초과 + 여유
        if (cardProgress >= 1.0) return "good"; // 문턱 도달
        if (cardProgress >= 0.7) return "warning"; // 문턱 근접
        return "critical"; // 문턱까지 멀음
    };
    const getStatus = (ratio)=>{
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
    const socialInsurance = adminData.salary.nationalPension + adminData.salary.healthInsurance + (adminData.salary.longTermCare || 0) + (adminData.salary.employmentInsurance || 0);
    // 인적공제 (부양가족 수)
    const dependents = 1 + (adminData.family?.spouse ? 1 : 0) + (adminData.family?.children || 0) + (adminData.family?.parents || 0) + (adminData.family?.siblings || 0) + (adminData.family?.foster || 0) + (adminData.family?.recipient || 0);
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
    const items = [
        {
            id: "0",
            category: "기본공제 (인적공제)",
            type: "소득공제",
            amount: personalDeduction,
            limit: personalDeduction,
            status: "optimal",
            thresholdInfo: `부양가족 ${dependents}명 × 150만원`
        },
        (()=>{
            // 4대보험 상세 내역
            const nationalPension = adminData.salary.nationalPension || 0;
            const healthInsurance = adminData.salary.healthInsurance || 0;
            const longTermCare = adminData.salary.longTermCare || 0;
            const employmentInsurance = adminData.salary.employmentInsurance || 0;
            const total = nationalPension + healthInsurance + longTermCare + employmentInsurance;
            const infoLines = [];
            infoLines.push(`국민연금: ${nationalPension.toLocaleString("ko-KR")}원`);
            infoLines.push(`건강보험: ${healthInsurance.toLocaleString("ko-KR")}원`);
            infoLines.push(`요양보험: ${longTermCare.toLocaleString("ko-KR")}원`);
            infoLines.push(`고용보험: ${employmentInsurance.toLocaleString("ko-KR")}원`);
            infoLines.push(`──────────────`);
            infoLines.push(`합계: ${total.toLocaleString("ko-KR")}원`);
            return {
                id: "0-1",
                category: "4대보험",
                type: "소득공제",
                amount: total,
                limit: total,
                status: "optimal",
                thresholdInfo: infoLines.join("\n")
            };
        })(),
        {
            id: "1",
            category: "신용카드 등 사용금액",
            type: "소득공제",
            amount: finalCardDeduction,
            limit: cardLimit,
            status: getCardStatus(),
            thresholdInfo: `25% 문턱: ${Math.round(minSpending).toLocaleString("ko-KR")}원\n지출: ${totalCardSpending.toLocaleString("ko-KR")}원\n초과분: ${Math.max(0, totalCardSpending - Math.round(minSpending)).toLocaleString("ko-KR")}원`
        },
        (()=>{
            // 주택자금 - 청약저축 + 임차차입금원리금상환액
            // 청약저축: 납입한도 300만원
            // 임차차입금: 원리금상환액
            // 공제율: 40%, 공제한도: 400만원 (최종 공제액 기준)
            // 청약저축 데이터 (세대주/배우자)
            const headAmount = deductions.housingSubscriptionHead ?? getSpendingItemAmount("주택자금(청약저축) - 세대주");
            const spouseAmount = deductions.housingSubscriptionSpouse ?? getSpendingItemAmount("주택자금(청약저축) - 배우자");
            const subscriptionTotal = headAmount + spouseAmount;
            // 청약저축 납입한도 300만원 적용
            const limitedSubscription = Math.min(subscriptionTotal, 3000000);
            // 임차차입금원리금상환액
            const loanAmount = deductions.housingLoan || 0;
            // 합산액 (청약저축 한도 적용 후 + 임차차입금)
            const combinedTotal = limitedSubscription + loanAmount;
            // 공제액 계산: 합산액 × 40%
            const calculatedDeduction = Math.round(combinedTotal * 0.4);
            // 공제한도 400만원 적용 (최종 공제액 기준)
            const finalDeduction = Math.min(calculatedDeduction, 4000000);
            // thresholdInfo 생성
            const infoLines = [];
            infoLines.push("【 청약저축 + 임차차입금 합산 】");
            if (headAmount > 0 || spouseAmount > 0) {
                infoLines.push(`청약저축:`);
                if (headAmount > 0) infoLines.push(`  세대주: ${headAmount.toLocaleString("ko-KR")}원`);
                if (spouseAmount > 0) infoLines.push(`  배우자: ${spouseAmount.toLocaleString("ko-KR")}원`);
                if (subscriptionTotal > 3000000) {
                    infoLines.push(`  (납입한도 300만원 적용)`);
                }
            }
            if (loanAmount > 0) {
                infoLines.push(`임차차입금: ${loanAmount.toLocaleString("ko-KR")}원`);
            }
            infoLines.push(`──────────────`);
            infoLines.push(`합산: ${combinedTotal.toLocaleString("ko-KR")}원`);
            infoLines.push(`└ ${combinedTotal.toLocaleString("ko-KR")} × 40%`);
            infoLines.push(`= ${calculatedDeduction.toLocaleString("ko-KR")}원`);
            if (calculatedDeduction > 4000000) {
                infoLines.push(`(공제한도 400만원 적용)`);
                infoLines.push(`→ ${finalDeduction.toLocaleString("ko-KR")}원`);
            }
            return {
                id: "2",
                category: "주택자금(청약저축+임차차입금)",
                type: "소득공제",
                amount: finalDeduction,
                limit: 4000000,
                status: getStatus(calculatedDeduction / 4000000),
                thresholdInfo: infoLines.join("\n")
            };
        })(),
        (()=>{
            // 장기주택저당차입금이자상환액 - 옵션별 한도 적용
            // 15년이상 고정금리+비거치식: 1,800만원
            // 15년이상 고정금리 or 비거치식: 1,500만원
            // 15년이상 기타: 500만원
            // 10년이상 고정금리 or 비거치식: 300만원
            const mortgage15Fixed = deductions.housingMortgage15Fixed || 0;
            const mortgage15Either = deductions.housingMortgage15Either || 0;
            const mortgage15Other = deductions.housingMortgage15Other || 0;
            const mortgage10Either = deductions.housingMortgage10Either || 0;
            // 레거시 호환
            const mortgageLegacy = deductions.housingMortgage || 0;
            // 옵션별 한도 적용
            const limited15Fixed = Math.min(mortgage15Fixed, 18000000);
            const limited15Either = Math.min(mortgage15Either, 15000000);
            const limited15Other = Math.min(mortgage15Other, 5000000);
            const limited10Either = Math.min(mortgage10Either, 3000000);
            // 총 공제액 (이자 전액 공제이므로 한도 적용 금액 = 공제액)
            const totalDeduction = limited15Fixed + limited15Either + limited15Other + limited10Either + mortgageLegacy;
            const maxLimit = 18000000; // 최대 한도 표시용
            // thresholdInfo 생성
            const infoLines = [];
            infoLines.push("【 장기주택저당차입금 이자상환액 】");
            if (mortgage15Fixed > 0) {
                infoLines.push(`15년↑ 고정+비거치: ${mortgage15Fixed.toLocaleString("ko-KR")}원`);
                if (mortgage15Fixed > 18000000) infoLines.push(`  (한도 1,800만원 적용)`);
            }
            if (mortgage15Either > 0) {
                infoLines.push(`15년↑ 고정or비거치: ${mortgage15Either.toLocaleString("ko-KR")}원`);
                if (mortgage15Either > 15000000) infoLines.push(`  (한도 1,500만원 적용)`);
            }
            if (mortgage15Other > 0) {
                infoLines.push(`15년↑ 기타: ${mortgage15Other.toLocaleString("ko-KR")}원`);
                if (mortgage15Other > 5000000) infoLines.push(`  (한도 500만원 적용)`);
            }
            if (mortgage10Either > 0) {
                infoLines.push(`10년↑ 고정or비거치: ${mortgage10Either.toLocaleString("ko-KR")}원`);
                if (mortgage10Either > 3000000) infoLines.push(`  (한도 300만원 적용)`);
            }
            if (mortgageLegacy > 0) {
                infoLines.push(`기타: ${mortgageLegacy.toLocaleString("ko-KR")}원`);
            }
            if (totalDeduction > 0) {
                infoLines.push(`──────────────`);
                infoLines.push(`= ${totalDeduction.toLocaleString("ko-KR")}원`);
            } else {
                infoLines.push(`지출: 0원`);
            }
            return {
                id: "2-2",
                category: "주택자금(장기주택저당차입금이자\n상환액)",
                type: "소득공제",
                amount: totalDeduction,
                limit: maxLimit,
                status: getStatus(totalDeduction / maxLimit),
                thresholdInfo: infoLines.join("\n")
            };
        })(),
        (()=>{
            // 월세 세액공제 - 급여에 따라 공제율 결정
            const rentAmount = deductions.housingRent || 0;
            const rentRate = salary <= 55000000 ? 0.17 : 0.15;
            const rentRatePercent = salary <= 55000000 ? "17%" : "15%";
            const limitedRent = Math.min(rentAmount, 10000000);
            const rentCredit = Math.round(limitedRent * rentRate);
            // thresholdInfo 생성 - 기부금처럼 세부 계산식 표시
            const infoLines = [];
            infoLines.push(`총급여: ${salary.toLocaleString("ko-KR")}원`);
            infoLines.push(`→ ${salary <= 55000000 ? "5,500만원 이하" : "5,500만원 초과"}`);
            infoLines.push(`──────────────`);
            infoLines.push(`지출: ${rentAmount.toLocaleString("ko-KR")}원`);
            if (rentAmount > 10000000) {
                infoLines.push(`한도: ${10000000..toLocaleString("ko-KR")}원`);
            }
            infoLines.push(`└ ${limitedRent.toLocaleString("ko-KR")} × ${rentRatePercent}`);
            infoLines.push(`= ${rentCredit.toLocaleString("ko-KR")}원`);
            return {
                id: "2-3",
                category: "월세 세액공제",
                type: "세액공제",
                amount: rentCredit,
                limit: 10000000,
                status: getStatus(rentAmount / 10000000),
                thresholdInfo: infoLines.join("\n"),
                maxBenefit: 10000000 * rentRate,
                rentLimitInfo: {
                    salary: salary,
                    limit: 10000000,
                    rate: rentRate,
                    ratePercent: rentRatePercent,
                    isLowIncome: salary <= 55000000
                }
            };
        })(),
        (()=>{
            // 의료비 계산 및 계산식 생성
            const infertility = deductions.medicalInfertility || 0; // 난임시술비: 30%
            const premature = deductions.medicalPremature || 0; // 미숙아,선천성: 20%
            const selfMedical = deductions.medicalSelf || 0; // 본인,장애,65세,6세: 15%
            const familyMedical = deductions.medicalFamily || 0; // 그밖부양가족: 15%
            // 총 의료비 (레거시 호환 포함)
            const totalMedical = infertility + premature + selfMedical + familyMedical + (deductions.medical || 0);
            // 3% 문턱
            const threshold = Math.round(salary * 0.03);
            const exceeds = totalMedical > threshold;
            // 각 카테고리별 세액공제액 계산 (3% 문턱은 전체에 적용)
            // 실제로는 그밖부양가족만 700만원 한도 적용
            const FAMILY_LIMIT = 7000000;
            const familyLimited = Math.min(familyMedical, FAMILY_LIMIT);
            const infertilityCredit = Math.round(infertility * 0.30);
            const prematureCredit = Math.round(premature * 0.20);
            const selfCredit = Math.round(selfMedical * 0.15);
            const familyCredit = Math.round(familyLimited * 0.15);
            // 총 세액공제액 (3% 문턱 초과분에만 적용)
            const totalCredit = exceeds ? Math.round(Math.max(0, infertility - Math.min(threshold, infertility)) * 0.30) + Math.round(Math.max(0, premature) * 0.20) + Math.round(Math.max(0, selfMedical) * 0.15) + Math.round(Math.min(familyMedical, FAMILY_LIMIT) * 0.15) : 0;
            // thresholdInfo 생성 - 각 카테고리별 계산식 표시
            const infoLines = [];
            // 3% 문턱 정보 추가 (신용카드와 동일한 형식)
            infoLines.push(`3% 문턱: ${threshold.toLocaleString("ko-KR")}원`);
            infoLines.push(`지출: ${totalMedical.toLocaleString("ko-KR")}원`);
            infoLines.push(`초과분: ${Math.max(0, totalMedical - threshold).toLocaleString("ko-KR")}원`);
            infoLines.push(`──────────────`);
            // 난임시술비
            infoLines.push(`난임시술비: ${infertility.toLocaleString("ko-KR")}원`);
            infoLines.push(`└ ${infertility.toLocaleString("ko-KR")} × 30%\n= ${infertilityCredit.toLocaleString("ko-KR")}원`);
            // 미숙아,선천성
            infoLines.push(`미숙아·선천성: ${premature.toLocaleString("ko-KR")}원`);
            infoLines.push(`└ ${premature.toLocaleString("ko-KR")} × 20%\n= ${prematureCredit.toLocaleString("ko-KR")}원`);
            // 본인,장애,65세,6세
            infoLines.push(`본인/장애/만65/6세: ${selfMedical.toLocaleString("ko-KR")}원`);
            infoLines.push(`└ ${selfMedical.toLocaleString("ko-KR")} × 15%\n= ${selfCredit.toLocaleString("ko-KR")}원`);
            // 그밖부양가족 (700만원 한도)
            if (familyMedical > FAMILY_LIMIT) {
                infoLines.push(`그 밖의 부양가족: ${familyMedical.toLocaleString("ko-KR")}원`);
                infoLines.push(`→ 한도: ${FAMILY_LIMIT.toLocaleString("ko-KR")}원`);
            } else {
                infoLines.push(`그 밖의 부양가족: ${familyMedical.toLocaleString("ko-KR")}원`);
            }
            infoLines.push(`└ ${familyLimited.toLocaleString("ko-KR")} × 15%\n= ${familyCredit.toLocaleString("ko-KR")}원`);
            // 합계
            const totalCreditSum = infertilityCredit + prematureCredit + selfCredit + familyCredit;
            infoLines.push(`──────────────`);
            infoLines.push(`합계: ${totalCreditSum.toLocaleString("ko-KR")}원`);
            return {
                id: "3",
                category: "의료비",
                type: "세액공제",
                amount: totalCreditSum,
                limit: FAMILY_LIMIT,
                status: getStatus(totalMedical / 10000000),
                thresholdInfo: infoLines.join("\n"),
                maxBenefit: FAMILY_LIMIT * 0.15
            };
        })(),
        (()=>{
            // 교육비 계산 및 계산식 생성
            const eduSelf = deductions.educationSelf || 0; // 본인: 한도 없음
            // 자녀별 교육비 (1인당 300만원 한도)
            const pre1 = deductions.educationPreschool1 || 0;
            const pre2 = deductions.educationPreschool2 || 0;
            const pre3 = deductions.educationPreschool3 || 0;
            const k12_1 = deductions.educationK12_1 || 0;
            const k12_2 = deductions.educationK12_2 || 0;
            const k12_3 = deductions.educationK12_3 || 0;
            // 자녀별 대학 교육비 (1인당 900만원 한도)
            const univ1 = deductions.educationUniv1 || 0;
            const univ2 = deductions.educationUniv2 || 0;
            const univ3 = deductions.educationUniv3 || 0;
            // 한도 적용
            const CHILD_LIMIT = 3000000; // 미취학·초중고: 1인당 300만원
            const UNIV_LIMIT = 9000000; // 대학: 1인당 900만원
            const eduSelfLimited = eduSelf; // 본인은 한도 없음
            const pre1Limited = Math.min(pre1, CHILD_LIMIT);
            const pre2Limited = Math.min(pre2, CHILD_LIMIT);
            const pre3Limited = Math.min(pre3, CHILD_LIMIT);
            const k12_1Limited = Math.min(k12_1, CHILD_LIMIT);
            const k12_2Limited = Math.min(k12_2, CHILD_LIMIT);
            const k12_3Limited = Math.min(k12_3, CHILD_LIMIT);
            const univ1Limited = Math.min(univ1, UNIV_LIMIT);
            const univ2Limited = Math.min(univ2, UNIV_LIMIT);
            const univ3Limited = Math.min(univ3, UNIV_LIMIT);
            // 세액공제액 계산 (15%)
            const eduSelfCredit = Math.round(eduSelfLimited * 0.15);
            const pre1Credit = Math.round(pre1Limited * 0.15);
            const pre2Credit = Math.round(pre2Limited * 0.15);
            const pre3Credit = Math.round(pre3Limited * 0.15);
            const k12_1Credit = Math.round(k12_1Limited * 0.15);
            const k12_2Credit = Math.round(k12_2Limited * 0.15);
            const k12_3Credit = Math.round(k12_3Limited * 0.15);
            const univ1Credit = Math.round(univ1Limited * 0.15);
            const univ2Credit = Math.round(univ2Limited * 0.15);
            const univ3Credit = Math.round(univ3Limited * 0.15);
            const totalCredit = eduSelfCredit + pre1Credit + pre2Credit + pre3Credit + k12_1Credit + k12_2Credit + k12_3Credit + univ1Credit + univ2Credit + univ3Credit;
            // thresholdInfo 생성 - 금액이 있는 항목만 계산식과 함께 표시
            const infoLines = [];
            // 헬퍼 함수: 교육비 계산식 추가
            const addEduInfo = (label, amount, limit, limited, credit)=>{
                if (amount > 0) {
                    if (amount > limit) {
                        infoLines.push(`${label}: ${amount.toLocaleString("ko-KR")}원`);
                        infoLines.push(`→ 한도: ${limited.toLocaleString("ko-KR")}원`);
                    } else {
                        infoLines.push(`${label}: ${amount.toLocaleString("ko-KR")}원`);
                    }
                    infoLines.push(`└ ${limited.toLocaleString("ko-KR")} × 15%\n= ${credit.toLocaleString("ko-KR")}원`);
                }
            };
            if (eduSelf > 0) {
                infoLines.push(`본인: ${eduSelf.toLocaleString("ko-KR")}원`);
                infoLines.push(`└ ${eduSelf.toLocaleString("ko-KR")} × 15%\n= ${eduSelfCredit.toLocaleString("ko-KR")}원`);
            }
            addEduInfo("미취학-자녀1", pre1, CHILD_LIMIT, pre1Limited, pre1Credit);
            addEduInfo("미취학-자녀2", pre2, CHILD_LIMIT, pre2Limited, pre2Credit);
            addEduInfo("미취학-자녀3", pre3, CHILD_LIMIT, pre3Limited, pre3Credit);
            addEduInfo("초중고-자녀1", k12_1, CHILD_LIMIT, k12_1Limited, k12_1Credit);
            addEduInfo("초중고-자녀2", k12_2, CHILD_LIMIT, k12_2Limited, k12_2Credit);
            addEduInfo("초중고-자녀3", k12_3, CHILD_LIMIT, k12_3Limited, k12_3Credit);
            addEduInfo("대학-자녀1", univ1, UNIV_LIMIT, univ1Limited, univ1Credit);
            addEduInfo("대학-자녀2", univ2, UNIV_LIMIT, univ2Limited, univ2Credit);
            addEduInfo("대학-자녀3", univ3, UNIV_LIMIT, univ3Limited, univ3Credit);
            if (infoLines.length > 0) {
                infoLines.push(`──────────────`);
                infoLines.push(`합계: ${totalCredit.toLocaleString("ko-KR")}원`);
            }
            const totalEducation = eduSelf + pre1 + pre2 + pre3 + k12_1 + k12_2 + k12_3 + univ1 + univ2 + univ3;
            return {
                id: "4",
                category: "교육비",
                type: "세액공제",
                amount: totalCredit,
                limit: 9000000,
                status: getStatus(totalEducation > 0 ? Math.min(totalEducation / 9000000, 1) : 0),
                thresholdInfo: infoLines.length > 0 ? infoLines.join("\n") : "본인: 한도 없음\n미취학: 1인당 3,000,000원\n초중고: 1인당 3,000,000원\n대학: 1인당 9,000,000원",
                maxBenefit: 9000000 * 0.15
            };
        })(),
        (()=>{
            // 정치자금 계산 및 계산식 생성 (한도: 근로소득금액)
            const politicalRaw = deductions.donationPolitical || 0;
            const politicalLimit = earnedIncome; // 정치자금 한도 = 근로소득금액
            const political = Math.min(politicalRaw, politicalLimit); // 한도 적용
            const isLimited = politicalRaw > politicalLimit;
            let politicalCredit = 0;
            let politicalFormula = "";
            if (political > 0) {
                if (political <= 100000) {
                    politicalCredit = Math.round(political * 100 / 110);
                    politicalFormula = `└ ${political.toLocaleString("ko-KR")} × 100/110\n= ${politicalCredit.toLocaleString("ko-KR")}원`;
                } else if (political <= 30000000) {
                    const baseCredit = Math.round(100000 * 100 / 110);
                    const excessCredit = Math.round((political - 100000) * 0.15);
                    politicalCredit = baseCredit + excessCredit;
                    politicalFormula = `└ 10만원 이하: 100,000 × 100/110\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 10만원 초과: ${(political - 100000).toLocaleString("ko-KR")} × 15%\n= ${excessCredit.toLocaleString("ko-KR")}원`;
                } else {
                    const baseCredit = Math.round(100000 * 100 / 110);
                    const midCredit = Math.round(29900000 * 0.15);
                    const highCredit = Math.round((political - 30000000) * 0.25);
                    politicalCredit = baseCredit + midCredit + highCredit;
                    politicalFormula = `└ 10만원 이하: 100,000 × 100/110\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 10만원~3천만원: 29,900,000 × 15%\n= ${midCredit.toLocaleString("ko-KR")}원\n└ 3천만원 초과: ${(political - 30000000).toLocaleString("ko-KR")} × 25%\n= ${highCredit.toLocaleString("ko-KR")}원`;
                }
            }
            // 고향사랑 계산 및 계산식 생성
            const hometown = deductions.donationHometown || 0;
            let hometownCredit = 0;
            let hometownFormula = "";
            if (hometown > 0) {
                if (hometown <= 100000) {
                    hometownCredit = Math.round(hometown * 100 / 110);
                    hometownFormula = `└ ${hometown.toLocaleString("ko-KR")} × 100/110\n= ${hometownCredit.toLocaleString("ko-KR")}원`;
                } else {
                    const baseCredit = Math.round(100000 * 100 / 110);
                    const excessCredit = Math.round((hometown - 100000) * 0.15);
                    hometownCredit = baseCredit + excessCredit;
                    hometownFormula = `└ 10만원 이하: 100,000 × 100/110\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 10만원 초과: ${(hometown - 100000).toLocaleString("ko-KR")} × 15%\n= ${excessCredit.toLocaleString("ko-KR")}원`;
                }
            }
            // 고향사랑특별재난 계산 및 계산식 생성
            const disaster = deductions.donationDisaster || 0;
            let disasterCredit = 0;
            let disasterFormula = "";
            if (disaster > 0) {
                if (disaster <= 100000) {
                    disasterCredit = Math.round(disaster * 100 / 110);
                    disasterFormula = `└ ${disaster.toLocaleString("ko-KR")} × 100/110\n= ${disasterCredit.toLocaleString("ko-KR")}원`;
                } else {
                    const baseCredit = Math.round(100000 * 100 / 110);
                    const excessCredit = Math.round((disaster - 100000) * 0.3);
                    disasterCredit = baseCredit + excessCredit;
                    disasterFormula = `└ 10만원 이하: 100,000 × 100/110\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 10만원 초과: ${(disaster - 100000).toLocaleString("ko-KR")} × 30%\n= ${excessCredit.toLocaleString("ko-KR")}원`;
                }
            }
            // 특례기부금 계산 및 계산식 생성
            const special = deductions.donationSpecial || 0;
            let specialCredit = 0;
            let specialFormula = "";
            if (special > 0) {
                if (special <= 10000000) {
                    specialCredit = Math.round(special * 0.15);
                    specialFormula = `└ ${special.toLocaleString("ko-KR")} × 15%\n= ${specialCredit.toLocaleString("ko-KR")}원`;
                } else {
                    const baseCredit = Math.round(10000000 * 0.15);
                    const excessCredit = Math.round((special - 10000000) * 0.3);
                    specialCredit = baseCredit + excessCredit;
                    specialFormula = `└ 1천만원 이하: 10,000,000 × 15%\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 1천만원 초과: ${(special - 10000000).toLocaleString("ko-KR")} × 30%\n= ${excessCredit.toLocaleString("ko-KR")}원`;
                }
            }
            // 우리사주조합 계산 및 계산식 생성
            const stock = deductions.donationStock || 0;
            let stockCredit = 0;
            let stockFormula = "";
            if (stock > 0) {
                if (stock <= 10000000) {
                    stockCredit = Math.round(stock * 0.15);
                    stockFormula = `└ ${stock.toLocaleString("ko-KR")} × 15%\n= ${stockCredit.toLocaleString("ko-KR")}원`;
                } else {
                    const baseCredit = Math.round(10000000 * 0.15);
                    const excessCredit = Math.round((stock - 10000000) * 0.3);
                    stockCredit = baseCredit + excessCredit;
                    stockFormula = `└ 1천만원 이하: 10,000,000 × 15%\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 1천만원 초과: ${(stock - 10000000).toLocaleString("ko-KR")} × 30%\n= ${excessCredit.toLocaleString("ko-KR")}원`;
                }
            }
            // 일반기부금(종교) 계산 및 계산식 생성
            const religious = deductions.donationReligious || 0;
            let religiousCredit = 0;
            let religiousFormula = "";
            if (religious > 0) {
                if (religious <= 10000000) {
                    religiousCredit = Math.round(religious * 0.15);
                    religiousFormula = `└ ${religious.toLocaleString("ko-KR")} × 15%\n= ${religiousCredit.toLocaleString("ko-KR")}원`;
                } else {
                    const baseCredit = Math.round(10000000 * 0.15);
                    const excessCredit = Math.round((religious - 10000000) * 0.3);
                    religiousCredit = baseCredit + excessCredit;
                    religiousFormula = `└ 1천만원 이하: 10,000,000 × 15%\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 1천만원 초과: ${(religious - 10000000).toLocaleString("ko-KR")} × 30%\n= ${excessCredit.toLocaleString("ko-KR")}원`;
                }
            }
            // 일반기부금(종교 외) 계산 및 계산식 생성
            const nonReligious = deductions.donationNonReligious || 0;
            let nonReligiousCredit = 0;
            let nonReligiousFormula = "";
            if (nonReligious > 0) {
                if (nonReligious <= 10000000) {
                    nonReligiousCredit = Math.round(nonReligious * 0.15);
                    nonReligiousFormula = `└ ${nonReligious.toLocaleString("ko-KR")} × 15%\n= ${nonReligiousCredit.toLocaleString("ko-KR")}원`;
                } else {
                    const baseCredit = Math.round(10000000 * 0.15);
                    const excessCredit = Math.round((nonReligious - 10000000) * 0.3);
                    nonReligiousCredit = baseCredit + excessCredit;
                    nonReligiousFormula = `└ 1천만원 이하: 10,000,000 × 15%\n= ${baseCredit.toLocaleString("ko-KR")}원\n└ 1천만원 초과: ${(nonReligious - 10000000).toLocaleString("ko-KR")} × 30%\n= ${excessCredit.toLocaleString("ko-KR")}원`;
                }
            }
            const totalCredit = politicalCredit + hometownCredit + disasterCredit + specialCredit + stockCredit + religiousCredit + nonReligiousCredit;
            // thresholdInfo 생성 - 금액이 있는 항목만 계산식과 함께 표시
            const infoLines = [];
            if (political > 0) {
                if (isLimited) {
                    infoLines.push(`정치자금: ${politicalRaw.toLocaleString("ko-KR")}원`);
                    infoLines.push(`→ 한도: ${political.toLocaleString("ko-KR")}원`);
                } else {
                    infoLines.push(`정치자금: ${political.toLocaleString("ko-KR")}원`);
                }
                infoLines.push(politicalFormula);
            }
            if (hometown > 0) {
                infoLines.push(`고향사랑: ${hometown.toLocaleString("ko-KR")}원`);
                infoLines.push(hometownFormula);
            }
            if (disaster > 0) {
                infoLines.push(`특별재난: ${disaster.toLocaleString("ko-KR")}원`);
                infoLines.push(disasterFormula);
            }
            if (special > 0) {
                infoLines.push(`특례기부금: ${special.toLocaleString("ko-KR")}원`);
                infoLines.push(specialFormula);
            }
            if (stock > 0) {
                infoLines.push(`우리사주: ${stock.toLocaleString("ko-KR")}원`);
                infoLines.push(stockFormula);
            }
            if (religious > 0) {
                infoLines.push(`종교기부: ${religious.toLocaleString("ko-KR")}원`);
                infoLines.push(religiousFormula);
            }
            if (nonReligious > 0) {
                infoLines.push(`일반기부: ${nonReligious.toLocaleString("ko-KR")}원`);
                infoLines.push(nonReligiousFormula);
            }
            if (infoLines.length > 0) {
                infoLines.push(`──────────────`);
                infoLines.push(`합계: ${totalCredit.toLocaleString("ko-KR")}원`);
            }
            return {
                id: "5",
                category: "기부금",
                type: "세액공제",
                amount: totalCredit,
                limit: earnedIncome,
                status: getStatus(Math.min(1, (political + hometown + disaster + special + stock + religious + nonReligious) / earnedIncome)),
                thresholdInfo: infoLines.length > 0 ? infoLines.join("\n") : "기부금 내역이 없습니다",
                maxBenefit: earnedIncome * 0.3,
                earnedIncome: earnedIncome,
                donationLimits: {
                    politicalFund: earnedIncome,
                    hometownDisaster: 2000000,
                    specialDonation: earnedIncome,
                    employeeStock: Math.round(earnedIncome * 0.3),
                    generalReligious: Math.round(earnedIncome * 0.1),
                    generalNonReligious: Math.round(earnedIncome * 0.3)
                }
            };
        })(),
        (()=>{
            // 연금저축/IRP 계산 및 계산식 생성
            // 레거시 호환: pensionSavings가 없으면 pension 필드 사용
            const savingsAmount = deductions?.pensionSavings || deductions?.pension || 0;
            const irpAmount = deductions?.pensionIRP || 0;
            // 한도 적용
            const SAVINGS_LIMIT = 6000000; // 연금저축: 600만원
            const TOTAL_LIMIT = 9000000; // 연금저축+IRP 합산: 900만원
            const savingsLimited = Math.min(savingsAmount, SAVINGS_LIMIT);
            const remainingLimit = Math.max(0, TOTAL_LIMIT - savingsLimited);
            const irpLimited = Math.min(irpAmount, remainingLimit);
            // 세액공제액 계산 (12%)
            const savingsCredit = Math.round(savingsLimited * 0.12);
            const irpCredit = Math.round(irpLimited * 0.12);
            const totalCredit = savingsCredit + irpCredit;
            // thresholdInfo 생성 - 연금저축과 IRP 각각 계산식 표시 (0원이어도 표시)
            const infoLines = [];
            // 연금저축 계산식 (항상 표시)
            if (savingsAmount > SAVINGS_LIMIT) {
                infoLines.push(`연금저축: ${savingsAmount.toLocaleString("ko-KR")}원`);
                infoLines.push(`→ 한도: ${savingsLimited.toLocaleString("ko-KR")}원`);
            } else {
                infoLines.push(`연금저축: ${savingsAmount.toLocaleString("ko-KR")}원`);
            }
            infoLines.push(`└ ${savingsLimited.toLocaleString("ko-KR")} × 12%\n= ${savingsCredit.toLocaleString("ko-KR")}원`);
            // 퇴직연금(IRP) 계산식 (항상 표시)
            if (irpAmount > remainingLimit && remainingLimit > 0) {
                infoLines.push(`퇴직연금(IRP): ${irpAmount.toLocaleString("ko-KR")}원`);
                infoLines.push(`→ 한도: ${irpLimited.toLocaleString("ko-KR")}원`);
            } else {
                infoLines.push(`퇴직연금(IRP): ${irpAmount.toLocaleString("ko-KR")}원`);
            }
            infoLines.push(`└ ${irpLimited.toLocaleString("ko-KR")} × 12%\n= ${irpCredit.toLocaleString("ko-KR")}원`);
            // 합계 표시
            infoLines.push(`──────────────`);
            infoLines.push(`합계: ${totalCredit.toLocaleString("ko-KR")}원`);
            const totalAmount = savingsAmount + irpAmount;
            return {
                id: "6",
                category: "연금저축/IRP",
                type: "세액공제",
                amount: totalCredit,
                limit: TOTAL_LIMIT,
                status: getStatus(totalAmount / TOTAL_LIMIT),
                thresholdInfo: infoLines.join("\n"),
                maxBenefit: TOTAL_LIMIT * 0.12
            };
        })(),
        (()=>{
            // 보험료 계산 및 계산식 생성
            const insuranceAmount = deductions.insurance || 0;
            const INSURANCE_LIMIT = 1000000; // 한도: 100만원
            const limitedAmount = Math.min(insuranceAmount, INSURANCE_LIMIT);
            const taxCredit = Math.round(limitedAmount * 0.12); // 12% 세액공제
            // thresholdInfo 생성
            const infoLines = [];
            if (insuranceAmount > 0) {
                infoLines.push(`납입액: ${insuranceAmount.toLocaleString("ko-KR")}원`);
                if (insuranceAmount > INSURANCE_LIMIT) {
                    infoLines.push(`→ 한도: ${INSURANCE_LIMIT.toLocaleString("ko-KR")}원`);
                }
                infoLines.push(`└ ${limitedAmount.toLocaleString("ko-KR")} × 12%\n= ${taxCredit.toLocaleString("ko-KR")}원`);
            }
            return {
                id: "7",
                category: "보험료",
                type: "세액공제",
                amount: taxCredit,
                limit: INSURANCE_LIMIT,
                status: getStatus(insuranceAmount / INSURANCE_LIMIT),
                thresholdInfo: infoLines.length > 0 ? infoLines.join("\n") : "보장성 보험: 연 100만원 한도\n세액공제율: 12%",
                maxBenefit: INSURANCE_LIMIT * 0.12
            };
        })(),
        (()=>{
            // 자녀 세액공제 계산 및 계산식 생성
            const childrenOver8 = adminData.family?.childrenOver8 || 0;
            const birthAdoption = adminData.family?.birthAdoption || "none";
            // 자녀 세액공제 (만 8세 이상)
            // 1명: 25만원
            // 2명: 55만원
            // 3명 이상: 55만원 + (추가 인원 × 40만원)
            let childCredit = 0;
            if (childrenOver8 === 1) {
                childCredit = 250000; // 1명
            } else if (childrenOver8 === 2) {
                childCredit = 550000; // 2명
            } else if (childrenOver8 >= 3) {
                childCredit = 550000 + (childrenOver8 - 2) * 400000; // 3명 이상
            }
            // 출생·입양 공제
            let birthAdoptionCredit = 0;
            let birthAdoptionName = "";
            switch(birthAdoption){
                case "first":
                    birthAdoptionCredit = 300000;
                    birthAdoptionName = "첫째";
                    break;
                case "second":
                    birthAdoptionCredit = 500000;
                    birthAdoptionName = "둘째";
                    break;
                case "third1":
                    birthAdoptionCredit = 700000;
                    birthAdoptionName = "셋째 이상 1명";
                    break;
                case "third2":
                    birthAdoptionCredit = 1400000;
                    birthAdoptionName = "셋째 이상 2명";
                    break;
                case "third3":
                    birthAdoptionCredit = 2100000;
                    birthAdoptionName = "셋째 이상 3명";
                    break;
            }
            const totalCredit = childCredit + birthAdoptionCredit;
            // thresholdInfo 생성 - 계산식 표시
            const infoLines = [];
            // 자녀 세액공제 계산식
            infoLines.push(`자녀 세액공제 (만 8세 이상 ${childrenOver8}명)`);
            if (childrenOver8 > 0) {
                if (childrenOver8 === 1) {
                    infoLines.push(`└ 1명: 250,000원`);
                } else if (childrenOver8 === 2) {
                    infoLines.push(`└ 2명: 550,000원`);
                } else if (childrenOver8 >= 3) {
                    const thirdPlus = childrenOver8 - 2;
                    infoLines.push(`└ 2명: 550,000원`);
                    infoLines.push(`└ 추가 ${thirdPlus}명: ${(thirdPlus * 400000).toLocaleString("ko-KR")}원`);
                }
                infoLines.push(`= ${childCredit.toLocaleString("ko-KR")}원`);
            } else {
                infoLines.push(`└ 0원`);
            }
            // 출생·입양 공제 계산식
            if (birthAdoption !== "none") {
                infoLines.push(``);
                infoLines.push(`출생·입양 공제 (${birthAdoptionName})`);
                infoLines.push(`└ ${birthAdoptionCredit.toLocaleString("ko-KR")}원`);
            }
            // 합계
            infoLines.push(`──────────────`);
            infoLines.push(`합계: ${totalCredit.toLocaleString("ko-KR")}원`);
            return {
                id: "8",
                category: "자녀",
                type: "세액공제",
                amount: totalCredit,
                limit: 0,
                status: childrenOver8 > 0 ? "optimal" : "critical",
                thresholdInfo: infoLines.join("\n"),
                maxBenefit: 0,
                childLimits: {
                    first: 250000,
                    second: 550000,
                    thirdPlus: 400000,
                    birthFirst: 300000,
                    birthSecond: 500000,
                    birthThirdPlus: 700000
                }
            };
        })()
    ];
    return items;
}
}),
"[project]/app/admin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tax-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function AdminPage() {
    const [selectedYear, setSelectedYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2025);
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [monthlySalary, setMonthlySalary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        const defaultData = {
            totalSalary: "0",
            mealAllowance: "0",
            nationalPension: "0",
            healthInsurance: "0",
            longTermCare: "0",
            employmentInsurance: "0",
            bonus: "0",
            childTuition: "0",
            prepaidTax: "0",
            localIncomeTax: "0"
        };
        const initial = {};
        for(let m = 1; m <= 12; m++){
            initial[m] = {
                ...defaultData
            };
        }
        return initial;
    });
    const [clickedBtn, setClickedBtn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCameraModal, setShowCameraModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [capturedImages, setCapturedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showExcelModal, setShowExcelModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [excelFile, setExcelFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isExcelDragging, setIsExcelDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [excelModalMonth, setExcelModalMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [ocrModalMonth, setOcrModalMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    // OCR 상태
    const [ocrPreviewItems, setOcrPreviewItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [ocrCardType, setOcrCardType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("credit");
    const [isOcrProcessing, setIsOcrProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ocrDuplicateItems, setOcrDuplicateItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ocrImageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardExcelInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 카드사 엑셀 업로드 상태
    const [showCardExcelModal, setShowCardExcelModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cardExcelFile, setCardExcelFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCardExcelDragging, setIsCardExcelDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cardType, setCardType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("credit");
    const [cardExcelPreview, setCardExcelPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [excludedCount, setExcludedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // 지출 항목 상태
    const [selectedSpendingMonth, setSelectedSpendingMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1); // 지출 데이터 월 선택
    const [spendingItems, setSpendingItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "1",
            name: "신용카드",
            amount: "1,234,567",
            month: 1
        },
        {
            id: "2",
            name: "직불카드",
            amount: "456,789",
            month: 1
        },
        {
            id: "3",
            name: "현금영수증",
            amount: "50,000",
            month: 1
        },
        {
            id: "4",
            name: "대중교통",
            amount: "80,000",
            month: 1
        }
    ]);
    const [showAddItemModal, setShowAddItemModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newItemName, setNewItemName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newItemAmount, setNewItemAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newItemMonth, setNewItemMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1); // 신규 항목 월 선택
    // 세부 내역 모달 상태
    const [showDetailsModal, setShowDetailsModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedItemDetails, setSelectedItemDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // 가족정보 상태 (기본공제 - 본인 제외)
    const [familyData, setFamilyData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        spouse: false,
        children: 0,
        childrenUnder6: 0,
        childrenOver8: 0,
        birthAdoption: "none",
        parents: 0,
        siblings: 0,
        foster: 0,
        recipient: 0,
        disabled: 0,
        seniorOver70: 0,
        singleParent: false
    });
    const handleButtonClick = (btnName, callback)=>{
        setClickedBtn(btnName);
        callback?.();
        setTimeout(()=>setClickedBtn(null), 300);
    };
    const showNotification = (type, message)=>{
        setNotification({
            type,
            message
        });
        setTimeout(()=>setNotification(null), 3000);
    };
    // 저장된 데이터 불러오기 (연도별)
    const loadYearData = (year)=>{
        const savedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadAdminData"])(year);
        if (savedData) {
            // 월별 급여 데이터 복원
            if (savedData.salary.monthly) {
                setMonthlySalary(savedData.salary.monthly);
            } else {
                // 구버전 호환: 단일 데이터를 12개월에 복사
                const legacyData = {
                    totalSalary: savedData.salary.totalSalary?.toLocaleString("ko-KR") || "0",
                    mealAllowance: savedData.salary.mealAllowance?.toLocaleString("ko-KR") || "0",
                    nationalPension: savedData.salary.nationalPension?.toLocaleString("ko-KR") || "0",
                    healthInsurance: savedData.salary.healthInsurance?.toLocaleString("ko-KR") || "0",
                    longTermCare: savedData.salary.longTermCare?.toLocaleString("ko-KR") || "0",
                    employmentInsurance: savedData.salary.employmentInsurance?.toLocaleString("ko-KR") || "0",
                    bonus: savedData.salary.bonus?.toLocaleString("ko-KR") || "0",
                    childTuition: savedData.salary.childTuition?.toLocaleString("ko-KR") || "0",
                    prepaidTax: savedData.salary.prepaidTax?.toLocaleString("ko-KR") || "0",
                    localIncomeTax: savedData.salary.localIncomeTax?.toLocaleString("ko-KR") || "0"
                };
                const monthlyInit = {};
                for(let m = 1; m <= 12; m++){
                    monthlyInit[m] = {
                        ...legacyData
                    };
                }
                setMonthlySalary(monthlyInit);
            }
            // 6세 이하 자녀 수는 가족 정보로 복원
            if (savedData.salary.childrenUnder6 !== undefined) {
                setFamilyData((prev)=>({
                        ...prev,
                        childrenUnder6: savedData.salary.childrenUnder6
                    }));
            }
            // 지출 항목 복원 - spendingItems 배열 우선 사용 (없으면 구버전 호환)
            if (savedData.spendingItems && savedData.spendingItems.length > 0) {
                // 새 형식: spendingItems 배열 직접 복원
                setSpendingItems(savedData.spendingItems);
            } else {
                // 구버전 호환: 카테고리별 복원
                const restoredSpending = [];
                if (savedData.spending.creditCard > 0) {
                    restoredSpending.push({
                        id: "1",
                        name: "신용카드",
                        amount: savedData.spending.creditCard.toLocaleString("ko-KR"),
                        month: 1
                    });
                }
                if (savedData.spending.debitCard > 0) {
                    restoredSpending.push({
                        id: "2",
                        name: "체크카드",
                        amount: savedData.spending.debitCard.toLocaleString("ko-KR"),
                        month: 1
                    });
                }
                if (savedData.spending.cash > 0) {
                    restoredSpending.push({
                        id: "3",
                        name: "현금영수증",
                        amount: savedData.spending.cash.toLocaleString("ko-KR"),
                        month: 1
                    });
                }
                if (savedData.spending.publicTransport > 0) {
                    restoredSpending.push({
                        id: "4",
                        name: "대중교통",
                        amount: savedData.spending.publicTransport.toLocaleString("ko-KR"),
                        month: 1
                    });
                }
                setSpendingItems(restoredSpending.length > 0 ? restoredSpending : []);
            }
            // 가족정보 복원 (이전 데이터 호환)
            if (savedData.family) {
                setFamilyData({
                    spouse: savedData.family.spouse || false,
                    children: savedData.family.children || 0,
                    childrenUnder6: savedData.family.childrenUnder6 || savedData.salary.childrenUnder6 || 0,
                    childrenOver8: savedData.family.childrenOver8 || 0,
                    birthAdoption: savedData.family.birthAdoption || "none",
                    parents: savedData.family.parents || 0,
                    siblings: savedData.family.siblings || 0,
                    foster: savedData.family.foster || 0,
                    recipient: savedData.family.recipient || 0,
                    disabled: savedData.family.disabled || 0,
                    seniorOver70: savedData.family.seniorOver70 || 0,
                    singleParent: savedData.family.singleParent || false
                });
            }
        } else {
            // 데이터 없을 시 초기화
            const defaultData = {
                totalSalary: "0",
                mealAllowance: "0",
                nationalPension: "0",
                healthInsurance: "0",
                longTermCare: "0",
                employmentInsurance: "0",
                bonus: "0",
                childTuition: "0",
                prepaidTax: "0",
                localIncomeTax: "0"
            };
            const initial = {};
            for(let m = 1; m <= 12; m++){
                initial[m] = {
                    ...defaultData
                };
            }
            setMonthlySalary(initial);
            setSpendingItems([]);
            setFamilyData({
                spouse: false,
                children: 0,
                childrenUnder6: 0,
                childrenOver8: 0,
                birthAdoption: "none",
                parents: 0,
                siblings: 0,
                foster: 0,
                recipient: 0,
                disabled: 0,
                seniorOver70: 0,
                singleParent: false
            });
        }
    };
    // 초기 로드 - localStorage에서 마지막 선택 연도 복원
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedYear = localStorage.getItem("taxai_selected_year");
        const initialYear = savedYear ? parseInt(savedYear) : 2026; // 기본값 2026년
        setSelectedYear(initialYear);
        loadYearData(initialYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // 연도 변경 시 데이터 리로드 + 선택 연도 저장
    const handleYearChange = (year)=>{
        setSelectedYear(year);
        localStorage.setItem("taxai_selected_year", year.toString());
        loadYearData(year);
    };
    // 데이터 저장 함수
    const handleSave = ()=>{
        const parseAmount = (str)=>{
            if (!str) return 0;
            return parseInt(str.replace(/[^0-9]/g, "")) || 0;
        };
        // 지출 항목에서 각 카테고리 금액 추출 (모든 월 합산)
        const getSpendingAmount = (name)=>{
            return spendingItems.filter((i)=>i.name.includes(name)).reduce((sum, item)=>sum + parseAmount(item.amount), 0);
        };
        const adminData = {
            year: selectedYear,
            salary: {
                monthly: monthlySalary,
                childrenUnder6: familyData.childrenUnder6 || 0,
                // 연간 합계 (계산기로 전달용)
                totalSalary: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.totalSalary), 0),
                bonus: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.bonus), 0),
                childTuition: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.childTuition), 0),
                mealAllowance: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.mealAllowance), 0),
                nationalPension: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.nationalPension), 0),
                healthInsurance: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.healthInsurance), 0),
                longTermCare: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.longTermCare), 0),
                employmentInsurance: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.employmentInsurance), 0),
                prepaidTax: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.prepaidTax), 0),
                localIncomeTax: Object.values(monthlySalary).reduce((sum, m)=>sum + parseAmount(m.localIncomeTax), 0)
            },
            spending: {
                creditCard: getSpendingAmount("신용카드"),
                debitCard: getSpendingAmount("체크카드"),
                cash: getSpendingAmount("현금영수증"),
                publicTransport: getSpendingAmount("대중교통"),
                traditionalMarket: getSpendingAmount("전통시장"),
                culture: getSpendingAmount("문화")
            },
            family: {
                spouse: familyData.spouse,
                children: familyData.children,
                childrenUnder6: familyData.childrenUnder6,
                childrenOver8: familyData.childrenOver8,
                birthAdoption: familyData.birthAdoption,
                parents: familyData.parents,
                siblings: familyData.siblings,
                foster: familyData.foster,
                recipient: familyData.recipient,
                disabled: familyData.disabled,
                seniorOver70: familyData.seniorOver70,
                singleParent: familyData.singleParent
            },
            deductions: {
                medical: getSpendingAmount("의료비"),
                medicalInfertility: getSpendingAmount("의료비(난임시술비)"),
                medicalPremature: getSpendingAmount("의료비(미숙아,선천성)"),
                medicalSelf: getSpendingAmount("의료비(본인,장애,65세,6세)"),
                medicalFamily: getSpendingAmount("의료비(그밖부양가족)"),
                education: getSpendingAmount("교육비"),
                educationSelf: getSpendingAmount("교육비(본인)"),
                educationChild: 0,
                educationPreschool1: getSpendingAmount("교육비(미취학)-자녀1"),
                educationPreschool2: getSpendingAmount("교육비(미취학)-자녀2"),
                educationPreschool3: getSpendingAmount("교육비(미취학)-자녀3"),
                educationK12_1: getSpendingAmount("교육비(초중고)-자녀1"),
                educationK12_2: getSpendingAmount("교육비(초중고)-자녀2"),
                educationK12_3: getSpendingAmount("교육비(초중고)-자녀3"),
                educationUniv: 0,
                educationUniv1: getSpendingAmount("교육비(대학)-자녀1"),
                educationUniv2: getSpendingAmount("교육비(대학)-자녀2"),
                educationUniv3: getSpendingAmount("교육비(대학)-자녀3"),
                housing: getSpendingAmount("주택자금(청약저축)") + getSpendingAmount("주택자금(청약저축) - 세대주") + getSpendingAmount("주택자금(청약저축) - 배우자"),
                housingSubscription: getSpendingAmount("주택자금(청약저축)") + getSpendingAmount("주택자금(청약저축) - 세대주") + getSpendingAmount("주택자금(청약저축) - 배우자"),
                housingSubscriptionHead: getSpendingAmount("주택자금(청약저축) - 세대주"),
                housingSubscriptionSpouse: getSpendingAmount("주택자금(청약저축) - 배우자"),
                housingRent: getSpendingAmount("주택자금(월세)"),
                housingLoan: getSpendingAmount("주택자금(임차차입금원리금상환액)"),
                housingMortgage: getSpendingAmount("주택자금(장기주택)"),
                housingMortgage15Fixed: getSpendingAmount("주택자금(장기주택)(15년이상 고정금리+비거치식)"),
                housingMortgage15Either: getSpendingAmount("주택자금(장기주택)(15년이상 고정금리 or 비거치식)"),
                housingMortgage15Other: getSpendingAmount("주택자금(장기주택)(15년이상 기타)"),
                housingMortgage10Either: getSpendingAmount("주택자금(장기주택)(10년이상 고정금리 or 비거치식)"),
                pension: getSpendingAmount("연금저축") + getSpendingAmount("퇴직연금(IRP)"),
                pensionSavings: getSpendingAmount("연금저축"),
                pensionIRP: getSpendingAmount("퇴직연금(IRP)"),
                insurance: getSpendingAmount("보험료"),
                donation: getSpendingAmount("기부금"),
                donationPolitical: getSpendingAmount("기부금(정치자금)"),
                donationHometown: getSpendingAmount("기부금(고향사랑)"),
                donationDisaster: getSpendingAmount("기부금(고향사랑특별재난)"),
                donationSpecial: getSpendingAmount("기부금(특례기부금)"),
                donationStock: getSpendingAmount("기부금(우리사주조합)"),
                donationReligious: getSpendingAmount("기부금(일반기부금(종교))"),
                donationNonReligious: getSpendingAmount("기부금(일반기부금(종교 외))")
            },
            spendingItems: spendingItems,
            updatedAt: new Date().toISOString()
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveAdminData"])(selectedYear, adminData);
        showNotification("success", "저장되었습니다!");
    };
    const handleAddItem = ()=>{
        if (!newItemName.trim() || !newItemAmount.trim()) {
            showNotification("error", "항목명과 금액을 모두 입력해주세요.");
            return;
        }
        const newItem = {
            id: Date.now().toString(),
            name: newItemName,
            amount: newItemAmount,
            month: newItemMonth
        };
        setSpendingItems((prev)=>[
                ...prev,
                newItem
            ]);
        setNewItemName("");
        setNewItemAmount("");
        setNewItemMonth(1);
        setShowAddItemModal(false);
        showNotification("success", `"${newItemName}" 항목이 ${newItemMonth}월에 추가되었습니다!`);
    };
    const handleDeleteItem = (id)=>{
        setSpendingItems((prev)=>prev.filter((item)=>item.id !== id));
        showNotification("success", "항목이 삭제되었습니다.");
    };
    const formatNumber = (num)=>{
        return num.toLocaleString("ko-KR");
    };
    // Excel Upload Handler - Process file
    const processExcelFile = (file)=>{
        const reader = new FileReader();
        reader.onload = (event)=>{
            try {
                const data = new Uint8Array(event.target?.result);
                const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["read"](data, {
                    type: "array"
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(worksheet, {
                    header: 1
                });
                // Look for salary data in the Excel file
                let newSalaryData = {};
                jsonData.forEach((row)=>{
                    if (!row || row.length < 2) return;
                    const label = String(row[0]).toLowerCase();
                    const value = Number(row[1]) || 0;
                    if (label.includes("총급여") || label.includes("급여") || label.includes("salary")) {
                        newSalaryData.totalSalary = formatNumber(value);
                    } else if (label.includes("식대") || label.includes("비과세")) {
                        newSalaryData.mealAllowance = formatNumber(value);
                    } else if (label.includes("국민연금") || label.includes("pension")) {
                        newSalaryData.nationalPension = formatNumber(value);
                    } else if (label.includes("건강보험") || label.includes("health")) {
                        newSalaryData.healthInsurance = formatNumber(value);
                    } else if (label.includes("장기요양") || label.includes("long")) {
                        newSalaryData.longTermCare = formatNumber(value);
                    } else if (label.includes("고용보험") || label.includes("employment")) {
                        newSalaryData.employmentInsurance = formatNumber(value);
                    }
                });
                if (Object.keys(newSalaryData).length > 0) {
                    setMonthlySalary((prev)=>({
                            ...prev,
                            [excelModalMonth]: {
                                ...prev[excelModalMonth],
                                ...newSalaryData
                            }
                        }));
                    showNotification("success", `${excelModalMonth}월 엑셀 데이터를 성공적으로 불러왔습니다!`);
                    handleExcelModalClose();
                } else {
                    showNotification("error", "인식할 수 있는 데이터가 없습니다. 엑셀 형식을 확인해주세요.");
                }
            } catch  {
                showNotification("error", "엑셀 파일을 읽는 중 오류가 발생했습니다.");
            }
        };
        reader.readAsArrayBuffer(file);
    };
    const handleExcelUpload = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setExcelFile(file);
    };
    const handleExcelDrop = (e)=>{
        e.preventDefault();
        setIsExcelDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            setExcelFile(file);
        } else {
            showNotification("error", "엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.");
        }
    };
    const handleExcelDragOver = (e)=>{
        e.preventDefault();
        setIsExcelDragging(true);
    };
    const handleExcelDragLeave = (e)=>{
        e.preventDefault();
        setIsExcelDragging(false);
    };
    const handleExcelModalOpen = ()=>{
        setShowExcelModal(true);
        setExcelFile(null);
        setExcelModalMonth(selectedMonth);
    };
    const handleExcelModalClose = ()=>{
        setShowExcelModal(false);
        setExcelFile(null);
        setIsExcelDragging(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleExcelApply = ()=>{
        if (excelFile) {
            processExcelFile(excelFile);
        }
    };
    // 완전 제외 키워드 목록 (소득공제 불가 - 어디에도 포함 안됨)
    const EXCLUDED_KEYWORDS = [
        // 세금·공과금
        "국세",
        "지방세",
        "전기요금",
        "수도요금",
        "가스요금",
        "아파트관리비",
        "관리비",
        "도로통행료",
        "하이패스",
        "통행료",
        "지자체세입금",
        "자동차세",
        "재산세",
        "주민세",
        "도시가스",
        "한국전력",
        "한전",
        // 통신비
        "휴대전화",
        "휴대폰",
        "핸드폰",
        "인터넷",
        "SKT",
        "KT",
        "LG U+",
        "LGU+",
        "통신",
        "에스케이텔레콤",
        "케이티",
        // 자동차
        "신차",
        "자동차리스",
        "리스료",
        "렌트료",
        // 선승인/가승인 (취소될 예비 승인)
        "선승인",
        "가승인"
    ];
    // 대중교통 키워드 (카드 사용금액에서 제외, 대중교통 항목으로 별도 집계)
    // 참고: 택시는 대중교통 공제 대상이 아님 (일반 카드 사용)
    const PUBLIC_TRANSPORT_KEYWORDS = [
        "버스",
        "지하철",
        "모바일이즐",
        "모바일이즐페이",
        "후불교통",
        "교통카드",
        "티머니",
        "캐시비",
        "코레일",
        "KTX",
        "SRT",
        "철도",
        "고속버스",
        "시외버스"
    ];
    // 보험료 키워드 (카드 사용금액에서 제외, 보험료 항목으로 별도 집계)
    const INSURANCE_KEYWORDS = [
        "보험",
        "메리츠화재",
        "DB손해보험",
        "삼성화재",
        "현대해상",
        "KB손해보험",
        "한화손해보험",
        "국민연금",
        "건강보험"
    ];
    // 의료비 키워드 (카드 사용금액에서 제외, 의료비 항목으로 별도 집계)
    const MEDICAL_KEYWORDS = [
        // 병원/의원
        "병원",
        "의원",
        "클리닉",
        "clinic",
        "hospital",
        "메디컬",
        "medical",
        // 의료법인/재단
        "의료법인",
        "의료재단",
        "의료원",
        // 약국
        "약국",
        "pharmacy",
        "팜",
        // 치과
        "치과",
        "dental",
        "dentist",
        // 한의원
        "한의원",
        "한방",
        // 안과/이비인후과 등
        "안과",
        "이비인후과",
        "피부과",
        "정형외과",
        "내과",
        "외과",
        "소아과",
        "산부인과",
        "비뇨기과",
        // 건강검진센터
        "건강검진",
        "검진센터"
    ];
    // 전통시장 키워드 (전통시장 항목으로 별도 집계)
    const TRADITIONAL_MARKET_KEYWORDS = [
        "전통시장",
        "재래시장",
        "시장",
        "5일장",
        "오일장",
        "장터",
        "농수산물시장",
        "수산시장",
        "농산물시장",
        "청과시장",
        "축산시장"
    ];
    // 문화체육 키워드 (문화체육 항목으로 별도 집계)
    const CULTURE_SPORTS_KEYWORDS = [
        // 도서
        "서점",
        "도서",
        "북스",
        "books",
        "교보문고",
        "영풍문고",
        "알라딘",
        "예스24",
        // 공연/영화
        "영화관",
        "CGV",
        "롯데시네마",
        "메가박스",
        "극장",
        "공연장",
        "뮤지컬",
        "콘서트",
        // 미술관/박물관
        "미술관",
        "박물관",
        "전시관",
        "갤러리",
        // 체육시설
        "헬스",
        "피트니스",
        "수영장",
        "골프",
        "테니스",
        "볼링",
        "스포츠센터",
        "체육관",
        "요가",
        "필라테스"
    ];
    // 카드사 엑셀 파싱 함수
    const processCardExcelFile = (file)=>{
        const reader = new FileReader();
        reader.onload = (event)=>{
            try {
                const data = new Uint8Array(event.target?.result);
                const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["read"](data, {
                    type: "array"
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(worksheet, {
                    header: 1
                });
                console.log("Excel data rows:", jsonData.length);
                console.log("First row (header):", jsonData[0]);
                console.log("Second row (data sample):", jsonData[1]);
                if (jsonData.length < 2) {
                    showNotification("error", "엑셀 파일에 데이터가 없습니다.");
                    return;
                }
                // 헤더 행 찾기 (첫 번째 행 또는 데이터가 시작되는 행)
                let headerRowIndex = 0;
                const firstRow = jsonData[0] || [];
                // 첫 행이 요약 행인지 확인 (예: "총 사용금액: 681,235(원)")
                const firstRowStr = firstRow.map((h)=>String(h || "").toLowerCase()).join(" ");
                const isSummaryFirstRow = firstRowStr.includes("총") && (firstRowStr.includes("금액") || firstRowStr.includes("건"));
                // 첫 행이 요약 행이거나 헤더 키워드가 없으면 다음 행들에서 헤더 찾기
                if (isSummaryFirstRow || !firstRowStr.includes("승인") && !firstRowStr.includes("거래일") && !firstRowStr.includes("가맹점") && !firstRowStr.includes("사용처") && !firstRowStr.includes("발행구분")) {
                    // 2~5행 중에서 실제 헤더 행 찾기
                    for(let i = 1; i < Math.min(5, jsonData.length); i++){
                        const rowStr = (jsonData[i] || []).map((h)=>String(h || "").toLowerCase()).join(" ");
                        // 헤더 행은 보통 컬럼이 여러 개이고, 헤더 키워드를 포함
                        const hasMultipleColumns = (jsonData[i] || []).length >= 3;
                        const hasHeaderKeywords = rowStr.includes("거래일") || rowStr.includes("가맹점") || rowStr.includes("사용처") || rowStr.includes("상호") || rowStr.includes("승인번호") || rowStr.includes("발행구분");
                        if (hasMultipleColumns && hasHeaderKeywords) {
                            headerRowIndex = i;
                            console.log("Found header row at index:", i);
                            break;
                        }
                    }
                }
                const headerRow = jsonData[headerRowIndex] || [];
                const headers = headerRow.map((h)=>String(h || "").toLowerCase());
                console.log("Detected header row index:", headerRowIndex);
                console.log("Headers:", headers);
                // 열 인덱스 찾기 (카드사/현금영수증 양식마다 열 순서가 다름)
                // 날짜 열: 다양한 패턴 지원
                let dateCol = headers.findIndex((h)=>h.includes("승인일") || h.includes("이용일") || h.includes("거래일") || h.includes("결제일") || h.includes("매출일") || h.includes("일자") || h.includes("date") || h.includes("날짜") || h.includes("발행일") || h.includes("사용일"));
                // 가맹점 열: 다양한 패턴 지원 (현금영수증 포함)
                let merchantCol = headers.findIndex((h)=>h.includes("가맹점") || h.includes("상호") || h.includes("이용처") || h.includes("merchant") || h.includes("매장") || h.includes("사업자") || h.includes("업체") || h.includes("결제처") || h.includes("사용처") || h.includes("상호명"));
                // 금액 열: 다양한 패턴 지원
                let amountCol = headers.findIndex((h)=>h.includes("금액") || h.includes("결제금액") || h.includes("이용금액") || h.includes("승인금액") || h.includes("amount") || h.includes("원") || h.includes("사용금액") || h.includes("거래금액") || h.includes("공제금액"));
                // 취소/발행구분 열: 다양한 패턴 지원 (현금영수증 발행구분 포함)
                let cancelCol = headers.findIndex((h)=>h.includes("취소") || h.includes("cancel") || h.includes("상태") || h.includes("비고") || h.includes("구분") || h.includes("발행구분") || h.includes("발행유형") || h.includes("거래구분"));
                // 승인번호 열
                let approvalCol = headers.findIndex((h)=>h.includes("승인번호") || h.includes("승인no") || h.includes("approval") || h.includes("거래번호") || h.includes("전표번호") || h.includes("현금영수증번호"));
                // 업종/분류 열 (전통시장, 대중교통 구분용)
                let categoryCol = headers.findIndex((h)=>h.includes("업종") || h.includes("업태") || h.includes("분류") || h.includes("업종명") || h.includes("카테고리"));
                console.log("Detected columns - date:", dateCol, "merchant:", merchantCol, "amount:", amountCol, "cancel:", cancelCol, "approval:", approvalCol, "category:", categoryCol);
                // 열을 찾지 못한 경우 스마트 추론
                if (dateCol === -1 || merchantCol === -1 || amountCol === -1) {
                    // 데이터 행을 분석하여 열 타입 추론
                    const sampleRows = jsonData.slice(headerRowIndex + 1, headerRowIndex + 10);
                    for(let colIdx = 0; colIdx < (jsonData[headerRowIndex + 1]?.length || 0); colIdx++){
                        const sampleValues = sampleRows.map((row)=>row?.[colIdx]).filter((v)=>v != null);
                        // 날짜 형식 감지 (YYYY-MM-DD, YYYY.MM.DD, YYYYMMDD 등)
                        if (dateCol === -1) {
                            const datePattern = /^\d{4}[-./]?\d{2}[-./]?\d{2}/;
                            const isDateCol = sampleValues.some((v)=>datePattern.test(String(v)));
                            if (isDateCol) dateCol = colIdx;
                        }
                        // 금액 열 감지 (숫자만 있거나 원 단위)
                        if (amountCol === -1) {
                            const numPattern = /^-?\d{1,3}(,\d{3})*$/;
                            const isAmountCol = sampleValues.every((v)=>{
                                const cleanVal = String(v).replace(/[^0-9,-]/g, "");
                                return numPattern.test(cleanVal) || !isNaN(Number(v));
                            });
                            if (isAmountCol && sampleValues.length > 0) {
                                const avgLen = sampleValues.reduce((sum, v)=>sum + String(v).length, 0) / sampleValues.length;
                                if (avgLen >= 4) amountCol = colIdx; // 최소 4자리 이상 (1000원 이상)
                            }
                        }
                        // 가맹점명 열 감지 (한글 포함, 긴 텍스트)
                        if (merchantCol === -1) {
                            const koreanPattern = /[가-힣]/;
                            const isMerchantCol = sampleValues.every((v)=>{
                                const str = String(v);
                                return koreanPattern.test(str) && str.length >= 2;
                            });
                            if (isMerchantCol && colIdx !== dateCol && colIdx !== amountCol) {
                                merchantCol = colIdx;
                            }
                        }
                    }
                }
                // 여전히 찾지 못한 경우 기본값 사용
                if (dateCol === -1) dateCol = 2;
                if (merchantCol === -1) merchantCol = 4;
                if (amountCol === -1) amountCol = 5;
                if (cancelCol === -1) cancelCol = 9;
                if (approvalCol === -1) approvalCol = 8;
                console.log("Final columns - date:", dateCol, "merchant:", merchantCol, "amount:", amountCol);
                // 취소된 거래의 승인번호 수집
                const cancelledApprovals = new Set();
                const CANCEL_KEYWORDS = [
                    "취소",
                    "전체취소",
                    "부분취소",
                    "cancel",
                    "cancelled",
                    "void",
                    "refund",
                    "환불",
                    "반품",
                    "취소승인",
                    "매입취소",
                    "승인취소",
                    "카드취소"
                ];
                // 1차: 취소 열 기반으로 취소 거래 수집
                jsonData.slice(headerRowIndex + 1).forEach((row)=>{
                    if (!row) return;
                    const cancelValue = row[cancelCol];
                    const approvalNum = String(row[approvalCol] || "");
                    // 취소여부 열에 "취소" 관련 키워드가 포함된 경우
                    const cancelStr = String(cancelValue || "").trim().toLowerCase();
                    const isCancelled = CANCEL_KEYWORDS.some((keyword)=>cancelStr.includes(keyword));
                    if (isCancelled && approvalNum) {
                        cancelledApprovals.add(approvalNum);
                    }
                });
                // 2차: 가맹점명에 취소 키워드가 있는 경우도 수집
                jsonData.slice(headerRowIndex + 1).forEach((row)=>{
                    if (!row) return;
                    const merchant = String(row[merchantCol] || "").toLowerCase();
                    const approvalNum = String(row[approvalCol] || "");
                    // 가맹점명에 취소 관련 키워드가 있으면 취소로 처리
                    const hasCancelKeyword = CANCEL_KEYWORDS.some((keyword)=>merchant.includes(keyword));
                    if (hasCancelKeyword && approvalNum) {
                        cancelledApprovals.add(approvalNum);
                    }
                });
                console.log("Cancelled approvals:", cancelledApprovals.size);
                // 데이터 파싱 및 필터링
                const parsedData = [];
                let excludedCnt = 0;
                let skippedCnt = 0;
                jsonData.slice(headerRowIndex + 1).forEach((row, idx)=>{
                    if (!row || row.length < 3) {
                        skippedCnt++;
                        return;
                    }
                    const date = String(row[dateCol] || "");
                    const merchant = String(row[merchantCol] || "");
                    const amountRaw = row[amountCol];
                    const cancelValue = cancelCol >= 0 ? String(row[cancelCol] || "").toLowerCase() : "";
                    const categoryValue = categoryCol >= 0 ? String(row[categoryCol] || "").toLowerCase() : "";
                    // 발행구분 체크 - 취소/환불 건 제외
                    const CANCEL_ISSUE_KEYWORDS = [
                        "취소",
                        "환불",
                        "반품",
                        "cancel",
                        "refund",
                        "취소발행"
                    ];
                    const isCancelIssue = CANCEL_ISSUE_KEYWORDS.some((keyword)=>cancelValue.includes(keyword));
                    if (isCancelIssue) {
                        excludedCnt++;
                        console.log("❌ 취소/환불 발행 제외:", merchant, cancelValue);
                        return;
                    }
                    // 합계/소계 행 스킵 (엑셀 파일 하단의 총합계 행 제외)
                    const SUMMARY_KEYWORDS = [
                        "총",
                        "합계",
                        "소계",
                        "total",
                        "sum",
                        "subtotal",
                        "건"
                    ];
                    const merchantLowerForSummary = merchant.toLowerCase();
                    const dateLowerForSummary = date.toLowerCase();
                    const isSummaryRow = SUMMARY_KEYWORDS.some((keyword)=>merchantLowerForSummary.includes(keyword) || dateLowerForSummary.includes(keyword));
                    if (isSummaryRow) {
                        console.log("📊 합계 행 제외:", merchant, date);
                        skippedCnt++;
                        return;
                    }
                    // 금액 파싱 개선 - 다양한 형식 지원
                    let amount = 0;
                    let isNegativeAmount = false;
                    if (typeof amountRaw === "number") {
                        isNegativeAmount = amountRaw < 0;
                        amount = Math.abs(amountRaw);
                    } else if (amountRaw) {
                        const amountStr = String(amountRaw);
                        isNegativeAmount = amountStr.includes("-") || amountStr.includes("(");
                        const cleanedAmount = amountStr.replace(/[^0-9.-]/g, "");
                        amount = Math.abs(parseInt(cleanedAmount) || 0);
                    }
                    const approvalNum = String(row[approvalCol] || "");
                    // 빈 행 스킵
                    if (!date && !merchant && amount === 0) {
                        skippedCnt++;
                        return;
                    }
                    // 금액이 0이면 스킵
                    if (amount === 0) {
                        skippedCnt++;
                        return;
                    }
                    // 취소된 승인번호면 스킵
                    if (approvalNum && cancelledApprovals.has(approvalNum)) {
                        excludedCnt++;
                        console.log("❌ 취소 거래 제외 (승인번호):", merchant, approvalNum);
                        return;
                    }
                    // 음수 금액이면 취소로 간주하여 스킵
                    if (isNegativeAmount) {
                        excludedCnt++;
                        console.log("❌ 취소 거래 제외 (음수금액):", merchant);
                        return;
                    }
                    // 가맹점명에 취소 키워드가 있으면 스킵
                    const hasCancelInMerchant = CANCEL_KEYWORDS.some((keyword)=>merchant.toLowerCase().includes(keyword));
                    if (hasCancelInMerchant) {
                        excludedCnt++;
                        console.log("❌ 취소 거래 제외 (가맹점명):", merchant);
                        return;
                    }
                    // 카테고리 분류
                    const merchantLower = merchant.toLowerCase();
                    // 대중교통 체크
                    const isTransport = PUBLIC_TRANSPORT_KEYWORDS.some((keyword)=>merchantLower.includes(keyword.toLowerCase()));
                    // 보험료 체크
                    const isInsurance = INSURANCE_KEYWORDS.some((keyword)=>merchantLower.includes(keyword.toLowerCase()));
                    // 의료비 체크 (약국, 병원, 의원 등)
                    const isMedical = MEDICAL_KEYWORDS.some((keyword)=>merchantLower.includes(keyword.toLowerCase()));
                    // 디버깅: 의료비 감지 로그
                    if (isMedical) {
                        console.log("🏥 의료비 감지:", merchant, "-> medical");
                    }
                    // 전통시장 체크 (업종 컬럼 또는 가맹점명 기반)
                    const isTraditionalMarket = TRADITIONAL_MARKET_KEYWORDS.some((keyword)=>merchantLower.includes(keyword.toLowerCase()) || categoryValue.includes(keyword.toLowerCase()));
                    // 문화체육 체크 (업종 컬럼 또는 가맹점명 기반)
                    const isCultureSports = CULTURE_SPORTS_KEYWORDS.some((keyword)=>merchantLower.includes(keyword.toLowerCase()) || categoryValue.includes(keyword.toLowerCase()));
                    // 업종 컬럼에서 대중교통 추가 체크
                    const isTransportFromCategory = categoryValue.includes("대중교통") || categoryValue.includes("버스") || categoryValue.includes("지하철") || categoryValue.includes("택시") || categoryValue.includes("철도");
                    // 제외 키워드 체크 (세금, 공과금, 통신비 등)
                    const isExcluded = EXCLUDED_KEYWORDS.some((keyword)=>merchantLower.includes(keyword.toLowerCase()));
                    if (isExcluded) excludedCnt++;
                    // 카테고리 결정 (우선순위: 제외 > 대중교통 > 보험 > 의료비 > 전통시장 > 문화체육 > 카드)
                    let category = "card";
                    if (isExcluded) category = "excluded";
                    else if (isTransport || isTransportFromCategory) category = "transport";
                    else if (isInsurance) category = "insurance";
                    else if (isMedical) category = "medical";
                    else if (isTraditionalMarket) category = "market";
                    else if (isCultureSports) category = "culture";
                    console.log("분류 결과:", merchant, "->", category);
                    parsedData.push({
                        date,
                        merchant,
                        amount,
                        excluded: isExcluded,
                        category,
                        approvalNum
                    });
                });
                console.log("Parsed data count:", parsedData.length, "Excluded:", excludedCnt, "Skipped:", skippedCnt);
                // 디버깅: 카테고리별 합계 출력
                const cardTotal = parsedData.filter((i)=>i.category === "card").reduce((s, i)=>s + i.amount, 0);
                const transportTotal = parsedData.filter((i)=>i.category === "transport").reduce((s, i)=>s + i.amount, 0);
                const insuranceTotal = parsedData.filter((i)=>i.category === "insurance").reduce((s, i)=>s + i.amount, 0);
                const medicalTotal = parsedData.filter((i)=>i.category === "medical").reduce((s, i)=>s + i.amount, 0);
                const marketTotal = parsedData.filter((i)=>i.category === "market").reduce((s, i)=>s + i.amount, 0);
                const cultureTotal = parsedData.filter((i)=>i.category === "culture").reduce((s, i)=>s + i.amount, 0);
                const excludedTotal = parsedData.filter((i)=>i.category === "excluded").reduce((s, i)=>s + i.amount, 0);
                const grandTotal = parsedData.reduce((s, i)=>s + i.amount, 0);
                console.log("=== 카테고리별 합계 ===");
                console.log("신용카드:", cardTotal.toLocaleString());
                console.log("대중교통:", transportTotal.toLocaleString());
                console.log("보험료:", insuranceTotal.toLocaleString());
                console.log("의료비:", medicalTotal.toLocaleString());
                console.log("전통시장:", marketTotal.toLocaleString());
                console.log("문화체육:", cultureTotal.toLocaleString());
                console.log("제외:", excludedTotal.toLocaleString());
                console.log("총합계:", grandTotal.toLocaleString());
                console.log("======================");
                if (parsedData.length === 0) {
                    showNotification("error", `파싱된 데이터가 없습니다. (스킵: ${skippedCnt}건, 제외: ${excludedCnt}건)`);
                } else {
                    showNotification("success", `${parsedData.length}건의 거래 데이터를 찾았습니다.`);
                }
                setCardExcelPreview(parsedData); // 전체 데이터 저장 (합계 계산용)
                setExcludedCount(excludedCnt);
            } catch (error) {
                console.error("Excel parsing error:", error);
                showNotification("error", "엑셀 파일을 읽는 중 오류가 발생했습니다.");
            }
        };
        reader.readAsArrayBuffer(file);
    };
    // 카드사 엑셀 업로드 핸들러
    const handleCardExcelUpload = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setCardExcelFile(file);
        processCardExcelFile(file);
    };
    const handleCardExcelDrop = (e)=>{
        e.preventDefault();
        setIsCardExcelDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            setCardExcelFile(file);
            processCardExcelFile(file);
        }
    };
    const handleCardExcelModalOpen = ()=>{
        setShowCardExcelModal(true);
        setCardExcelFile(null);
        setCardExcelPreview([]);
        setExcludedCount(0);
        setCardType("credit");
    };
    const handleCardExcelModalClose = ()=>{
        setShowCardExcelModal(false);
        setCardExcelFile(null);
        setCardExcelPreview([]);
        if (cardExcelInputRef.current) {
            cardExcelInputRef.current.value = "";
        }
    };
    const handleCardExcelApply = ()=>{
        if (!cardExcelFile || cardExcelPreview.length === 0) return;
        // 카테고리별 금액 합계 계산
        const cardAmount = cardExcelPreview.filter((item)=>item.category === "card").reduce((sum, item)=>sum + item.amount, 0);
        const transportAmount = cardExcelPreview.filter((item)=>item.category === "transport").reduce((sum, item)=>sum + item.amount, 0);
        const insuranceAmount = cardExcelPreview.filter((item)=>item.category === "insurance").reduce((sum, item)=>sum + item.amount, 0);
        const medicalAmount = cardExcelPreview.filter((item)=>item.category === "medical").reduce((sum, item)=>sum + item.amount, 0);
        const marketAmount = cardExcelPreview.filter((item)=>item.category === "market").reduce((sum, item)=>sum + item.amount, 0);
        const cultureAmount = cardExcelPreview.filter((item)=>item.category === "culture").reduce((sum, item)=>sum + item.amount, 0);
        // 카테고리별 세부 내역 추출
        const cardDetails = cardExcelPreview.filter((item)=>item.category === "card").map((item)=>({
                date: item.date,
                merchant: item.merchant,
                amount: item.amount
            }));
        const transportDetails = cardExcelPreview.filter((item)=>item.category === "transport").map((item)=>({
                date: item.date,
                merchant: item.merchant,
                amount: item.amount
            }));
        const insuranceDetails = cardExcelPreview.filter((item)=>item.category === "insurance").map((item)=>({
                date: item.date,
                merchant: item.merchant,
                amount: item.amount
            }));
        const medicalDetails = cardExcelPreview.filter((item)=>item.category === "medical").map((item)=>({
                date: item.date,
                merchant: item.merchant,
                amount: item.amount
            }));
        const marketDetails = cardExcelPreview.filter((item)=>item.category === "market").map((item)=>({
                date: item.date,
                merchant: item.merchant,
                amount: item.amount
            }));
        const cultureDetails = cardExcelPreview.filter((item)=>item.category === "culture").map((item)=>({
                date: item.date,
                merchant: item.merchant,
                amount: item.amount
            }));
        // 카드 타입에 따른 이름
        const cardName = cardType === "credit" ? "신용카드" : cardType === "debit" ? "직불카드" : "현금영수증";
        // 항목 추가 헬퍼 함수 (세부 내역 포함)
        const addOrUpdateItem = (name, amount, details)=>{
            if (amount <= 0) return;
            setSpendingItems((prev)=>{
                // 같은 월, 같은 이름의 항목 찾기
                const existingIndex = prev.findIndex((item)=>item.name === name && item.month === selectedSpendingMonth);
                if (existingIndex >= 0) {
                    const currentAmount = parseInt(prev[existingIndex].amount.replace(/[^0-9]/g, "") || "0");
                    const newAmount = currentAmount + amount;
                    const existingDetails = prev[existingIndex].details || [];
                    return prev.map((item, index)=>index === existingIndex ? {
                            ...item,
                            amount: newAmount.toLocaleString("ko-KR"),
                            details: [
                                ...existingDetails,
                                ...details
                            ]
                        } : item);
                } else {
                    return [
                        ...prev,
                        {
                            id: Date.now().toString() + name + selectedSpendingMonth,
                            name,
                            amount: amount.toLocaleString("ko-KR"),
                            month: selectedSpendingMonth,
                            details
                        }
                    ];
                }
            });
        };
        // 각 카테고리별로 항목 추가 (세부 내역 포함)
        addOrUpdateItem(cardName, cardAmount, cardDetails);
        addOrUpdateItem("대중교통", transportAmount, transportDetails);
        addOrUpdateItem("보험료", insuranceAmount, insuranceDetails);
        addOrUpdateItem("의료비", medicalAmount, medicalDetails);
        addOrUpdateItem("전통시장", marketAmount, marketDetails);
        addOrUpdateItem("문화체육", cultureAmount, cultureDetails);
        // 결과 메시지
        const messages = [];
        if (cardAmount > 0) messages.push(`${cardName} ${cardAmount.toLocaleString("ko-KR")}원`);
        if (transportAmount > 0) messages.push(`대중교통 ${transportAmount.toLocaleString("ko-KR")}원`);
        if (insuranceAmount > 0) messages.push(`보험료 ${insuranceAmount.toLocaleString("ko-KR")}원`);
        if (medicalAmount > 0) messages.push(`의료비 ${medicalAmount.toLocaleString("ko-KR")}원`);
        if (marketAmount > 0) messages.push(`전통시장 ${marketAmount.toLocaleString("ko-KR")}원`);
        if (cultureAmount > 0) messages.push(`문화체육 ${cultureAmount.toLocaleString("ko-KR")}원`);
        showNotification("success", `${messages.join(", ")} 추가됨 (제외: ${excludedCount}건)`);
        handleCardExcelModalClose();
    };
    // OCR Image Upload Functions
    const processImageFiles = async (files)=>{
        if (!files) return;
        const maxImages = 10;
        const currentCount = capturedImages.length;
        const remainingSlots = maxImages - currentCount;
        if (remainingSlots <= 0) {
            showNotification("error", `최대 ${maxImages}개까지 업로드 가능합니다.`);
            return;
        }
        const filesToProcess = Array.from(files).slice(0, remainingSlots);
        const newImages = [];
        // 이미지 파일 읽기
        for (const file of filesToProcess){
            if (file.type.startsWith("image/")) {
                const base64 = await new Promise((resolve)=>{
                    const reader = new FileReader();
                    reader.onload = (event)=>resolve(event.target?.result);
                    reader.readAsDataURL(file);
                });
                newImages.push(base64);
            }
        }
        if (newImages.length === 0) return;
        setCapturedImages((prev)=>[
                ...prev,
                ...newImages
            ]);
        // 자동 OCR 처리
        setIsOcrProcessing(true);
        showNotification("success", `${newImages.length}개 이미지 분석 중...`);
        try {
            const response = await fetch('/api/ocr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    images: newImages
                })
            });
            if (!response.ok) {
                throw new Error('OCR API 요청 실패');
            }
            const data = await response.json();
            if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                // 선택한 카드 타입에 맞게 기본 카테고리 적용
                const cardTypeToCategory = {
                    credit: "신용카드",
                    debit: "직불카드",
                    cash: "현금영수증"
                };
                const defaultCategory = cardTypeToCategory[ocrCardType];
                const adjustedItems = data.items.map((item)=>({
                        ...item,
                        // AI가 특수 카테고리(교통, 의료 등)를 감지하지 않았으면 선택한 카드 타입 적용
                        category: [
                            "신용카드",
                            "체크카드",
                            "현금영수증",
                            "직불카드"
                        ].includes(item.category) ? defaultCategory : item.category
                    }));
                // 중복 방지: 동일한 가맹점+금액 조합 필터링
                // 1. 새로 추가될 항목들 간의 중복을 추적 (같은 이미지가 여러 번 업로드된 경우)
                const seenItems = {};
                const uniqueAdjustedItems = [];
                const internalDuplicateList = [];
                adjustedItems.forEach((item)=>{
                    const key = `${item.merchant}-${item.amount}`;
                    if (!seenItems[key]) {
                        seenItems[key] = true;
                        uniqueAdjustedItems.push(item);
                    } else {
                        // 중복 항목 기록
                        internalDuplicateList.push({
                            merchant: item.merchant,
                            amount: item.amount
                        });
                    }
                });
                // 2. 기존 항목과의 중복 제거
                setOcrPreviewItems((prev)=>{
                    const externalDuplicateList = [];
                    const newItems = uniqueAdjustedItems.filter((newItem)=>{
                        const exists = prev.some((existing)=>existing.merchant === newItem.merchant && existing.amount === newItem.amount);
                        if (exists) {
                            externalDuplicateList.push({
                                merchant: newItem.merchant,
                                amount: newItem.amount
                            });
                        }
                        return !exists;
                    });
                    // 모든 중복 항목 합치기
                    const allDuplicates = [
                        ...internalDuplicateList,
                        ...externalDuplicateList
                    ];
                    if (allDuplicates.length > 0) {
                        setOcrDuplicateItems((prevItems)=>[
                                ...prevItems,
                                ...allDuplicates
                            ]);
                        if (newItems.length > 0) {
                            showNotification("success", `${newItems.length}개 항목 추가 (${allDuplicates.length}개 중복 제외)`);
                        } else {
                            showNotification("error", "모든 항목이 이미 추가되어 있습니다.");
                        }
                    } else if (newItems.length > 0) {
                        showNotification("success", `${newItems.length}개 항목이 자동 인식되었습니다!`);
                    }
                    return [
                        ...prev,
                        ...newItems
                    ];
                });
            } else {
                showNotification("error", "이미지에서 지출 항목을 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error('OCR Error:', error);
            showNotification("error", "OCR 분석에 실패했습니다.");
        } finally{
            setIsOcrProcessing(false);
        }
    };
    const handleOcrImageUpload = (e)=>{
        processImageFiles(e.target.files);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        setIsDragging(false);
        processImageFiles(e.dataTransfer.files);
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        setIsDragging(false);
    };
    const removeImage = (index)=>{
        setCapturedImages((prev)=>prev.filter((_, i)=>i !== index));
    };
    const handleOcrModalOpen = ()=>{
        setShowCameraModal(true);
        setCapturedImages([]);
        setOcrModalMonth(selectedMonth);
        setOcrPreviewItems([]);
        setOcrCardType("credit");
        setOcrDuplicateItems([]);
    };
    const handleOcrModalClose = ()=>{
        setShowCameraModal(false);
        setCapturedImages([]);
        setOcrPreviewItems([]);
        setIsDragging(false);
        if (ocrImageInputRef.current) {
            ocrImageInputRef.current.value = "";
        }
    };
    // OCR 수동 입력 항목 삭제
    const handleRemoveOcrItem = (index)=>{
        setOcrPreviewItems((prev)=>prev.filter((_, i)=>i !== index));
    };
    const handleUseImage = ()=>{
        if (ocrPreviewItems.length === 0) {
            showNotification("error", "최소 1개 이상의 항목을 입력해주세요.");
            return;
        }
        // 카테고리별 금액 합계 및 세부 내역 추출
        const categoryTotals = {};
        ocrPreviewItems.forEach((item)=>{
            if (!categoryTotals[item.category]) {
                categoryTotals[item.category] = {
                    amount: 0,
                    details: []
                };
            }
            categoryTotals[item.category].amount += item.amount;
            categoryTotals[item.category].details.push({
                date: new Date().toISOString().split('T')[0],
                merchant: item.merchant,
                amount: item.amount
            });
        });
        // 항목 추가 헬퍼 함수
        const addOrUpdateItem = (name, amount, details)=>{
            if (amount <= 0) return;
            setSpendingItems((prev)=>{
                const existingIndex = prev.findIndex((i)=>i.name === name && i.month === selectedSpendingMonth);
                if (existingIndex >= 0) {
                    const currentAmount = parseInt(prev[existingIndex].amount.replace(/[^0-9]/g, "") || "0");
                    const newAmount = currentAmount + amount;
                    const existingDetails = prev[existingIndex].details || [];
                    return prev.map((item, index)=>index === existingIndex ? {
                            ...item,
                            amount: newAmount.toLocaleString("ko-KR"),
                            details: [
                                ...existingDetails,
                                ...details
                            ]
                        } : item);
                } else {
                    return [
                        ...prev,
                        {
                            id: Date.now().toString() + name + selectedSpendingMonth,
                            name,
                            amount: amount.toLocaleString("ko-KR"),
                            month: selectedSpendingMonth,
                            details
                        }
                    ];
                }
            });
        };
        // 각 카테고리별로 항목 추가
        Object.entries(categoryTotals).forEach(([category, data])=>{
            addOrUpdateItem(category, data.amount, data.details);
        });
        // 결과 메시지
        const messages = Object.entries(categoryTotals).map(([cat, data])=>`${cat} ${data.amount.toLocaleString("ko-KR")}원`);
        showNotification("success", `${messages.join(", ")} 추가됨`);
        handleOcrModalClose();
    };
    const handleSalaryInputChange = (field, value)=>{
        // 숫자만 추출 후 천원단위 포맷팅
        const numericValue = value.replace(/[^0-9]/g, "");
        const formatted = numericValue ? parseInt(numericValue).toLocaleString("ko-KR") : "0";
        setMonthlySalary((prev)=>({
                ...prev,
                [selectedMonth]: {
                    ...prev[selectedMonth],
                    [field]: formatted
                }
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto animate-fade-in pb-40 md:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: ".xlsx,.xls",
                onChange: handleExcelUpload,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1348,
                columnNumber: 13
            }, this),
            notification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] animate-fade-in md:bottom-28", notification.type === "success" ? "bg-neo-cyan" : "bg-neo-orange"),
                children: [
                    notification.type === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1362,
                        columnNumber: 56
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1362,
                        columnNumber: 84
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-sm",
                        children: notification.message
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1363,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1358,
                columnNumber: 17
            }, this),
            showAddItemModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-md w-full mx-4 shadow-[8px_8px_0px_0px_#000]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-black",
                                    children: "수동 항목 추가"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1372,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("modalClose", ()=>setShowAddItemModal(false)),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "modalClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1382,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1373,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1371,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-bold mb-2",
                                            children: "월 선택"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1388,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "neo-input",
                                            value: newItemMonth,
                                            onChange: (e)=>setNewItemMonth(parseInt(e.target.value)),
                                            children: [
                                                1,
                                                2,
                                                3,
                                                4,
                                                5,
                                                6,
                                                7,
                                                8,
                                                9,
                                                10,
                                                11,
                                                12
                                            ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: m,
                                                    children: [
                                                        m,
                                                        "월"
                                                    ]
                                                }, m, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1395,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1389,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1387,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-bold mb-2",
                                            children: "항목명"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1400,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "neo-input",
                                            value: newItemName,
                                            onChange: (e)=>setNewItemName(e.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- 항목 선택 --"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1406,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "신용카드",
                                                    children: "💳 신용카드"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1407,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "직불카드",
                                                    children: "💳 직불카드"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1408,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "현금영수증",
                                                    children: "🧾 현금영수증"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1409,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "대중교통",
                                                    children: "🚌 대중교통"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1410,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "보험료",
                                                    children: "🛡 보험료"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1411,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "의료비(난임시술비)",
                                                    children: "🏥 의료비(난임시술비)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1412,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "의료비(미숙아,선천성)",
                                                    children: "🏥 의료비(미숙아,선천성)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1413,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "의료비(본인,장애,65세,6세)",
                                                    children: "🏥 의료비(본인,장애,65세,6세)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1414,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "의료비(그밖부양가족)",
                                                    children: "🏥 의료비(그밖부양가족)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1415,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(본인)",
                                                    children: "📚 교육비(본인)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1416,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(미취학)-자녀1",
                                                    children: "📚 교육비(미취학)-자녀1"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1417,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(미취학)-자녀2",
                                                    children: "📚 교육비(미취학)-자녀2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1418,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(미취학)-자녀3",
                                                    children: "📚 교육비(미취학)-자녀3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1419,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(초중고)-자녀1",
                                                    children: "📚 교육비(초중고)-자녀1"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1420,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(초중고)-자녀2",
                                                    children: "📚 교육비(초중고)-자녀2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1421,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(초중고)-자녀3",
                                                    children: "📚 교육비(초중고)-자녀3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1422,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(대학)-자녀1",
                                                    children: "📚 교육비(대학)-자녀1"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1423,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(대학)-자녀2",
                                                    children: "📚 교육비(대학)-자녀2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1424,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "교육비(대학)-자녀3",
                                                    children: "📚 교육비(대학)-자녀3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1425,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "전통시장",
                                                    children: "🏪 전통시장"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1426,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "문화체육",
                                                    children: "🎭 문화체육"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1427,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "기부금(정치자금)",
                                                    children: "🎗️ 기부금(정치자금)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1428,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "기부금(고향사랑)",
                                                    children: "🎗️ 기부금(고향사랑)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1429,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "기부금(고향사랑특별재난)",
                                                    children: "🎗️ 기부금(고향사랑특별재난)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1430,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "기부금(특례기부금)",
                                                    children: "🎗️ 기부금(특례기부금)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1431,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "기부금(우리사주조합)",
                                                    children: "🎗️ 기부금(우리사주조합)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1432,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "기부금(일반기부금(종교))",
                                                    children: "🎗️ 기부금(일반기부금(종교))"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1433,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "기부금(일반기부금(종교 외))",
                                                    children: "🎗️ 기부금(일반기부금(종교 외))"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1434,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "연금저축",
                                                    children: "💰 연금저축"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1435,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "퇴직연금(IRP)",
                                                    children: "🏦 퇴직연금(IRP)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1436,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(청약저축) - 세대주",
                                                    disabled: Object.values(monthlySalary).reduce((sum, m)=>sum + parseInt(m.totalSalary.replace(/[^0-9]/g, "") || "0"), 0) > 70000000,
                                                    children: [
                                                        "🏠 주택자금(청약저축) - 세대주 ",
                                                        Object.values(monthlySalary).reduce((sum, m)=>sum + parseInt(m.totalSalary.replace(/[^0-9]/g, "") || "0"), 0) > 70000000 ? "(총급여 7천만원 이하만)" : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1437,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(청약저축) - 배우자",
                                                    disabled: Object.values(monthlySalary).reduce((sum, m)=>sum + parseInt(m.totalSalary.replace(/[^0-9]/g, "") || "0"), 0) > 70000000,
                                                    children: [
                                                        "🏠 주택자금(청약저축) - 배우자 ",
                                                        Object.values(monthlySalary).reduce((sum, m)=>sum + parseInt(m.totalSalary.replace(/[^0-9]/g, "") || "0"), 0) > 70000000 ? "(총급여 7천만원 이하만)" : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1443,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(월세)",
                                                    children: "🏠 주택자금(월세)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1449,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(임차차입금원리금상환액)",
                                                    children: "🏠 주택자금(임차차입금원리금상환액)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1450,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(장기주택)(15년이상 고정금리+비거치식)",
                                                    children: "🏠 주택자금(장기주택)(15년이상 고정금리+비거치식)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1451,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(장기주택)(15년이상 고정금리 or 비거치식)",
                                                    children: "🏠 주택자금(장기주택)(15년이상 고정금리 or 비거치식)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1452,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(장기주택)(15년이상 기타)",
                                                    children: "🏠 주택자금(장기주택)(15년이상 기타)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1453,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "주택자금(장기주택)(10년이상 고정금리 or 비거치식)",
                                                    children: "🏠 주택자금(장기주택)(10년이상 고정금리 or 비거치식)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1454,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1401,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1399,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-bold mb-2",
                                            children: "금액 (원)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1458,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "neo-input",
                                            placeholder: "예: 500,000",
                                            value: newItemAmount,
                                            onChange: (e)=>{
                                                // 숫자만 추출 후 천 단위 포맷
                                                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                                const formatted = numericValue ? parseInt(numericValue).toLocaleString("ko-KR") : "";
                                                setNewItemAmount(formatted);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1459,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1457,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1386,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("modalCancel", ()=>setShowAddItemModal(false)),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "modalCancel" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1475,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("modalAdd", handleAddItem),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "modalAdd" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                    children: "추가"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1486,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1474,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 1370,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1369,
                columnNumber: 17
            }, this), document.body),
            showCameraModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000] max-h-[80vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4 pb-4 border-b-2 border-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black",
                                    children: "이미지 업로드 (OCR)"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1508,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("ocrModalClose", handleOcrModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "ocrModalClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1518,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1509,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1507,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-bold text-base mb-2",
                            children: "📋 사용 내역 선택"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1523,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 mb-4",
                            children: [
                                {
                                    type: "credit",
                                    label: "💳 신용카드",
                                    btnId: "ocrTabCredit"
                                },
                                {
                                    type: "debit",
                                    label: "💳 직불카드",
                                    btnId: "ocrTabDebit"
                                },
                                {
                                    type: "cash",
                                    label: "🧾 현금영수증",
                                    btnId: "ocrTabCash"
                                }
                            ].map(({ type, label, btnId })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick(btnId, ()=>!capturedImages.length && setOcrCardType(type)),
                                    disabled: capturedImages.length > 0 && ocrCardType !== type,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 py-3 font-bold border-2 border-black transition-all", ocrCardType === type ? clickedBtn === btnId ? "bg-neo-cyan translate-x-[3px] translate-y-[3px] shadow-none" : "bg-neo-cyan shadow-[3px_3px_0px_0px_#000]" : capturedImages.length > 0 ? "bg-gray-200 cursor-not-allowed opacity-50" : clickedBtn === btnId ? "bg-neo-yellow translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_#000]"),
                                    children: label
                                }, type, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1530,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1524,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("min-h-[200px] mb-6 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all", isDragging ? "border-neo-cyan bg-neo-cyan/20 scale-[1.02]" : "border-gray-400 bg-gray-50 hover:bg-gray-100"),
                            onDrop: handleDrop,
                            onDragOver: handleDragOver,
                            onDragLeave: handleDragLeave,
                            onClick: ()=>ocrImageInputRef.current?.click(),
                            children: capturedImages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center text-sm font-bold mb-3",
                                        children: [
                                            capturedImages.length,
                                            "개 이미지 업로드됨"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1565,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2",
                                        children: capturedImages.map((img, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative aspect-square border-2 border-black overflow-hidden group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: img,
                                                        alt: `Uploaded ${index + 1}`,
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1569,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            removeImage(index);
                                                        },
                                                        className: "absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1577,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1570,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1568,
                                                columnNumber: 45
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1566,
                                        columnNumber: 37
                                    }, this),
                                    isOcrProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-2 mt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                size: 16,
                                                className: "animate-spin text-neo-cyan"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1584,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-neo-cyan",
                                                children: "AI 분석 중..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1585,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1583,
                                        columnNumber: 41
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center text-xs text-gray-500 mt-3",
                                        children: "클릭 또는 드래그하여 더 추가"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1588,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1564,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 32,
                                        className: "mx-auto mb-2 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1593,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold mb-2",
                                        children: "이미지를 드래그하거나"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1594,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            ocrImageInputRef.current?.click();
                                        },
                                        className: "px-4 py-2 bg-neo-cyan font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                        children: "파일 선택"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1595,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mt-2",
                                        children: "영수증, 원천징수영수증 등"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1604,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1553,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: ocrImageInputRef,
                            type: "file",
                            accept: "image/*",
                            multiple: true,
                            onChange: handleOcrImageUpload,
                            className: "hidden"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1609,
                            columnNumber: 25
                        }, this),
                        ocrPreviewItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            children: "입력된 항목 미리보기"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1622,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-500",
                                            children: [
                                                "총 ",
                                                ocrPreviewItems.length,
                                                "건"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1623,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1621,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-48 overflow-y-auto border-2 border-black",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-100 sticky top-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-left border-b-2 border-black",
                                                            children: "분류"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1631,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-left border-b-2 border-black",
                                                            children: "가맹점"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1632,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-right border-b-2 border-black",
                                                            children: "금액"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1633,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-center border-b-2 border-black",
                                                            children: "삭제"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1634,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1630,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1629,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: ocrPreviewItems.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(item.category === "대중교통" && "bg-blue-50", item.category === "보험료" && "bg-purple-50", item.category === "의료비" && "bg-green-50", item.category === "전통시장" && "bg-orange-50", item.category === "문화체육" && "bg-pink-50"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("text-xs px-2 py-1 rounded", item.category === "신용카드" && "bg-green-100 text-green-600", item.category === "체크카드" && "bg-cyan-100 text-cyan-600", item.category === "현금영수증" && "bg-yellow-100 text-yellow-600", item.category === "대중교통" && "bg-blue-100 text-blue-600", item.category === "보험료" && "bg-purple-100 text-purple-600", item.category === "의료비" && "bg-teal-100 text-teal-600", item.category === "전통시장" && "bg-orange-100 text-orange-600", item.category === "문화체육" && "bg-pink-100 text-pink-600"),
                                                                    children: item.category
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 1647,
                                                                    columnNumber: 57
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1646,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b",
                                                                children: item.merchant
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1661,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b text-right",
                                                                children: [
                                                                    item.amount.toLocaleString(),
                                                                    "원"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1662,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b text-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleRemoveOcrItem(idx),
                                                                    className: "text-red-500 hover:bg-red-100 p-1 rounded",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/page.tsx",
                                                                        lineNumber: 1668,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 1664,
                                                                    columnNumber: 57
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1663,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1639,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1637,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1628,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1627,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-3 bg-neo-yellow/30 border-2 border-black space-y-1",
                                    children: [
                                        Object.entries(ocrPreviewItems.reduce((acc, item)=>{
                                            acc[item.category] = (acc[item.category] || 0) + item.amount;
                                            return acc;
                                        }, {})).map(([category, amount])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            category,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1686,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            amount.toLocaleString(),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1687,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, category, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1685,
                                                columnNumber: 41
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-black pt-1 mt-2 flex justify-between font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "총합계:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1691,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        ocrPreviewItems.reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1692,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1690,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1678,
                                    columnNumber: 33
                                }, this),
                                ocrDuplicateItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-3 bg-neo-orange/20 border-2 border-neo-orange text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold text-neo-orange mb-2",
                                            children: "⚠️ 중복 이미지 감지됨"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1699,
                                            columnNumber: 41
                                        }, this),
                                        [
                                            ...new Map(ocrDuplicateItems.map((item)=>[
                                                    `${item.merchant}-${item.amount}`,
                                                    item
                                                ])).values()
                                        ].map((item, idx)=>{
                                            const count = ocrDuplicateItems.filter((d)=>d.merchant === item.merchant && d.amount === item.amount).length;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: item.merchant
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1704,
                                                        columnNumber: 53
                                                    }, this),
                                                    " (",
                                                    item.amount.toLocaleString(),
                                                    "원) - ",
                                                    count,
                                                    "건 중복, 1건만 적용"
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1703,
                                                columnNumber: 49
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1698,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1620,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-3 bg-gray-100 border-2 border-black text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold mb-2",
                                    children: "📋 자동 분류 안내:"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1715,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-600",
                                    children: "🚌 대중교통: 버스, 지하철, 모바일이즘 → 대중교통 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1716,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-purple-600",
                                    children: "🛡 보험료: 메리츠화재, DB손해보험 등 → 보험료 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1717,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-green-600",
                                    children: "🏥 의료비: 병원, 의원, 약국 등 → 의료비 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1718,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-orange-600",
                                    children: "🏪 전통시장: 전통시장, 재래시장 등 → 전통시장 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1719,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-pink-600",
                                    children: "🎭 문화체육: 서점, 도서, 영화관, 헬스 등 → 문화체육 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1720,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-500",
                                    children: "❌ 제외: 세금, 공과금, 통신비, 도로통행료 → 공제 불가"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1721,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-1",
                                    children: "취소된 거래는 자동으로 제외됩니다."
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1722,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1714,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("ocrCancel", handleOcrModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-4 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", clickedBtn === "ocrCancel" ? "bg-neo-orange translate-x-[3px] translate-y-[3px] shadow-none" : "bg-white hover:shadow-[2px_2px_0px_0px_#000]"),
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1727,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleUseImage,
                                    disabled: ocrPreviewItems.length === 0,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-4 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", ocrPreviewItems.length > 0 ? "bg-neo-cyan hover:shadow-[2px_2px_0px_0px_#000]" : "bg-gray-200 cursor-not-allowed opacity-50"),
                                    children: [
                                        "적용하기 ",
                                        ocrPreviewItems.length > 0 && `(${ocrPreviewItems.length}건)`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1738,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1726,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 1506,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1505,
                columnNumber: 17
            }, this), document.body),
            showExcelModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-4 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-black flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1763,
                                                    columnNumber: 37
                                                }, this),
                                                " 엑셀 업로드"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1762,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500",
                                            children: "급여 데이터 적용"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1765,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1761,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("excelModalClose", handleExcelModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "excelModalClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1776,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1767,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1760,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block font-bold mb-2",
                                    children: "적용할 월 선택"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1782,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "neo-input",
                                    value: excelModalMonth,
                                    onChange: (e)=>setExcelModalMonth(parseInt(e.target.value)),
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6,
                                        7,
                                        8,
                                        9,
                                        10,
                                        11,
                                        12
                                    ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: m,
                                            children: [
                                                m,
                                                "월"
                                            ]
                                        }, m, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1789,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1783,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1781,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("min-h-[180px] mb-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all", isExcelDragging ? "border-neo-cyan bg-neo-cyan/20 scale-[1.02]" : "border-gray-400 bg-gray-50 hover:bg-gray-100"),
                            onDrop: handleExcelDrop,
                            onDragOver: handleExcelDragOver,
                            onDragLeave: handleExcelDragLeave,
                            onClick: ()=>fileInputRef.current?.click(),
                            children: excelFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl mb-2",
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1807,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-bold mb-1",
                                        children: excelFile.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1808,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                            (excelFile.size / 1024).toFixed(1),
                                            " KB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1809,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1806,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-gray-500 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl mb-2",
                                        children: "📁"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1813,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-bold mb-1",
                                        children: "엑셀 파일을 드래그하거나 클릭하세요"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1814,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm",
                                        children: ".xlsx, .xls 파일 지원"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1815,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1812,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1795,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: fileInputRef,
                            type: "file",
                            accept: ".xlsx,.xls",
                            onChange: handleExcelUpload,
                            className: "hidden"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1820,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: excelFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setExcelFile(null);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = "";
                                            }
                                        },
                                        className: "flex-1 py-3 font-bold border-2 border-black bg-white hover:bg-gray-100",
                                        children: "다시 선택"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1831,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleExcelApply,
                                        className: "flex-1 py-3 font-bold border-2 border-black bg-neo-cyan hover:bg-cyan-300",
                                        children: "적용하기"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1842,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleButtonClick("excelFileSelect", ()=>fileInputRef.current?.click()),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("w-full py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "excelFileSelect" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                children: "📁 파일 선택"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1850,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1828,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 1759,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1758,
                columnNumber: 17
            }, this), document.body),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl md:text-3xl font-black uppercase",
                        children: "기초자료 등록"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1869,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap",
                        children: [
                            2024,
                            2025,
                            2026
                        ].map((year)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleButtonClick(`year-${year}`, ()=>handleYearChange(year)),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-3 md:px-4 py-2 font-bold border-2 border-black text-sm shadow-[4px_4px_0px_0px_#000] transition-all", selectedYear === year ? "bg-black text-white translate-x-[4px] translate-y-[4px] shadow-none" : clickedBtn === `year-${year}` ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                children: year
                            }, year, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1874,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1872,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1868,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row justify-between items-start gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-neo-cyan p-2 border-2 border-black",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1899,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1898,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg md:text-xl font-black",
                                                        children: "급여 데이터"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1902,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs md:text-sm font-bold text-gray-500",
                                                        children: "매월 급여명세서 기준 입력"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1903,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1901,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1897,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("copy1to3", ()=>{
                                                        const currentData = monthlySalary[selectedMonth];
                                                        if (currentData) {
                                                            const newMonthlySalary = {
                                                                ...monthlySalary
                                                            };
                                                            for(let m = 1; m <= 3; m++){
                                                                newMonthlySalary[m] = {
                                                                    ...currentData
                                                                };
                                                            }
                                                            setMonthlySalary(newMonthlySalary);
                                                            showNotification("success", `${selectedMonth}월 데이터를 1~3월에 복사했습니다.`);
                                                        }
                                                    }),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-3 py-2 text-xs font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", clickedBtn === "copy1to3" ? "bg-neo-orange translate-x-[3px] translate-y-[3px] shadow-none" : "bg-neo-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: "1~3월 동일 적용"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1909,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("copy3to12", ()=>{
                                                        const currentData = monthlySalary[selectedMonth];
                                                        if (currentData) {
                                                            const newMonthlySalary = {
                                                                ...monthlySalary
                                                            };
                                                            for(let m = 4; m <= 12; m++){
                                                                newMonthlySalary[m] = {
                                                                    ...currentData
                                                                };
                                                            }
                                                            setMonthlySalary(newMonthlySalary);
                                                            showNotification("success", `${selectedMonth}월 데이터를 4~12월에 복사했습니다.`);
                                                        }
                                                    }),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-3 py-2 text-xs font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", clickedBtn === "copy3to12" ? "bg-neo-orange translate-x-[3px] translate-y-[3px] shadow-none" : "bg-neo-pink hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: "4~12월 동일 적용"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1930,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1908,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1896,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-6 md:grid-cols-12 gap-1 mb-4 border-b-2 border-black pb-3",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    10,
                                    11,
                                    12
                                ].map((month)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleButtonClick(`month-${month}`, ()=>setSelectedMonth(month)),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("py-2 font-bold text-sm border-2 border-black transition-all", selectedMonth === month ? "bg-black text-white shadow-none" : clickedBtn === `month-${month}` ? "bg-neo-cyan translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                        children: [
                                            month,
                                            "월"
                                        ]
                                    }, month, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1956,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1954,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "월급여 (세전)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1975,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.totalSalary || "0",
                                                onChange: (e)=>handleSalaryInputChange("totalSalary", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1976,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1974,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "비과세 식대"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1984,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.mealAllowance || "0",
                                                onChange: (e)=>handleSalaryInputChange("mealAllowance", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1985,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1983,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "국민연금"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1993,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.nationalPension || "0",
                                                onChange: (e)=>handleSalaryInputChange("nationalPension", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1994,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1992,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "건강보험"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2002,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.healthInsurance || "0",
                                                onChange: (e)=>handleSalaryInputChange("healthInsurance", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2003,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2001,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "노인장기요양보험"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2011,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.longTermCare || "0",
                                                onChange: (e)=>handleSalaryInputChange("longTermCare", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2012,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2010,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "고용보험"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2020,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.employmentInsurance || "0",
                                                onChange: (e)=>handleSalaryInputChange("employmentInsurance", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2021,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2019,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "상여금"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2029,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.bonus || "0",
                                                onChange: (e)=>handleSalaryInputChange("bonus", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2030,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2028,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "자녀학자금"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2038,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.childTuition || "0",
                                                onChange: (e)=>handleSalaryInputChange("childTuition", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2039,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2037,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "기납부세액 (소득세)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2047,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.prepaidTax || "0",
                                                onChange: (e)=>handleSalaryInputChange("prepaidTax", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2048,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2046,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "기납부세액 (지방소득세)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2056,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: monthlySalary[selectedMonth]?.localIncomeTax || "0",
                                                onChange: (e)=>handleSalaryInputChange("localIncomeTax", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2057,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2055,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1973,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1895,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-neo-yellow p-2 border-2 border-black",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2071,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2070,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg md:text-xl font-black",
                                                children: "가족 정보"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2074,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm font-bold text-gray-500",
                                                children: "인적공제 및 카드공제 한도 확대 적용"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2075,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2073,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2069,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base font-black mb-3 px-2 py-1 bg-neo-cyan border-2 border-black inline-block",
                                        children: "기본공제"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2083,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "배우자공제"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2086,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            false,
                                                            true
                                                        ].map((hasSpouse)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setFamilyData((prev)=>({
                                                                            ...prev,
                                                                            spouse: hasSpouse
                                                                        })),
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 p-3 border-[3px] border-black font-semibold text-lg transition-colors", familyData.spouse === hasSpouse ? "bg-black text-white" : "bg-white hover:bg-gray-100"),
                                                                children: hasSpouse ? "있음" : "없음"
                                                            }, hasSpouse ? "yes" : "no", false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2089,
                                                                columnNumber: 41
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2087,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2085,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "만 20세 이하 자녀 수"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2103,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        max: "10",
                                                        className: "neo-input",
                                                        value: familyData.children,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    children: Math.max(0, parseInt(e.target.value) || 0)
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2104,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2102,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: [
                                                            "만 8세 이상 자녀 수 ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-500",
                                                                children: "(자녀세액공제)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2114,
                                                                columnNumber: 86
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2114,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        max: "10",
                                                        className: "neo-input",
                                                        value: familyData.childrenOver8,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    childrenOver8: Math.max(0, parseInt(e.target.value) || 0)
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2115,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2113,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "직계존속 (만 60세 이상)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2125,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        max: "10",
                                                        className: "neo-input",
                                                        value: familyData.parents,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    parents: Math.max(0, parseInt(e.target.value) || 0)
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2126,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2124,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "형제자매"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2136,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        max: "10",
                                                        className: "neo-input",
                                                        value: familyData.siblings,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    siblings: Math.max(0, parseInt(e.target.value) || 0)
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2137,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2135,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "위탁아동 (6개월 이상)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2147,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        max: "10",
                                                        className: "neo-input",
                                                        value: familyData.foster,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    foster: Math.max(0, parseInt(e.target.value) || 0)
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2148,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2146,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "기초생활수급자"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2158,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        max: "10",
                                                        className: "neo-input",
                                                        value: familyData.recipient,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    recipient: Math.max(0, parseInt(e.target.value) || 0)
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2159,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2157,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2084,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2082,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base font-black mb-3 px-2 py-1 bg-neo-yellow border-2 border-black inline-block",
                                        children: "세액공제"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2173,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "만 8세 이상 자녀 수"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2176,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        max: "10",
                                                        className: "neo-input",
                                                        value: familyData.childrenOver8,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    childrenOver8: Math.max(0, parseInt(e.target.value) || 0)
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2177,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2175,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "출생·입양자"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2187,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "neo-input",
                                                        value: familyData.birthAdoption,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    birthAdoption: e.target.value
                                                                })),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "none",
                                                                children: "선택 안함"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2193,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "first",
                                                                children: "첫째"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2194,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "second",
                                                                children: "둘째"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2195,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "third1",
                                                                children: "셋째 이상 (1명)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2196,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "third2",
                                                                children: "셋째 이상 (2명)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2197,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "third3",
                                                                children: "셋째 이상 (3명)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2198,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2188,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2186,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2174,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2172,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base font-black mb-3 px-2 py-1 bg-neo-pink border-2 border-black inline-block",
                                        children: "비과세"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2206,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block font-bold mb-2",
                                                    children: "만 6세 이하 자녀 수 (보육수당)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2209,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "0",
                                                    max: "10",
                                                    className: "neo-input",
                                                    value: familyData.childrenUnder6,
                                                    onChange: (e)=>setFamilyData((prev)=>({
                                                                ...prev,
                                                                childrenUnder6: Math.max(0, parseInt(e.target.value) || 0)
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2210,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2208,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2207,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2205,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 2068,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row justify-between items-start gap-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-neo-orange p-2 border-2 border-black",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2228,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2227,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg md:text-xl font-black",
                                                    children: [
                                                        "지출 데이터 (",
                                                        selectedSpendingMonth,
                                                        "월)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2231,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2230,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2226,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 flex-wrap w-full md:w-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("cardExcel", handleCardExcelModalOpen),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "excel" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        size: 14,
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("md:w-4 md:h-4", clickedBtn === "excel" && "animate-spin")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2246,
                                                        columnNumber: 33
                                                    }, this),
                                                    " 엑셀"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2237,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("ocr", handleOcrModalOpen),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "ocr" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 14,
                                                        className: "md:w-4 md:h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2257,
                                                        columnNumber: 33
                                                    }, this),
                                                    " OCR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2248,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("sync", ()=>showNotification("success", "카드사 연동 기능 준비중입니다!")),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "sync" ? "bg-neo-cyan translate-x-[4px] translate-y-[4px] shadow-none" : "bg-black text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        size: 14,
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("md:w-4 md:h-4", clickedBtn === "sync" && "animate-spin")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2268,
                                                        columnNumber: 33
                                                    }, this),
                                                    " 동기화"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2259,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2236,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2225,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-6 md:grid-cols-12 gap-1 mb-4 border-b-2 border-black pb-3",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    10,
                                    11,
                                    12
                                ].map((month)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleButtonClick(`spending-month-${month}`, ()=>setSelectedSpendingMonth(month)),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("py-2 font-bold text-sm border-2 border-black transition-all", selectedSpendingMonth === month ? "bg-black text-white shadow-none" : clickedBtn === `spending-month-${month}` ? "bg-neo-cyan translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                        children: [
                                            month,
                                            "월"
                                        ]
                                    }, month, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2276,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2274,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: spendingItems.filter((item)=>item.month === selectedSpendingMonth).length > 0 ? spendingItems.filter((item)=>item.month === selectedSpendingMonth).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between border-b-2 border-gray-100 pb-2 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2298,
                                                        columnNumber: 41
                                                    }, this),
                                                    item.details && item.details.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setSelectedItemDetails(item);
                                                            setShowDetailsModal(true);
                                                        },
                                                        className: "text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-200 flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2307,
                                                                columnNumber: 49
                                                            }, this),
                                                            item.details.length,
                                                            "건"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2300,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2297,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-lg tracking-tight",
                                                        children: [
                                                            parseInt(item.amount.replace(/[^0-9]/g, "") || "0").toLocaleString("ko-KR"),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2313,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDeleteItem(item.id),
                                                        className: "opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 text-red-500 transition-opacity",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 2320,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2316,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2312,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2296,
                                        columnNumber: 33
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold",
                                            children: [
                                                selectedSpendingMonth,
                                                "월 지출 데이터가 없습니다"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2327,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm mt-1",
                                            children: "엑셀 업로드 또는 수동 항목 추가로 데이터를 입력하세요"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2328,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2326,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2293,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setNewItemMonth(selectedSpendingMonth);
                                    handleButtonClick("addItem", ()=>setShowAddItemModal(true));
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("w-full mt-6 py-3 border-2 border-dashed font-bold transition-all flex items-center justify-center gap-2", clickedBtn === "addItem" ? "border-black bg-neo-yellow text-black" : "border-gray-300 text-gray-400 hover:border-black hover:text-black hover:bg-gray-50"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2345,
                                        columnNumber: 25
                                    }, this),
                                    " 수동 항목 추가"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2333,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 2224,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1893,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-16 md:bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black flex justify-center gap-4 z-40 md:static md:bg-transparent md:border-none md:p-0 md:mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleButtonClick("cancel"),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "cancel" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                        children: "변경취소"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 2351,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleButtonClick("save", handleSave),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "save" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                        children: "저장하기"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 2362,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 2350,
                columnNumber: 13
            }, this),
            showCardExcelModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000] max-h-[80vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4 pb-4 border-b-2 border-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black",
                                    children: "엑셀 업로드"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2380,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("cardExcelClose", handleCardExcelModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "cardExcelClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2390,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2381,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2379,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-bold text-base mb-2",
                            children: "📋 사용 내역 선택"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2395,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 mb-4",
                            children: [
                                {
                                    type: "credit",
                                    label: "💳 신용카드",
                                    btnId: "cardExcelTabCredit"
                                },
                                {
                                    type: "debit",
                                    label: "💳 직불카드",
                                    btnId: "cardExcelTabDebit"
                                },
                                {
                                    type: "cash",
                                    label: "🧾 현금영수증",
                                    btnId: "cardExcelTabCash"
                                }
                            ].map(({ type, label, btnId })=>{
                                const isDisabled = cardExcelFile !== null && cardType !== type;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>!isDisabled && handleButtonClick(btnId, ()=>setCardType(type)),
                                    disabled: isDisabled,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 py-3 font-bold border-2 border-black transition-all", cardType === type ? "bg-neo-cyan shadow-none translate-x-[2px] translate-y-[2px]" : isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50" : clickedBtn === btnId ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                    children: label
                                }, type, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2404,
                                    columnNumber: 37
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2396,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onDrop: handleCardExcelDrop,
                            onDragOver: (e)=>{
                                e.preventDefault();
                                setIsCardExcelDragging(true);
                            },
                            onDragLeave: ()=>setIsCardExcelDragging(false),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("border-2 border-dashed p-8 text-center mb-6 transition-all", isCardExcelDragging ? "border-neo-cyan bg-neo-cyan/10" : "border-gray-300", cardExcelFile && "border-neo-green bg-neo-green/10"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: cardExcelInputRef,
                                    type: "file",
                                    accept: ".xlsx,.xls",
                                    onChange: handleCardExcelUpload,
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2436,
                                    columnNumber: 29
                                }, this),
                                cardExcelFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            size: 24,
                                            className: "text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2445,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            children: cardExcelFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2446,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setCardExcelFile(null);
                                                setCardExcelPreview([]);
                                                if (cardExcelInputRef.current) cardExcelInputRef.current.value = "";
                                            },
                                            className: "p-1 hover:bg-red-100 text-red-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2455,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2447,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2444,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            size: 32,
                                            className: "mx-auto mb-2 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2460,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold mb-2",
                                            children: "엑셀 파일을 드래그하거나"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2461,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>cardExcelInputRef.current?.click(),
                                            className: "px-4 py-2 bg-neo-cyan font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                            children: "파일 선택"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2462,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2426,
                            columnNumber: 25
                        }, this),
                        cardExcelPreview.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            children: "파싱 결과 미리보기"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2476,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-500",
                                            children: [
                                                "총 ",
                                                cardExcelPreview.length,
                                                "건",
                                                excludedCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500 ml-2",
                                                    children: [
                                                        "(제외: ",
                                                        excludedCount,
                                                        "건)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2480,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2477,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2475,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-48 overflow-y-auto border-2 border-black",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-100 sticky top-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-left border-b-2 border-black",
                                                            children: "날짜"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 2490,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-left border-b-2 border-black",
                                                            children: "가맹점"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 2491,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-right border-b-2 border-black",
                                                            children: "금액"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 2492,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-center border-b-2 border-black",
                                                            children: "분류"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 2493,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2489,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2488,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: cardExcelPreview.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(item.category === "excluded" && "bg-red-50 text-red-400 line-through", item.category === "transport" && "bg-blue-50", item.category === "insurance" && "bg-purple-50", item.category === "medical" && "bg-green-50", item.category === "market" && "bg-orange-50", item.category === "culture" && "bg-pink-50"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b",
                                                                children: item.date
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2506,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b",
                                                                children: item.merchant
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2507,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b text-right",
                                                                children: [
                                                                    item.amount.toLocaleString(),
                                                                    "원"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2508,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b text-center",
                                                                children: item.category === "excluded" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-red-100 text-red-600 px-2 py-1 rounded",
                                                                    children: "제외"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 2511,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "transport" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded",
                                                                    children: "대중교통"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 2513,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "insurance" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded",
                                                                    children: "보험료"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 2515,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "medical" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded",
                                                                    children: "의료비"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 2517,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "market" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded",
                                                                    children: "전통시장"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 2519,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "culture" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded",
                                                                    children: "문화체육"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 2521,
                                                                    columnNumber: 61
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-green-100 text-green-600 px-2 py-1 rounded",
                                                                    children: cardType === "credit" ? "신용" : cardType === "debit" ? "직불" : "현금"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 2523,
                                                                    columnNumber: 61
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 2509,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2498,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2496,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2487,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2486,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-3 bg-neo-yellow/30 border-2 border-black space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between font-bold text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardType === "credit" ? "💳 신용카드" : cardType === "debit" ? "💳 직불카드" : "🧾 현금영수증",
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2535,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "card").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2536,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2534,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-blue-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🚌 대중교통:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2539,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "transport").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2540,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2538,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-purple-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🛡️ 보험료:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2543,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "insurance").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2544,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2542,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-teal-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🏥 의료비:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2547,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "medical").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2548,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2546,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-orange-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🏪 전통시장:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2551,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "market").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2552,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2550,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-pink-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🎭 문화체육:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2555,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "culture").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2556,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2554,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-red-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "❌ 제외:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2559,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "excluded").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2560,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2558,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2533,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2474,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-3 bg-gray-100 border-2 border-black text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold mb-2",
                                    children: "📋 자동 분류 안내:"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2568,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-600",
                                    children: "🚌 대중교통: 버스, 지하철, 모바일이즐 → 대중교통 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2569,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-purple-600",
                                    children: "🛡️ 보험료: 메리츠화재, DB손해보험 등 → 보험료 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2570,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-teal-600",
                                    children: "🏥 의료비: 병원, 의원, 약국 등 → 의료비 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2571,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-orange-600",
                                    children: "🏪 전통시장: 전통시장, 재래시장 등 → 전통시장 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2572,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-pink-600",
                                    children: "🎭 문화체육: 서점, 도서, 영화관, 헬스 등 → 문화체육 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2573,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-500",
                                    children: "❌ 제외: 세금, 공과금, 통신비, 도로통행료 → 공제 불가"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2574,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-1",
                                    children: "취소된 거래는 자동으로 제외됩니다."
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2575,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2567,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCardExcelModalClose,
                                    className: "px-4 py-2 font-bold border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2580,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCardExcelApply,
                                    disabled: !cardExcelFile || cardExcelPreview.length === 0,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-4 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", cardExcelFile && cardExcelPreview.length > 0 ? "bg-neo-cyan hover:shadow-[2px_2px_0px_0px_#000]" : "bg-gray-200 cursor-not-allowed opacity-50"),
                                    children: "적용하기"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2586,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2579,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 2378,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 2377,
                columnNumber: 17
            }, this), document.body),
            showDetailsModal && selectedItemDetails && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000] max-h-[80vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4 pb-4 border-b-2 border-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black",
                                    children: [
                                        selectedItemDetails.name,
                                        " 상세 내역"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2609,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("detailsClose", ()=>{
                                            setShowDetailsModal(false);
                                            setSelectedItemDetails(null);
                                        }),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "detailsClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2622,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2610,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2608,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-neo-yellow/30 border-2 border-black",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between font-bold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "총 ",
                                            selectedItemDetails.details?.length || 0,
                                            "건"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2628,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: [
                                            selectedItemDetails.amount,
                                            "원"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2629,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2627,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2626,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-96 overflow-y-auto border-2 border-black",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-gray-100 sticky top-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 text-left border-b-2 border-black",
                                                    children: "날짜"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2637,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 text-left border-b-2 border-black",
                                                    children: "가맹점"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2638,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 text-right border-b-2 border-black",
                                                    children: "금액"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2639,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2636,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2635,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: selectedItemDetails.details?.map((detail, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border-b",
                                                        children: detail.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2645,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border-b",
                                                        children: detail.merchant
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2646,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border-b text-right",
                                                        children: [
                                                            detail.amount.toLocaleString(),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2647,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2644,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2642,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2634,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2633,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowDetailsModal(false);
                                    setSelectedItemDetails(null);
                                },
                                className: "px-4 py-2 font-bold border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                children: "닫기"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2655,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2654,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 2607,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 2606,
                columnNumber: 17
            }, this), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/page.tsx",
        lineNumber: 1346,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_1d375470._.js.map