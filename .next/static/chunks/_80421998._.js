(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/tax-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    } catch (e) {
        return false;
    }
}
function saveAdminData(year, data) {
    try {
        const key = "".concat(ADMIN_STORAGE_KEY_PREFIX).concat(year);
        console.log("[DEBUG] saveAdminData called for year:", year);
        localStorage.setItem(key, JSON.stringify(data));
        console.log("[DEBUG] Admin data saved successfully! Key:", key);
    } catch (error) {
        console.error("[ERROR] Failed to save admin data:", error);
    }
}
function loadAdminData(year) {
    try {
        const key = "".concat(ADMIN_STORAGE_KEY_PREFIX).concat(year);
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
        const key = "".concat(ADMIN_STORAGE_KEY_PREFIX).concat(year);
        return localStorage.getItem(key) !== null;
    } catch (e) {
        return false;
    }
}
function generateDeductionAnalysis(adminData) {
    var _adminData_family;
    const salary = adminData.salary.totalSalary - adminData.salary.mealAllowance;
    const spending = adminData.spending;
    const deductions = adminData.deductions;
    // 신용카드 등 소득공제 계산
    const totalCardSpending = spending.creditCard + spending.debitCard + spending.cash + spending.publicTransport + spending.traditionalMarket + spending.culture;
    const minSpending = salary * 0.25; // 25% 문턱
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
    const hasChildren = ((_adminData_family = adminData.family) === null || _adminData_family === void 0 ? void 0 : _adminData_family.children) >= 1;
    const cardLimit = hasChildren ? 7000000 : 6000000;
    const items = [
        {
            id: "1",
            category: "신용카드 등 사용금액",
            type: "소득공제",
            amount: totalCardSpending,
            limit: cardLimit,
            status: getCardStatus(),
            thresholdInfo: "25% 문턱: ".concat(Math.round(minSpending).toLocaleString("ko-KR"), "원")
        },
        {
            id: "2",
            category: "주택마련저축",
            type: "소득공제",
            amount: deductions.housing,
            limit: 3000000,
            status: getStatus(deductions.housing / 3000000)
        },
        {
            id: "3",
            category: "의료비",
            type: "세액공제",
            amount: deductions.medical,
            limit: 7000000,
            status: deductions.medical > salary * 0.03 ? "good" : "warning",
            thresholdInfo: "3% 문턱: ".concat(Math.round(salary * 0.03).toLocaleString("ko-KR"), "원")
        },
        {
            id: "4",
            category: "교육비",
            type: "세액공제",
            amount: deductions.education,
            limit: 3000000,
            status: getStatus(deductions.education / 3000000)
        },
        {
            id: "5",
            category: "기부금",
            type: "세액공제",
            amount: deductions.donation,
            limit: 200000,
            status: getStatus(deductions.donation / 200000)
        },
        {
            id: "6",
            category: "연금저축/IRP",
            type: "세액공제",
            amount: deductions.pension,
            limit: 9000000,
            status: getStatus(deductions.pension / 9000000)
        },
        {
            id: "7",
            category: "보험료",
            type: "세액공제",
            amount: deductions.insurance,
            limit: 1000000,
            status: getStatus(deductions.insurance / 1000000)
        }
    ];
    return items;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tax-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function AdminPage() {
    var _monthlySalary_selectedMonth, _monthlySalary_selectedMonth1, _monthlySalary_selectedMonth2, _monthlySalary_selectedMonth3, _monthlySalary_selectedMonth4, _monthlySalary_selectedMonth5, _monthlySalary_selectedMonth6, _monthlySalary_selectedMonth7, _monthlySalary_selectedMonth8, _monthlySalary_selectedMonth9, _selectedItemDetails_details, _selectedItemDetails_details1;
    _s();
    const [selectedYear, setSelectedYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2025);
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [monthlySalary, setMonthlySalary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AdminPage.useState": ()=>{
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
        }
    }["AdminPage.useState"]);
    const [clickedBtn, setClickedBtn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCameraModal, setShowCameraModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [capturedImages, setCapturedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showExcelModal, setShowExcelModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [excelFile, setExcelFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isExcelDragging, setIsExcelDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [excelModalMonth, setExcelModalMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [ocrModalMonth, setOcrModalMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ocrImageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardExcelInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 카드사 엑셀 업로드 상태
    const [showCardExcelModal, setShowCardExcelModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cardExcelFile, setCardExcelFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCardExcelDragging, setIsCardExcelDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cardType, setCardType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("credit");
    const [cardExcelPreview, setCardExcelPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [excludedCount, setExcludedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // 지출 항목 상태
    const [selectedSpendingMonth, setSelectedSpendingMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1); // 지출 데이터 월 선택
    const [spendingItems, setSpendingItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
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
    const [showAddItemModal, setShowAddItemModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newItemName, setNewItemName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newItemAmount, setNewItemAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newItemMonth, setNewItemMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1); // 신규 항목 월 선택
    // 세부 내역 모달 상태
    const [showDetailsModal, setShowDetailsModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedItemDetails, setSelectedItemDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // 가족정보 상태 (기본공제 - 본인 제외)
    const [familyData, setFamilyData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
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
        callback === null || callback === void 0 ? void 0 : callback();
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
        const savedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadAdminData"])(year);
        if (savedData) {
            // 월별 급여 데이터 복원
            if (savedData.salary.monthly) {
                setMonthlySalary(savedData.salary.monthly);
            } else {
                var _savedData_salary_totalSalary, _savedData_salary_mealAllowance, _savedData_salary_nationalPension, _savedData_salary_healthInsurance, _savedData_salary_longTermCare, _savedData_salary_employmentInsurance, _savedData_salary_bonus, _savedData_salary_childTuition, _savedData_salary_prepaidTax, _savedData_salary_localIncomeTax;
                // 구버전 호환: 단일 데이터를 12개월에 복사
                const legacyData = {
                    totalSalary: ((_savedData_salary_totalSalary = savedData.salary.totalSalary) === null || _savedData_salary_totalSalary === void 0 ? void 0 : _savedData_salary_totalSalary.toLocaleString("ko-KR")) || "0",
                    mealAllowance: ((_savedData_salary_mealAllowance = savedData.salary.mealAllowance) === null || _savedData_salary_mealAllowance === void 0 ? void 0 : _savedData_salary_mealAllowance.toLocaleString("ko-KR")) || "0",
                    nationalPension: ((_savedData_salary_nationalPension = savedData.salary.nationalPension) === null || _savedData_salary_nationalPension === void 0 ? void 0 : _savedData_salary_nationalPension.toLocaleString("ko-KR")) || "0",
                    healthInsurance: ((_savedData_salary_healthInsurance = savedData.salary.healthInsurance) === null || _savedData_salary_healthInsurance === void 0 ? void 0 : _savedData_salary_healthInsurance.toLocaleString("ko-KR")) || "0",
                    longTermCare: ((_savedData_salary_longTermCare = savedData.salary.longTermCare) === null || _savedData_salary_longTermCare === void 0 ? void 0 : _savedData_salary_longTermCare.toLocaleString("ko-KR")) || "0",
                    employmentInsurance: ((_savedData_salary_employmentInsurance = savedData.salary.employmentInsurance) === null || _savedData_salary_employmentInsurance === void 0 ? void 0 : _savedData_salary_employmentInsurance.toLocaleString("ko-KR")) || "0",
                    bonus: ((_savedData_salary_bonus = savedData.salary.bonus) === null || _savedData_salary_bonus === void 0 ? void 0 : _savedData_salary_bonus.toLocaleString("ko-KR")) || "0",
                    childTuition: ((_savedData_salary_childTuition = savedData.salary.childTuition) === null || _savedData_salary_childTuition === void 0 ? void 0 : _savedData_salary_childTuition.toLocaleString("ko-KR")) || "0",
                    prepaidTax: ((_savedData_salary_prepaidTax = savedData.salary.prepaidTax) === null || _savedData_salary_prepaidTax === void 0 ? void 0 : _savedData_salary_prepaidTax.toLocaleString("ko-KR")) || "0",
                    localIncomeTax: ((_savedData_salary_localIncomeTax = savedData.salary.localIncomeTax) === null || _savedData_salary_localIncomeTax === void 0 ? void 0 : _savedData_salary_localIncomeTax.toLocaleString("ko-KR")) || "0"
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPage.useEffect": ()=>{
            const savedYear = localStorage.getItem("taxai_selected_year");
            const initialYear = savedYear ? parseInt(savedYear) : 2026; // 기본값 2026년
            setSelectedYear(initialYear);
            loadYearData(initialYear);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AdminPage.useEffect"], []);
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
        // 지출 항목에서 각 카테고리 금액 추출
        const getSpendingAmount = (name)=>{
            const item = spendingItems.find((i)=>i.name.includes(name));
            return item ? parseAmount(item.amount) : 0;
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
                medical: 0,
                education: 0,
                housing: 0,
                pension: 0,
                insurance: 0,
                donation: 0
            },
            spendingItems: spendingItems,
            updatedAt: new Date().toISOString()
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tax$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAdminData"])(selectedYear, adminData);
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
        showNotification("success", '"'.concat(newItemName, '" 항목이 ').concat(newItemMonth, "월에 추가되었습니다!"));
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
                var _event_target;
                const data = new Uint8Array((_event_target = event.target) === null || _event_target === void 0 ? void 0 : _event_target.result);
                const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["read"](data, {
                    type: "array"
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(worksheet, {
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
                    showNotification("success", "".concat(excelModalMonth, "월 엑셀 데이터를 성공적으로 불러왔습니다!"));
                    handleExcelModalClose();
                } else {
                    showNotification("error", "인식할 수 있는 데이터가 없습니다. 엑셀 형식을 확인해주세요.");
                }
            } catch (e) {
                showNotification("error", "엑셀 파일을 읽는 중 오류가 발생했습니다.");
            }
        };
        reader.readAsArrayBuffer(file);
    };
    const handleExcelUpload = (e)=>{
        var _e_target_files;
        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
        if (!file) return;
        setExcelFile(file);
    };
    const handleExcelDrop = (e)=>{
        var _e_dataTransfer_files;
        e.preventDefault();
        setIsExcelDragging(false);
        const file = (_e_dataTransfer_files = e.dataTransfer.files) === null || _e_dataTransfer_files === void 0 ? void 0 : _e_dataTransfer_files[0];
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
        "렌트료"
    ];
    // 대중교통 키워드 (카드 사용금액에서 제외, 대중교통 항목으로 별도 집계)
    const PUBLIC_TRANSPORT_KEYWORDS = [
        "버스",
        "지하철",
        "모바일이즐",
        "모바일이즐페이",
        "후불교통",
        "교통카드",
        "티머니",
        "캐시비"
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
    // 카드사 엑셀 파싱 함수
    const processCardExcelFile = (file)=>{
        const reader = new FileReader();
        reader.onload = (event)=>{
            try {
                var _event_target;
                const data = new Uint8Array((_event_target = event.target) === null || _event_target === void 0 ? void 0 : _event_target.result);
                const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["read"](data, {
                    type: "array"
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(worksheet, {
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
                // 헤더에 관련 키워드가 있는지 확인
                const firstRowStr = firstRow.map((h)=>String(h || "").toLowerCase()).join(" ");
                if (!firstRowStr.includes("승인") && !firstRowStr.includes("금액") && !firstRowStr.includes("가맹점")) {
                    // 첫 행이 헤더가 아닐 수 있음, 두번째 행 확인
                    if (jsonData.length > 1) {
                        const secondRowStr = (jsonData[1] || []).map((h)=>String(h || "").toLowerCase()).join(" ");
                        if (secondRowStr.includes("승인") || secondRowStr.includes("금액") || secondRowStr.includes("가맹점")) {
                            headerRowIndex = 1;
                        }
                    }
                }
                const headerRow = jsonData[headerRowIndex] || [];
                const headers = headerRow.map((h)=>String(h || "").toLowerCase());
                console.log("Detected header row index:", headerRowIndex);
                console.log("Headers:", headers);
                // 열 인덱스 찾기 (카드사마다 열 순서가 다를 수 있음)
                // 날짜 열: 다양한 패턴 지원
                let dateCol = headers.findIndex((h)=>h.includes("승인일") || h.includes("이용일") || h.includes("거래일") || h.includes("결제일") || h.includes("매출일") || h.includes("일자") || h.includes("date") || h.includes("날짜"));
                // 가맹점 열: 다양한 패턴 지원
                let merchantCol = headers.findIndex((h)=>h.includes("가맹점") || h.includes("상호") || h.includes("이용처") || h.includes("merchant") || h.includes("매장") || h.includes("사업자") || h.includes("업체") || h.includes("결제처") || h.includes("사용처"));
                // 금액 열: 다양한 패턴 지원
                let amountCol = headers.findIndex((h)=>h.includes("금액") || h.includes("결제금액") || h.includes("이용금액") || h.includes("승인금액") || h.includes("amount") || h.includes("원"));
                // 취소 열: 다양한 패턴 지원
                let cancelCol = headers.findIndex((h)=>h.includes("취소") || h.includes("cancel") || h.includes("상태") || h.includes("비고") || h.includes("구분"));
                // 승인번호 열
                let approvalCol = headers.findIndex((h)=>h.includes("승인번호") || h.includes("승인no") || h.includes("approval") || h.includes("거래번호") || h.includes("전표번호"));
                console.log("Detected columns - date:", dateCol, "merchant:", merchantCol, "amount:", amountCol, "cancel:", cancelCol, "approval:", approvalCol);
                // 열을 찾지 못한 경우 스마트 추론
                if (dateCol === -1 || merchantCol === -1 || amountCol === -1) {
                    var _jsonData_;
                    // 데이터 행을 분석하여 열 타입 추론
                    const sampleRows = jsonData.slice(headerRowIndex + 1, headerRowIndex + 10);
                    for(let colIdx = 0; colIdx < (((_jsonData_ = jsonData[headerRowIndex + 1]) === null || _jsonData_ === void 0 ? void 0 : _jsonData_.length) || 0); colIdx++){
                        const sampleValues = sampleRows.map((row)=>row === null || row === void 0 ? void 0 : row[colIdx]).filter((v)=>v != null);
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
                    // 제외 키워드 체크 (세금, 공과금, 통신비 등)
                    const isExcluded = EXCLUDED_KEYWORDS.some((keyword)=>merchantLower.includes(keyword.toLowerCase()));
                    if (isExcluded) excludedCnt++;
                    // 카테고리 결정 (우선순위: 제외 > 대중교통 > 보험 > 의료비 > 카드)
                    let category = "card";
                    if (isExcluded) category = "excluded";
                    else if (isTransport) category = "transport";
                    else if (isInsurance) category = "insurance";
                    else if (isMedical) category = "medical";
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
                if (parsedData.length === 0) {
                    showNotification("error", "파싱된 데이터가 없습니다. (스킵: ".concat(skippedCnt, "건, 제외: ").concat(excludedCnt, "건)"));
                } else {
                    showNotification("success", "".concat(parsedData.length, "건의 거래 데이터를 찾았습니다."));
                }
                setCardExcelPreview(parsedData.slice(0, 50)); // 미리보기 50개
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
        var _e_target_files;
        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
        if (!file) return;
        setCardExcelFile(file);
        processCardExcelFile(file);
    };
    const handleCardExcelDrop = (e)=>{
        var _e_dataTransfer_files;
        e.preventDefault();
        setIsCardExcelDragging(false);
        const file = (_e_dataTransfer_files = e.dataTransfer.files) === null || _e_dataTransfer_files === void 0 ? void 0 : _e_dataTransfer_files[0];
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
        // 결과 메시지
        const messages = [];
        if (cardAmount > 0) messages.push("".concat(cardName, " ").concat(cardAmount.toLocaleString("ko-KR"), "원"));
        if (transportAmount > 0) messages.push("대중교통 ".concat(transportAmount.toLocaleString("ko-KR"), "원"));
        if (insuranceAmount > 0) messages.push("보험료 ".concat(insuranceAmount.toLocaleString("ko-KR"), "원"));
        if (medicalAmount > 0) messages.push("의료비 ".concat(medicalAmount.toLocaleString("ko-KR"), "원"));
        showNotification("success", "".concat(messages.join(", "), " 추가됨 (제외: ").concat(excludedCount, "건)"));
        handleCardExcelModalClose();
    };
    // OCR Image Upload Functions
    const processImageFiles = (files)=>{
        if (!files) return;
        const maxImages = 10;
        const currentCount = capturedImages.length;
        const remainingSlots = maxImages - currentCount;
        if (remainingSlots <= 0) {
            showNotification("error", "최대 ".concat(maxImages, "개까지 업로드 가능합니다."));
            return;
        }
        const filesToProcess = Array.from(files).slice(0, remainingSlots);
        filesToProcess.forEach((file)=>{
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (event)=>{
                    setCapturedImages((prev)=>{
                        var _event_target;
                        return [
                            ...prev,
                            (_event_target = event.target) === null || _event_target === void 0 ? void 0 : _event_target.result
                        ];
                    });
                };
                reader.readAsDataURL(file);
            }
        });
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
    };
    const handleOcrModalClose = ()=>{
        setShowCameraModal(false);
        setCapturedImages([]);
        setIsDragging(false);
        if (ocrImageInputRef.current) {
            ocrImageInputRef.current.value = "";
        }
    };
    const handleUseImage = ()=>{
        // In a real implementation, this would send the images to an OCR API
        showNotification("success", "".concat(ocrModalMonth, "월에 ").concat(capturedImages.length, "개 이미지가 업로드되었습니다. OCR 분석은 서버 연동이 필요합니다."));
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto animate-fade-in pb-40 md:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: ".xlsx,.xls",
                onChange: handleExcelUpload,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1025,
                columnNumber: 13
            }, this),
            notification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] animate-fade-in md:bottom-28", notification.type === "success" ? "bg-neo-cyan" : "bg-neo-orange"),
                children: [
                    notification.type === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1039,
                        columnNumber: 56
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1039,
                        columnNumber: 84
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-sm",
                        children: notification.message
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1040,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1035,
                columnNumber: 17
            }, this),
            showAddItemModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-md w-full mx-4 shadow-[8px_8px_0px_0px_#000]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-black",
                                    children: "수동 항목 추가"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1049,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("modalClose", ()=>setShowAddItemModal(false)),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "modalClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1059,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1050,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1048,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-bold mb-2",
                                            children: "월 선택"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1065,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                            ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: m,
                                                    children: [
                                                        m,
                                                        "월"
                                                    ]
                                                }, m, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1072,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1066,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1064,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-bold mb-2",
                                            children: "항목명"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1077,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "neo-input",
                                            placeholder: "예: 의료비, 교육비",
                                            value: newItemName,
                                            onChange: (e)=>setNewItemName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1078,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1076,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block font-bold mb-2",
                                            children: "금액 (원)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1087,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                            lineNumber: 1088,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1086,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1063,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("modalCancel", ()=>setShowAddItemModal(false)),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "modalCancel" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1104,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("modalAdd", handleAddItem),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "modalAdd" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                    children: "추가"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1115,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1103,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 1047,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1046,
                columnNumber: 17
            }, this), document.body),
            showCameraModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000] max-h-[80vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4 pb-4 border-b-2 border-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black",
                                    children: "이미지 업로드"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1137,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("ocrModalClose", handleOcrModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "ocrModalClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1147,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1138,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1136,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("min-h-[200px] mb-6 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all", isDragging ? "border-neo-cyan bg-neo-cyan/20 scale-[1.02]" : "border-gray-400 bg-gray-50 hover:bg-gray-100"),
                            onDrop: handleDrop,
                            onDragOver: handleDragOver,
                            onDragLeave: handleDragLeave,
                            onClick: ()=>{
                                var _ocrImageInputRef_current;
                                return (_ocrImageInputRef_current = ocrImageInputRef.current) === null || _ocrImageInputRef_current === void 0 ? void 0 : _ocrImageInputRef_current.click();
                            },
                            children: capturedImages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center text-sm font-bold mb-3",
                                        children: [
                                            capturedImages.length,
                                            "개 이미지 업로드됨"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1164,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2",
                                        children: capturedImages.map((img, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative aspect-square border-2 border-black overflow-hidden group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: img,
                                                        alt: "Uploaded ".concat(index + 1),
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1168,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            removeImage(index);
                                                        },
                                                        className: "absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1176,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1169,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1167,
                                                columnNumber: 45
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1165,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center text-xs text-gray-500 mt-3",
                                        children: "클릭 또는 드래그하여 더 추가"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1181,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1163,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 32,
                                        className: "mx-auto mb-2 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1185,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold mb-2",
                                        children: "이미지를 드래그하거나"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1186,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>{
                                            var _ocrImageInputRef_current;
                                            e.stopPropagation();
                                            (_ocrImageInputRef_current = ocrImageInputRef.current) === null || _ocrImageInputRef_current === void 0 ? void 0 : _ocrImageInputRef_current.click();
                                        },
                                        className: "px-4 py-2 bg-neo-cyan font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                        children: "파일 선택"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1187,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mt-2",
                                        children: "영수증, 원천징수영수증 등"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1196,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1152,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: ocrImageInputRef,
                            type: "file",
                            accept: "image/*",
                            multiple: true,
                            onChange: handleOcrImageUpload,
                            className: "hidden"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1201,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-3 bg-gray-100 border-2 border-black text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold mb-1",
                                    children: "📋 지원 이미지:"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1212,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "영수증, 원천징수영수증, 카드명세서 등 (최대 10개)"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1213,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1211,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("ocrCancel", handleOcrModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-4 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", clickedBtn === "ocrCancel" ? "bg-neo-orange translate-x-[3px] translate-y-[3px] shadow-none" : "bg-white hover:shadow-[2px_2px_0px_0px_#000]"),
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1218,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleUseImage,
                                    disabled: capturedImages.length === 0,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-4 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", capturedImages.length > 0 ? "bg-neo-cyan hover:shadow-[2px_2px_0px_0px_#000]" : "bg-gray-200 cursor-not-allowed opacity-50"),
                                    children: [
                                        "적용하기 ",
                                        capturedImages.length > 0 && "(".concat(capturedImages.length, "개)")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1229,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1217,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 1135,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1134,
                columnNumber: 17
            }, this), document.body),
            showExcelModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-4 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-black flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1254,
                                                    columnNumber: 37
                                                }, this),
                                                " 엑셀 업로드"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1253,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500",
                                            children: "급여 데이터 적용"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1256,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1252,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("excelModalClose", handleExcelModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "excelModalClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1267,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1258,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1251,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block font-bold mb-2",
                                    children: "적용할 월 선택"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1273,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                    ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: m,
                                            children: [
                                                m,
                                                "월"
                                            ]
                                        }, m, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1280,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1274,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1272,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("min-h-[180px] mb-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all", isExcelDragging ? "border-neo-cyan bg-neo-cyan/20 scale-[1.02]" : "border-gray-400 bg-gray-50 hover:bg-gray-100"),
                            onDrop: handleExcelDrop,
                            onDragOver: handleExcelDragOver,
                            onDragLeave: handleExcelDragLeave,
                            onClick: ()=>{
                                var _fileInputRef_current;
                                return (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
                            },
                            children: excelFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl mb-2",
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1298,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-bold mb-1",
                                        children: excelFile.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1299,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                            (excelFile.size / 1024).toFixed(1),
                                            " KB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1300,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1297,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-gray-500 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl mb-2",
                                        children: "📁"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1304,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-bold mb-1",
                                        children: "엑셀 파일을 드래그하거나 클릭하세요"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1305,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm",
                                        children: ".xlsx, .xls 파일 지원"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1306,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1303,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1286,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: fileInputRef,
                            type: "file",
                            accept: ".xlsx,.xls",
                            onChange: handleExcelUpload,
                            className: "hidden"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1311,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: excelFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        lineNumber: 1322,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleExcelApply,
                                        className: "flex-1 py-3 font-bold border-2 border-black bg-neo-cyan hover:bg-cyan-300",
                                        children: "적용하기"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1333,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleButtonClick("excelFileSelect", ()=>{
                                        var _fileInputRef_current;
                                        return (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
                                    }),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("w-full py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "excelFileSelect" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                children: "📁 파일 선택"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1341,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1319,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 1250,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1249,
                columnNumber: 17
            }, this), document.body),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl md:text-3xl font-black uppercase",
                        children: "기초자료 등록"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1360,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap",
                        children: [
                            2024,
                            2025,
                            2026
                        ].map((year)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleButtonClick("year-".concat(year), ()=>handleYearChange(year)),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-3 md:px-4 py-2 font-bold border-2 border-black text-sm shadow-[4px_4px_0px_0px_#000] transition-all", selectedYear === year ? "bg-black text-white translate-x-[4px] translate-y-[4px] shadow-none" : clickedBtn === "year-".concat(year) ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                children: year
                            }, year, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1365,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1363,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1359,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row justify-between items-start gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-neo-cyan p-2 border-2 border-black",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1390,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1389,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg md:text-xl font-black",
                                                        children: "급여 데이터"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1393,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs md:text-sm font-bold text-gray-500",
                                                        children: "매월 급여명세서 기준 입력"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1394,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1392,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1388,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                            showNotification("success", "".concat(selectedMonth, "월 데이터를 1~3월에 복사했습니다."));
                                                        }
                                                    }),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-3 py-2 text-xs font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", clickedBtn === "copy1to3" ? "bg-neo-orange translate-x-[3px] translate-y-[3px] shadow-none" : "bg-neo-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: "1~3월 동일 적용"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1400,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                            showNotification("success", "".concat(selectedMonth, "월 데이터를 4~12월에 복사했습니다."));
                                                        }
                                                    }),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-3 py-2 text-xs font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", clickedBtn === "copy3to12" ? "bg-neo-orange translate-x-[3px] translate-y-[3px] shadow-none" : "bg-neo-pink hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: "4~12월 동일 적용"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1421,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1399,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1387,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                ].map((month)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleButtonClick("month-".concat(month), ()=>setSelectedMonth(month)),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("py-2 font-bold text-sm border-2 border-black transition-all", selectedMonth === month ? "bg-black text-white shadow-none" : clickedBtn === "month-".concat(month) ? "bg-neo-cyan translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                        children: [
                                            month,
                                            "월"
                                        ]
                                    }, month, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1447,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1445,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "월급여 (세전)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1466,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth === void 0 ? void 0 : _monthlySalary_selectedMonth.totalSalary) || "0",
                                                onChange: (e)=>handleSalaryInputChange("totalSalary", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1467,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1465,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "비과세 식대"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1475,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth1 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth1 === void 0 ? void 0 : _monthlySalary_selectedMonth1.mealAllowance) || "0",
                                                onChange: (e)=>handleSalaryInputChange("mealAllowance", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1476,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1474,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "국민연금"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1484,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth2 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth2 === void 0 ? void 0 : _monthlySalary_selectedMonth2.nationalPension) || "0",
                                                onChange: (e)=>handleSalaryInputChange("nationalPension", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1485,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1483,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "건강보험"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1493,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth3 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth3 === void 0 ? void 0 : _monthlySalary_selectedMonth3.healthInsurance) || "0",
                                                onChange: (e)=>handleSalaryInputChange("healthInsurance", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1494,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1492,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "노인장기요양보험"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1502,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth4 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth4 === void 0 ? void 0 : _monthlySalary_selectedMonth4.longTermCare) || "0",
                                                onChange: (e)=>handleSalaryInputChange("longTermCare", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1503,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1501,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "고용보험"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1511,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth5 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth5 === void 0 ? void 0 : _monthlySalary_selectedMonth5.employmentInsurance) || "0",
                                                onChange: (e)=>handleSalaryInputChange("employmentInsurance", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1512,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1510,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "상여금"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1520,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth6 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth6 === void 0 ? void 0 : _monthlySalary_selectedMonth6.bonus) || "0",
                                                onChange: (e)=>handleSalaryInputChange("bonus", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1521,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1519,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "자녀학자금"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1529,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth7 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth7 === void 0 ? void 0 : _monthlySalary_selectedMonth7.childTuition) || "0",
                                                onChange: (e)=>handleSalaryInputChange("childTuition", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1530,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1528,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "기납부세액 (소득세)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1538,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth8 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth8 === void 0 ? void 0 : _monthlySalary_selectedMonth8.prepaidTax) || "0",
                                                onChange: (e)=>handleSalaryInputChange("prepaidTax", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1539,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1537,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block font-bold mb-2",
                                                children: "기납부세액 (지방소득세)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1547,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                className: "neo-input",
                                                value: ((_monthlySalary_selectedMonth9 = monthlySalary[selectedMonth]) === null || _monthlySalary_selectedMonth9 === void 0 ? void 0 : _monthlySalary_selectedMonth9.localIncomeTax) || "0",
                                                onChange: (e)=>handleSalaryInputChange("localIncomeTax", e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1548,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1546,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1464,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1386,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-neo-yellow p-2 border-2 border-black",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1562,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1561,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg md:text-xl font-black",
                                                children: "가족 정보"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1565,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm font-bold text-gray-500",
                                                children: "인적공제 및 카드공제 한도 확대 적용"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1566,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1564,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1560,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base font-black mb-3 px-2 py-1 bg-neo-cyan border-2 border-black inline-block",
                                        children: "기본공제"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1574,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "배우자공제"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1577,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            false,
                                                            true
                                                        ].map((hasSpouse)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setFamilyData((prev)=>({
                                                                            ...prev,
                                                                            spouse: hasSpouse
                                                                        })),
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 p-3 border-[3px] border-black font-semibold text-lg transition-colors", familyData.spouse === hasSpouse ? "bg-black text-white" : "bg-white hover:bg-gray-100"),
                                                                children: hasSpouse ? "있음" : "없음"
                                                            }, hasSpouse ? "yes" : "no", false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1580,
                                                                columnNumber: 41
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1578,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1576,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "만 20세 이하 자녀 수"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1594,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        lineNumber: 1595,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1593,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "직계존속 (만 60세 이상)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1605,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        lineNumber: 1606,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1604,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "형제자매"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1616,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        lineNumber: 1617,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1615,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "위탁아동 (6개월 이상)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1627,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        lineNumber: 1628,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1626,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "기초생활수급자"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1638,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        lineNumber: 1639,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1637,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1575,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1573,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base font-black mb-3 px-2 py-1 bg-neo-yellow border-2 border-black inline-block",
                                        children: "세액공제"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1653,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "만 8세 이상 자녀 수"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1656,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        lineNumber: 1657,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1655,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block font-bold mb-2",
                                                        children: "출생·입양자"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1667,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "neo-input",
                                                        value: familyData.birthAdoption,
                                                        onChange: (e)=>setFamilyData((prev)=>({
                                                                    ...prev,
                                                                    birthAdoption: e.target.value
                                                                })),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "none",
                                                                children: "선택 안함"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1673,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "first",
                                                                children: "첫째"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1674,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "second",
                                                                children: "둘째"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1675,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "third1",
                                                                children: "셋째 이상 (1명)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1676,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "third2",
                                                                children: "셋째 이상 (2명)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1677,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "third3",
                                                                children: "셋째 이상 (3명)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1678,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1668,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1666,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1654,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1652,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base font-black mb-3 px-2 py-1 bg-neo-pink border-2 border-black inline-block",
                                        children: "비과세"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1686,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block font-bold mb-2",
                                                    children: "만 6세 이하 자녀 수 (보육수당)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1689,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                    lineNumber: 1690,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1688,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1687,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1685,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1559,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row justify-between items-start gap-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-neo-orange p-2 border-2 border-black",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1708,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1707,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg md:text-xl font-black",
                                                        children: [
                                                            "지출 데이터 (",
                                                            selectedSpendingMonth,
                                                            "월)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1711,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs md:text-sm font-bold text-gray-500",
                                                        children: "카드사 연동으로 자동 입력"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1714,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1710,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1706,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 flex-wrap w-full md:w-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("cardExcel", handleCardExcelModalOpen),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "excel" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        size: 14,
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("md:w-4 md:h-4", clickedBtn === "excel" && "animate-spin")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1729,
                                                        columnNumber: 33
                                                    }, this),
                                                    " 엑셀"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1720,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("ocr", handleOcrModalOpen),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "ocr" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 14,
                                                        className: "md:w-4 md:h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1740,
                                                        columnNumber: 33
                                                    }, this),
                                                    " OCR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1731,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleButtonClick("sync", ()=>showNotification("success", "카드사 연동 기능 준비중입니다!")),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "sync" ? "bg-neo-cyan translate-x-[4px] translate-y-[4px] shadow-none" : "bg-black text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        size: 14,
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("md:w-4 md:h-4", clickedBtn === "sync" && "animate-spin")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1751,
                                                        columnNumber: 33
                                                    }, this),
                                                    " 동기화"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1742,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1719,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1705,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                ].map((month)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleButtonClick("spending-month-".concat(month), ()=>setSelectedSpendingMonth(month)),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("py-2 font-bold text-sm border-2 border-black transition-all", selectedSpendingMonth === month ? "bg-black text-white shadow-none" : clickedBtn === "spending-month-".concat(month) ? "bg-neo-cyan translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"),
                                        children: [
                                            month,
                                            "월"
                                        ]
                                    }, month, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1759,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1757,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: spendingItems.filter((item)=>item.month === selectedSpendingMonth).length > 0 ? spendingItems.filter((item)=>item.month === selectedSpendingMonth).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between border-b-2 border-gray-100 pb-2 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1781,
                                                        columnNumber: 41
                                                    }, this),
                                                    item.details && item.details.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setSelectedItemDetails(item);
                                                            setShowDetailsModal(true);
                                                        },
                                                        className: "text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-200 flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1790,
                                                                columnNumber: 49
                                                            }, this),
                                                            item.details.length,
                                                            "건"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1783,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1780,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-lg tracking-tight",
                                                        children: [
                                                            parseInt(item.amount.replace(/[^0-9]/g, "") || "0").toLocaleString("ko-KR"),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1796,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDeleteItem(item.id),
                                                        className: "opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 text-red-500 transition-opacity",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1803,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1799,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1795,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1779,
                                        columnNumber: 33
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold",
                                            children: [
                                                selectedSpendingMonth,
                                                "월 지출 데이터가 없습니다"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1810,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm mt-1",
                                            children: "엑셀 업로드 또는 수동 항목 추가로 데이터를 입력하세요"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1811,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1809,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1776,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setNewItemMonth(selectedSpendingMonth);
                                    handleButtonClick("addItem", ()=>setShowAddItemModal(true));
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("w-full mt-6 py-3 border-2 border-dashed font-bold transition-all flex items-center justify-center gap-2", clickedBtn === "addItem" ? "border-black bg-neo-yellow text-black" : "border-gray-300 text-gray-400 hover:border-black hover:text-black hover:bg-gray-50"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1828,
                                        columnNumber: 25
                                    }, this),
                                    " 수동 항목 추가"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 1816,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1704,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1384,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-16 md:bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black flex justify-center gap-4 z-40 md:static md:bg-transparent md:border-none md:p-0 md:mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleButtonClick("cancel"),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "cancel" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                        children: "변경취소"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1834,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleButtonClick("save", handleSave),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all", clickedBtn === "save" ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"),
                        children: "저장하기"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/page.tsx",
                        lineNumber: 1845,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1833,
                columnNumber: 13
            }, this),
            showCardExcelModal && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000] max-h-[80vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4 pb-4 border-b-2 border-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black",
                                    children: "엑셀 업로드"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1863,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("cardExcelClose", handleCardExcelModalClose),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "cardExcelClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1873,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1864,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1862,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block font-bold mb-3",
                                    children: "결제 수단 선택"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1879,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 flex-wrap",
                                    children: [
                                        {
                                            value: "credit",
                                            label: "신용카드",
                                            color: "bg-neo-pink"
                                        },
                                        {
                                            value: "debit",
                                            label: "직불카드",
                                            color: "bg-neo-cyan"
                                        },
                                        {
                                            value: "cash",
                                            label: "현금영수증",
                                            color: "bg-neo-yellow"
                                        }
                                    ].map((param)=>{
                                        let { value, label, color } = param;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCardType(value),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-4 py-2 font-bold border-2 border-black transition-all", cardType === value ? "".concat(color, " shadow-none translate-x-[2px] translate-y-[2px]") : "bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000]"),
                                            children: label
                                        }, value, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1886,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1880,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1878,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onDrop: handleCardExcelDrop,
                            onDragOver: (e)=>{
                                e.preventDefault();
                                setIsCardExcelDragging(true);
                            },
                            onDragLeave: ()=>setIsCardExcelDragging(false),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("border-2 border-dashed p-8 text-center mb-6 transition-all", isCardExcelDragging ? "border-neo-cyan bg-neo-cyan/10" : "border-gray-300", cardExcelFile && "border-neo-green bg-neo-green/10"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: cardExcelInputRef,
                                    type: "file",
                                    accept: ".xlsx,.xls",
                                    onChange: handleCardExcelUpload,
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1913,
                                    columnNumber: 29
                                }, this),
                                cardExcelFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            size: 24,
                                            className: "text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1922,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            children: cardExcelFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1923,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setCardExcelFile(null);
                                                setCardExcelPreview([]);
                                                if (cardExcelInputRef.current) cardExcelInputRef.current.value = "";
                                            },
                                            className: "p-1 hover:bg-red-100 text-red-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1932,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1924,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1921,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            size: 32,
                                            className: "mx-auto mb-2 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1937,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold mb-2",
                                            children: "카드사 엑셀 파일을 드래그하거나"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1938,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                var _cardExcelInputRef_current;
                                                return (_cardExcelInputRef_current = cardExcelInputRef.current) === null || _cardExcelInputRef_current === void 0 ? void 0 : _cardExcelInputRef_current.click();
                                            },
                                            className: "px-4 py-2 bg-neo-cyan font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                            children: "파일 선택"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1939,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1903,
                            columnNumber: 25
                        }, this),
                        cardExcelPreview.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            children: "파싱 결과 미리보기"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1953,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-500",
                                            children: [
                                                "총 ",
                                                cardExcelPreview.length,
                                                "건",
                                                excludedCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500 ml-2",
                                                    children: [
                                                        "(제외: ",
                                                        excludedCount,
                                                        "건)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1957,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 1954,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1952,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-48 overflow-y-auto border-2 border-black",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-100 sticky top-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-left border-b-2 border-black",
                                                            children: "날짜"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1967,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-left border-b-2 border-black",
                                                            children: "가맹점"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1968,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-right border-b-2 border-black",
                                                            children: "금액"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1969,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-2 text-center border-b-2 border-black",
                                                            children: "분류"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/page.tsx",
                                                            lineNumber: 1970,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 1966,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1965,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: cardExcelPreview.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(item.category === "excluded" && "bg-red-50 text-red-400 line-through", item.category === "transport" && "bg-blue-50", item.category === "insurance" && "bg-purple-50", item.category === "medical" && "bg-green-50"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b",
                                                                children: item.date
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1981,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b",
                                                                children: item.merchant
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1982,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b text-right",
                                                                children: [
                                                                    item.amount.toLocaleString(),
                                                                    "원"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1983,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-2 border-b text-center",
                                                                children: item.category === "excluded" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-red-100 text-red-600 px-2 py-1 rounded",
                                                                    children: "제외"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 1986,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "transport" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded",
                                                                    children: "대중교통"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 1988,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "insurance" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded",
                                                                    children: "보험료"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 1990,
                                                                    columnNumber: 61
                                                                }, this) : item.category === "medical" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded",
                                                                    children: "의료비"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 1992,
                                                                    columnNumber: 61
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs bg-green-100 text-green-600 px-2 py-1 rounded",
                                                                    children: "카드"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/page.tsx",
                                                                    lineNumber: 1994,
                                                                    columnNumber: 61
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/page.tsx",
                                                                lineNumber: 1984,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 1975,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 1973,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 1964,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 1963,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-3 bg-neo-yellow/30 border-2 border-black space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between font-bold text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "💳 카드 사용:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2004,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "card").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2005,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2003,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-blue-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🚌 대중교통:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2008,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "transport").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2009,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2007,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-purple-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🛡️ 보험료:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2012,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "insurance").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2013,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2011,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-teal-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🏥 의료비:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2016,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "medical").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2017,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2015,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-red-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "❌ 제외:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2020,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cardExcelPreview.filter((i)=>i.category === "excluded").reduce((s, i)=>s + i.amount, 0).toLocaleString(),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2021,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2019,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2002,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 1951,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-3 bg-gray-100 border-2 border-black text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold mb-2",
                                    children: "📋 자동 분류 안내:"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2029,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-600",
                                    children: "🚌 대중교통: 버스, 지하철, 모바일이즐 → 대중교통 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2030,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-purple-600",
                                    children: "🛡️ 보험료: 메리츠화재, DB손해보험 등 → 보험료 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2031,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-green-600",
                                    children: "🏥 의료비: 병원, 의원, 약국 등 → 의료비 항목으로 분류"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2032,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-500",
                                    children: "❌ 제외: 세금, 공과금, 통신비, 도로통행료 → 공제 불가"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2033,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-1",
                                    children: "취소된 거래는 자동으로 제외됩니다."
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2034,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2028,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCardExcelModalClose,
                                    className: "px-4 py-2 font-bold border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2039,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCardExcelApply,
                                    disabled: !cardExcelFile || cardExcelPreview.length === 0,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-4 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all", cardExcelFile && cardExcelPreview.length > 0 ? "bg-neo-cyan hover:shadow-[2px_2px_0px_0px_#000]" : "bg-gray-200 cursor-not-allowed opacity-50"),
                                    children: "적용하기"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2045,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2038,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 1861,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 1860,
                columnNumber: 17
            }, this), document.body),
            showDetailsModal && selectedItemDetails && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-[3px] border-black p-6 max-w-2xl w-full mx-4 shadow-[8px_8px_0px_0px_#000] max-h-[80vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4 pb-4 border-b-2 border-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black",
                                    children: [
                                        selectedItemDetails.name,
                                        " 상세 내역"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2068,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleButtonClick("detailsClose", ()=>{
                                            setShowDetailsModal(false);
                                            setSelectedItemDetails(null);
                                        }),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all", clickedBtn === "detailsClose" ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2081,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/page.tsx",
                                    lineNumber: 2069,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2067,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-neo-yellow/30 border-2 border-black",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between font-bold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "총 ",
                                            ((_selectedItemDetails_details = selectedItemDetails.details) === null || _selectedItemDetails_details === void 0 ? void 0 : _selectedItemDetails_details.length) || 0,
                                            "건"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2087,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: [
                                            selectedItemDetails.amount,
                                            "원"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2088,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2086,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2085,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-96 overflow-y-auto border-2 border-black",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-gray-100 sticky top-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 text-left border-b-2 border-black",
                                                    children: "날짜"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2096,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 text-left border-b-2 border-black",
                                                    children: "가맹점"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2097,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 text-right border-b-2 border-black",
                                                    children: "금액"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/page.tsx",
                                                    lineNumber: 2098,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/page.tsx",
                                            lineNumber: 2095,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2094,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: (_selectedItemDetails_details1 = selectedItemDetails.details) === null || _selectedItemDetails_details1 === void 0 ? void 0 : _selectedItemDetails_details1.map((detail, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border-b",
                                                        children: detail.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2104,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border-b",
                                                        children: detail.merchant
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2105,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border-b text-right",
                                                        children: [
                                                            detail.amount.toLocaleString(),
                                                            "원"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/page.tsx",
                                                        lineNumber: 2106,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/app/admin/page.tsx",
                                                lineNumber: 2103,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/page.tsx",
                                        lineNumber: 2101,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2093,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2092,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowDetailsModal(false);
                                    setSelectedItemDetails(null);
                                },
                                className: "px-4 py-2 font-bold border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all",
                                children: "닫기"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/page.tsx",
                                lineNumber: 2114,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/page.tsx",
                            lineNumber: 2113,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/page.tsx",
                    lineNumber: 2066,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 2065,
                columnNumber: 17
            }, this), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/page.tsx",
        lineNumber: 1023,
        columnNumber: 9
    }, this);
}
_s(AdminPage, "cIlPs7t3/KtbW0Ddk4GB66Del/c=");
_c = AdminPage;
var _c;
__turbopack_context__.k.register(_c, "AdminPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_80421998._.js.map