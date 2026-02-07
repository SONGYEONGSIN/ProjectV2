module.exports = [
"[project]/components/ui/Tooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function Tooltip({ content, children }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-flex items-center",
        onMouseEnter: ()=>setIsVisible(true),
        onMouseLeave: ()=>setIsVisible(false),
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 5
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 5
                    },
                    className: "absolute z-[9999] bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-black text-white text-xs p-3 border-2 border-white shadow-[4px_4px_0px_0px_#00D9FF] pointer-events-none",
                    children: [
                        content,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Tooltip.tsx",
                            lineNumber: 30,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/Tooltip.tsx",
                    lineNumber: 23,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/Tooltip.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Tooltip.tsx",
        lineNumber: 15,
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
"[project]/app/calculator/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CalculatorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-ssr] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-ssr] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.js [app-ssr] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$baby$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Baby$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/baby.js [app-ssr] (ecmascript) <export default as Baby>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tax-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
// 숫자 포맷 함수
function formatNumber(num) {
    return num.toLocaleString("ko-KR");
}
// 콤마 제거 및 숫자 변환
function parseNumber(str) {
    return parseInt(str.replace(/[^0-9]/g, "")) || 0;
}
// 세금 계산 함수 (CALCULATOR_FORMULAS.md 기준 - 2026년)
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
    // 근로소득금액
    const earnedIncome = salary - incomeDeduction;
    // ==========================================
    // 2. 소득공제 항목
    // ==========================================
    // 인적공제 (부양가족 1인당 150만원)
    const personalDeduction = inputs.dependents * 1500000;
    // 4대보험 소득공제 (전액 공제)
    const socialInsuranceDeduction = inputs.nationalPension + inputs.healthInsurance + inputs.longTermCare + inputs.employmentInsurance;
    // 신용카드 등 소득공제 (UI와 동일한 로직)
    const threshold = salary * 0.25; // 최소 사용금액 (총급여의 25%)
    let cardDeduction = 0;
    // 순차적으로 25% 소진: 신용카드 → 직불카드 → 현금영수증 → 대중교통 → 전통시장 → 문화체육
    let cardRemaining = threshold;
    // 1. 신용카드
    const creditExcess = Math.max(0, inputs.creditCard - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.creditCard);
    // 2. 직불카드
    const debitExcess = Math.max(0, inputs.debitCard - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.debitCard);
    // 3. 현금영수증
    const cashExcess = Math.max(0, inputs.cash - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.cash);
    // 4. 대중교통
    const transportExcess = Math.max(0, inputs.publicTransport - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.publicTransport);
    // 5. 전통시장
    const marketExcess = Math.max(0, inputs.traditionalMarket - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.traditionalMarket);
    // 6. 문화체육
    const cultureExcess = Math.max(0, inputs.culture - cardRemaining);
    // 기본 공제 (신용카드, 직불카드, 현금영수증) - 초과분에만 공제율 적용
    const creditDeduction = Math.round(creditExcess * 0.15);
    const debitDeduction = Math.round(debitExcess * 0.30);
    const cashDeduction = Math.round(cashExcess * 0.30);
    const basicDeduction = creditDeduction + debitDeduction + cashDeduction;
    // 기본 공제 한도: 총급여에 따라 200~300만원 + 자녀 추가한도
    let baseLimit = 3000000;
    if (salary > 120000000) {
        baseLimit = 2000000;
    } else if (salary > 70000000) {
        baseLimit = 2500000;
    }
    baseLimit += Math.min((inputs.cardChildren || 0) * 500000, 1000000);
    const finalBasic = Math.min(basicDeduction, baseLimit);
    // 추가 공제 (대중교통, 전통시장, 문화체육) - 초과분에만 공제율 적용
    const transportDeduction = Math.round(transportExcess * 0.40);
    const marketDeduction = Math.round(marketExcess * 0.40);
    const cultureDeductionVal = salary <= 70000000 ? Math.round(cultureExcess * 0.30) : 0;
    const additionalDeduction = transportDeduction + marketDeduction + cultureDeductionVal;
    // 추가 공제 한도: 총급여에 따라 200~300만원
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
    // 주택청약저축: 총급여 7천만원 이하, 40%, 한도 300만원 (납입액 연간 300만원 한도)
    if (salary <= 70000000 && inputs.housingSubscription > 0) {
        housingIncomeDeduction += Math.min(inputs.housingSubscription, 3000000) * 0.40;
    }
    // 주택임차차입금 원리금상환액: 40%, 연간 공제 한도 400만원
    housingIncomeDeduction += Math.min(inputs.rentLoanPayment * 0.40, 4000000);
    // 장기주택저당차입금 이자상환액: 전액 공제, 300~1,800만원 한도
    housingIncomeDeduction += Math.min(inputs.mortgageInterest, 18000000);
    // 총 소득공제
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
    // 의료비 세액공제 (CALCULATOR_FORMULAS.md 기준)
    // 문턱금액: 총급여의 3%
    const medicalThreshold = salary * 0.03;
    // 총 의료비 (실손보험금 차감)
    const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
    const netMedical = Math.max(0, totalMedical - inputs.insuranceReimbursement);
    let medicalDeduction = 0;
    // 문턱금액 초과분에 대해서만 공제
    const eligibleMedical = Math.max(0, netMedical - medicalThreshold);
    if (eligibleMedical > 0) {
        // 각 항목별 공제 계산 (문턱금액 초과분 비율로 배분)
        const ratio = eligibleMedical / netMedical;
        // 난임시술비 30% (한도 없음)
        medicalDeduction += inputs.infertility * ratio * 0.30;
        // 미숙아/선천성이상아 20% (한도 없음)
        medicalDeduction += inputs.premature * ratio * 0.20;
        // 본인/장애인/65세이상/6세이하 15% (한도 없음)
        medicalDeduction += inputs.selfDisabledSenior * ratio * 0.15;
        // 그 밖의 부양가족 15% (700만원 한도)
        medicalDeduction += Math.min(inputs.otherFamily * ratio, 7000000) * 0.15;
    }
    // 교육비 세액공제 (15%, 한도별 계산)
    let educationDeduction = 0;
    // 본인 교육비: 한도 없음
    educationDeduction += inputs.selfEducation * 0.15;
    // 미취학 자녀: 300만원/인 한도 (간소화를 위해 합계로 처리)
    educationDeduction += Math.min(inputs.preschool, 3000000) * 0.15;
    // 초중고: 300만원/인 한도
    educationDeduction += Math.min(inputs.elementary, 3000000) * 0.15;
    // 대학: 900만원/인 한도
    educationDeduction += Math.min(inputs.university, 9000000) * 0.15;
    // 주택자금 세액공제 (월세)
    let housingTaxCredit = 0;
    // 월세 세액공제: 총급여 5,500만원 이하 17%, 초과 15% (1,000만원 한도)
    if (inputs.monthlyRent > 0) {
        const rentRate = salary <= 55000000 ? 0.17 : 0.15;
        housingTaxCredit = Math.min(inputs.monthlyRent, 10000000) * rentRate;
    }
    // 연금계좌 세액공제 (UI와 동일한 로직 - 12% 고정)
    const pensionRate = 0.12; // 12% (지방세 제외)
    // 연금저축 한도: 600만원
    const pensionSavingsLimit = Math.min(inputs.pensionSavings, 6000000);
    // IRP 합산 한도: 900만원 (연금저축 포함)
    const irpLimit = Math.min(inputs.irp, 9000000 - pensionSavingsLimit);
    // ISA 전환금액: 10%만 공제 대상, 300만원 한도
    const isaLimit = Math.min((inputs.isaTransfer || 0) * 0.1, 3000000);
    const pensionDeduction = (pensionSavingsLimit + irpLimit + isaLimit) * pensionRate;
    // 보장성 보험료 세액공제
    // 일반 보장성 보험: 100만원 한도, 12%
    const generalInsuranceCredit = Math.min(inputs.generalInsurance, 1000000) * 0.12;
    // 장애인 전용 보험: 100만원 한도, 15%
    const disabledInsuranceCredit = Math.min(inputs.disabledInsurance, 1000000) * 0.15;
    const insuranceDeduction = generalInsuranceCredit + disabledInsuranceCredit;
    // 기부금 세액공제 (CALCULATOR_FORMULAS.md 기준)
    let donationDeduction = 0;
    // 정치자금: 10만원 이하 100/110, 초과 15%, 3천만원 초과 25%
    if (inputs.politicalDonation > 0) {
        const politicalBase = Math.min(inputs.politicalDonation, 100000) * (100 / 110);
        const politicalExcess = Math.max(0, inputs.politicalDonation - 100000);
        const politicalExcess15 = Math.min(politicalExcess, 30000000);
        const politicalExcess25 = Math.max(0, politicalExcess - 30000000);
        donationDeduction += politicalBase + politicalExcess15 * 0.15 + politicalExcess25 * 0.25;
    }
    // 고향사랑: 합산 2천만원 한도, 10만원 이하 100/110, 초과 15%
    if (inputs.hometownDonation > 0) {
        const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
        const hometownBase = Math.min(hometownLimited, 100000) * (100 / 110);
        const hometownExcess = Math.max(0, hometownLimited - 100000) * 0.15;
        donationDeduction += hometownBase + hometownExcess;
    }
    // 고향사랑 특별재난: 10만원 이하 100/110, 초과 30%
    if (inputs.hometownDisaster > 0) {
        const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
        const disasterLimited = Math.min(inputs.hometownDisaster, Math.max(0, 20000000 - hometownLimited));
        const disasterBase = Math.min(disasterLimited, 100000) * (100 / 110);
        const disasterExcess = Math.max(0, disasterLimited - 100000) * 0.30;
        donationDeduction += disasterBase + disasterExcess;
    }
    // 특례기부금: 1천만원 이하 15%, 초과 30%
    if (inputs.specialDonation > 0) {
        const special15 = Math.min(inputs.specialDonation, 10000000) * 0.15;
        const special30 = Math.max(0, inputs.specialDonation - 10000000) * 0.30;
        donationDeduction += special15 + special30;
    }
    // 우리사주조합: 소득 30% 한도
    if (inputs.employeeDonation > 0) {
        const employeeLimited = Math.min(inputs.employeeDonation, earnedIncome * 0.30);
        const employee15 = Math.min(employeeLimited, 10000000) * 0.15;
        const employee30 = Math.max(0, employeeLimited - 10000000) * 0.30;
        donationDeduction += employee15 + employee30;
    }
    // 일반기부금 (종교단체 외): 소득 30% 한도
    if (inputs.designatedDonation > 0) {
        const designatedLimited = Math.min(inputs.designatedDonation, earnedIncome * 0.30);
        const designated15 = Math.min(designatedLimited, 10000000) * 0.15;
        const designated30 = Math.max(0, designatedLimited - 10000000) * 0.30;
        donationDeduction += designated15 + designated30;
    }
    // 종교단체: 소득 10% 한도
    if (inputs.religiousDonation > 0) {
        const religiousLimited = Math.min(inputs.religiousDonation, earnedIncome * 0.10);
        const religious15 = Math.min(religiousLimited, 10000000) * 0.15;
        const religious30 = Math.max(0, religiousLimited - 10000000) * 0.30;
        donationDeduction += religious15 + religious30;
    }
    // ==========================================
    // 5. 자녀 세액공제 (CALCULATOR_FORMULAS.md 기준)
    // ==========================================
    let childTaxCredit = 0;
    // 기본공제 대상 자녀 (만 8세 이상)
    // 1명: 25만원, 2명: 55만원, 3명 이상: 55만원 + 2명 초과 1명당 40만원
    const childrenOver8 = inputs.childrenOver8 || 0;
    if (childrenOver8 === 1) {
        childTaxCredit += 250000;
    } else if (childrenOver8 === 2) {
        childTaxCredit += 550000;
    } else if (childrenOver8 >= 3) {
        childTaxCredit += 550000 + (childrenOver8 - 2) * 400000;
    }
    // 출생·입양 공제 (첫째 30만원, 둘째 50만원, 셋째 이상 70만원)
    const birthAdoption = inputs.birthAdoption || "none";
    if (birthAdoption === "first") {
        childTaxCredit += 300000;
    } else if (birthAdoption === "second") {
        childTaxCredit += 500000;
    } else if (birthAdoption === "third1") {
        childTaxCredit += 700000;
    } else if (birthAdoption === "third2") {
        childTaxCredit += 1400000; // 셋째 이상 2명
    } else if (birthAdoption === "third3") {
        childTaxCredit += 2100000; // 셋째 이상 3명
    }
    // ==========================================
    // 6. 근로소득세액공제
    // ==========================================
    // 산출세액 130만원 이하: 산출세액 × 55%
    // 산출세액 130만원 초과: 715,000원 + (산출세액 - 130만원) × 30%
    let earnedIncomeTaxCredit = 0;
    if (calculatedTax <= 1300000) {
        earnedIncomeTaxCredit = calculatedTax * 0.55;
    } else {
        earnedIncomeTaxCredit = 715000 + (calculatedTax - 1300000) * 0.30;
    }
    // 한도 적용
    // 3,300만원 이하: 74만원
    // 3,300만원 초과 7,000만원 이하: 74만원 - (초과분 × 0.008) → 최소 66만원
    // 7,000만원 초과 1억2천만원 이하: 66만원 - (초과분 × 1/2) → 최소 50만원
    // 1억2천만원 초과: 50만원 - (초과분 × 1/2) → 최소 20만원
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
    // 기납부세액 (사용자 입력값 사용)
    const withheldTax = inputs.withheldTax;
    // 환급액 또는 추가납부액
    const refund = withheldTax - finalTax;
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
        withheldTax,
        refund: Math.round(refund)
    };
}
function CalculatorPage() {
    const categories = [
        {
            id: "salary",
            label: "총급여",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
            color: "bg-neo-cyan"
        },
        {
            id: "basic",
            label: "기본공제",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            color: "bg-neo-yellow"
        },
        {
            id: "insurance",
            label: "4대보험",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
            color: "bg-neo-orange"
        },
        {
            id: "card",
            label: "신용카드 등 사용액",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
            color: "bg-neo-cyan"
        },
        {
            id: "medical",
            label: "의료비",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"],
            color: "bg-neo-yellow"
        },
        {
            id: "edu",
            label: "교육비",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"],
            color: "bg-neo-orange"
        },
        {
            id: "house",
            label: "주택자금",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
            color: "bg-neo-cyan"
        },
        {
            id: "pension",
            label: "연금계좌·보험",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
            color: "bg-neo-yellow"
        },
        {
            id: "donation",
            label: "기부금",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"],
            color: "bg-neo-orange"
        },
        {
            id: "childTaxCredit",
            label: "자녀공제",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$baby$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Baby$3e$__["Baby"],
            color: "bg-neo-pink"
        }
    ];
    const [openSection, setOpenSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("salary");
    const [inputs, setInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        annualSalary: 61622780,
        mealAllowance: 2400000,
        childrenUnder6: 1,
        salary: 56822780,
        withheldTax: 1267560,
        localIncomeTax: 126720,
        // 인적공제 상세
        spouse: 0,
        parents: 0,
        children: 3,
        siblings: 0,
        foster: 0,
        recipient: 0,
        dependents: 4,
        nationalPension: 2258520,
        healthInsurance: 1960580,
        longTermCare: 253760,
        employmentInsurance: 511390,
        // 카드 사용액
        cardChildren: 0,
        creditCard: 15241850,
        debitCard: 11036540,
        cash: 6162286,
        traditionalMarket: 1984300,
        publicTransport: 1358970,
        culture: 203767,
        // 의료비
        infertility: 0,
        premature: 0,
        selfDisabledSenior: 454200,
        otherFamily: 1402140,
        insuranceReimbursement: 467488,
        medical: 1388852,
        // 교육비
        selfEducation: 0,
        preschool: 180000,
        elementary: 1448170,
        university: 0,
        education: 1628170,
        // 주택자금
        housingSubscription: 0,
        rentLoanPayment: 0,
        mortgageInterest: 0,
        monthlyRent: 0,
        housing: 0,
        // 연금 및 보험
        pensionSavings: 6000000,
        irp: 3000000,
        isaTransfer: 0,
        generalInsurance: 1000000,
        disabledInsurance: 0,
        pension: 9000000,
        // 기부금
        politicalDonation: 100000,
        hometownDonation: 100000,
        hometownDisaster: 0,
        specialDonation: 0,
        employeeDonation: 0,
        designatedDonation: 0,
        religiousDonation: 0,
        // 자녀공제 (세액공제)
        childrenOver8: 0,
        birthAdoption: "none"
    });
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCalculating, setIsCalculating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleInputChange = (field, value)=>{
        if (typeof value === "string") {
            const numValue = parseNumber(value);
            setInputs((prev)=>{
                const updated = {
                    ...prev,
                    [field]: numValue
                };
                // 총급여액 자동 계산 (연봉 - 비과세 - 보육수당)
                if (field === "annualSalary" || field === "mealAllowance" || field === "childrenUnder6") {
                    const annualSalary = field === "annualSalary" ? numValue : prev.annualSalary;
                    const mealAllowance = field === "mealAllowance" ? numValue : prev.mealAllowance;
                    const childrenUnder6 = field === "childrenUnder6" ? numValue : prev.childrenUnder6;
                    const childcareAllowance = childrenUnder6 * 200000 * 12; // 6세이하 1인당 월 20만원
                    const totalTaxExempt = mealAllowance + childcareAllowance;
                    updated.salary = Math.max(0, annualSalary - totalTaxExempt);
                }
                // 인적공제 자동 계산 (본인 1 + 배우자 + 직계존속 + 자녀 + 형제자매 + 위탁아동 + 수급자)
                if ([
                    "spouse",
                    "parents",
                    "children",
                    "siblings",
                    "foster",
                    "recipient"
                ].includes(field)) {
                    const spouse = field === "spouse" ? numValue : prev.spouse;
                    const parents = field === "parents" ? numValue : prev.parents;
                    const children = field === "children" ? numValue : prev.children;
                    const siblings = field === "siblings" ? numValue : prev.siblings;
                    const foster = field === "foster" ? numValue : prev.foster;
                    const recipient = field === "recipient" ? numValue : prev.recipient;
                    updated.dependents = 1 + spouse + parents + children + siblings + foster + recipient;
                }
                return updated;
            });
        } else {
            setInputs((prev)=>{
                const updated = {
                    ...prev,
                    [field]: value
                };
                if (field === "childrenUnder6") {
                    const childcareAllowance = value * 200000 * 12;
                    const totalTaxExempt = prev.mealAllowance + childcareAllowance;
                    updated.salary = Math.max(0, prev.annualSalary - totalTaxExempt);
                }
                // 인적공제 자동 계산
                if ([
                    "spouse",
                    "parents",
                    "children",
                    "siblings",
                    "foster",
                    "recipient"
                ].includes(field)) {
                    const spouse = field === "spouse" ? value : prev.spouse;
                    const parents = field === "parents" ? value : prev.parents;
                    const children = field === "children" ? value : prev.children;
                    const siblings = field === "siblings" ? value : prev.siblings;
                    const foster = field === "foster" ? value : prev.foster;
                    const recipient = field === "recipient" ? value : prev.recipient;
                    updated.dependents = 1 + spouse + parents + children + siblings + foster + recipient;
                }
                return updated;
            });
        }
    };
    const handleCalculate = ()=>{
        setIsCalculating(true);
        // 약간의 딜레이를 줘서 계산 중임을 시각적으로 표시
        setTimeout(()=>{
            const taxResult = calculateTax(inputs);
            setResult(taxResult);
            setIsCalculating(false);
            // AI 추천을 위해 세금 데이터 저장
            const taxData = {
                annualSalary: inputs.annualSalary,
                salary: inputs.salary,
                withheldTax: inputs.withheldTax,
                dependents: inputs.dependents,
                spouse: inputs.spouse,
                children: inputs.children,
                nationalPension: inputs.nationalPension,
                healthInsurance: inputs.healthInsurance,
                creditCard: inputs.creditCard,
                debitCard: inputs.debitCard,
                cash: inputs.cash,
                traditionalMarket: inputs.traditionalMarket,
                publicTransport: inputs.publicTransport,
                medical: inputs.medical,
                education: inputs.education,
                housingSubscription: inputs.housingSubscription,
                monthlyRent: inputs.monthlyRent,
                pensionSavings: inputs.pensionSavings,
                irp: inputs.irp,
                generalInsurance: inputs.generalInsurance,
                politicalDonation: inputs.politicalDonation,
                hometownDonation: inputs.hometownDonation,
                designatedDonation: inputs.designatedDonation
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveTaxData"])(taxData);
        }, 500);
    };
    const [isResetting, setIsResetting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingData, setIsLoadingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLoadData = ()=>{
        setIsLoadingData(true);
        const adminData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadAdminData"])(2026); // 2026년 기준
        console.log("[DEBUG] Admin data loaded:", adminData);
        console.log("[DEBUG] Salary data:", adminData?.salary);
        console.log("[DEBUG] totalSalary:", adminData?.salary?.totalSalary);
        console.log("[DEBUG] bonus:", adminData?.salary?.bonus);
        console.log("[DEBUG] childTuition:", adminData?.salary?.childTuition);
        console.log("[DEBUG] Family data:", adminData?.family);
        console.log("[DEBUG] childrenOver8:", adminData?.family?.childrenOver8);
        console.log("[DEBUG] birthAdoption:", adminData?.family?.birthAdoption);
        if (adminData) {
            // Admin 데이터를 Calculator inputs에 매핑
            // 연봉 = 급여 + 상여 + 자녀학자금
            const annualSalary = adminData.salary.totalSalary + (adminData.salary.bonus || 0) + (adminData.salary.childTuition || 0);
            // 보육수당 비과세 = 6세 이하 자녀 수 × 20만원 × 12개월
            const childcareAllowance = (adminData.salary.childrenUnder6 || 0) * 200000 * 12;
            // 총 비과세 = 식대 + 보육수당
            const totalNonTaxable = (adminData.salary.mealAllowance || 0) + childcareAllowance;
            setInputs((prev)=>({
                    ...prev,
                    // 급여 정보
                    annualSalary: annualSalary,
                    mealAllowance: adminData.salary.mealAllowance || 0,
                    childrenUnder6: adminData.salary.childrenUnder6 || 0,
                    salary: annualSalary - totalNonTaxable,
                    withheldTax: adminData.salary.prepaidTax || 0,
                    localIncomeTax: adminData.salary.localIncomeTax || 0,
                    nationalPension: adminData.salary.nationalPension,
                    healthInsurance: adminData.salary.healthInsurance,
                    longTermCare: adminData.salary.longTermCare || 0,
                    employmentInsurance: adminData.salary.employmentInsurance || 0,
                    // 카드 사용액
                    creditCard: adminData.spending.creditCard,
                    debitCard: adminData.spending.debitCard,
                    cash: adminData.spending.cash,
                    publicTransport: adminData.spending.publicTransport,
                    traditionalMarket: adminData.spending.traditionalMarket || 0,
                    culture: adminData.spending.culture || 0,
                    // 가족정보 → 인적공제
                    spouse: adminData.family?.spouse ? 1 : 0,
                    children: adminData.family?.children || 0,
                    parents: adminData.family?.parents || 0,
                    siblings: adminData.family?.siblings || 0,
                    foster: adminData.family?.foster || 0,
                    recipient: adminData.family?.recipient || 0,
                    // 총 부양가족 수 = 본인 1 + 배우자 + 자녀 + 직계존속 + 형제자매 + 위탁아동 + 수급자
                    dependents: 1 + (adminData.family?.spouse ? 1 : 0) + (adminData.family?.children || 0) + (adminData.family?.parents || 0) + (adminData.family?.siblings || 0) + (adminData.family?.foster || 0) + (adminData.family?.recipient || 0),
                    cardChildren: adminData.family?.children || 0,
                    // 자녀공제 (세액공제)
                    childrenOver8: adminData.family?.childrenOver8 || 0,
                    birthAdoption: adminData.family?.birthAdoption || "none"
                }));
            setTimeout(()=>setIsLoadingData(false), 300);
        } else {
            // 데이터가 없으면 알림
            setTimeout(()=>{
                setIsLoadingData(false);
                alert("저장된 기초자료가 없습니다. 기초자료 페이지에서 데이터를 먼저 입력해주세요.");
            }, 300);
        }
    };
    const handleReset = ()=>{
        setIsResetting(true);
        setInputs({
            annualSalary: 0,
            mealAllowance: 0,
            childrenUnder6: 0,
            salary: 0,
            withheldTax: 0,
            localIncomeTax: 0,
            spouse: 0,
            parents: 0,
            children: 0,
            siblings: 0,
            foster: 0,
            recipient: 0,
            dependents: 1,
            nationalPension: 0,
            healthInsurance: 0,
            longTermCare: 0,
            employmentInsurance: 0,
            cardChildren: 0,
            creditCard: 0,
            debitCard: 0,
            cash: 0,
            traditionalMarket: 0,
            publicTransport: 0,
            culture: 0,
            infertility: 0,
            premature: 0,
            selfDisabledSenior: 0,
            otherFamily: 0,
            insuranceReimbursement: 0,
            medical: 0,
            selfEducation: 0,
            preschool: 0,
            elementary: 0,
            university: 0,
            education: 0,
            housingSubscription: 0,
            rentLoanPayment: 0,
            mortgageInterest: 0,
            monthlyRent: 0,
            housing: 0,
            pensionSavings: 0,
            irp: 0,
            isaTransfer: 0,
            generalInsurance: 0,
            disabledInsurance: 0,
            pension: 0,
            politicalDonation: 0,
            hometownDonation: 0,
            hometownDisaster: 0,
            specialDonation: 0,
            employeeDonation: 0,
            designatedDonation: 0,
            religiousDonation: 0,
            childrenOver8: 0,
            birthAdoption: "none"
        });
        setResult(null);
        setTimeout(()=>setIsResetting(false), 300);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl md:text-3xl font-black uppercase",
                                children: "계산기"
                            }, void 0, false, {
                                fileName: "[project]/app/calculator/page.tsx",
                                lineNumber: 860,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLoadData,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all", isLoadingData ? "bg-neo-cyan translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                size: 14,
                                                className: isLoadingData ? "animate-bounce" : ""
                                            }, void 0, false, {
                                                fileName: "[project]/app/calculator/page.tsx",
                                                lineNumber: 869,
                                                columnNumber: 29
                                            }, this),
                                            " 기초자료 동기화"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/calculator/page.tsx",
                                        lineNumber: 862,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleReset,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all", isResetting ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-black text-white"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                size: 14,
                                                className: isResetting ? "animate-spin" : ""
                                            }, void 0, false, {
                                                fileName: "[project]/app/calculator/page.tsx",
                                                lineNumber: 878,
                                                columnNumber: 29
                                            }, this),
                                            " 초기화"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/calculator/page.tsx",
                                        lineNumber: 871,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/calculator/page.tsx",
                                lineNumber: 861,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calculator/page.tsx",
                        lineNumber: 859,
                        columnNumber: 17
                    }, this),
                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#000]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setOpenSection(openSection === cat.id ? null : cat.id),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("w-full flex items-center justify-between p-4 font-bold text-lg transition-colors", openSection === cat.id ? cat.color : "hover:bg-gray-50"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(cat.icon, {
                                                    size: 20,
                                                    strokeWidth: 2.5
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 898,
                                                    columnNumber: 33
                                                }, this),
                                                cat.label
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 897,
                                            columnNumber: 29
                                        }, this),
                                        openSection === cat.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 902,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 904,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 888,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: openSection === cat.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: "auto",
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        style: {
                                            overflow: "visible"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 border-t-[3px] border-black space-y-6 bg-white",
                                            children: [
                                                cat.id === "salary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "font-bold flex items-center gap-2",
                                                                    children: [
                                                                        "연봉 (급여 + 상여)",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                            content: "연간 총 급여와 상여의 합계 금액입니다.",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                size: 16,
                                                                                className: "text-gray-400 cursor-help"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                lineNumber: 925,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 924,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 922,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "neo-input",
                                                                    value: formatNumber(inputs.annualSalary),
                                                                    onChange: (e)=>handleInputChange("annualSalary", e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 928,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 921,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "font-bold flex items-center gap-2",
                                                                    children: [
                                                                        "비과세 (식대) - 연간",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                            content: "월 20만원 한도의 식대 비과세 금액입니다. 연간 총액을 입력하세요.",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                size: 16,
                                                                                className: "text-gray-400 cursor-help"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                lineNumber: 939,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 938,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 936,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "neo-input",
                                                                    value: formatNumber(inputs.mealAllowance),
                                                                    onChange: (e)=>handleInputChange("mealAllowance", e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 942,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 935,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "font-bold flex items-center gap-2",
                                                                    children: [
                                                                        "6세 이하 자녀 수 (보육수당용)",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                            content: "6세 이하 자녀 1인당 월 20만원(연 240만원)의 보육수당이 비과세로 적용됩니다.",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                size: 16,
                                                                                className: "text-gray-400 cursor-help"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                lineNumber: 953,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 952,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 950,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2",
                                                                    children: [
                                                                        0,
                                                                        1,
                                                                        2,
                                                                        3
                                                                    ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleInputChange("childrenUnder6", num),
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 py-2 border-2 border-black font-bold transition-colors", inputs.childrenUnder6 === num ? "bg-black text-white" : "bg-white hover:bg-gray-100"),
                                                                            children: [
                                                                                num,
                                                                                "명"
                                                                            ]
                                                                        }, num, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 958,
                                                                            columnNumber: 61
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 956,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 949,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 972,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "식대 비과세: ",
                                                                                formatNumber(inputs.mealAllowance),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 974,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "보육수당 비과세: ",
                                                                                inputs.childrenUnder6,
                                                                                "명 × 20만원 × 12개월 = ",
                                                                                formatNumber(inputs.childrenUnder6 * 200000 * 12),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 975,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "border-t border-black pt-1",
                                                                            children: [
                                                                                "총 비과세: ",
                                                                                formatNumber(inputs.mealAllowance + inputs.childrenUnder6 * 200000 * 12),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 976,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 973,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 971,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "총급여액 (자동 계산)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 980,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        formatNumber(inputs.salary),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 981,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: [
                                                                        "연봉 - 총 비과세 = ",
                                                                        formatNumber(inputs.annualSalary),
                                                                        " - ",
                                                                        formatNumber(inputs.mealAllowance + inputs.childrenUnder6 * 200000 * 12)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 984,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 979,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4 border-t-2 border-black pt-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "💳 기납부세액"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 989,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "font-bold flex items-center gap-2",
                                                                            children: [
                                                                                "기납부세액 (소득세) (원)",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                    content: "근로소득 원천징수영수증의 '결정세액' 또는 매월 급여명세서의 소득세 합계",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                        size: 14,
                                                                                        className: "text-gray-400 cursor-help"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/calculator/page.tsx",
                                                                                        lineNumber: 994,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 993,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 991,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            className: "neo-input",
                                                                            value: formatNumber(inputs.withheldTax),
                                                                            onChange: (e)=>handleInputChange("withheldTax", e.target.value)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 997,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 990,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "font-bold flex items-center gap-2",
                                                                            children: [
                                                                                "기납부세액 (지방소득세) (원)",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                    content: "매월 급여명세서의 지방소득세 합계 (소득세의 10%)",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                        size: 14,
                                                                                        className: "text-gray-400 cursor-help"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/calculator/page.tsx",
                                                                                        lineNumber: 1008,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1007,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1005,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            className: "neo-input",
                                                                            value: formatNumber(inputs.localIncomeTax || 0),
                                                                            onChange: (e)=>handleInputChange("localIncomeTax", e.target.value)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1011,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1004,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 988,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "basic" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "기본공제 (본인/배우자)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1027,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-2 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold text-sm h-6 flex items-center",
                                                                                    children: "본인공제"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1030,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "neo-input bg-gray-100 text-gray-500 cursor-not-allowed",
                                                                                    children: "1,500,000"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1031,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1029,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2 text-sm h-6",
                                                                                    children: [
                                                                                        "배우자공제",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "근로소득자: 연봉 500만원 이하 / 다른소득자: 소득금액 100만원 이하",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1039,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1038,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1036,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex gap-2",
                                                                                    children: [
                                                                                        0,
                                                                                        1
                                                                                    ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            onClick: ()=>handleInputChange("spouse", num),
                                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flex-1 p-3 border-[3px] border-black font-semibold text-lg transition-colors", inputs.spouse === num ? "bg-black text-white" : "bg-white hover:bg-gray-100"),
                                                                                            children: num === 0 ? "없음" : "있음"
                                                                                        }, num, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1044,
                                                                                            columnNumber: 69
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1042,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1035,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1028,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1026,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4 border-t-2 border-gray-200 pt-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "부양가족공제 (1인당 150만원)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1062,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-2 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2 text-sm",
                                                                                    children: [
                                                                                        "직계존속 (인)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "부모, 장인/장모 등 만60세 이상",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1068,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1067,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1065,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    max: "10",
                                                                                    className: "neo-input",
                                                                                    value: inputs.parents,
                                                                                    onChange: (e)=>setInputs((prev)=>({
                                                                                                ...prev,
                                                                                                parents: Math.max(0, parseInt(e.target.value) || 0),
                                                                                                dependents: 1 + prev.spouse + Math.max(0, parseInt(e.target.value) || 0) + prev.children + prev.siblings + prev.foster + prev.recipient
                                                                                            }))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1071,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1064,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2 text-sm",
                                                                                    children: [
                                                                                        "자녀 (인)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "만20세 이하 자녀",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1084,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1083,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1081,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    max: "10",
                                                                                    className: "neo-input",
                                                                                    value: inputs.children,
                                                                                    onChange: (e)=>setInputs((prev)=>({
                                                                                                ...prev,
                                                                                                children: Math.max(0, parseInt(e.target.value) || 0),
                                                                                                dependents: 1 + prev.spouse + prev.parents + Math.max(0, parseInt(e.target.value) || 0) + prev.siblings + prev.foster + prev.recipient
                                                                                            }))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1087,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1080,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2 text-sm",
                                                                                    children: [
                                                                                        "형제자매 (인)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "만20세 이하 또는 만60세 이상",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1100,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1099,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1097,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    max: "10",
                                                                                    className: "neo-input",
                                                                                    value: inputs.siblings,
                                                                                    onChange: (e)=>setInputs((prev)=>({
                                                                                                ...prev,
                                                                                                siblings: Math.max(0, parseInt(e.target.value) || 0),
                                                                                                dependents: 1 + prev.spouse + prev.parents + prev.children + Math.max(0, parseInt(e.target.value) || 0) + prev.foster + prev.recipient
                                                                                            }))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1103,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1096,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2 text-sm",
                                                                                    children: [
                                                                                        "위탁아동 (인)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "6개월 이상 위탁양육",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1116,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1115,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1113,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    max: "10",
                                                                                    className: "neo-input",
                                                                                    value: inputs.foster,
                                                                                    onChange: (e)=>setInputs((prev)=>({
                                                                                                ...prev,
                                                                                                foster: Math.max(0, parseInt(e.target.value) || 0),
                                                                                                dependents: 1 + prev.spouse + prev.parents + prev.children + prev.siblings + Math.max(0, parseInt(e.target.value) || 0) + prev.recipient
                                                                                            }))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1119,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1112,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2 text-sm",
                                                                                    children: [
                                                                                        "수급자 (인)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "기초생활수급자",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1132,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1131,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1129,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    max: "10",
                                                                                    className: "neo-input",
                                                                                    value: inputs.recipient,
                                                                                    onChange: (e)=>setInputs((prev)=>({
                                                                                                ...prev,
                                                                                                recipient: Math.max(0, parseInt(e.target.value) || 0),
                                                                                                dependents: 1 + prev.spouse + prev.parents + prev.children + prev.siblings + prev.foster + Math.max(0, parseInt(e.target.value) || 0)
                                                                                            }))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1135,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1128,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1063,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1061,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1149,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: "본인: 1명 × 150만원 = 1,500,000원"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1151,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        inputs.spouse > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "배우자: ",
                                                                                inputs.spouse,
                                                                                "명 × 150만원 = ",
                                                                                formatNumber(inputs.spouse * 1500000),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1152,
                                                                            columnNumber: 79
                                                                        }, this),
                                                                        inputs.parents > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "직계존속: ",
                                                                                inputs.parents,
                                                                                "명 × 150만원 = ",
                                                                                formatNumber(inputs.parents * 1500000),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1153,
                                                                            columnNumber: 80
                                                                        }, this),
                                                                        inputs.children > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "자녀: ",
                                                                                inputs.children,
                                                                                "명 × 150만원 = ",
                                                                                formatNumber(inputs.children * 1500000),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1154,
                                                                            columnNumber: 81
                                                                        }, this),
                                                                        inputs.siblings > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "형제자매: ",
                                                                                inputs.siblings,
                                                                                "명 × 150만원 = ",
                                                                                formatNumber(inputs.siblings * 1500000),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1155,
                                                                            columnNumber: 81
                                                                        }, this),
                                                                        inputs.foster > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "위탁아동: ",
                                                                                inputs.foster,
                                                                                "명 × 150만원 = ",
                                                                                formatNumber(inputs.foster * 1500000),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1156,
                                                                            columnNumber: 79
                                                                        }, this),
                                                                        inputs.recipient > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "수급자: ",
                                                                                inputs.recipient,
                                                                                "명 × 150만원 = ",
                                                                                formatNumber(inputs.recipient * 1500000),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1157,
                                                                            columnNumber: 82
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1150,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1148,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "인적공제 합계 (자동 계산)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1163,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        formatNumber(inputs.dependents * 1500000),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1164,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: [
                                                                        "총 ",
                                                                        inputs.dependents,
                                                                        "명 (본인 1 + 배우자 ",
                                                                        inputs.spouse,
                                                                        " + 직계존속 ",
                                                                        inputs.parents,
                                                                        " + 자녀 ",
                                                                        inputs.children,
                                                                        " + 형제자매 ",
                                                                        inputs.siblings,
                                                                        " + 위탁아동 ",
                                                                        inputs.foster,
                                                                        " + 수급자 ",
                                                                        inputs.recipient,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1167,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1162,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "insurance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "font-bold flex items-center gap-2",
                                                                    children: [
                                                                        "국민연금 (원)",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                            content: "급여에서 공제된 연간 국민연금 납입액입니다.",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                size: 16,
                                                                                className: "text-gray-400 cursor-help"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                lineNumber: 1181,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1180,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1178,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "neo-input",
                                                                    value: formatNumber(inputs.nationalPension),
                                                                    onChange: (e)=>handleInputChange("nationalPension", e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1184,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1177,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "font-bold flex items-center gap-2",
                                                                    children: [
                                                                        "건강보험료 (원)",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                            content: "급여에서 공제된 연간 건강보험료입니다.",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                size: 16,
                                                                                className: "text-gray-400 cursor-help"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                lineNumber: 1195,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1194,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1192,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "neo-input",
                                                                    value: formatNumber(inputs.healthInsurance),
                                                                    onChange: (e)=>handleInputChange("healthInsurance", e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1198,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1191,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "font-bold flex items-center gap-2",
                                                                    children: [
                                                                        "노인장기요양보험료 (원)",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                            content: "건강보험료와 함께 납부하는 장기요양보험료입니다.",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                size: 16,
                                                                                className: "text-gray-400 cursor-help"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                lineNumber: 1209,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1208,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1206,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "neo-input",
                                                                    value: formatNumber(inputs.longTermCare),
                                                                    onChange: (e)=>handleInputChange("longTermCare", e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1212,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1205,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "font-bold flex items-center gap-2",
                                                                    children: [
                                                                        "고용보험료 (원)",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                            content: "급여에서 공제된 연간 고용보험료입니다.",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                size: 16,
                                                                                className: "text-gray-400 cursor-help"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                lineNumber: 1223,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1222,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1220,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: "neo-input",
                                                                    value: formatNumber(inputs.employmentInsurance),
                                                                    onChange: (e)=>handleInputChange("employmentInsurance", e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1226,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1219,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1236,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "국민연금: ",
                                                                                formatNumber(inputs.nationalPension),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1238,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "건강보험료: ",
                                                                                formatNumber(inputs.healthInsurance),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1239,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "노인장기요양보험료: ",
                                                                                formatNumber(inputs.longTermCare),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1240,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "고용보험료: ",
                                                                                formatNumber(inputs.employmentInsurance),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1241,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1237,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1235,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "4대보험 소득공제 합계"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1247,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        formatNumber(inputs.nationalPension + inputs.healthInsurance + inputs.longTermCare + inputs.employmentInsurance),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1248,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: "전액 소득공제 적용"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1251,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1246,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "card" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "💳 신용카드·직불카드·현금영수증"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1261,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "자녀 수 (한도 확대용)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "2026년 기준: 자녀 1명당 50만원, 최대 100만원까지 한도 인상",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1267,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1266,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1264,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    className: "neo-input",
                                                                                    min: "0",
                                                                                    value: inputs.cardChildren,
                                                                                    onChange: (e)=>handleInputChange("cardChildren", parseInt(e.target.value) || 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1270,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                inputs.cardChildren > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-sm text-gray-600",
                                                                                    children: [
                                                                                        "💰 한도 확대: ",
                                                                                        formatNumber(Math.min(inputs.cardChildren * 500000, 1000000)),
                                                                                        "원 (",
                                                                                        inputs.cardChildren,
                                                                                        "명 × 50만원, 최대 100만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1278,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1263,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "신용카드 사용액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "공제율 15%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1288,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1287,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1285,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.creditCard),
                                                                                    onChange: (e)=>handleInputChange("creditCard", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1291,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1284,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "직불카드 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "공제율 30%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1302,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1301,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1299,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.debitCard),
                                                                                    onChange: (e)=>handleInputChange("debitCard", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1305,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1298,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "현금영수증 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "공제율 30%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1316,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1315,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1313,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.cash),
                                                                                    onChange: (e)=>handleInputChange("cash", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1319,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1312,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1262,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1260,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4 border-t-2 border-gray-200 pt-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "➕ 추가 공제 항목"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1331,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "전통시장 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "공제율 40%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1337,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1336,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1334,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.traditionalMarket),
                                                                                    onChange: (e)=>handleInputChange("traditionalMarket", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1340,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1333,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "대중교통 사용액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "공제율 40%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1351,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1350,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1348,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.publicTransport),
                                                                                    onChange: (e)=>handleInputChange("publicTransport", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1354,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1347,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "문화체육 (도서·공연·체육시설 등) (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "공제율 30%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1365,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1364,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1362,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.culture),
                                                                                    onChange: (e)=>handleInputChange("culture", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1368,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1361,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1332,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1330,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1380,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: (()=>{
                                                                        const threshold = Math.round(inputs.salary * 0.25);
                                                                        const totalUsed = inputs.creditCard + inputs.debitCard + inputs.cash + inputs.publicTransport + inputs.traditionalMarket + inputs.culture;
                                                                        // 순차적으로 25% 소진: 신용카드 → 직불카드 → 현금영수증 → 대중교통 → 전통시장 → 문화체육
                                                                        let remaining = threshold;
                                                                        // 1. 신용카드
                                                                        const creditUsed = Math.min(inputs.creditCard, remaining);
                                                                        const creditExcess = inputs.creditCard - creditUsed;
                                                                        remaining -= creditUsed;
                                                                        // 2. 직불카드
                                                                        const debitUsed = Math.min(inputs.debitCard, remaining);
                                                                        const debitExcess = inputs.debitCard - debitUsed;
                                                                        remaining -= debitUsed;
                                                                        // 3. 현금영수증
                                                                        const cashUsed = Math.min(inputs.cash, remaining);
                                                                        const cashExcess = inputs.cash - cashUsed;
                                                                        remaining -= cashUsed;
                                                                        // 4. 대중교통
                                                                        const transportUsed = Math.min(inputs.publicTransport, remaining);
                                                                        const transportExcess = inputs.publicTransport - transportUsed;
                                                                        remaining -= transportUsed;
                                                                        // 5. 전통시장
                                                                        const marketUsed = Math.min(inputs.traditionalMarket, remaining);
                                                                        const marketExcess = inputs.traditionalMarket - marketUsed;
                                                                        remaining -= marketUsed;
                                                                        // 6. 문화체육
                                                                        const cultureUsed = Math.min(inputs.culture, remaining);
                                                                        const cultureExcess = inputs.culture - cultureUsed;
                                                                        // 공제 계산 (초과분에 대해서만)
                                                                        const creditDeduction = Math.round(creditExcess * 0.15);
                                                                        const debitDeduction = Math.round(debitExcess * 0.3);
                                                                        const cashDeduction = Math.round(cashExcess * 0.3);
                                                                        const transportDeduction = Math.round(transportExcess * 0.4);
                                                                        const marketDeduction = Math.round(marketExcess * 0.4);
                                                                        const cultureDeduction = Math.round(cultureExcess * 0.3);
                                                                        // 기본 공제 합계 (신용카드, 직불카드, 현금영수증)
                                                                        const basicDeduction = creditDeduction + debitDeduction + cashDeduction;
                                                                        const basicLimit = (inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000) + Math.min(inputs.cardChildren * 500000, 1000000);
                                                                        const finalBasic = Math.min(basicDeduction, basicLimit);
                                                                        // 추가 공제 합계 (대중교통, 전통시장, 문화체육)
                                                                        const additionalDeduction = transportDeduction + marketDeduction + cultureDeduction;
                                                                        const additionalLimit = inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000;
                                                                        const finalAdditional = Math.min(additionalDeduction, additionalLimit);
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold",
                                                                                    children: [
                                                                                        "▸ 총급여의 25%: ",
                                                                                        formatNumber(threshold),
                                                                                        "원 (순차 소진)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1439,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                    children: "▸ 25% 소진 순서 (초과분만 공제)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1442,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.creditCard > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "① 신용카드: ",
                                                                                        formatNumber(inputs.creditCard),
                                                                                        "원 중 ",
                                                                                        formatNumber(creditUsed),
                                                                                        "원 소진 → ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-blue-600",
                                                                                            children: [
                                                                                                "초과 ",
                                                                                                formatNumber(creditExcess),
                                                                                                "원 × 15% = ",
                                                                                                formatNumber(creditDeduction),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1444,
                                                                                            columnNumber: 154
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1444,
                                                                                    columnNumber: 73
                                                                                }, this),
                                                                                inputs.debitCard > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "② 직불카드: ",
                                                                                        formatNumber(inputs.debitCard),
                                                                                        "원 중 ",
                                                                                        formatNumber(debitUsed),
                                                                                        "원 소진 → ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-blue-600",
                                                                                            children: [
                                                                                                "초과 ",
                                                                                                formatNumber(debitExcess),
                                                                                                "원 × 30% = ",
                                                                                                formatNumber(debitDeduction),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1447,
                                                                                            columnNumber: 152
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1447,
                                                                                    columnNumber: 73
                                                                                }, this),
                                                                                inputs.cash > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "③ 현금영수증: ",
                                                                                        formatNumber(inputs.cash),
                                                                                        "원 중 ",
                                                                                        formatNumber(cashUsed),
                                                                                        "원 소진 → ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-blue-600",
                                                                                            children: [
                                                                                                "초과 ",
                                                                                                formatNumber(cashExcess),
                                                                                                "원 × 30% = ",
                                                                                                formatNumber(cashDeduction),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1450,
                                                                                            columnNumber: 147
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1450,
                                                                                    columnNumber: 73
                                                                                }, this),
                                                                                inputs.publicTransport > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "④ 대중교통: ",
                                                                                        formatNumber(inputs.publicTransport),
                                                                                        "원 중 ",
                                                                                        formatNumber(transportUsed),
                                                                                        "원 소진 → ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: [
                                                                                                "초과 ",
                                                                                                formatNumber(transportExcess),
                                                                                                "원 × 40% = ",
                                                                                                formatNumber(transportDeduction),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1453,
                                                                                            columnNumber: 162
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1453,
                                                                                    columnNumber: 73
                                                                                }, this),
                                                                                inputs.traditionalMarket > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "⑤ 전통시장: ",
                                                                                        formatNumber(inputs.traditionalMarket),
                                                                                        "원 중 ",
                                                                                        formatNumber(marketUsed),
                                                                                        "원 소진 → ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: [
                                                                                                "초과 ",
                                                                                                formatNumber(marketExcess),
                                                                                                "원 × 40% = ",
                                                                                                formatNumber(marketDeduction),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1456,
                                                                                            columnNumber: 161
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1456,
                                                                                    columnNumber: 73
                                                                                }, this),
                                                                                inputs.culture > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "⑥ 문화체육: ",
                                                                                        formatNumber(inputs.culture),
                                                                                        "원 중 ",
                                                                                        formatNumber(cultureUsed),
                                                                                        "원 소진 → ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: [
                                                                                                "초과 ",
                                                                                                formatNumber(cultureExcess),
                                                                                                "원 × 30% = ",
                                                                                                formatNumber(cultureDeduction),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1459,
                                                                                            columnNumber: 152
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1459,
                                                                                    columnNumber: 73
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                    children: "▸ 기본 공제 (신용카드·직불카드·현금영수증)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1463,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-gray-700",
                                                                                    children: [
                                                                                        "공제액: ",
                                                                                        formatNumber(basicDeduction),
                                                                                        "원 / 한도: ",
                                                                                        formatNumber(basicLimit),
                                                                                        "원 → ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold",
                                                                                            children: [
                                                                                                formatNumber(finalBasic),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1465,
                                                                                            columnNumber: 146
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1464,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                (inputs.publicTransport > 0 || inputs.traditionalMarket > 0 || inputs.culture > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 추가 공제 (대중교통·전통시장·문화체육)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1471,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-gray-700",
                                                                                            children: [
                                                                                                "공제액: ",
                                                                                                formatNumber(additionalDeduction),
                                                                                                "원 / 한도: ",
                                                                                                formatNumber(additionalLimit),
                                                                                                "원 → ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold",
                                                                                                    children: [
                                                                                                        formatNumber(finalAdditional),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 1473,
                                                                                                    columnNumber: 164
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1472,
                                                                                            columnNumber: 77
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true)
                                                                            ]
                                                                        }, void 0, true);
                                                                    })()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1381,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1379,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "신용카드 등 소득공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1485,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        (()=>{
                                                                            const threshold = Math.round(inputs.salary * 0.25);
                                                                            // 순차적으로 25% 소진
                                                                            let remaining = threshold;
                                                                            const creditExcess = Math.max(0, inputs.creditCard - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.creditCard);
                                                                            const debitExcess = Math.max(0, inputs.debitCard - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.debitCard);
                                                                            const cashExcess = Math.max(0, inputs.cash - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.cash);
                                                                            const transportExcess = Math.max(0, inputs.publicTransport - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.publicTransport);
                                                                            const marketExcess = Math.max(0, inputs.traditionalMarket - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.traditionalMarket);
                                                                            const cultureExcess = Math.max(0, inputs.culture - remaining);
                                                                            // 기본 공제
                                                                            const basicDeduction = Math.round(creditExcess * 0.15) + Math.round(debitExcess * 0.3) + Math.round(cashExcess * 0.3);
                                                                            const basicLimit = (inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000) + Math.min(inputs.cardChildren * 500000, 1000000);
                                                                            const finalBasic = Math.min(basicDeduction, basicLimit);
                                                                            // 추가 공제
                                                                            const additionalDeduction = Math.round(transportExcess * 0.4) + Math.round(marketExcess * 0.4) + Math.round(cultureExcess * 0.3);
                                                                            const additionalLimit = inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000;
                                                                            const finalAdditional = Math.min(additionalDeduction, additionalLimit);
                                                                            return formatNumber(finalBasic + finalAdditional);
                                                                        })(),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1486,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-2 border-t border-black pt-2",
                                                                    children: (()=>{
                                                                        const threshold = Math.round(inputs.salary * 0.25);
                                                                        let remaining = threshold;
                                                                        const creditExcess = Math.max(0, inputs.creditCard - remaining);
                                                                        remaining = Math.max(0, remaining - inputs.creditCard);
                                                                        const debitExcess = Math.max(0, inputs.debitCard - remaining);
                                                                        remaining = Math.max(0, remaining - inputs.debitCard);
                                                                        const cashExcess = Math.max(0, inputs.cash - remaining);
                                                                        remaining = Math.max(0, remaining - inputs.cash);
                                                                        const transportExcess = Math.max(0, inputs.publicTransport - remaining);
                                                                        remaining = Math.max(0, remaining - inputs.publicTransport);
                                                                        const marketExcess = Math.max(0, inputs.traditionalMarket - remaining);
                                                                        remaining = Math.max(0, remaining - inputs.traditionalMarket);
                                                                        const cultureExcess = Math.max(0, inputs.culture - remaining);
                                                                        const basicDeduction = Math.round(creditExcess * 0.15) + Math.round(debitExcess * 0.3) + Math.round(cashExcess * 0.3);
                                                                        const basicLimit = (inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000) + Math.min(inputs.cardChildren * 500000, 1000000);
                                                                        const finalBasic = Math.min(basicDeduction, basicLimit);
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "기본 공제:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1527,
                                                                                    columnNumber: 70
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(finalBasic),
                                                                                "원 (한도 ",
                                                                                formatNumber(basicLimit),
                                                                                "원)"
                                                                            ]
                                                                        }, void 0, true);
                                                                    })()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1512,
                                                                    columnNumber: 53
                                                                }, this),
                                                                (inputs.publicTransport > 0 || inputs.traditionalMarket > 0 || inputs.culture > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: (()=>{
                                                                        const threshold = Math.round(inputs.salary * 0.25);
                                                                        let remaining = threshold;
                                                                        remaining = Math.max(0, remaining - inputs.creditCard);
                                                                        remaining = Math.max(0, remaining - inputs.debitCard);
                                                                        remaining = Math.max(0, remaining - inputs.cash);
                                                                        const transportExcess = Math.max(0, inputs.publicTransport - remaining);
                                                                        remaining = Math.max(0, remaining - inputs.publicTransport);
                                                                        const marketExcess = Math.max(0, inputs.traditionalMarket - remaining);
                                                                        remaining = Math.max(0, remaining - inputs.traditionalMarket);
                                                                        const cultureExcess = Math.max(0, inputs.culture - remaining);
                                                                        const additionalDeduction = Math.round(transportExcess * 0.4) + Math.round(marketExcess * 0.4) + Math.round(cultureExcess * 0.3);
                                                                        const additionalLimit = inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000;
                                                                        const finalAdditional = Math.min(additionalDeduction, additionalLimit);
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "추가 공제:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1546,
                                                                                    columnNumber: 74
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(finalAdditional),
                                                                                "원 (한도 ",
                                                                                formatNumber(additionalLimit),
                                                                                "원)"
                                                                            ]
                                                                        }, void 0, true);
                                                                    })()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1531,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1484,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "medical" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "🏥 의료비 세부 항목"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1559,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "난임시술비 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "30% 공제, 한도 없음",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1565,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1564,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1562,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.infertility),
                                                                                    onChange: (e)=>handleInputChange("infertility", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1568,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1561,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "미숙아·선천성이상아 의료비 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "20% 공제, 한도 없음",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1579,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1578,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1576,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.premature),
                                                                                    onChange: (e)=>handleInputChange("premature", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1582,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1575,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "본인/장애인/만65세이상/6세이하 의료비 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "15% 공제, 한도 없음",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1593,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1592,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1590,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.selfDisabledSenior),
                                                                                    onChange: (e)=>handleInputChange("selfDisabledSenior", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1596,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1589,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "그 밖의 부양가족 의료비 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "15% 공제, 700만원 한도",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1607,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1606,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1604,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.otherFamily),
                                                                                    onChange: (e)=>handleInputChange("otherFamily", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1610,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1603,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "실손의료보험금 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "공제대상에서 차감",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1621,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1620,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1618,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.insuranceReimbursement),
                                                                                    onChange: (e)=>handleInputChange("insuranceReimbursement", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1624,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1617,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1560,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1558,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1636,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: (()=>{
                                                                        const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
                                                                        const actualMedical = totalMedical - inputs.insuranceReimbursement;
                                                                        const threshold = Math.round(inputs.salary * 0.03);
                                                                        const excessAmount = Math.max(0, actualMedical - threshold);
                                                                        // 순차적으로 3% 소진: 공제율 높은순 - 난임시술비(30%) → 미숙아(20%) → 본인/장애인/65세+/6세-(15%) → 그 밖의 부양가족(15%)
                                                                        let remaining = threshold;
                                                                        // 1. 난임시술비 (30%, 한도 없음)
                                                                        const infertilityUsed = Math.min(inputs.infertility, remaining);
                                                                        const infertilityExcess = inputs.infertility - infertilityUsed;
                                                                        remaining -= infertilityUsed;
                                                                        // 2. 미숙아·선천성이상아 (20%, 한도 없음)
                                                                        const prematureUsed = Math.min(inputs.premature, remaining);
                                                                        const prematureExcess = inputs.premature - prematureUsed;
                                                                        remaining -= prematureUsed;
                                                                        // 3. 본인/장애인/65세이상/6세이하 (15%, 한도 없음)
                                                                        const selfUsed = Math.min(inputs.selfDisabledSenior, remaining);
                                                                        const selfExcess = inputs.selfDisabledSenior - selfUsed;
                                                                        remaining -= selfUsed;
                                                                        // 4. 그 밖의 부양가족 (15%, 700만원 한도)
                                                                        const otherUsed = Math.min(inputs.otherFamily, remaining);
                                                                        const otherExcess = inputs.otherFamily - otherUsed;
                                                                        // 공제 계산 (초과분에 대해서만)
                                                                        const infertilityDeduction = Math.round(infertilityExcess * 0.30); // 30%, 한도 없음
                                                                        const prematureDeduction = Math.round(prematureExcess * 0.20); // 20%, 한도 없음
                                                                        const selfDeduction = Math.round(selfExcess * 0.15); // 15%, 한도 없음
                                                                        const otherDeduction = Math.round(Math.min(otherExcess, 7000000) * 0.15); // 15%, 700만원 한도
                                                                        const totalDeduction = selfDeduction + otherDeduction + infertilityDeduction + prematureDeduction;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold",
                                                                                    children: "▸ 총 의료비 사용금액"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1677,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        formatNumber(totalMedical),
                                                                                        "원"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1678,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　- 실손의료보험금 (차감): -",
                                                                                        formatNumber(inputs.insuranceReimbursement),
                                                                                        "원"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1679,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-bold",
                                                                                    children: [
                                                                                        "= 실제 의료비: ",
                                                                                        formatNumber(actualMedical),
                                                                                        "원"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1680,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                    children: "▸ 총급여 3% 기준 (최저한도)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1683,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        formatNumber(threshold),
                                                                                        "원"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1684,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-bold",
                                                                                    children: [
                                                                                        "= 3% 초과분 (공제대상 금액): ",
                                                                                        formatNumber(excessAmount),
                                                                                        "원"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1685,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                excessAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 항목별 세액공제 (공제율 높은순 소진)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1690,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        inputs.infertility > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "① 난임시술비 (",
                                                                                                formatNumber(inputs.infertility),
                                                                                                "원 중 ",
                                                                                                formatNumber(infertilityUsed),
                                                                                                "원 소진) → ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-green-600",
                                                                                                    children: [
                                                                                                        "초과 ",
                                                                                                        formatNumber(infertilityExcess),
                                                                                                        "원 × 30% = ",
                                                                                                        formatNumber(infertilityDeduction),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 1693,
                                                                                                    columnNumber: 87
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1692,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        inputs.premature > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "② 미숙아·선천성이상아 (",
                                                                                                formatNumber(inputs.premature),
                                                                                                "원 중 ",
                                                                                                formatNumber(prematureUsed),
                                                                                                "원 소진) → ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-green-600",
                                                                                                    children: [
                                                                                                        "초과 ",
                                                                                                        formatNumber(prematureExcess),
                                                                                                        "원 × 20% = ",
                                                                                                        formatNumber(prematureDeduction),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 1697,
                                                                                                    columnNumber: 87
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1696,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        inputs.selfDisabledSenior > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "③ 본인/장애인/65세+/6세- (",
                                                                                                formatNumber(inputs.selfDisabledSenior),
                                                                                                "원 중 ",
                                                                                                formatNumber(selfUsed),
                                                                                                "원 소진) → ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        "초과 ",
                                                                                                        formatNumber(selfExcess),
                                                                                                        "원 × 15% = ",
                                                                                                        formatNumber(selfDeduction),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 1701,
                                                                                                    columnNumber: 87
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1700,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        inputs.otherFamily > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "④ 그 밖의 부양가족 (",
                                                                                                formatNumber(inputs.otherFamily),
                                                                                                "원 중 ",
                                                                                                formatNumber(otherUsed),
                                                                                                "원 소진) → ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        "초과 ",
                                                                                                        formatNumber(otherExcess),
                                                                                                        "원 × 15% = ",
                                                                                                        formatNumber(otherDeduction),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 1705,
                                                                                                    columnNumber: 87
                                                                                                }, this),
                                                                                                otherExcess > 7000000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-red-500",
                                                                                                    children: " (700만원 한도 적용)"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 1706,
                                                                                                    columnNumber: 111
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1704,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true)
                                                                            ]
                                                                        }, void 0, true);
                                                                    })()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1637,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1635,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "🏥 의료비 세액공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1718,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        (()=>{
                                                                            const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
                                                                            const actualMedical = totalMedical - inputs.insuranceReimbursement;
                                                                            const threshold = Math.round(inputs.salary * 0.03);
                                                                            // 실제 의료비가 3% 미만이면 공제 없음
                                                                            if (actualMedical <= threshold) {
                                                                                return "0";
                                                                            }
                                                                            // 순차적으로 3% 소진 (공제율 높은순)
                                                                            let remaining = threshold;
                                                                            const infertilityExcess = Math.max(0, inputs.infertility - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.infertility);
                                                                            const prematureExcess = Math.max(0, inputs.premature - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.premature);
                                                                            const selfExcess = Math.max(0, inputs.selfDisabledSenior - remaining);
                                                                            remaining = Math.max(0, remaining - inputs.selfDisabledSenior);
                                                                            const otherExcess = Math.max(0, inputs.otherFamily - remaining);
                                                                            // 공제 계산
                                                                            const infertilityDeduction = Math.round(infertilityExcess * 0.30);
                                                                            const prematureDeduction = Math.round(prematureExcess * 0.20);
                                                                            const selfDeduction = Math.round(selfExcess * 0.15);
                                                                            const otherDeduction = Math.round(Math.min(otherExcess, 7000000) * 0.15);
                                                                            return formatNumber(selfDeduction + otherDeduction + infertilityDeduction + prematureDeduction);
                                                                        })(),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1719,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-2 border-t border-black pt-2",
                                                                    children: (()=>{
                                                                        const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
                                                                        const actualMedical = totalMedical - inputs.insuranceReimbursement;
                                                                        const threshold = Math.round(inputs.salary * 0.03);
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                "실제 의료비: ",
                                                                                formatNumber(actualMedical),
                                                                                "원 | 3% 기준: ",
                                                                                formatNumber(threshold),
                                                                                "원 | 초과분: ",
                                                                                formatNumber(Math.max(0, actualMedical - threshold)),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true);
                                                                    })()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1746,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1717,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "edu" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "📚 교육비 세부 항목"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1763,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "본인 교육비 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "한도 없음, 15% 공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1769,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1768,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1766,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.selfEducation),
                                                                                    onChange: (e)=>handleInputChange("selfEducation", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1772,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1765,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "자녀 교육비 - 미취학 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "1인당 연 300만원 한도, 15% 공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1783,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1782,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1780,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.preschool),
                                                                                    onChange: (e)=>handleInputChange("preschool", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1786,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1779,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "자녀 교육비 - 초중고 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "1인당 연 300만원 한도, 15% 공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1797,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1796,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1794,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.elementary),
                                                                                    onChange: (e)=>handleInputChange("elementary", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1800,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1793,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "자녀 교육비 - 대학 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "1인당 연 900만원 한도, 15% 공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1811,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1810,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1808,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.university),
                                                                                    onChange: (e)=>handleInputChange("university", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1814,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1807,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1764,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1762,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1826,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: [
                                                                        inputs.selfEducation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "본인 교육비: ",
                                                                                formatNumber(inputs.selfEducation),
                                                                                "원 × 15%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1829,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.preschool > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "미취학: ",
                                                                                formatNumber(Math.min(inputs.preschool, 3000000)),
                                                                                "원 × 15% (한도 300만원)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1832,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.elementary > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "초중고: ",
                                                                                formatNumber(Math.min(inputs.elementary, 3000000)),
                                                                                "원 × 15% (한도 300만원)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1835,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.university > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "대학: ",
                                                                                formatNumber(Math.min(inputs.university, 9000000)),
                                                                                "원 × 15% (한도 900만원)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1838,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1827,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1825,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "교육비 세액공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1845,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        formatNumber(Math.round((inputs.selfEducation + Math.min(inputs.preschool, 3000000) + Math.min(inputs.elementary, 3000000) + Math.min(inputs.university, 9000000)) * 0.15)),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1846,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: "💡 교육비의 15% 세액공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1854,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1844,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "house" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "🏠 주택자금 세부 항목"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1864,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "주택청약저축 납입액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "연 납입액 최대 300만원 한도, 40% 소득공제 (총급여 7천만원 이하)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1870,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1869,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1867,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: `neo-input ${inputs.salary > 70000000 ? 'border-red-500 bg-red-50' : ''}`,
                                                                                    value: formatNumber(inputs.housingSubscription),
                                                                                    onChange: (e)=>handleInputChange("housingSubscription", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1873,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                inputs.salary > 70000000 && inputs.housingSubscription > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-red-500 font-bold",
                                                                                    children: "⚠️ 총급여 7천만원 초과로 공제 불가"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1880,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1866,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "주택임차차입금 원리금상환액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "연간 상환액의 40% 소득 공제, 연간 최대 400만원까지 공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1887,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1886,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1884,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.rentLoanPayment),
                                                                                    onChange: (e)=>handleInputChange("rentLoanPayment", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1890,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1883,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "장기주택저당차입금 이자상환액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "상환기간·방식에 따라 300~1,800만원 한도, 전액 소득공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1901,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1900,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1898,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.mortgageInterest),
                                                                                    onChange: (e)=>handleInputChange("mortgageInterest", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1904,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1897,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "월세 세액공제 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "연간 1,000만원 한도, 총급여 5,500만원 이하 17%, 초과 15%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 1915,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 1914,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1912,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.monthlyRent),
                                                                                    onChange: (e)=>handleInputChange("monthlyRent", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1918,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1911,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1865,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1863,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1930,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: [
                                                                        (inputs.housingSubscription > 0 && inputs.salary <= 70000000 || inputs.rentLoanPayment > 0 || inputs.mortgageInterest > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold",
                                                                                    children: "▸ 소득공제"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1934,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                inputs.housingSubscription > 0 && inputs.salary <= 70000000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "주택청약저축: ",
                                                                                        formatNumber(Math.min(inputs.housingSubscription, 3000000)),
                                                                                        "원 × 40% (연간 납입액 한도 300만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1936,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.housingSubscription > 0 && inputs.salary > 70000000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-red-500",
                                                                                    children: "주택청약저축: 총급여 7천만원 초과로 공제 제외"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1939,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.rentLoanPayment > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "주택임차차입금: ",
                                                                                        formatNumber(Math.min(inputs.rentLoanPayment, 4000000)),
                                                                                        "원 × 40% (연간 공제 한도 400만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1942,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.mortgageInterest > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "장기주택저당차입금: ",
                                                                                        formatNumber(inputs.mortgageInterest),
                                                                                        "원 (전액 공제)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1945,
                                                                                    columnNumber: 69
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true),
                                                                        inputs.monthlyRent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                    children: "▸ 세액공제"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1951,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "월세: ",
                                                                                        formatNumber(Math.min(inputs.monthlyRent, 10000000)),
                                                                                        "원 × ",
                                                                                        inputs.salary <= 55000000 ? "17%" : "15%",
                                                                                        " (한도 1,000만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1952,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1931,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1929,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "주택자금 공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1960,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        formatNumber((inputs.salary <= 70000000 ? Math.round(Math.min(inputs.housingSubscription, 3000000) * 0.4) : 0) + Math.round(Math.min(inputs.rentLoanPayment, 4000000) * 0.4) + inputs.mortgageInterest + Math.round(Math.min(inputs.monthlyRent, 10000000) * (inputs.salary <= 55000000 ? 0.17 : 0.15))),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1961,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-600 mt-2 border-t border-black pt-2 space-y-1",
                                                                    children: [
                                                                        (inputs.housingSubscription > 0 && inputs.salary <= 70000000 || inputs.rentLoanPayment > 0 || inputs.mortgageInterest > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "소득공제:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1971,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber((inputs.salary <= 70000000 ? Math.round(Math.min(inputs.housingSubscription, 3000000) * 0.4) : 0) + Math.round(Math.min(inputs.rentLoanPayment, 4000000) * 0.4) + inputs.mortgageInterest),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1971,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.housingSubscription > 0 && inputs.salary <= 70000000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "pl-4 text-xs",
                                                                            children: [
                                                                                "- 주택청약저축: ",
                                                                                formatNumber(Math.round(Math.min(inputs.housingSubscription, 3000000) * 0.4)),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1978,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.housingSubscription > 0 && inputs.salary > 70000000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "pl-4 text-xs text-red-500",
                                                                            children: "- 주택청약저축: 총급여 7천만원 초과로 공제 제외"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1981,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.rentLoanPayment > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "pl-4 text-xs",
                                                                            children: [
                                                                                "- 주택임차차입금: ",
                                                                                formatNumber(Math.round(Math.min(inputs.rentLoanPayment, 4000000) * 0.4)),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1984,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.mortgageInterest > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "pl-4 text-xs",
                                                                            children: [
                                                                                "- 장기주택저당차입금: ",
                                                                                formatNumber(inputs.mortgageInterest),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1987,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.monthlyRent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "세액공제:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 1990,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(inputs.monthlyRent, 10000000) * (inputs.salary <= 55000000 ? 0.17 : 0.15))),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1990,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.monthlyRent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "pl-4 text-xs",
                                                                            children: [
                                                                                "- 월세: ",
                                                                                formatNumber(Math.round(Math.min(inputs.monthlyRent, 10000000) * (inputs.salary <= 55000000 ? 0.17 : 0.15))),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 1993,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1969,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: "💡 무주택 세대주 요건 충족 시 적용 (주택청약저축은 총급여 7천만원 이하)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 1996,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 1959,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "pension" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "💰 연금계좌 세부 항목"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2006,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "연금저축 납입액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "연간 600만원 한도, 12% 세액공제 (지방세 제외)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2012,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2011,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2009,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.pensionSavings),
                                                                                    onChange: (e)=>handleInputChange("pensionSavings", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2015,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2008,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "퇴직연금(IRP) 납입액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "연금저축 포함 연간 900만원 한도, 12% 세액공제 (지방세 제외)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2026,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2025,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2023,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.irp),
                                                                                    onChange: (e)=>handleInputChange("irp", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2029,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2022,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "ISA 만기 전환금액 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "ISA 만기 후 연금계좌 전환 시 추가 300만원 한도 (10%), 12% 세액공제 (지방세 제외)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2040,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2039,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2037,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.isaTransfer),
                                                                                    onChange: (e)=>handleInputChange("isaTransfer", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2043,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2036,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2007,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2005,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4 border-t-2 border-black pt-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "🛡️ 보장성 보험료"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2055,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "일반 보장성 보험료 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "연간 100만원 한도, 12% 세액공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2061,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2060,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2058,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.generalInsurance),
                                                                                    onChange: (e)=>handleInputChange("generalInsurance", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2064,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2057,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "장애인 전용 보장성 보험료 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "연간 100만원 한도, 15% 세액공제",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2075,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2074,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2072,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.disabledInsurance),
                                                                                    onChange: (e)=>handleInputChange("disabledInsurance", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2078,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2071,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2056,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2054,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2090,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: [
                                                                        (inputs.pensionSavings > 0 || inputs.irp > 0 || inputs.isaTransfer > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold",
                                                                                    children: "▸ 연금계좌"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2094,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                inputs.pensionSavings > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "연금저축: ",
                                                                                        formatNumber(Math.min(inputs.pensionSavings, 6000000)),
                                                                                        "원 × 12% (한도 600만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2096,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.irp > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "퇴직연금(IRP): ",
                                                                                        formatNumber(Math.min(inputs.irp, 9000000 - Math.min(inputs.pensionSavings, 6000000))),
                                                                                        "원 × 12% (총 900만원 한도)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2099,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.isaTransfer > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "ISA 전환: ",
                                                                                        formatNumber(Math.min(inputs.isaTransfer * 0.1, 3000000)),
                                                                                        "원 (10%, 한도 300만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2102,
                                                                                    columnNumber: 69
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true),
                                                                        (inputs.generalInsurance > 0 || inputs.disabledInsurance > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                    children: "▸ 보장성 보험료"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2108,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                inputs.generalInsurance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "일반 보장성 보험: ",
                                                                                        formatNumber(Math.min(inputs.generalInsurance, 1000000)),
                                                                                        "원 × 12% (한도 100만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2110,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.disabledInsurance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "장애인 전용 보험: ",
                                                                                        formatNumber(Math.min(inputs.disabledInsurance, 1000000)),
                                                                                        "원 × 15% (한도 100만원)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2113,
                                                                                    columnNumber: 69
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2091,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2089,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "연금계좌·보험료 세액공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2122,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        formatNumber(Math.round((Math.min(inputs.pensionSavings, 6000000) + Math.min(inputs.irp, 9000000 - Math.min(inputs.pensionSavings, 6000000)) + Math.min(inputs.isaTransfer * 0.1, 3000000)) * 0.12) + Math.round(Math.min(inputs.generalInsurance, 1000000) * 0.12) + Math.round(Math.min(inputs.disabledInsurance, 1000000) * 0.15)),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2123,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-600 mt-2 border-t border-black pt-2 space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "연금계좌:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2133,
                                                                                    columnNumber: 62
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round((Math.min(inputs.pensionSavings, 6000000) + Math.min(inputs.irp, 9000000 - Math.min(inputs.pensionSavings, 6000000)) + Math.min(inputs.isaTransfer * 0.1, 3000000)) * 0.12)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2133,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "보장성보험료:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2138,
                                                                                    columnNumber: 62
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(inputs.generalInsurance, 1000000) * 0.12) + Math.round(Math.min(inputs.disabledInsurance, 1000000) * 0.15)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2138,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        inputs.disabledInsurance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "pl-4 text-xs",
                                                                            children: [
                                                                                "- 장애인 전용: ",
                                                                                formatNumber(Math.round(Math.min(inputs.disabledInsurance, 1000000) * 0.15)),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2144,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2132,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: "💡 연금저축 + IRP 합계 최대 900만원, ISA 전환 추가 300만원"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2147,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2121,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "donation" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "❤️ 기부금 세부 항목"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2157,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "정치자금 기부금 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "10만원 이하 100/110, 초과 15%, 3천만원 초과 25%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2163,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2162,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2160,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.politicalDonation),
                                                                                    onChange: (e)=>handleInputChange("politicalDonation", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2166,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2159,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "고향사랑 기부금 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "10만원 이하 100/110, 초과 15% (일반+특별재난 합산 2,000만원 한도)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2177,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2176,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2174,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.hometownDonation),
                                                                                    onChange: (e)=>handleInputChange("hometownDonation", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2180,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2173,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "고향사랑 특별재난지역 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "10만원 이하 100/110, 초과 30% (일반+특별재난 합산 2,000만원 한도)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2191,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2190,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2188,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.hometownDisaster),
                                                                                    onChange: (e)=>handleInputChange("hometownDisaster", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2194,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2187,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "특례기부금 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "소득 100% 한도, 1천만원 이하 15%, 초과 30%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2205,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2204,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2202,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.specialDonation),
                                                                                    onChange: (e)=>handleInputChange("specialDonation", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2208,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2201,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "우리사주조합 기부금 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "소득 30% 한도, 1천만원 이하 15%, 초과 30%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2219,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2218,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2216,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.employeeDonation),
                                                                                    onChange: (e)=>handleInputChange("employeeDonation", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2222,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2215,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "일반기부금 - 종교단체 외 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "소득 30% 한도, 1천만원 이하 15%, 초과 30%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2233,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2232,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2230,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.designatedDonation),
                                                                                    onChange: (e)=>handleInputChange("designatedDonation", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2236,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2229,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "일반기부금 - 종교단체 (원)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "소득 10% 한도, 1천만원 이하 15%, 초과 30%",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2247,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2246,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2244,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    className: "neo-input",
                                                                                    value: formatNumber(inputs.religiousDonation),
                                                                                    onChange: (e)=>handleInputChange("religiousDonation", e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2250,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2243,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2158,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2156,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2262,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: (()=>{
                                                                        // 정치자금: 10만원 이하 100/110, 초과 15%, 3천만원 초과 25%
                                                                        const politicalBase = Math.min(inputs.politicalDonation, 100000) * (100 / 110);
                                                                        const politicalExcess = Math.max(0, inputs.politicalDonation - 100000);
                                                                        const politicalExcess15 = Math.min(politicalExcess, 30000000);
                                                                        const politicalExcess25 = Math.max(0, politicalExcess - 30000000);
                                                                        const politicalDeduction = politicalBase + politicalExcess15 * 0.15 + politicalExcess25 * 0.25;
                                                                        // 고향사랑: 합산 2천만원 한도
                                                                        const hometownTotal = inputs.hometownDonation + inputs.hometownDisaster;
                                                                        const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
                                                                        const hometownDisasterLimited = Math.min(inputs.hometownDisaster, Math.max(0, 20000000 - hometownLimited));
                                                                        const hometownBase = Math.min(hometownLimited, 100000) * (100 / 110);
                                                                        const hometownExcess = Math.max(0, hometownLimited - 100000) * 0.15;
                                                                        const hometownDeduction = hometownBase + hometownExcess;
                                                                        const disasterBase = Math.min(hometownDisasterLimited, 100000) * (100 / 110);
                                                                        const disasterExcess = Math.max(0, hometownDisasterLimited - 100000) * 0.30;
                                                                        const disasterDeduction = disasterBase + disasterExcess;
                                                                        // 특례기부금: 1천만원 이하 15%, 초과 30%
                                                                        const special15 = Math.min(inputs.specialDonation, 10000000) * 0.15;
                                                                        const special30 = Math.max(0, inputs.specialDonation - 10000000) * 0.30;
                                                                        const specialDeduction = special15 + special30;
                                                                        // 우리사주조합: 소득 30% 한도
                                                                        const employeeLimit = inputs.salary * 0.30;
                                                                        const employeeLimited = Math.min(inputs.employeeDonation, employeeLimit);
                                                                        const employee15 = Math.min(employeeLimited, 10000000) * 0.15;
                                                                        const employee30 = Math.max(0, employeeLimited - 10000000) * 0.30;
                                                                        const employeeDeduction = employee15 + employee30;
                                                                        // 일반기부금 (종교단체 외): 소득 30% 한도
                                                                        const designatedLimit = inputs.salary * 0.30;
                                                                        const designatedLimited = Math.min(inputs.designatedDonation, designatedLimit);
                                                                        const designated15 = Math.min(designatedLimited, 10000000) * 0.15;
                                                                        const designated30 = Math.max(0, designatedLimited - 10000000) * 0.30;
                                                                        const designatedDeduction = designated15 + designated30;
                                                                        // 종교단체: 소득 10% 한도
                                                                        const religiousLimit = inputs.salary * 0.10;
                                                                        const religiousLimited = Math.min(inputs.religiousDonation, religiousLimit);
                                                                        const religious15 = Math.min(religiousLimited, 10000000) * 0.15;
                                                                        const religious30 = Math.max(0, religiousLimited - 10000000) * 0.30;
                                                                        const religiousDeduction = religious15 + religious30;
                                                                        const totalDeduction = politicalDeduction + hometownDeduction + disasterDeduction + specialDeduction + employeeDeduction + designatedDeduction + religiousDeduction;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                inputs.politicalDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold",
                                                                                            children: "▸ 정치자금 기부금"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2318,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        Math.min(inputs.politicalDonation, 100000) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.min(inputs.politicalDonation, 100000)),
                                                                                                "원 × 100/110 = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(politicalBase)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2320,
                                                                                                    columnNumber: 157
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2320,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        politicalExcess15 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(politicalExcess15),
                                                                                                "원 × 15% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(politicalExcess15 * 0.15)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2323,
                                                                                                    columnNumber: 128
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2323,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        politicalExcess25 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(politicalExcess25),
                                                                                                "원 × 25% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(politicalExcess25 * 0.25)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2326,
                                                                                                    columnNumber: 128
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2326,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true),
                                                                                inputs.hometownDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 고향사랑 기부금"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2332,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        Math.min(hometownLimited, 100000) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.min(hometownLimited, 100000)),
                                                                                                "원 × 100/110 = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(hometownBase)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2334,
                                                                                                    columnNumber: 148
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2334,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        Math.max(0, hometownLimited - 100000) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.max(0, hometownLimited - 100000)),
                                                                                                "원 × 15% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(hometownExcess)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2337,
                                                                                                    columnNumber: 148
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2337,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true),
                                                                                inputs.hometownDisaster > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 고향사랑 특별재난지역"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2343,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        Math.min(hometownDisasterLimited, 100000) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.min(hometownDisasterLimited, 100000)),
                                                                                                "원 × 100/110 = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-green-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(disasterBase)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2345,
                                                                                                    columnNumber: 156
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2345,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        Math.max(0, hometownDisasterLimited - 100000) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.max(0, hometownDisasterLimited - 100000)),
                                                                                                "원 × 30% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-green-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(disasterExcess)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2348,
                                                                                                    columnNumber: 156
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2348,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true),
                                                                                inputs.specialDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 특례기부금"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2354,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        Math.min(inputs.specialDonation, 10000000) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.min(inputs.specialDonation, 10000000)),
                                                                                                "원 × 15% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(special15)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2356,
                                                                                                    columnNumber: 153
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2356,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        Math.max(0, inputs.specialDonation - 10000000) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.max(0, inputs.specialDonation - 10000000)),
                                                                                                "원 × 30% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(special30)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2359,
                                                                                                    columnNumber: 157
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2359,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true),
                                                                                inputs.employeeDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 우리사주조합 기부금"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2365,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　한도: 소득의 30% = ",
                                                                                                formatNumber(Math.round(employeeLimit)),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2366,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        employee15 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.min(employeeLimited, 10000000)),
                                                                                                "원 × 15% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(employee15)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2368,
                                                                                                    columnNumber: 146
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2368,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        employee30 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.max(0, employeeLimited - 10000000)),
                                                                                                "원 × 30% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(employee30)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2371,
                                                                                                    columnNumber: 150
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2371,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true),
                                                                                inputs.designatedDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 일반기부금 (종교단체 외)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2377,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　한도: 소득의 30% = ",
                                                                                                formatNumber(Math.round(designatedLimit)),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2378,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        designated15 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.min(designatedLimited, 10000000)),
                                                                                                "원 × 15% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(designated15)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2380,
                                                                                                    columnNumber: 148
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2380,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        designated30 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.max(0, designatedLimited - 10000000)),
                                                                                                "원 × 30% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(designated30)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2383,
                                                                                                    columnNumber: 152
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2383,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true),
                                                                                inputs.religiousDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                            children: "▸ 일반기부금 (종교단체)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2389,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　한도: 소득의 10% = ",
                                                                                                formatNumber(Math.round(religiousLimit)),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2390,
                                                                                            columnNumber: 77
                                                                                        }, this),
                                                                                        religious15 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.min(religiousLimited, 10000000)),
                                                                                                "원 × 15% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(religious15)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2392,
                                                                                                    columnNumber: 147
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2392,
                                                                                            columnNumber: 81
                                                                                        }, this),
                                                                                        religious30 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            children: [
                                                                                                "　",
                                                                                                formatNumber(Math.max(0, religiousLimited - 10000000)),
                                                                                                "원 × 30% = ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-bold text-blue-600",
                                                                                                    children: [
                                                                                                        formatNumber(Math.round(religious30)),
                                                                                                        "원"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                                    lineNumber: 2395,
                                                                                                    columnNumber: 151
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2395,
                                                                                            columnNumber: 81
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true)
                                                                            ]
                                                                        }, void 0, true);
                                                                    })()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2263,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2261,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "💗 기부금 세액공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2407,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        (()=>{
                                                                            // 정치자금
                                                                            const politicalBase = Math.min(inputs.politicalDonation, 100000) * (100 / 110);
                                                                            const politicalExcess = Math.max(0, inputs.politicalDonation - 100000);
                                                                            const politicalExcess15 = Math.min(politicalExcess, 30000000);
                                                                            const politicalExcess25 = Math.max(0, politicalExcess - 30000000);
                                                                            const politicalDeduction = politicalBase + politicalExcess15 * 0.15 + politicalExcess25 * 0.25;
                                                                            // 고향사랑
                                                                            const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
                                                                            const hometownDisasterLimited = Math.min(inputs.hometownDisaster, Math.max(0, 20000000 - hometownLimited));
                                                                            const hometownBase = Math.min(hometownLimited, 100000) * (100 / 110);
                                                                            const hometownExcess = Math.max(0, hometownLimited - 100000) * 0.15;
                                                                            const hometownDeduction = hometownBase + hometownExcess;
                                                                            const disasterBase = Math.min(hometownDisasterLimited, 100000) * (100 / 110);
                                                                            const disasterExcess = Math.max(0, hometownDisasterLimited - 100000) * 0.30;
                                                                            const disasterDeduction = disasterBase + disasterExcess;
                                                                            // 특례, 우리사주, 일반, 종교
                                                                            const special15 = Math.min(inputs.specialDonation, 10000000) * 0.15;
                                                                            const special30 = Math.max(0, inputs.specialDonation - 10000000) * 0.30;
                                                                            const employeeLimited = Math.min(inputs.employeeDonation, inputs.salary * 0.30);
                                                                            const employee15 = Math.min(employeeLimited, 10000000) * 0.15;
                                                                            const employee30 = Math.max(0, employeeLimited - 10000000) * 0.30;
                                                                            const designatedLimited = Math.min(inputs.designatedDonation, inputs.salary * 0.30);
                                                                            const designated15 = Math.min(designatedLimited, 10000000) * 0.15;
                                                                            const designated30 = Math.max(0, designatedLimited - 10000000) * 0.30;
                                                                            const religiousLimited = Math.min(inputs.religiousDonation, inputs.salary * 0.10);
                                                                            const religious15 = Math.min(religiousLimited, 10000000) * 0.15;
                                                                            const religious30 = Math.max(0, religiousLimited - 10000000) * 0.30;
                                                                            const totalDeduction = politicalDeduction + hometownDeduction + disasterDeduction + special15 + special30 + employee15 + employee30 + designated15 + designated30 + religious15 + religious30;
                                                                            return formatNumber(Math.round(totalDeduction));
                                                                        })(),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2408,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-600 mt-2 border-t border-black pt-2 space-y-1",
                                                                    children: [
                                                                        inputs.politicalDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "정치자금:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2448,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(inputs.politicalDonation, 100000) * (100 / 110) + Math.min(Math.max(0, inputs.politicalDonation - 100000), 30000000) * 0.15 + Math.max(0, inputs.politicalDonation - 100000 - 30000000) * 0.25)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2448,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.hometownDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "고향사랑:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2451,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(Math.min(inputs.hometownDonation, 20000000), 100000) * (100 / 110) + Math.max(0, Math.min(inputs.hometownDonation, 20000000) - 100000) * 0.15)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2451,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.hometownDisaster > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "고향사랑 특별재난:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2454,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(Math.min(inputs.hometownDisaster, Math.max(0, 20000000 - Math.min(inputs.hometownDonation, 20000000))), 100000) * (100 / 110) + Math.max(0, Math.min(inputs.hometownDisaster, Math.max(0, 20000000 - Math.min(inputs.hometownDonation, 20000000))) - 100000) * 0.30)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2454,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.specialDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "특례기부금:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2457,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(inputs.specialDonation, 10000000) * 0.15 + Math.max(0, inputs.specialDonation - 10000000) * 0.30)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2457,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.employeeDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "우리사주조합:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2460,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(Math.min(inputs.employeeDonation, inputs.salary * 0.30), 10000000) * 0.15 + Math.max(0, Math.min(inputs.employeeDonation, inputs.salary * 0.30) - 10000000) * 0.30)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2460,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.designatedDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "일반기부금(종교단체 외):"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2463,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(Math.min(inputs.designatedDonation, inputs.salary * 0.30), 10000000) * 0.15 + Math.max(0, Math.min(inputs.designatedDonation, inputs.salary * 0.30) - 10000000) * 0.30)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2463,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.religiousDonation > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "종교단체:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2466,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(Math.round(Math.min(Math.min(inputs.religiousDonation, inputs.salary * 0.10), 10000000) * 0.15 + Math.max(0, Math.min(inputs.religiousDonation, inputs.salary * 0.10) - 10000000) * 0.30)),
                                                                                "원 세액공제"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2466,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2446,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: [
                                                                        "💡 총 기부액: ",
                                                                        formatNumber(inputs.politicalDonation + inputs.hometownDonation + inputs.hometownDisaster + inputs.specialDonation + inputs.employeeDonation + inputs.designatedDonation + inputs.religiousDonation),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2469,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2406,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                cat.id === "childTaxCredit" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-black text-sm border-b-2 border-black pb-2",
                                                                    children: "👶 자녀 세액공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2479,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "만 8세 이상 자녀 수 (명)",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "1명 25만원, 2명 55만원, 3명 이상 55만원 + 2명 초과 1명당 40만원",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2485,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2484,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2482,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    max: "10",
                                                                                    className: "neo-input",
                                                                                    value: inputs.childrenOver8,
                                                                                    onChange: (e)=>setInputs((prev)=>({
                                                                                                ...prev,
                                                                                                childrenOver8: Math.max(0, parseInt(e.target.value) || 0)
                                                                                            }))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2488,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2481,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "font-bold flex items-center gap-2",
                                                                                    children: [
                                                                                        "출생·입양자",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                                            content: "첫째 30만원, 둘째 50만원, 셋째 이상 70만원/명",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                                size: 14,
                                                                                                className: "text-gray-400 cursor-help"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/calculator/page.tsx",
                                                                                                lineNumber: 2501,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2500,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2498,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                    className: "neo-input",
                                                                                    value: inputs.birthAdoption,
                                                                                    onChange: (e)=>setInputs((prev)=>({
                                                                                                ...prev,
                                                                                                birthAdoption: e.target.value
                                                                                            })),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "none",
                                                                                            children: "선택 안함"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2509,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "first",
                                                                                            children: "첫째 (30만원)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2510,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "second",
                                                                                            children: "둘째 (50만원)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2511,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "third1",
                                                                                            children: "셋째 이상 1명 (70만원)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2512,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "third2",
                                                                                            children: "셋째 이상 2명 (140만원)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2513,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "third3",
                                                                                            children: "셋째 이상 3명 (210만원)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2514,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2504,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2497,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2480,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2478,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-cyan/20 p-4 border-2 border-black space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-sm",
                                                                    children: "계산식"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2522,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm space-y-1",
                                                                    children: [
                                                                        inputs.childrenOver8 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold",
                                                                                    children: "▸ 만 8세 이상 자녀"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2526,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                inputs.childrenOver8 === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　1명: ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-blue-600",
                                                                                            children: "250,000원"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2528,
                                                                                            columnNumber: 77
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2528,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.childrenOver8 === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　2명: ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-blue-600",
                                                                                            children: "550,000원"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2531,
                                                                                            columnNumber: 77
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2531,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.childrenOver8 >= 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　",
                                                                                        inputs.childrenOver8,
                                                                                        "명: 550,000원 + (",
                                                                                        inputs.childrenOver8,
                                                                                        " - 2) × 400,000원 = ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-blue-600",
                                                                                            children: [
                                                                                                formatNumber(550000 + (inputs.childrenOver8 - 2) * 400000),
                                                                                                "원"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2534,
                                                                                            columnNumber: 151
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2534,
                                                                                    columnNumber: 69
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true),
                                                                        inputs.birthAdoption !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold border-t border-black pt-1 mt-2",
                                                                                    children: "▸ 출생·입양"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2540,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                inputs.birthAdoption === "first" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　첫째: ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: "300,000원"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2542,
                                                                                            columnNumber: 77
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2542,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.birthAdoption === "second" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　둘째: ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: "500,000원"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2545,
                                                                                            columnNumber: 77
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2545,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.birthAdoption === "third1" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　셋째 이상 1명: 700,000원 × 1명 = ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: "700,000원"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2548,
                                                                                            columnNumber: 99
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2548,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.birthAdoption === "third2" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　셋째 이상 2명: 700,000원 × 2명 = ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: "1,400,000원"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2551,
                                                                                            columnNumber: 99
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2551,
                                                                                    columnNumber: 69
                                                                                }, this),
                                                                                inputs.birthAdoption === "third3" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        "　셋째 이상 3명: 700,000원 × 3명 = ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-bold text-green-600",
                                                                                            children: "2,100,000원"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                                            lineNumber: 2554,
                                                                                            columnNumber: 99
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2554,
                                                                                    columnNumber: 69
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2523,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2521,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-neo-yellow p-4 border-2 border-black",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold mb-1",
                                                                    children: "👶 자녀 세액공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2563,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-2xl font-black",
                                                                    children: [
                                                                        formatNumber((()=>{
                                                                            let total = 0;
                                                                            // 기본공제 대상 자녀
                                                                            if (inputs.childrenOver8 === 1) total += 250000;
                                                                            else if (inputs.childrenOver8 === 2) total += 550000;
                                                                            else if (inputs.childrenOver8 >= 3) total += 550000 + (inputs.childrenOver8 - 2) * 400000;
                                                                            // 출생·입양 공제
                                                                            if (inputs.birthAdoption === "first") total += 300000;
                                                                            else if (inputs.birthAdoption === "second") total += 500000;
                                                                            else if (inputs.birthAdoption === "third1") total += 700000;
                                                                            else if (inputs.birthAdoption === "third2") total += 1400000;
                                                                            else if (inputs.birthAdoption === "third3") total += 2100000;
                                                                            return total;
                                                                        })()),
                                                                        "원"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2564,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-600 mt-2 border-t border-black pt-2 space-y-1",
                                                                    children: [
                                                                        inputs.childrenOver8 > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "자녀 기본공제:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2582,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(inputs.childrenOver8 === 1 ? 250000 : inputs.childrenOver8 === 2 ? 550000 : inputs.childrenOver8 >= 3 ? 550000 + (inputs.childrenOver8 - 2) * 400000 : 0),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2582,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        inputs.birthAdoption !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: [
                                                                                "• ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: "출생·입양:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                                    lineNumber: 2589,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                " ",
                                                                                formatNumber(inputs.birthAdoption === "first" ? 300000 : inputs.birthAdoption === "second" ? 500000 : inputs.birthAdoption === "third1" ? 700000 : inputs.birthAdoption === "third2" ? 1400000 : inputs.birthAdoption === "third3" ? 2100000 : 0),
                                                                                "원"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calculator/page.tsx",
                                                                            lineNumber: 2589,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2580,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mt-1",
                                                                    children: "💡 기본공제 대상 자녀 중 출생·입양자가 있으면 추가 공제"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calculator/page.tsx",
                                                                    lineNumber: 2598,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calculator/page.tsx",
                                                            lineNumber: 2562,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 917,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/calculator/page.tsx",
                                        lineNumber: 911,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 909,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, cat.id, true, {
                            fileName: "[project]/app/calculator/page.tsx",
                            lineNumber: 884,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCalculate,
                        disabled: isCalculating,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("neo-btn w-full text-xl py-4", isCalculating ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"),
                        children: isCalculating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    size: 24,
                                    className: "animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2622,
                                    columnNumber: 29
                                }, this),
                                "계산 중..."
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2627,
                                    columnNumber: 29
                                }, this),
                                "예상 환급액 계산하기"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/calculator/page.tsx",
                        lineNumber: 2610,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calculator/page.tsx",
                lineNumber: 858,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "neo-card bg-neo-black text-white mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-gray-400 mb-1",
                                    children: "⑨ 예상 환급액"
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2639,
                                    columnNumber: 25
                                }, this),
                                (()=>{
                                    if (!result) return null;
                                    // 소득세 환급: 결정세액 - 기납부세액(소득세)
                                    const incomeTaxRefund = result.finalTax - result.withheldTax;
                                    // 지방소득세 결정세액: 결정세액의 10%
                                    const localTaxDue = Math.round(result.finalTax * 0.1);
                                    // 지방소득세 환급: 지방소득세 결정세액 - 기납부세액(지방소득세)
                                    const localTaxRefund = localTaxDue - inputs.localIncomeTax;
                                    // 총 환급액
                                    const totalRefund = incomeTaxRefund + localTaxRefund;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("text-4xl font-black mb-2", totalRefund <= 0 ? "text-neo-cyan" : "text-red-400"),
                                                children: [
                                                    formatNumber(totalRefund),
                                                    "원"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calculator/page.tsx",
                                                lineNumber: 2655,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-gray-400",
                                                        children: "▸ 소득세"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2662,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "pl-2",
                                                        children: [
                                                            "결정세액: ",
                                                            formatNumber(result.finalTax),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2663,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "pl-2",
                                                        children: [
                                                            "기납부세액: -",
                                                            formatNumber(result.withheldTax),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2664,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "pl-2 text-neo-cyan",
                                                        children: [
                                                            "→ 소득세 환급: ",
                                                            formatNumber(incomeTaxRefund),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2665,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-gray-400 pt-1",
                                                        children: "▸ 지방소득세"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2667,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "pl-2",
                                                        children: [
                                                            "결정세액 (10%): ",
                                                            formatNumber(localTaxDue),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2668,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "pl-2",
                                                        children: [
                                                            "기납부세액: -",
                                                            formatNumber(inputs.localIncomeTax),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2669,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "pl-2 text-neo-cyan",
                                                        children: [
                                                            "→ 지방소득세 환급: ",
                                                            formatNumber(localTaxRefund),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2670,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "border-t border-gray-600 pt-1 mt-1 font-semibold",
                                                        children: [
                                                            "총 환급액: ",
                                                            formatNumber(incomeTaxRefund),
                                                            " + ",
                                                            formatNumber(localTaxRefund),
                                                            " = ",
                                                            formatNumber(totalRefund),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calculator/page.tsx",
                                                        lineNumber: 2672,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calculator/page.tsx",
                                                lineNumber: 2661,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true);
                                })(),
                                !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl font-black mb-2 text-gray-500",
                                    children: "계산을 시작하세요"
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2680,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculator/page.tsx",
                            lineNumber: 2638,
                            columnNumber: 21
                        }, this),
                        result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "neo-card bg-white mb-4 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold mb-3 border-b-2 border-black pb-2",
                                    children: "📋 계산 플로우"
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2689,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "① 총급여액"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2693,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: [
                                                        formatNumber(result.salary),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2694,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2692,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "② 근로소득공제"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2699,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-blue-600",
                                                    children: [
                                                        "-",
                                                        formatNumber(result.incomeDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2700,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2698,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center bg-neo-yellow/30 p-2 -mx-2 border-y border-black",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "③ 근로소득금액"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2705,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: [
                                                        formatNumber(result.earnedIncome),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2706,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2704,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "④ 소득공제 합계"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2711,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-blue-600",
                                                    children: [
                                                        "-",
                                                        formatNumber(result.totalIncomeDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2712,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2710,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center bg-neo-yellow/30 p-2 -mx-2 border-y border-black",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "⑤ 과세표준"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2717,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: [
                                                        formatNumber(result.taxableIncome),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2718,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2716,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "⑥ 산출세액"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2723,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: [
                                                        formatNumber(result.calculatedTax),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2724,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2722,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "⑦ 세액공제 합계"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2729,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-blue-600",
                                                    children: [
                                                        "-",
                                                        formatNumber(result.totalTaxCredit),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2730,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2728,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center bg-neo-yellow/30 p-2 -mx-2 border-y border-black",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "⑧ 결정세액"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2735,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: [
                                                        formatNumber(result.finalTax),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2736,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2734,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "기납부세액 (소득세)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2741,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-blue-600",
                                                    children: [
                                                        "-",
                                                        formatNumber(result.withheldTax),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2742,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2740,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: "기납부세액 (지방소득세)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2745,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-blue-600",
                                                    children: [
                                                        "-",
                                                        formatNumber(inputs.localIncomeTax),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2746,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2744,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2690,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculator/page.tsx",
                            lineNumber: 2688,
                            columnNumber: 25
                        }, this),
                        result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "neo-card bg-white mb-4 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold mb-3 border-b-2 border-black pb-2",
                                    children: "📊 공제 내역 상세"
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2755,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-gray-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between font-bold text-sm text-black border-b border-black pb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "소득공제 (④)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2758,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600",
                                                    children: [
                                                        formatNumber(result.totalIncomeDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2759,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2757,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "인적공제"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2762,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.personalDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2763,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2761,
                                            columnNumber: 33
                                        }, this),
                                        result.socialInsuranceDeduction > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "4대보험"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2767,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.socialInsuranceDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2768,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2766,
                                            columnNumber: 37
                                        }, this),
                                        result.cardDeduction > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "신용카드 등"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2773,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.cardDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2774,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2772,
                                            columnNumber: 37
                                        }, this),
                                        result.housingDeduction > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "주택자금"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2779,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.housingDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2780,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2778,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between font-bold text-sm text-black border-b border-black pb-1 pt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "세액공제 (⑦)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2784,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600",
                                                    children: [
                                                        formatNumber(result.totalTaxCredit),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2785,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2783,
                                            columnNumber: 33
                                        }, this),
                                        result.earnedIncomeTaxCredit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "근로소득세액공제"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2789,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.earnedIncomeTaxCredit),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2790,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2788,
                                            columnNumber: 37
                                        }, this),
                                        result.childTaxCredit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "자녀세액공제"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2795,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.childTaxCredit),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2796,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2794,
                                            columnNumber: 37
                                        }, this),
                                        result.medicalDeduction > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "의료비"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2801,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.medicalDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2802,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2800,
                                            columnNumber: 37
                                        }, this),
                                        result.educationDeduction > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "교육비"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2807,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.educationDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2808,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2806,
                                            columnNumber: 37
                                        }, this),
                                        result.pensionDeduction > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "연금·보험료"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2813,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.pensionDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2814,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2812,
                                            columnNumber: 37
                                        }, this),
                                        result.donationDeduction > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "기부금"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2819,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        formatNumber(result.donationDeduction),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calculator/page.tsx",
                                                    lineNumber: 2820,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2818,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2756,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculator/page.tsx",
                            lineNumber: 2754,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "neo-btn w-full bg-neo-orange hover:bg-neo-yellow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2828,
                                    columnNumber: 25
                                }, this),
                                "AI 최적화 제안 받기"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculator/page.tsx",
                            lineNumber: 2827,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 bg-white border-2 border-black p-4 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold mb-2 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            size: 16,
                                            className: "text-red-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/calculator/page.tsx",
                                            lineNumber: 2834,
                                            columnNumber: 29
                                        }, this),
                                        "주의사항"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2833,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "이 결과는 시뮬레이션 값이며, 실제 국세청 확정 자료와 다를 수 있습니다."
                                }, void 0, false, {
                                    fileName: "[project]/app/calculator/page.tsx",
                                    lineNumber: 2837,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calculator/page.tsx",
                            lineNumber: 2832,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/calculator/page.tsx",
                    lineNumber: 2636,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/calculator/page.tsx",
                lineNumber: 2635,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calculator/page.tsx",
        lineNumber: 856,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_5185a1ca._.js.map