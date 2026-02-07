module.exports = [
"[project]/components/ui/Badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
;
function Badge({ type }) {
    const styles = {
        high: "bg-neo-orange text-white",
        medium: "bg-neo-yellow text-black",
        low: "bg-neo-cyan text-black",
        new: "bg-neo-black text-white animate-pulse"
    };
    const labels = {
        high: "HIGH IMPACT",
        medium: "MEDIUM",
        low: "INFO",
        new: "NEW 2026"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("px-2 py-0.5 text-[10px] font-black border border-black", styles[type]),
        children: labels[type]
    }, void 0, false, {
        fileName: "[project]/components/ui/Badge.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, this);
}
}),
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
"[project]/lib/ai-recommendation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AI 절세 추천 서비스
 * 사용자의 세금 데이터를 분석하여 개인화된 절세 추천을 생성합니다.
 */ __turbopack_context__.s([
    "calculateTotalPotentialSaving",
    ()=>calculateTotalPotentialSaving,
    "generateRecommendations",
    ()=>generateRecommendations,
    "getDefaultRecommendations",
    ()=>getDefaultRecommendations
]);
function generateRecommendations(data) {
    const recommendations = [];
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
    const priorityOrder = {
        high: 0,
        medium: 1,
        low: 2
    };
    recommendations.sort((a, b)=>{
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return b.potentialSaving - a.potentialSaving;
    });
    return recommendations;
}
function calculateTotalPotentialSaving(recommendations) {
    return recommendations.reduce((sum, rec)=>sum + rec.potentialSaving, 0);
}
/**
 * 원화 포맷팅 헬퍼
 */ function formatWon(num) {
    if (num >= 10000) {
        return `${Math.round(num / 10000)}만원`;
    }
    return `${num.toLocaleString("ko-KR")}원`;
}
function getDefaultRecommendations() {
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
}),
"[project]/lib/tax-calculator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 세금 계산 모듈 (2026년 기준)
 * Calculator와 Dashboard에서 공유하는 세금 계산 로직
 */ __turbopack_context__.s([
    "calculateTax",
    ()=>calculateTax,
    "convertAdminToTaxInputs",
    ()=>convertAdminToTaxInputs
]);
function calculateTax(inputs) {
    const salary = inputs.salary;
    // ==========================================
    // 1. 근로소득공제 (2026년 기준)
    // ==========================================
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
    const earnedIncome = salary - incomeDeduction;
    // ==========================================
    // 2. 소득공제 항목
    // ==========================================
    // 인적공제 (부양가족 1인당 150만원)
    const personalDeduction = inputs.dependents * 1500000;
    // 4대보험 소득공제 (전액 공제)
    const socialInsuranceDeduction = inputs.nationalPension + inputs.healthInsurance + inputs.longTermCare + inputs.employmentInsurance;
    // 신용카드 등 소득공제
    const threshold = salary * 0.25;
    let cardDeduction = 0;
    let cardRemaining = threshold;
    const creditExcess = Math.max(0, inputs.creditCard - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.creditCard);
    const debitExcess = Math.max(0, inputs.debitCard - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.debitCard);
    const cashExcess = Math.max(0, inputs.cash - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.cash);
    const transportExcess = Math.max(0, inputs.publicTransport - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.publicTransport);
    const marketExcess = Math.max(0, inputs.traditionalMarket - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.traditionalMarket);
    const cultureExcess = Math.max(0, inputs.culture - cardRemaining);
    const creditDeduction = Math.round(creditExcess * 0.15);
    const debitDeduction = Math.round(debitExcess * 0.30);
    const cashDeduction = Math.round(cashExcess * 0.30);
    const basicDeduction = creditDeduction + debitDeduction + cashDeduction;
    let baseLimit = 3000000;
    if (salary > 120000000) {
        baseLimit = 2000000;
    } else if (salary > 70000000) {
        baseLimit = 2500000;
    }
    baseLimit += Math.min((inputs.cardChildren || 0) * 500000, 1000000);
    const finalBasic = Math.min(basicDeduction, baseLimit);
    const transportDeduction = Math.round(transportExcess * 0.40);
    const marketDeduction = Math.round(marketExcess * 0.40);
    const cultureDeductionVal = salary <= 70000000 ? Math.round(cultureExcess * 0.30) : 0;
    const additionalDeduction = transportDeduction + marketDeduction + cultureDeductionVal;
    let additionalLimit = 3000000;
    if (salary > 120000000) {
        additionalLimit = 2000000;
    } else if (salary > 70000000) {
        additionalLimit = 2500000;
    }
    const finalAdditional = Math.min(additionalDeduction, additionalLimit);
    cardDeduction = finalBasic + finalAdditional;
    // 주택자금 소득공제
    let housingIncomeDeduction = 0;
    if (salary <= 70000000 && inputs.housingSubscription > 0) {
        housingIncomeDeduction += Math.min(inputs.housingSubscription, 3000000) * 0.40;
    }
    housingIncomeDeduction += Math.min(inputs.rentLoanPayment * 0.40, 4000000);
    housingIncomeDeduction += Math.min(inputs.mortgageInterest, 18000000);
    const totalIncomeDeduction = personalDeduction + socialInsuranceDeduction + cardDeduction + housingIncomeDeduction;
    // 과세표준
    let taxableIncome = earnedIncome - totalIncomeDeduction;
    taxableIncome = Math.max(0, taxableIncome);
    // ==========================================
    // 3. 산출세액 (2026년 세율)
    // ==========================================
    let calculatedTax = 0;
    if (taxableIncome <= 14000000) {
        calculatedTax = taxableIncome * 0.06;
    } else if (taxableIncome <= 50000000) {
        calculatedTax = 840000 + (taxableIncome - 14000000) * 0.15;
    } else if (taxableIncome <= 88000000) {
        calculatedTax = 6240000 + (taxableIncome - 50000000) * 0.24;
    } else if (taxableIncome <= 150000000) {
        calculatedTax = 15360000 + (taxableIncome - 88000000) * 0.35;
    } else if (taxableIncome <= 300000000) {
        calculatedTax = 37060000 + (taxableIncome - 150000000) * 0.38;
    } else if (taxableIncome <= 500000000) {
        calculatedTax = 94060000 + (taxableIncome - 300000000) * 0.4;
    } else if (taxableIncome <= 1000000000) {
        calculatedTax = 174060000 + (taxableIncome - 500000000) * 0.42;
    } else {
        calculatedTax = 384060000 + (taxableIncome - 1000000000) * 0.45;
    }
    // ==========================================
    // 4. 세액공제 항목
    // ==========================================
    // 의료비 세액공제
    const medicalThreshold = salary * 0.03;
    const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
    const netMedical = Math.max(0, totalMedical - inputs.insuranceReimbursement);
    let medicalDeduction = 0;
    const eligibleMedical = Math.max(0, netMedical - medicalThreshold);
    if (eligibleMedical > 0) {
        const ratio = eligibleMedical / netMedical;
        medicalDeduction += inputs.infertility * ratio * 0.30;
        medicalDeduction += inputs.premature * ratio * 0.20;
        medicalDeduction += inputs.selfDisabledSenior * ratio * 0.15;
        medicalDeduction += Math.min(inputs.otherFamily * ratio, 7000000) * 0.15;
    }
    // 교육비 세액공제
    let educationDeduction = 0;
    educationDeduction += inputs.selfEducation * 0.15;
    educationDeduction += Math.min(inputs.preschool, 3000000) * 0.15;
    educationDeduction += Math.min(inputs.elementary, 3000000) * 0.15;
    educationDeduction += Math.min(inputs.university, 9000000) * 0.15;
    // 주택자금 세액공제 (월세)
    let housingTaxCredit = 0;
    if (inputs.monthlyRent > 0) {
        const rentRate = salary <= 55000000 ? 0.17 : 0.15;
        housingTaxCredit = Math.min(inputs.monthlyRent, 10000000) * rentRate;
    }
    // 연금계좌 세액공제
    const pensionRate = 0.12;
    const pensionSavingsLimit = Math.min(inputs.pensionSavings, 6000000);
    const irpLimit = Math.min(inputs.irp, 9000000 - pensionSavingsLimit);
    const isaLimit = Math.min((inputs.isaTransfer || 0) * 0.1, 3000000);
    const pensionDeduction = (pensionSavingsLimit + irpLimit + isaLimit) * pensionRate;
    // 보장성 보험료 세액공제
    const generalInsuranceCredit = Math.min(inputs.generalInsurance, 1000000) * 0.12;
    const disabledInsuranceCredit = Math.min(inputs.disabledInsurance, 1000000) * 0.15;
    const insuranceDeduction = generalInsuranceCredit + disabledInsuranceCredit;
    // 기부금 세액공제
    let donationDeduction = 0;
    if (inputs.politicalDonation > 0) {
        const politicalBase = Math.min(inputs.politicalDonation, 100000) * (100 / 110);
        const politicalExcess = Math.max(0, inputs.politicalDonation - 100000);
        const politicalExcess15 = Math.min(politicalExcess, 30000000);
        const politicalExcess25 = Math.max(0, politicalExcess - 30000000);
        donationDeduction += politicalBase + politicalExcess15 * 0.15 + politicalExcess25 * 0.25;
    }
    if (inputs.hometownDonation > 0) {
        const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
        const hometownBase = Math.min(hometownLimited, 100000) * (100 / 110);
        const hometownExcess = Math.max(0, hometownLimited - 100000) * 0.15;
        donationDeduction += hometownBase + hometownExcess;
    }
    if (inputs.hometownDisaster > 0) {
        const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
        const disasterLimited = Math.min(inputs.hometownDisaster, Math.max(0, 20000000 - hometownLimited));
        const disasterBase = Math.min(disasterLimited, 100000) * (100 / 110);
        const disasterExcess = Math.max(0, disasterLimited - 100000) * 0.30;
        donationDeduction += disasterBase + disasterExcess;
    }
    if (inputs.specialDonation > 0) {
        const special15 = Math.min(inputs.specialDonation, 10000000) * 0.15;
        const special30 = Math.max(0, inputs.specialDonation - 10000000) * 0.30;
        donationDeduction += special15 + special30;
    }
    if (inputs.employeeDonation > 0) {
        const employeeLimited = Math.min(inputs.employeeDonation, earnedIncome * 0.30);
        const employee15 = Math.min(employeeLimited, 10000000) * 0.15;
        const employee30 = Math.max(0, employeeLimited - 10000000) * 0.30;
        donationDeduction += employee15 + employee30;
    }
    if (inputs.designatedDonation > 0) {
        const designatedLimited = Math.min(inputs.designatedDonation, earnedIncome * 0.30);
        const designated15 = Math.min(designatedLimited, 10000000) * 0.15;
        const designated30 = Math.max(0, designatedLimited - 10000000) * 0.30;
        donationDeduction += designated15 + designated30;
    }
    if (inputs.religiousDonation > 0) {
        const religiousLimited = Math.min(inputs.religiousDonation, earnedIncome * 0.10);
        const religious15 = Math.min(religiousLimited, 10000000) * 0.15;
        const religious30 = Math.max(0, religiousLimited - 10000000) * 0.30;
        donationDeduction += religious15 + religious30;
    }
    // ==========================================
    // 5. 자녀 세액공제
    // ==========================================
    let childTaxCredit = 0;
    const childrenOver8 = inputs.childrenOver8 || 0;
    if (childrenOver8 === 1) {
        childTaxCredit += 250000;
    } else if (childrenOver8 === 2) {
        childTaxCredit += 550000;
    } else if (childrenOver8 >= 3) {
        childTaxCredit += 550000 + (childrenOver8 - 2) * 400000;
    }
    const birthAdoption = inputs.birthAdoption || "none";
    if (birthAdoption === "first") {
        childTaxCredit += 300000;
    } else if (birthAdoption === "second") {
        childTaxCredit += 500000;
    } else if (birthAdoption === "third1") {
        childTaxCredit += 700000;
    } else if (birthAdoption === "third2") {
        childTaxCredit += 1400000;
    } else if (birthAdoption === "third3") {
        childTaxCredit += 2100000;
    }
    // ==========================================
    // 6. 근로소득세액공제
    // ==========================================
    let earnedIncomeTaxCredit = 0;
    if (calculatedTax <= 1300000) {
        earnedIncomeTaxCredit = calculatedTax * 0.55;
    } else {
        earnedIncomeTaxCredit = 715000 + (calculatedTax - 1300000) * 0.30;
    }
    let earnedIncomeTaxCreditLimit = 0;
    if (salary <= 33000000) {
        earnedIncomeTaxCreditLimit = 740000;
    } else if (salary <= 70000000) {
        earnedIncomeTaxCreditLimit = Math.max(660000, 740000 - (salary - 33000000) * 0.008);
    } else if (salary <= 120000000) {
        earnedIncomeTaxCreditLimit = Math.max(500000, 660000 - (salary - 70000000) * 0.5);
    } else {
        earnedIncomeTaxCreditLimit = Math.max(200000, 500000 - (salary - 120000000) * 0.5);
    }
    earnedIncomeTaxCredit = Math.min(earnedIncomeTaxCredit, earnedIncomeTaxCreditLimit);
    // 총 세액공제
    const totalTaxCredit = earnedIncomeTaxCredit + medicalDeduction + educationDeduction + housingTaxCredit + pensionDeduction + insuranceDeduction + donationDeduction + childTaxCredit;
    // 결정세액
    const finalTax = Math.max(0, calculatedTax - totalTaxCredit);
    // 환급액 또는 추가납부액
    const refund = inputs.withheldTax - finalTax;
    return {
        salary: Math.round(salary),
        earnedIncome: Math.round(earnedIncome),
        incomeDeduction: Math.round(incomeDeduction),
        totalIncomeDeduction: Math.round(totalIncomeDeduction),
        personalDeduction: Math.round(personalDeduction),
        cardDeduction: Math.round(cardDeduction),
        medicalDeduction: Math.round(medicalDeduction),
        educationDeduction: Math.round(educationDeduction),
        housingDeduction: Math.round(housingIncomeDeduction + housingTaxCredit),
        pensionDeduction: Math.round(pensionDeduction + insuranceDeduction),
        donationDeduction: Math.round(donationDeduction),
        socialInsuranceDeduction: Math.round(socialInsuranceDeduction),
        childTaxCredit: Math.round(childTaxCredit),
        earnedIncomeTaxCredit: Math.round(earnedIncomeTaxCredit),
        insuranceDeduction: Math.round(insuranceDeduction),
        taxableIncome: Math.round(taxableIncome),
        calculatedTax: Math.round(calculatedTax),
        totalTaxCredit: Math.round(totalTaxCredit),
        finalTax: Math.round(finalTax),
        withheldTax: inputs.withheldTax,
        refund: Math.round(refund)
    };
}
function convertAdminToTaxInputs(adminData) {
    // 연봉 계산 = 급여 + 상여 + 자녀학자금
    const annualSalary = adminData.salary.totalSalary + (adminData.salary.bonus || 0) + (adminData.salary.childTuition || 0);
    // 보육수당 비과세 = 6세 이하 자녀 수 × 20만원 × 12개월
    const childcareAllowance = (adminData.salary.childrenUnder6 || 0) * 200000 * 12;
    // 총 비과세 = 식대 + 보육수당
    const totalNonTaxable = (adminData.salary.mealAllowance || 0) + childcareAllowance;
    // 총급여 = 연봉 - 비과세
    const salary = annualSalary - totalNonTaxable;
    // 부양가족 수 계산
    const dependents = 1 + (adminData.family?.spouse ? 1 : 0) + (adminData.family?.children || 0) + (adminData.family?.parents || 0) + (adminData.family?.siblings || 0) + (adminData.family?.foster || 0) + (adminData.family?.recipient || 0);
    return {
        salary,
        withheldTax: adminData.salary.prepaidTax || 0,
        dependents,
        // 4대보험
        nationalPension: adminData.salary.nationalPension || 0,
        healthInsurance: adminData.salary.healthInsurance || 0,
        longTermCare: adminData.salary.longTermCare || 0,
        employmentInsurance: adminData.salary.employmentInsurance || 0,
        // 카드 사용액
        cardChildren: adminData.family?.children || 0,
        creditCard: adminData.spending?.creditCard || 0,
        debitCard: adminData.spending?.debitCard || 0,
        cash: adminData.spending?.cash || 0,
        traditionalMarket: adminData.spending?.traditionalMarket || 0,
        publicTransport: adminData.spending?.publicTransport || 0,
        culture: adminData.spending?.culture || 0,
        // 의료비 - Admin에 상세 필드 없으면 0
        infertility: 0,
        premature: 0,
        selfDisabledSenior: adminData.deductions?.medical || 0,
        otherFamily: 0,
        insuranceReimbursement: 0,
        // 교육비
        selfEducation: 0,
        preschool: 0,
        elementary: adminData.deductions?.education || 0,
        university: 0,
        // 주택자금
        housingSubscription: 0,
        rentLoanPayment: 0,
        mortgageInterest: 0,
        monthlyRent: 0,
        // 연금 및 보험
        pensionSavings: adminData.deductions?.pension || 0,
        irp: 0,
        isaTransfer: 0,
        generalInsurance: adminData.deductions?.insurance || 0,
        disabledInsurance: 0,
        // 기부금 - Admin에 상세 기부금 필드 없으므로 전체 금액만 정치자금에 임시 할당
        politicalDonation: 0,
        hometownDonation: 0,
        hometownDisaster: 0,
        specialDonation: 0,
        employeeDonation: 0,
        designatedDonation: adminData.deductions?.donation || 0,
        religiousDonation: 0,
        // 자녀공제
        childrenOver8: adminData.family?.childrenOver8 || 0,
        birthAdoption: adminData.family?.birthAdoption || "none"
    };
}
}),
"[project]/app/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-ssr] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/piggy-bank.js [app-ssr] (ecmascript) <export default as PiggyBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-ssr] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-ssr] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tax-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$recommendation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai-recommendation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tax-calculator.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const MOCK_ALERTS = [
    {
        id: "1",
        type: "high",
        message: "신용카드 30만원 추가 사용 시",
        detail: "현재 공제 문턱까지 98% 도달했습니다. 조금만 더 사용하면 최대 공제를 받을 수 있습니다.",
        potentialSaving: "+15만원"
    },
    {
        id: "2",
        type: "high",
        message: "퇴직연금(IRP) 300만원 납입 추천",
        detail: "올해 한도가 남아있습니다. 연말 전에 납입하면 추가 세액공제 가능합니다.",
        potentialSaving: "+45만원"
    },
    {
        id: "3",
        type: "medium",
        message: "기부금 10만원으로 전액 공제",
        detail: "정치자금 기부금 10만원 이하는 전액 세액공제 됩니다.",
        potentialSaving: "+10만원"
    },
    {
        id: "4",
        type: "low",
        message: "의료비 추가 지출 검토",
        detail: "현재 의료비 공제 문턱(총급여 3%)에 근접했습니다.",
        potentialSaving: "+8만원"
    }
];
const MOCK_DEDUCTIONS = [
    {
        id: "1",
        category: "신용카드 등 사용금액",
        type: "소득공제",
        amount: 2500000,
        limit: 3000000,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
        status: "good"
    },
    {
        id: "2",
        category: "주택마련저축",
        type: "소득공제",
        amount: 2400000,
        limit: 3000000,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
        status: "good"
    },
    {
        id: "3",
        category: "의료비",
        type: "세액공제",
        amount: 850000,
        limit: 7000000,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        status: "warning"
    },
    {
        id: "4",
        category: "교육비",
        type: "세액공제",
        amount: 3000000,
        limit: 3000000,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"],
        status: "optimal"
    },
    {
        id: "5",
        category: "기부금",
        type: "세액공제",
        amount: 200000,
        limit: 1000000,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
        status: "critical"
    },
    {
        id: "6",
        category: "연금저축/IRP",
        type: "세액공제",
        amount: 4000000,
        limit: 7000000,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"],
        status: "warning"
    },
    {
        id: "7",
        category: "보험료",
        type: "세액공제",
        amount: 1000000,
        limit: 1000000,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
        status: "optimal"
    }
];
const MOCK_NEWS_ARTICLES = [
    {
        id: "1",
        title: "2026년 결혼세액공제 신설, 신혼부부 최대 100만원 환급",
        source: "한국경제",
        time: "2시간 전",
        isNew: true,
        url: "https://www.google.com/search?q=2026+결혼세액공제"
    },
    {
        id: "2",
        title: "청약저축 소득공제 한도 300만원으로 상향...연말정산 혜택 확대",
        source: "매일경제",
        time: "3시간 전",
        isNew: true,
        url: "https://www.google.com/search?q=청약저축+소득공제+한도+상향"
    },
    {
        id: "3",
        title: "연금저축 세액공제, 2026년부터 이렇게 바뀝니다",
        source: "조선비즈",
        time: "5시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=연금저축+세액공제+2026"
    },
    {
        id: "4",
        title: "ISA 만기자금 연금계좌 전환 시 추가 세액공제 혜택",
        source: "머니투데이",
        time: "6시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=ISA+연금계좌+전환+세액공제"
    },
    {
        id: "5",
        title: "신용카드 vs 체크카드, 연말정산 절세 전략 총정리",
        source: "중앙일보",
        time: "8시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=신용카드+체크카드+연말정산"
    },
    {
        id: "6",
        title: "의료비 공제 문턱 3% 기준, 이렇게 활용하세요",
        source: "한국경제",
        time: "10시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=의료비+공제+3%25+기준"
    },
    {
        id: "7",
        title: "자녀세액공제 확대...다자녀 가구 최대 혜택은?",
        source: "동아일보",
        time: "12시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=자녀세액공제+다자녀"
    },
    {
        id: "8",
        title: "기부금 세액공제율 인상, 나눔의 가치 더 커졌다",
        source: "매일경제",
        time: "1일 전",
        isNew: false,
        url: "https://www.google.com/search?q=기부금+세액공제율+인상"
    },
    {
        id: "9",
        title: "월세 세액공제 한도 상향, 무주택 세입자 절세 팁",
        source: "SBS뉴스",
        time: "1일 전",
        isNew: false,
        url: "https://www.google.com/search?q=월세+세액공제+한도"
    },
    {
        id: "10",
        title: "퇴직연금 IRP 납입, 연말 전 꼭 챙겨야 할 이유",
        source: "KBS뉴스",
        time: "2일 전",
        isNew: false,
        url: "https://www.google.com/search?q=퇴직연금+IRP+연말정산"
    }
];
function formatNumber(num) {
    return num.toLocaleString("ko-KR");
}
function getUtilizationColor(rate) {
    if (rate >= 90) return "bg-neo-cyan";
    if (rate >= 70) return "bg-neo-yellow";
    if (rate >= 40) return "bg-neo-orange";
    return "bg-red-400";
}
function getStatusBadge(status) {
    switch(status){
        case "optimal":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block px-2 py-1 text-xs font-bold bg-neo-cyan border-2 border-black whitespace-nowrap",
                children: "최적"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 232,
                columnNumber: 20
            }, this);
        case "good":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block px-2 py-1 text-xs font-bold bg-neo-yellow border-2 border-black whitespace-nowrap",
                children: "양호"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 234,
                columnNumber: 20
            }, this);
        case "warning":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block px-2 py-1 text-xs font-bold bg-neo-orange border-2 border-black whitespace-nowrap",
                children: "개선"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 236,
                columnNumber: 20
            }, this);
        case "critical":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block px-2 py-1 text-xs font-bold bg-red-400 border-2 border-black text-white whitespace-nowrap",
                children: "미달"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 238,
                columnNumber: 20
            }, this);
    }
}
function ArrowRight({ size = 24, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 12h14"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 259,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m12 5 7 7-7 7"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 260,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 247,
        columnNumber: 9
    }, this);
}
function DashboardPage() {
    const [goalAmount, setGoalAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1200000);
    const [newsArticles, setNewsArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newsLoading, setNewsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showAllNews, setShowAllNews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false); // 더보기 상태
    const [aiRecommendations, setAiRecommendations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hasUserData, setHasUserData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deductionItems, setDeductionItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hasAdminData, setHasAdminData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentAmount, setCurrentAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPrepaidTax, setTotalPrepaidTax] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0); // 기납부세액 총액 (목표 상한선)
    const goalProgress = Math.min(100, Math.round(currentAmount / goalAmount * 100));
    const totalPotentialSaving = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$recommendation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateTotalPotentialSaving"])(aiRecommendations);
    // AI 추천 생성
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const taxData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadTaxData"])();
        if (taxData && taxData.salary > 0) {
            const recommendations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$recommendation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateRecommendations"])(taxData);
            setAiRecommendations(recommendations);
            setHasUserData(true);
        } else {
            setAiRecommendations((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$recommendation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultRecommendations"])());
            setHasUserData(false);
        }
    }, []);
    // Admin 데이터로 공제 분석 및 환급액 계산
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 2026년 우선, 없으면 2025년 데이터 사용
        let adminData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadAdminData"])(2026);
        if (!adminData) {
            adminData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadAdminData"])(2025);
        }
        if (adminData) {
            const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateDeductionAnalysis"])(adminData);
            setDeductionItems(analysis);
            setHasAdminData(true);
            // 공통 세금 계산 모듈 사용
            const taxInputs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertAdminToTaxInputs"])(adminData);
            const taxResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateTax"])(taxInputs);
            // 기납부세액 저장 (목표 상한선)
            const withheldTax = adminData.salary.prepaidTax || 0;
            setTotalPrepaidTax(withheldTax);
            // 환급액 설정 (Calculator와 동일한 계산 결과)
            setCurrentAmount(taxResult.refund);
            // 목표 금액 초기화: 최대 환급 가능 금액 (기납부세액)
            if (withheldTax > 0) {
                setGoalAmount(withheldTax);
            }
        } else {
            // 데이터 없으면 기본 Mock 사용
            setDeductionItems(MOCK_DEDUCTIONS.map((d)=>({
                    id: d.id,
                    category: d.category,
                    type: d.type,
                    amount: d.amount,
                    limit: d.limit,
                    status: d.status
                })));
            setHasAdminData(false);
            setCurrentAmount(0);
        }
    }, []);
    // 뉴스 가져오기
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchNews() {
            try {
                const response = await fetch("/api/news");
                const data = await response.json();
                if (data.success && data.data.length > 0) {
                    setNewsArticles(data.data);
                } else {
                    // API 실패 시 목업 데이터 사용
                    setNewsArticles(MOCK_NEWS_ARTICLES);
                }
            } catch (error) {
                console.error("News fetch error:", error);
                setNewsArticles(MOCK_NEWS_ARTICLES);
            } finally{
                setNewsLoading(false);
            }
        }
        fetchNews();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "neo-card bg-neo-white relative overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 right-0 opacity-10 pointer-events-none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        size: 120
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 366,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold mb-4 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `w-3 h-3 ${currentAmount >= 0 ? 'bg-neo-orange' : 'bg-red-500'} rounded-full`
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 370,
                                            columnNumber: 29
                                        }, this),
                                        "2026년 예상 ",
                                        currentAmount >= 0 ? '환급액' : '추가납부액'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row items-end gap-4 mb-4",
                                    children: [
                                        hasAdminData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-5xl md:text-7xl font-black tracking-tighter ${currentAmount >= 0 ? 'text-neo-black' : 'text-red-600'}`,
                                            children: [
                                                currentAmount > 0 ? '-' : currentAmount < 0 ? '+' : '',
                                                formatNumber(Math.abs(currentAmount)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl text-gray-500 font-bold ml-1",
                                                    children: "원"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 375,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl md:text-3xl font-bold text-gray-400",
                                            children: "기초자료를 먼저 입력해주세요"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 33
                                        }, this),
                                        hasAdminData && currentAmount >= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "neo-badge bg-neo-cyan text-black mb-2",
                                            children: "예상 환급"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 33
                                        }, this),
                                        hasAdminData && currentAmount < 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "neo-badge bg-red-400 text-white mb-2",
                                            children: "추가 납부 예상"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 390,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 373,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold",
                                                    children: "목표 달성률"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold",
                                                    children: currentAmount >= 0 ? `${goalProgress}%` : '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full bg-gray-200 h-4 border-2 border-black relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-0 left-0 h-full ${currentAmount >= 0 ? 'bg-neo-orange' : 'bg-red-400'} border-r-2 border-black transition-all duration-500`,
                                                style: {
                                                    width: currentAmount >= 0 ? `${goalProgress}%` : '0%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 403,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 402,
                                            columnNumber: 29
                                        }, this),
                                        currentAmount >= 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold mt-2 text-gray-600",
                                            children: [
                                                "목표까지 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-neo-orange",
                                                    children: [
                                                        formatNumber(goalAmount - currentAmount),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 42
                                                }, this),
                                                " 남음"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 409,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold mt-2 text-red-500",
                                            children: "⚠️ 추가 공제 받을 수 있는 항목을 확인해 주세요."
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 413,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 397,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 364,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-l-0 lg:border-l-4 border-black pl-0 lg:pl-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold mb-4 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                            size: 20,
                                            className: "text-neo-orange"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 423,
                                            columnNumber: 29
                                        }, this),
                                        "환급액 목표 설정"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 422,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        totalPrepaidTax > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 border border-gray-300",
                                            children: [
                                                "최대 환급 가능: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-neo-black",
                                                    children: [
                                                        formatNumber(totalPrepaidTax),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 47
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setGoalAmount((prev)=>Math.max(100000, prev - 100000)),
                                                    className: "w-10 h-10 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 border-2 border-black p-3 bg-white text-center font-black text-xl",
                                                    children: [
                                                        formatNumber(goalAmount),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const maxGoal = totalPrepaidTax > 0 ? totalPrepaidTax : Infinity;
                                                        setGoalAmount((prev)=>Math.min(prev + 100000, maxGoal));
                                                    },
                                                    disabled: totalPrepaidTax > 0 && goalAmount >= totalPrepaidTax,
                                                    className: `w-10 h-10 border-2 border-black font-bold flex items-center justify-center ${totalPrepaidTax > 0 && goalAmount >= totalPrepaidTax ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-2",
                                            children: [
                                                800000,
                                                1000000,
                                                1500000
                                            ].map((amount)=>{
                                                const isDisabled = totalPrepaidTax > 0 && amount > totalPrepaidTax;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>!isDisabled && setGoalAmount(amount),
                                                    disabled: isDisabled,
                                                    className: `py-2 border-2 border-black text-sm font-bold transition-all ${isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : goalAmount === amount ? "bg-neo-yellow shadow-[2px_2px_0px_0px_#000]" : "bg-white hover:bg-gray-100"}`,
                                                    children: formatNumber(amount)
                                                }, amount, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 41
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 457,
                                            columnNumber: 29
                                        }, this),
                                        (()=>{
                                            const optimizedAmount = currentAmount + totalPotentialSaving;
                                            if (optimizedAmount >= 0) {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-600 font-medium",
                                                    children: [
                                                        "AI 추천: 최적화 시 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-neo-orange font-bold",
                                                            children: [
                                                                formatNumber(optimizedAmount),
                                                                "원"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 58
                                                        }, this),
                                                        " 달성 가능"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 41
                                                }, this);
                                            } else {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-600 font-medium",
                                                    children: [
                                                        "AI 추천: 최적화 시 추가납부 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500 font-bold",
                                                            children: [
                                                                formatNumber(Math.abs(optimizedAmount)),
                                                                "원"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 488,
                                                            columnNumber: 63
                                                        }, this),
                                                        "으로 감소 가능"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 41
                                                }, this);
                                            }
                                        })()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 426,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 421,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 362,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 360,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "neo-card bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-black mb-6 flex items-center gap-2 border-b-2 border-black pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                size: 24,
                                className: "text-neo-orange"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 501,
                                columnNumber: 21
                            }, this),
                            "AI 공제 항목별 상세 분석",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto text-sm font-medium text-gray-500",
                                children: "2026년 기준"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 503,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 500,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border-collapse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b-4 border-black",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left py-3 px-4 font-black",
                                                children: "공제 항목"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 511,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center py-3 px-4 font-black hidden sm:table-cell",
                                                children: "구분"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 512,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right py-3 px-4 font-black",
                                                children: "공제 금액"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right py-3 px-4 font-black hidden md:table-cell",
                                                children: "최대한도"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center py-3 px-4 font-black",
                                                children: "활용률"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 515,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center py-3 px-4 font-black",
                                                children: "상태"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 516,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 509,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: deductionItems.map((item, index)=>{
                                        const iconMap = {
                                            "기본공제 (인적공제)": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                            "4대보험": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
                                            "신용카드 등 사용금액": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
                                            "주택자금(청약저축)": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
                                            "주택자금(청약저축+임차차입금)": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
                                            "주택자금(장기주택저당차입금이자\n상환액)": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
                                            "월세 세액공제": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
                                            "의료비": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
                                            "교육비": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"],
                                            "기부금": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
                                            "연금저축/IRP": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"],
                                            "보험료": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
                                            "자녀": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                                        };
                                        const Icon = iconMap[item.category] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"];
                                        const maxValue = item.maxBenefit || item.limit;
                                        const utilizationRate = maxValue > 0 ? Math.min(100, Math.round(item.amount / maxValue * 100)) : 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: `border-b-2 border-black hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-4 px-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 border-2 border-black bg-neo-yellow flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 548,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold whitespace-pre-line",
                                                                children: item.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 550,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-center py-4 px-2 sm:px-4 hidden sm:table-cell",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 text-xs font-bold border-2 border-black whitespace-nowrap ${item.type === "소득공제" ? "bg-neo-cyan" : "bg-neo-orange"}`,
                                                        children: item.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-right py-3 px-2 sm:px-4 text-sm sm:text-base",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-bold whitespace-nowrap",
                                                            children: [
                                                                formatNumber(Math.round(item.amount)),
                                                                "원"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 45
                                                        }, this),
                                                        item.thresholdInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-400 mt-0.5 whitespace-pre-line text-right",
                                                            children: item.thresholdInfo
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 562,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-right py-4 px-4 text-gray-500 hidden md:table-cell whitespace-pre-line",
                                                    children: item.category === "교육비" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs",
                                                        children: [
                                                            "본인: 한도 없음",
                                                            "\n",
                                                            "미취학: 1인당 3,000,000원",
                                                            "\n",
                                                            "초중고: 1인당 3,000,000원",
                                                            "\n",
                                                            "대학: 1인당 9,000,000원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 49
                                                    }, this) : item.category === "의료비" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs",
                                                        children: [
                                                            "난임시술비: 한도 없음",
                                                            "\n",
                                                            "미숙아·선천성: 한도 없음",
                                                            "\n",
                                                            "본인/장애/만65/6세: 한도 없음",
                                                            "\n",
                                                            "그 밖의 부양가족: 7,000,000원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 49
                                                    }, this) : item.category === "기부금" && item.donationLimits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs",
                                                        children: [
                                                            "정치자금: ",
                                                            formatNumber(item.donationLimits.politicalFund),
                                                            "원",
                                                            "\n",
                                                            "고향사랑/특별재난: ",
                                                            formatNumber(item.donationLimits.hometownDisaster),
                                                            "원",
                                                            "\n",
                                                            "특례기부금: ",
                                                            formatNumber(item.donationLimits.specialDonation),
                                                            "원",
                                                            "\n",
                                                            "우리사주조합: ",
                                                            formatNumber(item.donationLimits.employeeStock),
                                                            "원",
                                                            "\n",
                                                            "일반기부(종교): ",
                                                            formatNumber(item.donationLimits.generalReligious),
                                                            "원",
                                                            "\n",
                                                            "일반기부(종교 외): ",
                                                            formatNumber(item.donationLimits.generalNonReligious),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 49
                                                    }, this) : item.category === "자녀" && item.childLimits ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs",
                                                        children: [
                                                            "자녀 세액공제:",
                                                            "\n",
                                                            "1명: ",
                                                            formatNumber(item.childLimits.first),
                                                            "원",
                                                            "\n",
                                                            "2명: ",
                                                            formatNumber(item.childLimits.second),
                                                            "원",
                                                            "\n",
                                                            "3명 이상: ",
                                                            formatNumber(item.childLimits.thirdPlus),
                                                            "원",
                                                            "\n",
                                                            "───",
                                                            "\n",
                                                            "출생·입양 공제:",
                                                            "\n",
                                                            "첫째: ",
                                                            formatNumber(item.childLimits.birthFirst),
                                                            "원",
                                                            "\n",
                                                            "둘째: ",
                                                            formatNumber(item.childLimits.birthSecond),
                                                            "원",
                                                            "\n",
                                                            "셋째 이상: 1인당 ",
                                                            formatNumber(item.childLimits.birthThirdPlus),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 49
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            formatNumber(item.limit),
                                                            "원"
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-3 px-1 sm:px-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-1 sm:gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-12 sm:w-20 h-3 bg-gray-200 border border-black relative",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `h-full ${getUtilizationColor(utilizationRate)} transition-all`,
                                                                    style: {
                                                                        width: `${Math.min(100, utilizationRate)}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 598,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs sm:text-sm font-bold w-10 sm:w-12 text-right",
                                                                children: [
                                                                    utilizationRate,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 603,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 595,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-center py-3 px-1 sm:px-4",
                                                    children: getStatusBadge(item.status)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 606,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 540,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 519,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 508,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 507,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 p-4 border-2 border-black bg-gray-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 24,
                                            className: "text-neo-cyan flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 620,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold",
                                                    children: "전체 공제 활용률"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600",
                                                    children: "7개 항목 중 2개 최적화 완료"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 621,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 619,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t-2 border-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 bg-neo-cyan border-2 border-black",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 text-xs font-bold bg-white border-2 border-black",
                                                            children: "소득공제"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 632,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium",
                                                            children: "과세표준 감소"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 631,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-700",
                                                                    children: "현재 공제액"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 637,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xl sm:text-2xl font-black",
                                                                    children: [
                                                                        formatNumber(MOCK_DEDUCTIONS.filter((d)=>d.type === "소득공제").reduce((sum, d)=>sum + d.amount, 0)),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 638,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-700",
                                                                    children: "최대 한도"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 641,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold text-gray-800",
                                                                    children: [
                                                                        formatNumber(MOCK_DEDUCTIONS.filter((d)=>d.type === "소득공제").reduce((sum, d)=>sum + d.limit, 0)),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 642,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 w-full bg-white h-2 border border-black",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full bg-neo-black",
                                                        style: {
                                                            width: `${Math.round(MOCK_DEDUCTIONS.filter((d)=>d.type === "소득공제").reduce((sum, d)=>sum + d.amount, 0) / MOCK_DEDUCTIONS.filter((d)=>d.type === "소득공제").reduce((sum, d)=>sum + d.limit, 0) * 100)}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 630,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 bg-neo-orange border-2 border-black",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 text-xs font-bold bg-white border-2 border-black",
                                                            children: "세액공제"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-white",
                                                            children: "납부세액 직접 감소"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-800",
                                                                    children: "현재 공제액"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 663,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xl sm:text-2xl font-black text-white",
                                                                    children: [
                                                                        formatNumber(MOCK_DEDUCTIONS.filter((d)=>d.type === "세액공제").reduce((sum, d)=>sum + d.amount, 0)),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 664,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 662,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-800",
                                                                    children: "최대 한도"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 667,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold text-white",
                                                                    children: [
                                                                        formatNumber(MOCK_DEDUCTIONS.filter((d)=>d.type === "세액공제").reduce((sum, d)=>sum + d.limit, 0)),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 668,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 666,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 w-full bg-white h-2 border border-black",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full bg-neo-black",
                                                        style: {
                                                            width: `${Math.round(MOCK_DEDUCTIONS.filter((d)=>d.type === "세액공제").reduce((sum, d)=>sum + d.amount, 0) / MOCK_DEDUCTIONS.filter((d)=>d.type === "세액공제").reduce((sum, d)=>sum + d.limit, 0) * 100)}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 672,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 671,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 656,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 628,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row justify-between items-center gap-2 pt-3 border-t-2 border-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center sm:text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-gray-600",
                                                    children: "전체 합계: "
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-lg",
                                                    children: [
                                                        formatNumber(MOCK_DEDUCTIONS.reduce((sum, d)=>sum + d.amount, 0)),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: " / "
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 687,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-gray-600",
                                                    children: [
                                                        formatNumber(MOCK_DEDUCTIONS.reduce((sum, d)=>sum + d.limit, 0)),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 684,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-3 h-3 bg-neo-cyan border border-black"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "소득공제"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 692,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-3 h-3 bg-neo-orange border border-black ml-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 693,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "세액공제"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 690,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 683,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 618,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 617,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 499,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "neo-card bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                        size: 20,
                                        className: "text-neo-yellow"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 705,
                                        columnNumber: 25
                                    }, this),
                                    "AI 절세 추천",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto neo-badge bg-neo-orange text-white text-sm",
                                        children: [
                                            "+",
                                            formatNumber(totalPotentialSaving),
                                            "원 가능"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 707,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 704,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    aiRecommendations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8 text-gray-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                                size: 32,
                                                className: "mx-auto mb-2 text-gray-300"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 714,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "계산기에서 데이터를 입력하면 AI 추천을 받을 수 있습니다."
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 715,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 713,
                                        columnNumber: 29
                                    }, this) : aiRecommendations.map((rec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-2 border-black p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer bg-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            type: rec.priority
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 724,
                                                            columnNumber: 41
                                                        }, this),
                                                        rec.potentialSaving > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-black text-neo-cyan",
                                                            children: [
                                                                "+",
                                                                formatNumber(rec.potentialSaving),
                                                                "원"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 726,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-lg leading-tight mb-1",
                                                    children: rec.message
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 731,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600",
                                                    children: rec.detail
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 37
                                                }, this),
                                                rec.action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-neo-orange font-bold mt-2",
                                                    children: [
                                                        "💡 ",
                                                        rec.action
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 736,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, rec.id, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 719,
                                            columnNumber: 33
                                        }, this)),
                                    !hasUserData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/calculator",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "w-full py-3 font-bold border-2 border-black bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                            children: "계산기로 이동 →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 745,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 744,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 711,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 703,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "neo-card bg-neo-black text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4 border-b-2 border-white pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-black flex items-center gap-2 text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                size: 20,
                                                className: "text-neo-yellow"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 757,
                                                columnNumber: 29
                                            }, this),
                                            "연말정산 뉴스"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-400 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 bg-neo-cyan rounded-full animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 33
                                                    }, this),
                                                    "3시간마다 업데이트"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 761,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowAllNews(!showAllNews),
                                                className: "text-sm font-bold text-neo-yellow hover:text-white transition-colors flex items-center gap-1",
                                                children: showAllNews ? '접기 -' : '더보기 +'
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 760,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 755,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: newsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center py-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            size: 32,
                                            className: "text-neo-yellow animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 776,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-3 text-gray-400",
                                            children: "뉴스를 불러오는 중..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 777,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 775,
                                    columnNumber: 29
                                }, this) : newsArticles.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        newsArticles.filter((article)=>{
                                            // "N일 전" 형식에서 일수 추출
                                            const dayMatch = article.time.match(/(\d+)일/);
                                            if (dayMatch) {
                                                return parseInt(dayMatch[1]) <= 10;
                                            }
                                            // "N시간 전" 또는 "NEW"는 항상 표시
                                            return true;
                                        }).map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: article.url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "block bg-gray-900 border border-gray-700 p-3 hover:bg-gray-800 transition-colors cursor-pointer group",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 mb-1",
                                                                    children: [
                                                                        article.isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "px-1.5 py-0.5 text-[10px] font-bold bg-neo-orange text-white border border-neo-orange",
                                                                            children: "NEW"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 804,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-400",
                                                                            children: article.source
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 806,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: "•"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 807,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: article.time
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 808,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 802,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-sm text-white group-hover:text-neo-yellow transition-colors line-clamp-2",
                                                                    children: article.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 810,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 801,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {
                                                            size: 16,
                                                            className: "text-gray-500 group-hover:text-neo-yellow transition-colors flex-shrink-0 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 814,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 45
                                                }, this)
                                            }, article.id, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 793,
                                                columnNumber: 41
                                            }, this)),
                                        showAllNews && newsArticles.filter((article)=>{
                                            const dayMatch = article.time.match(/(\d+)일/);
                                            return dayMatch && parseInt(dayMatch[1]) > 10;
                                        }).map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: article.url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "block bg-gray-800 border border-gray-600 p-3 hover:bg-gray-700 transition-colors cursor-pointer group opacity-80",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-400",
                                                                            children: article.source
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 836,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: "•"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 837,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: article.time
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 838,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 835,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-medium text-sm text-gray-300 group-hover:text-neo-yellow transition-colors line-clamp-2",
                                                                    children: article.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 840,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 834,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {
                                                            size: 16,
                                                            className: "text-gray-500 group-hover:text-neo-yellow transition-colors flex-shrink-0 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 844,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 833,
                                                    columnNumber: 45
                                                }, this)
                                            }, article.id, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 826,
                                                columnNumber: 41
                                            }, this))
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 text-gray-400",
                                    children: "뉴스를 불러올 수 없습니다."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 850,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 773,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 754,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 701,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "neo-card bg-neo-yellow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 32,
                                    className: "text-neo-black"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 862,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-black",
                                            children: "지금 바로 절세 최적화를 시작하세요!"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 864,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium",
                                            children: [
                                                "AI가 분석한 추천 항목을 실행하면 최대 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: [
                                                        formatNumber(totalPotentialSaving),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 865,
                                                    columnNumber: 87
                                                }, this),
                                                " 추가 환급 가능"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 865,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 863,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 861,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/calculator",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-8 py-4 bg-neo-black text-white font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all",
                                children: "절세 시뮬레이션 시작"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 869,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 868,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 860,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 859,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 358,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_774941c1._.js.map