"use client";

import { useState } from "react";
import {
    CreditCard,
    Building,
    HeartPulse,
    GraduationCap,
    Info,
    ChevronDown,
    ChevronUp,
    Sparkles,
    RefreshCw,
    AlertCircle,
    Calculator,
    Shield,
    Users,
    Wallet,
    Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Tooltip } from "@/components/ui/Tooltip";

// 숫자 포맷 함수
function formatNumber(num: number): string {
    return num.toLocaleString("ko-KR");
}

// 콤마 제거 및 숫자 변환
function parseNumber(str: string): number {
    return parseInt(str.replace(/[^0-9]/g, "")) || 0;
}

// 세금 계산 함수 (간략화된 2026년 기준)
function calculateTax(inputs: FormInputs) {
    const salary = inputs.salary;

    // 근로소득공제
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

    // 인적공제 (부양가족 1인당 150만원)
    const personalDeduction = inputs.dependents * 1500000;

    // 신용카드 등 소득공제
    const minCardSpending = salary * 0.25;
    const totalCardSpending = inputs.creditCard + inputs.debitCard;
    let cardDeduction = 0;
    if (totalCardSpending > minCardSpending) {
        const excess = totalCardSpending - minCardSpending;
        // 신용카드 15%, 체크카드/현금 30%
        const creditExcess = Math.min(inputs.creditCard, excess);
        const debitExcess = Math.max(0, excess - creditExcess);
        cardDeduction = creditExcess * 0.15 + debitExcess * 0.3;
        // 한도: 연 300만원
        cardDeduction = Math.min(cardDeduction, 3000000);
    }

    // 의료비 세액공제 (총급여 3% 초과분의 15%)
    const medicalThreshold = salary * 0.03;
    let medicalDeduction = 0;
    if (inputs.medical > medicalThreshold) {
        medicalDeduction = (inputs.medical - medicalThreshold) * 0.15;
        medicalDeduction = Math.min(medicalDeduction, 7000000);
    }

    // 교육비 세액공제 (15%)
    const educationDeduction = inputs.education * 0.15;

    // 주택자금 공제 (40%)
    const housingDeduction = Math.min(inputs.housing * 0.4, 3000000);

    // 연금계좌 세액공제 (13.2% ~ 16.5%)
    const pensionLimit = Math.min(inputs.pension, 9000000);
    const pensionDeduction = salary <= 55000000 ? pensionLimit * 0.165 : pensionLimit * 0.132;

    // 과세표준
    let taxableIncome = earnedIncome - personalDeduction - cardDeduction - housingDeduction;
    taxableIncome = Math.max(0, taxableIncome);

    // 산출세액 (2026년 세율)
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

    // 세액공제 적용
    const totalTaxCredit = medicalDeduction + educationDeduction + pensionDeduction;
    const finalTax = Math.max(0, calculatedTax - totalTaxCredit);

    // 기납부세액 (원천징수 - 간략화: 월급의 약 3.3% × 12개월)
    const withheldTax = Math.round(salary * 0.033);

    // 환급액 또는 추가납부액
    const refund = withheldTax - finalTax;

    return {
        earnedIncome,
        incomeDeduction,
        personalDeduction,
        cardDeduction,
        medicalDeduction: Math.round(medicalDeduction),
        educationDeduction: Math.round(educationDeduction),
        housingDeduction,
        pensionDeduction: Math.round(pensionDeduction),
        taxableIncome,
        calculatedTax: Math.round(calculatedTax),
        totalTaxCredit: Math.round(totalTaxCredit),
        finalTax: Math.round(finalTax),
        withheldTax,
        refund: Math.round(refund),
    };
}

interface FormInputs {
    annualSalary: number;        // 연봉 (급여 + 상여)
    mealAllowance: number;       // 비과세(식대) - 연간
    childrenUnder6: number;      // 6세 이하 자녀 수 (보육수당용)
    salary: number;              // 총급여액 (자동 계산)
    withheldTax: number;         // 기납부세액 (원천징수세액)
    // 인적공제 상세
    spouse: number;              // 배우자 (0 또는 1)
    parents: number;             // 직계존속 (만60세 이상)
    children: number;            // 자녀 (만20세 이하)
    siblings: number;            // 형제자매 (만20세 이하 또는 만60세 이상)
    foster: number;              // 위탁아동 (6개월 이상)
    recipient: number;           // 기초생활수급자
    dependents: number;          // 총 부양가족 수 (자동 계산)
    nationalPension: number;     // 국민연금
    healthInsurance: number;     // 건강보험료
    longTermCare: number;        // 노인장기요양보험료
    employmentInsurance: number; // 고용보험료
    // 카드 사용액
    cardChildren: number;        // 카드 소득공제 자녀 수 (한도 확대용)
    creditCard: number;          // 신용카드
    debitCard: number;           // 체크카드
    cash: number;                // 현금영수증
    traditionalMarket: number;   // 전통시장
    publicTransport: number;     // 대중교통
    culture: number;             // 문화체육
    // 의료비
    infertility: number;         // 난임시술비
    premature: number;           // 미숙아·선천성이상아
    selfDisabledSenior: number;  // 본인/장애인/만65세이상/6세이하
    otherFamily: number;         // 그 밖의 부양가족
    insuranceReimbursement: number; // 실손의료보험금
    medical: number;             // 의료비 합계 (자동 계산)
    // 교육비
    selfEducation: number;       // 본인 교육비
    preschool: number;           // 미취학 자녀
    elementary: number;          // 초중고
    university: number;          // 대학
    education: number;           // 교육비 합계 (자동 계산)
    // 주택자금
    housingSubscription: number; // 주택청약저축
    rentLoanPayment: number;     // 주택임차차입금 원리금상환액
    mortgageInterest: number;    // 장기주택저당차입금 이자상환액
    monthlyRent: number;         // 월세 세액공제
    housing: number;             // 주택자금 합계 (자동 계산)
    // 연금 및 보험
    pensionSavings: number;      // 연금저축
    irp: number;                 // 퇴직연금(IRP)
    isaTransfer: number;         // ISA 만기 전환금액
    generalInsurance: number;    // 일반 보장성 보험료
    disabledInsurance: number;   // 장애인 전용 보장성 보험료
    pension: number;             // 연금계좌 합계 (자동 계산)
    // 기부금
    politicalDonation: number;   // 정치자금 기부금
    hometownDonation: number;    // 고향사랑 기부금
    hometownDisaster: number;    // 고향사랑 특별재난지역
    specialDonation: number;     // 특례기부금
    employeeDonation: number;    // 우리사주조합 기부금
    designatedDonation: number;  // 일반 기부금 (종교단체 외)
    religiousDonation: number;   // 종교단체 기부금
}

interface TaxResult {
    earnedIncome: number;
    incomeDeduction: number;
    personalDeduction: number;
    cardDeduction: number;
    medicalDeduction: number;
    educationDeduction: number;
    housingDeduction: number;
    pensionDeduction: number;
    taxableIncome: number;
    calculatedTax: number;
    totalTaxCredit: number;
    finalTax: number;
    withheldTax: number;
    refund: number;
}

export default function CalculatorPage() {
    const categories = [
        {
            id: "salary",
            label: "총급여",
            icon: Wallet,
            color: "bg-neo-cyan",
        },
        {
            id: "basic",
            label: "기본공제",
            icon: Users,
            color: "bg-neo-yellow",
        },
        {
            id: "insurance",
            label: "4대보험",
            icon: Shield,
            color: "bg-neo-orange",
        },
        {
            id: "card",
            label: "신용카드 등 사용액",
            icon: CreditCard,
            color: "bg-neo-cyan",
        },
        {
            id: "medical",
            label: "의료비",
            icon: HeartPulse,
            color: "bg-neo-yellow",
        },
        {
            id: "edu",
            label: "교육비",
            icon: GraduationCap,
            color: "bg-neo-orange",
        },
        {
            id: "house",
            label: "주택자금",
            icon: Building,
            color: "bg-neo-cyan",
        },
        {
            id: "pension",
            label: "연금계좌·보험",
            icon: Building,
            color: "bg-neo-yellow",
        },
        {
            id: "donation",
            label: "기부금",
            icon: HeartPulse,
            color: "bg-neo-orange",
        },
    ];

    const [openSection, setOpenSection] = useState<string | null>("salary");
    const [inputs, setInputs] = useState<FormInputs>({
        annualSalary: 61622780,      // 연봉 (급여 + 상여)
        mealAllowance: 2400000,      // 비과세(식대) - 연간 (월 20만원 x 12)
        childrenUnder6: 1,           // 6세 이하 자녀 수
        salary: 56822780,            // 총급여액 (자동 계산됨)
        withheldTax: 3200000,        // 기납부세액 (원천징수세액)
        // 인적공제 상세
        spouse: 0,                   // 배우자 (0 또는 1)
        parents: 0,                  // 직계존속 (만60세 이상)
        children: 3,                 // 자녀 (만20세 이하)
        siblings: 0,                 // 형제자매
        foster: 0,                   // 위탁아동
        recipient: 0,                // 기초생활수급자
        dependents: 4,               // 총 부양가족 수 (본인1 + 자녀3)
        nationalPension: 2258520,    // 국민연금
        healthInsurance: 1960580,    // 건강보험료
        longTermCare: 253760,        // 노인장기요양보험료
        employmentInsurance: 511390, // 고용보험료
        // 카드 사용액
        cardChildren: 0,             // 카드 소득공제 자녀 수
        creditCard: 15665472,        // 신용카드
        debitCard: 3000000,          // 체크카드
        cash: 2000000,               // 현금영수증
        traditionalMarket: 500000,   // 전통시장
        publicTransport: 960000,     // 대중교통
        culture: 300000,             // 문화체육
        // 의료비
        infertility: 0,              // 난임시술비
        premature: 0,                // 미숙아·선천성이상아
        selfDisabledSenior: 0,       // 본인/장애인/만65세이상/6세이하
        otherFamily: 1856340,        // 그 밖의 부양가족
        insuranceReimbursement: 467488, // 실손의료보험금
        medical: 1388852,            // 의료비 합계
        // 교육비
        selfEducation: 0,            // 본인 교육비
        preschool: 2000000,          // 미취학 자녀
        elementary: 2000000,         // 초중고
        university: 2000000,         // 대학
        education: 6000000,          // 교육비 합계
        // 주택자금
        housingSubscription: 2400000, // 주택청약저축
        rentLoanPayment: 0,          // 주택임차차입금 원리금상환액
        mortgageInterest: 0,         // 장기주택저당차입금 이자상환액
        monthlyRent: 0,              // 월세 세액공제
        housing: 2400000,            // 주택자금 합계
        // 연금 및 보험
        pensionSavings: 4000000,     // 연금저축
        irp: 0,                      // 퇴직연금(IRP)
        isaTransfer: 0,              // ISA 만기 전환금액
        generalInsurance: 1000000,   // 일반 보장성 보험료
        disabledInsurance: 0,        // 장애인 전용 보장성 보험료
        pension: 4000000,            // 연금계좌 합계
        // 기부금
        politicalDonation: 100000,   // 정치자금 기부금
        hometownDonation: 100000,    // 고향사랑 기부금
        hometownDisaster: 0,         // 고향사랑 특별재난지역
        specialDonation: 0,          // 특례기부금
        employeeDonation: 0,         // 우리사주조합 기부금
        designatedDonation: 0,       // 일반 기부금 (종교단체 외)
        religiousDonation: 0,        // 종교단체 기부금
    });
    const [result, setResult] = useState<TaxResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleInputChange = (field: keyof FormInputs, value: string | number) => {
        if (typeof value === "string") {
            const numValue = parseNumber(value);
            setInputs(prev => {
                const updated = { ...prev, [field]: numValue };
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
                if (["spouse", "parents", "children", "siblings", "foster", "recipient"].includes(field)) {
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
            setInputs(prev => {
                const updated = { ...prev, [field]: value };
                if (field === "childrenUnder6") {
                    const childcareAllowance = value * 200000 * 12;
                    const totalTaxExempt = prev.mealAllowance + childcareAllowance;
                    updated.salary = Math.max(0, prev.annualSalary - totalTaxExempt);
                }
                // 인적공제 자동 계산
                if (["spouse", "parents", "children", "siblings", "foster", "recipient"].includes(field)) {
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

    const handleCalculate = () => {
        setIsCalculating(true);
        // 약간의 딜레이를 줘서 계산 중임을 시각적으로 표시
        setTimeout(() => {
            const taxResult = calculateTax(inputs);
            setResult(taxResult);
            setIsCalculating(false);
        }, 500);
    };

    const [isResetting, setIsResetting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const handleLoadData = () => {
        setIsLoadingData(true);
        // TODO: 실제 기초자료 가져오기 로직 구현
        setTimeout(() => setIsLoadingData(false), 500);
    };

    const handleReset = () => {
        setIsResetting(true);
        setInputs({
            annualSalary: 0,
            mealAllowance: 0,
            childrenUnder6: 0,
            salary: 0,
            withheldTax: 0,
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
        });
        setResult(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-black">공제정보 상세 입력</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleLoadData}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all",
                                isLoadingData ? "bg-neo-cyan translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white"
                            )}
                        >
                            <Download size={14} className={isLoadingData ? "animate-bounce" : ""} /> 기초자료 가져오기
                        </button>
                        <button
                            onClick={handleReset}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all",
                                isResetting ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none" : "bg-white"
                            )}
                        >
                            <RefreshCw size={14} className={isResetting ? "animate-spin" : ""} /> 초기화
                        </button>
                    </div>
                </div>

                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#000]"
                    >
                        <button
                            onClick={() =>
                                setOpenSection(openSection === cat.id ? null : cat.id)
                            }
                            className={clsx(
                                "w-full flex items-center justify-between p-4 font-bold text-lg transition-colors",
                                openSection === cat.id ? cat.color : "hover:bg-gray-50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <cat.icon size={20} strokeWidth={2.5} />
                                {cat.label}
                            </div>
                            {openSection === cat.id ? (
                                <ChevronUp size={24} />
                            ) : (
                                <ChevronDown size={24} />
                            )}
                        </button>


                        <AnimatePresence>
                            {openSection === cat.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{ overflow: "visible" }}
                                >
                                    <div className="p-6 border-t-[3px] border-black space-y-6 bg-white">
                                        {/* 총급여 */}
                                        {cat.id === "salary" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        연봉 (급여 + 상여)
                                                        <Tooltip content="연간 총 급여와 상여의 합계 금액입니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.annualSalary)}
                                                        onChange={(e) => handleInputChange("annualSalary", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        비과세 (식대) - 연간
                                                        <Tooltip content="월 20만원 한도의 식대 비과세 금액입니다. 연간 총액을 입력하세요.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.mealAllowance)}
                                                        onChange={(e) => handleInputChange("mealAllowance", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        6세 이하 자녀 수 (보육수당용)
                                                        <Tooltip content="6세 이하 자녀 1인당 월 20만원(연 240만원)의 보육수당이 비과세로 적용됩니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <div className="flex gap-2">
                                                        {[0, 1, 2, 3].map((num) => (
                                                            <button
                                                                key={num}
                                                                onClick={() => handleInputChange("childrenUnder6", num)}
                                                                className={clsx(
                                                                    "flex-1 py-2 border-2 border-black font-bold transition-colors",
                                                                    inputs.childrenUnder6 === num ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                                                                )}
                                                            >
                                                                {num}명
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        <p>식대 비과세: {formatNumber(inputs.mealAllowance)}원</p>
                                                        <p>보육수당 비과세: {inputs.childrenUnder6}명 × 20만원 × 12개월 = {formatNumber(inputs.childrenUnder6 * 200000 * 12)}원</p>
                                                        <p className="border-t border-black pt-1">총 비과세: {formatNumber(inputs.mealAllowance + inputs.childrenUnder6 * 200000 * 12)}원</p>
                                                    </div>
                                                </div>
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">총급여액 (자동 계산)</p>
                                                    <p className="text-2xl font-black">
                                                        {formatNumber(inputs.salary)}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">연봉 - 총 비과세 = {formatNumber(inputs.annualSalary)} - {formatNumber(inputs.mealAllowance + inputs.childrenUnder6 * 200000 * 12)}</p>
                                                </div>

                                                {/* 기납부세액 */}
                                                <div className="space-y-4 border-t-2 border-black pt-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">💳 기납부세액</h4>
                                                    <div className="space-y-2">
                                                        <label className="font-bold flex items-center gap-2">
                                                            기납부세액 (원천징수세액) (원)
                                                            <Tooltip content="근로소득 원천징수영수증의 '결정세액' 또는 매월 급여명세서의 소득세 합계">
                                                                <Info size={14} className="text-gray-400 cursor-help" />
                                                            </Tooltip>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="neo-input"
                                                            value={formatNumber(inputs.withheldTax)}
                                                            onChange={(e) => handleInputChange("withheldTax", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* 기본공제 */}
                                        {cat.id === "basic" && (
                                            <>
                                                {/* 본인/배우자 공제 */}
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">기본공제 (본인/배우자)</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold text-sm">본인공제</label>
                                                            <div className="neo-input bg-gray-100 text-gray-500 cursor-not-allowed">
                                                                150만원 (고정)
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2 text-sm">
                                                                배우자공제
                                                                <Tooltip content="근로소득자: 연봉 500만원 이하 / 다른소득자: 소득금액 100만원 이하">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <div className="flex gap-2">
                                                                {[0, 1].map((num) => (
                                                                    <button
                                                                        key={num}
                                                                        onClick={() => handleInputChange("spouse", num)}
                                                                        className={clsx(
                                                                            "flex-1 h-[50px] border-[3px] border-black font-bold transition-colors text-sm",
                                                                            inputs.spouse === num ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                                                                        )}
                                                                    >
                                                                        {num === 0 ? "없음" : "있음"}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 부양가족공제 */}
                                                <div className="space-y-4 border-t-2 border-gray-200 pt-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">부양가족공제 (1인당 150만원)</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2 text-sm">
                                                                직계존속 (인)
                                                                <Tooltip content="부모, 장인/장모 등 만60세 이상">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={inputs.parents}
                                                                onChange={(e) => handleInputChange("parents", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2 text-sm">
                                                                자녀 (인)
                                                                <Tooltip content="만20세 이하 자녀">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={inputs.children}
                                                                onChange={(e) => handleInputChange("children", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2 text-sm">
                                                                형제자매 (인)
                                                                <Tooltip content="만20세 이하 또는 만60세 이상">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={inputs.siblings}
                                                                onChange={(e) => handleInputChange("siblings", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2 text-sm">
                                                                위탁아동 (인)
                                                                <Tooltip content="6개월 이상 위탁양육">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={inputs.foster}
                                                                onChange={(e) => handleInputChange("foster", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2 text-sm">
                                                                수급자 (인)
                                                                <Tooltip content="기초생활수급자">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={inputs.recipient}
                                                                onChange={(e) => handleInputChange("recipient", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        <p>본인: 1명 × 150만원 = 1,500,000원</p>
                                                        {inputs.spouse > 0 && <p>배우자: {inputs.spouse}명 × 150만원 = {formatNumber(inputs.spouse * 1500000)}원</p>}
                                                        {inputs.parents > 0 && <p>직계존속: {inputs.parents}명 × 150만원 = {formatNumber(inputs.parents * 1500000)}원</p>}
                                                        {inputs.children > 0 && <p>자녀: {inputs.children}명 × 150만원 = {formatNumber(inputs.children * 1500000)}원</p>}
                                                        {inputs.siblings > 0 && <p>형제자매: {inputs.siblings}명 × 150만원 = {formatNumber(inputs.siblings * 1500000)}원</p>}
                                                        {inputs.foster > 0 && <p>위탁아동: {inputs.foster}명 × 150만원 = {formatNumber(inputs.foster * 1500000)}원</p>}
                                                        {inputs.recipient > 0 && <p>수급자: {inputs.recipient}명 × 150만원 = {formatNumber(inputs.recipient * 1500000)}원</p>}
                                                    </div>
                                                </div>

                                                {/* 인적공제 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">인적공제 합계 (자동 계산)</p>
                                                    <p className="text-2xl font-black">
                                                        {formatNumber(inputs.dependents * 1500000)}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        총 {inputs.dependents}명 (본인 1 + 배우자 {inputs.spouse} + 직계존속 {inputs.parents} + 자녀 {inputs.children} + 형제자매 {inputs.siblings} + 위탁아동 {inputs.foster} + 수급자 {inputs.recipient})
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* 4대보험 */}
                                        {cat.id === "insurance" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        국민연금 (원)
                                                        <Tooltip content="급여에서 공제된 연간 국민연금 납입액입니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.nationalPension)}
                                                        onChange={(e) => handleInputChange("nationalPension", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        건강보험료 (원)
                                                        <Tooltip content="급여에서 공제된 연간 건강보험료입니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.healthInsurance)}
                                                        onChange={(e) => handleInputChange("healthInsurance", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        노인장기요양보험료 (원)
                                                        <Tooltip content="건강보험료와 함께 납부하는 장기요양보험료입니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.longTermCare)}
                                                        onChange={(e) => handleInputChange("longTermCare", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        고용보험료 (원)
                                                        <Tooltip content="급여에서 공제된 연간 고용보험료입니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.employmentInsurance)}
                                                        onChange={(e) => handleInputChange("employmentInsurance", e.target.value)}
                                                    />
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        <p>국민연금: {formatNumber(inputs.nationalPension)}원</p>
                                                        <p>건강보험료: {formatNumber(inputs.healthInsurance)}원</p>
                                                        <p>노인장기요양보험료: {formatNumber(inputs.longTermCare)}원</p>
                                                        <p>고용보험료: {formatNumber(inputs.employmentInsurance)}원</p>
                                                    </div>
                                                </div>

                                                {/* 4대보험 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">4대보험 소득공제 합계</p>
                                                    <p className="text-2xl font-black">
                                                        {formatNumber(inputs.nationalPension + inputs.healthInsurance + inputs.longTermCare + inputs.employmentInsurance)}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">전액 소득공제 적용</p>
                                                </div>
                                            </>
                                        )}

                                        {/* 신용카드 등 사용액 */}
                                        {cat.id === "card" && (
                                            <>
                                                {/* 기본 카드 사용액 */}
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">신용카드·체크카드·현금영수증</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                자녀 수 (한도 확대용)
                                                                <Tooltip content="2026년 기준: 자녀 1명당 50만원, 최대 100만원까지 한도 인상">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="neo-input"
                                                                min="0"
                                                                value={inputs.cardChildren}
                                                                onChange={(e) => handleInputChange("cardChildren", parseInt(e.target.value) || 0)}
                                                            />
                                                            {inputs.cardChildren > 0 && (
                                                                <p className="text-sm text-gray-600">
                                                                    💰 한도 확대: {formatNumber(Math.min(inputs.cardChildren * 500000, 1000000))}원
                                                                    ({inputs.cardChildren}명 × 50만원, 최대 100만원)
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                신용카드 사용액 (원)
                                                                <Tooltip content="공제율 15%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.creditCard)}
                                                                onChange={(e) => handleInputChange("creditCard", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                체크카드 (원)
                                                                <Tooltip content="공제율 30%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.debitCard)}
                                                                onChange={(e) => handleInputChange("debitCard", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                현금영수증 (원)
                                                                <Tooltip content="공제율 30%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.cash)}
                                                                onChange={(e) => handleInputChange("cash", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 추가 공제 항목 */}
                                                <div className="space-y-4 border-t-2 border-gray-200 pt-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">추가 공제 항목</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                전통시장 (원)
                                                                <Tooltip content="공제율 40%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.traditionalMarket)}
                                                                onChange={(e) => handleInputChange("traditionalMarket", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                대중교통 사용액 (원)
                                                                <Tooltip content="공제율 40%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.publicTransport)}
                                                                onChange={(e) => handleInputChange("publicTransport", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                문화체육 (도서·공연·체육시설 등) (원)
                                                                <Tooltip content="공제율 30%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.culture)}
                                                                onChange={(e) => handleInputChange("culture", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        {(() => {
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

                                                            // 기본 공제 합계 (신용카드, 체크카드, 현금영수증)
                                                            const basicDeduction = creditDeduction + debitDeduction + cashDeduction;
                                                            const basicLimit = (inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000) + Math.min(inputs.cardChildren * 500000, 1000000);
                                                            const finalBasic = Math.min(basicDeduction, basicLimit);

                                                            // 추가 공제 합계 (대중교통, 전통시장, 문화체육)
                                                            const additionalDeduction = transportDeduction + marketDeduction + cultureDeduction;
                                                            const additionalLimit = inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000;
                                                            const finalAdditional = Math.min(additionalDeduction, additionalLimit);

                                                            return (
                                                                <>
                                                                    {/* 25% 기준 */}
                                                                    <p className="font-semibold">▸ 25% 기준금액 (순차 소진)</p>
                                                                    <p>총급여의 25%: {formatNumber(threshold)}원</p>
                                                                    <p>총 사용액: {formatNumber(totalUsed)}원</p>
                                                                    <p>공제 대상 (초과분): {formatNumber(Math.max(0, totalUsed - threshold))}원</p>

                                                                    {/* 순차 소진 상세 */}
                                                                    <p className="font-semibold border-t border-black pt-1 mt-2">▸ 25% 소진 순서 (초과분만 공제)</p>
                                                                    {inputs.creditCard > 0 && (
                                                                        <p>① 신용카드: {formatNumber(inputs.creditCard)}원 중 {formatNumber(creditUsed)}원 소진 → <span className="font-bold text-blue-600">초과 {formatNumber(creditExcess)}원 × 15% = {formatNumber(creditDeduction)}원</span></p>
                                                                    )}
                                                                    {inputs.debitCard > 0 && (
                                                                        <p>② 체크카드: {formatNumber(inputs.debitCard)}원 중 {formatNumber(debitUsed)}원 소진 → <span className="font-bold text-blue-600">초과 {formatNumber(debitExcess)}원 × 30% = {formatNumber(debitDeduction)}원</span></p>
                                                                    )}
                                                                    {inputs.cash > 0 && (
                                                                        <p>③ 현금영수증: {formatNumber(inputs.cash)}원 중 {formatNumber(cashUsed)}원 소진 → <span className="font-bold text-blue-600">초과 {formatNumber(cashExcess)}원 × 30% = {formatNumber(cashDeduction)}원</span></p>
                                                                    )}
                                                                    {inputs.publicTransport > 0 && (
                                                                        <p>④ 대중교통: {formatNumber(inputs.publicTransport)}원 중 {formatNumber(transportUsed)}원 소진 → <span className="font-bold text-green-600">초과 {formatNumber(transportExcess)}원 × 40% = {formatNumber(transportDeduction)}원</span></p>
                                                                    )}
                                                                    {inputs.traditionalMarket > 0 && (
                                                                        <p>⑤ 전통시장: {formatNumber(inputs.traditionalMarket)}원 중 {formatNumber(marketUsed)}원 소진 → <span className="font-bold text-green-600">초과 {formatNumber(marketExcess)}원 × 40% = {formatNumber(marketDeduction)}원</span></p>
                                                                    )}
                                                                    {inputs.culture > 0 && (
                                                                        <p>⑥ 문화체육: {formatNumber(inputs.culture)}원 중 {formatNumber(cultureUsed)}원 소진 → <span className="font-bold text-green-600">초과 {formatNumber(cultureExcess)}원 × 30% = {formatNumber(cultureDeduction)}원</span></p>
                                                                    )}

                                                                    {/* 기본 공제 한도 */}
                                                                    <p className="font-semibold border-t border-black pt-1 mt-2">▸ 기본 공제 (신용카드·체크카드·현금영수증)</p>
                                                                    <p className="text-gray-700">
                                                                        공제액: {formatNumber(basicDeduction)}원 / 한도: {formatNumber(basicLimit)}원 → <span className="font-bold">{formatNumber(finalBasic)}원</span>
                                                                    </p>

                                                                    {/* 추가 공제 한도 */}
                                                                    {(inputs.publicTransport > 0 || inputs.traditionalMarket > 0 || inputs.culture > 0) && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 추가 공제 (대중교통·전통시장·문화체육)</p>
                                                                            <p className="text-gray-700">
                                                                                공제액: {formatNumber(additionalDeduction)}원 / 한도: {formatNumber(additionalLimit)}원 → <span className="font-bold">{formatNumber(finalAdditional)}원</span>
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>

                                                {/* 카드 소득공제 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">신용카드 등 소득공제</p>
                                                    <p className="text-2xl font-black">
                                                        {(() => {
                                                            const threshold = Math.round(inputs.salary * 0.25);

                                                            // 순차적으로 25% 소진
                                                            let remaining = threshold;
                                                            const creditExcess = Math.max(0, inputs.creditCard - remaining); remaining = Math.max(0, remaining - inputs.creditCard);
                                                            const debitExcess = Math.max(0, inputs.debitCard - remaining); remaining = Math.max(0, remaining - inputs.debitCard);
                                                            const cashExcess = Math.max(0, inputs.cash - remaining); remaining = Math.max(0, remaining - inputs.cash);
                                                            const transportExcess = Math.max(0, inputs.publicTransport - remaining); remaining = Math.max(0, remaining - inputs.publicTransport);
                                                            const marketExcess = Math.max(0, inputs.traditionalMarket - remaining); remaining = Math.max(0, remaining - inputs.traditionalMarket);
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
                                                        })()}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-2 border-t border-black pt-2">
                                                        {(() => {
                                                            const threshold = Math.round(inputs.salary * 0.25);
                                                            let remaining = threshold;
                                                            const creditExcess = Math.max(0, inputs.creditCard - remaining); remaining = Math.max(0, remaining - inputs.creditCard);
                                                            const debitExcess = Math.max(0, inputs.debitCard - remaining); remaining = Math.max(0, remaining - inputs.debitCard);
                                                            const cashExcess = Math.max(0, inputs.cash - remaining); remaining = Math.max(0, remaining - inputs.cash);
                                                            const transportExcess = Math.max(0, inputs.publicTransport - remaining); remaining = Math.max(0, remaining - inputs.publicTransport);
                                                            const marketExcess = Math.max(0, inputs.traditionalMarket - remaining); remaining = Math.max(0, remaining - inputs.traditionalMarket);
                                                            const cultureExcess = Math.max(0, inputs.culture - remaining);

                                                            const basicDeduction = Math.round(creditExcess * 0.15) + Math.round(debitExcess * 0.3) + Math.round(cashExcess * 0.3);
                                                            const basicLimit = (inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000) + Math.min(inputs.cardChildren * 500000, 1000000);
                                                            const finalBasic = Math.min(basicDeduction, basicLimit);

                                                            return <><span className="font-bold">기본 공제:</span> {formatNumber(finalBasic)}원 (한도 {formatNumber(basicLimit)}원)</>;
                                                        })()}
                                                    </p>
                                                    {(inputs.publicTransport > 0 || inputs.traditionalMarket > 0 || inputs.culture > 0) && (
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {(() => {
                                                                const threshold = Math.round(inputs.salary * 0.25);
                                                                let remaining = threshold;
                                                                remaining = Math.max(0, remaining - inputs.creditCard);
                                                                remaining = Math.max(0, remaining - inputs.debitCard);
                                                                remaining = Math.max(0, remaining - inputs.cash);
                                                                const transportExcess = Math.max(0, inputs.publicTransport - remaining); remaining = Math.max(0, remaining - inputs.publicTransport);
                                                                const marketExcess = Math.max(0, inputs.traditionalMarket - remaining); remaining = Math.max(0, remaining - inputs.traditionalMarket);
                                                                const cultureExcess = Math.max(0, inputs.culture - remaining);

                                                                const additionalDeduction = Math.round(transportExcess * 0.4) + Math.round(marketExcess * 0.4) + Math.round(cultureExcess * 0.3);
                                                                const additionalLimit = inputs.salary <= 70000000 ? 3000000 : inputs.salary <= 120000000 ? 2500000 : 2000000;
                                                                const finalAdditional = Math.min(additionalDeduction, additionalLimit);

                                                                return <><span className="font-bold">추가 공제:</span> {formatNumber(finalAdditional)}원 (한도 {formatNumber(additionalLimit)}원)</>;
                                                            })()}
                                                        </p>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* 의료비 */}
                                        {cat.id === "medical" && (
                                            <>
                                                {/* 의료비 세부 항목 */}
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">🏥 의료비 세부 항목</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                난임시술비 (원)
                                                                <Tooltip content="30% 공제, 한도 없음">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.infertility)}
                                                                onChange={(e) => handleInputChange("infertility", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                미숙아·선천성이상아 의료비 (원)
                                                                <Tooltip content="20% 공제, 한도 없음">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.premature)}
                                                                onChange={(e) => handleInputChange("premature", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                본인/장애인/만65세이상/6세이하 의료비 (원)
                                                                <Tooltip content="15% 공제, 한도 없음">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.selfDisabledSenior)}
                                                                onChange={(e) => handleInputChange("selfDisabledSenior", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                그 밖의 부양가족 의료비 (원)
                                                                <Tooltip content="15% 공제, 700만원 한도">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.otherFamily)}
                                                                onChange={(e) => handleInputChange("otherFamily", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                실손의료보험금 (원)
                                                                <Tooltip content="공제대상에서 차감">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.insuranceReimbursement)}
                                                                onChange={(e) => handleInputChange("insuranceReimbursement", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        {(() => {
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

                                                            return (
                                                                <>
                                                                    {/* 총 의료비 */}
                                                                    <p className="font-semibold">▸ 총 의료비 사용금액</p>
                                                                    <p>{formatNumber(totalMedical)}원</p>
                                                                    <p>　- 실손의료보험금 (차감): -{formatNumber(inputs.insuranceReimbursement)}원</p>
                                                                    <p className="font-bold">= 실제 의료비: {formatNumber(actualMedical)}원</p>

                                                                    {/* 3% 기준 */}
                                                                    <p className="font-semibold border-t border-black pt-1 mt-2">▸ 총급여 3% 기준 (최저한도)</p>
                                                                    <p>{formatNumber(threshold)}원</p>
                                                                    <p className="font-bold">= 3% 초과분 (공제대상 금액): {formatNumber(excessAmount)}원</p>

                                                                    {/* 순차 소진 상세 */}
                                                                    {excessAmount > 0 && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 항목별 세액공제 (공제율 높은순 소진)</p>
                                                                            {inputs.infertility > 0 && (
                                                                                <p>① 난임시술비 ({formatNumber(inputs.infertility)}원 중 {formatNumber(infertilityUsed)}원 소진)
                                                                                    → <span className="font-bold text-green-600">초과 {formatNumber(infertilityExcess)}원 × 30% = {formatNumber(infertilityDeduction)}원</span></p>
                                                                            )}
                                                                            {inputs.premature > 0 && (
                                                                                <p>② 미숙아·선천성이상아 ({formatNumber(inputs.premature)}원 중 {formatNumber(prematureUsed)}원 소진)
                                                                                    → <span className="font-bold text-green-600">초과 {formatNumber(prematureExcess)}원 × 20% = {formatNumber(prematureDeduction)}원</span></p>
                                                                            )}
                                                                            {inputs.selfDisabledSenior > 0 && (
                                                                                <p>③ 본인/장애인/65세+/6세- ({formatNumber(inputs.selfDisabledSenior)}원 중 {formatNumber(selfUsed)}원 소진)
                                                                                    → <span className="font-bold text-blue-600">초과 {formatNumber(selfExcess)}원 × 15% = {formatNumber(selfDeduction)}원</span></p>
                                                                            )}
                                                                            {inputs.otherFamily > 0 && (
                                                                                <p>④ 그 밖의 부양가족 ({formatNumber(inputs.otherFamily)}원 중 {formatNumber(otherUsed)}원 소진)
                                                                                    → <span className="font-bold text-blue-600">초과 {formatNumber(otherExcess)}원 × 15% = {formatNumber(otherDeduction)}원</span>
                                                                                    {otherExcess > 7000000 && <span className="text-red-500"> (700만원 한도 적용)</span>}</p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>

                                                {/* 의료비 공제 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">🏥 의료비 세액공제</p>
                                                    <p className="text-2xl font-black">
                                                        {(() => {
                                                            const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
                                                            const actualMedical = totalMedical - inputs.insuranceReimbursement;
                                                            const threshold = Math.round(inputs.salary * 0.03);

                                                            // 실제 의료비가 3% 미만이면 공제 없음
                                                            if (actualMedical <= threshold) {
                                                                return "0";
                                                            }

                                                            // 순차적으로 3% 소진 (공제율 높은순)
                                                            let remaining = threshold;
                                                            const infertilityExcess = Math.max(0, inputs.infertility - remaining); remaining = Math.max(0, remaining - inputs.infertility);
                                                            const prematureExcess = Math.max(0, inputs.premature - remaining); remaining = Math.max(0, remaining - inputs.premature);
                                                            const selfExcess = Math.max(0, inputs.selfDisabledSenior - remaining); remaining = Math.max(0, remaining - inputs.selfDisabledSenior);
                                                            const otherExcess = Math.max(0, inputs.otherFamily - remaining);

                                                            // 공제 계산
                                                            const infertilityDeduction = Math.round(infertilityExcess * 0.30);
                                                            const prematureDeduction = Math.round(prematureExcess * 0.20);
                                                            const selfDeduction = Math.round(selfExcess * 0.15);
                                                            const otherDeduction = Math.round(Math.min(otherExcess, 7000000) * 0.15);

                                                            return formatNumber(selfDeduction + otherDeduction + infertilityDeduction + prematureDeduction);
                                                        })()}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-2 border-t border-black pt-2">
                                                        {(() => {
                                                            const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
                                                            const actualMedical = totalMedical - inputs.insuranceReimbursement;
                                                            const threshold = Math.round(inputs.salary * 0.03);
                                                            return <>실제 의료비: {formatNumber(actualMedical)}원 | 3% 기준: {formatNumber(threshold)}원 | 초과분: {formatNumber(Math.max(0, actualMedical - threshold))}원</>;
                                                        })()}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* 교육비 */}
                                        {cat.id === "edu" && (
                                            <>
                                                {/* 교육비 세부 항목 */}
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">📚 교육비 세부 항목</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                본인 교육비 (원)
                                                                <Tooltip content="한도 없음, 15% 공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.selfEducation)}
                                                                onChange={(e) => handleInputChange("selfEducation", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                자녀 교육비 - 미취학 (원)
                                                                <Tooltip content="1인당 연 300만원 한도, 15% 공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.preschool)}
                                                                onChange={(e) => handleInputChange("preschool", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                자녀 교육비 - 초중고 (원)
                                                                <Tooltip content="1인당 연 300만원 한도, 15% 공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.elementary)}
                                                                onChange={(e) => handleInputChange("elementary", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                자녀 교육비 - 대학 (원)
                                                                <Tooltip content="1인당 연 900만원 한도, 15% 공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.university)}
                                                                onChange={(e) => handleInputChange("university", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        <p>본인 교육비: {formatNumber(inputs.selfEducation)}원 × 15%</p>
                                                        <p>미취학: {formatNumber(Math.min(inputs.preschool, 3000000))}원 × 15% (한도 300만원)</p>
                                                        <p>초중고: {formatNumber(Math.min(inputs.elementary, 3000000))}원 × 15% (한도 300만원)</p>
                                                        <p>대학: {formatNumber(Math.min(inputs.university, 9000000))}원 × 15% (한도 900만원)</p>
                                                    </div>
                                                </div>

                                                {/* 교육비 공제 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">교육비 세액공제</p>
                                                    <p className="text-2xl font-black">
                                                        {formatNumber(Math.round(
                                                            (inputs.selfEducation +
                                                                Math.min(inputs.preschool, 3000000) +
                                                                Math.min(inputs.elementary, 3000000) +
                                                                Math.min(inputs.university, 9000000)) * 0.15
                                                        ))}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">💡 교육비의 15% 세액공제</p>
                                                </div>
                                            </>
                                        )}

                                        {/* 주택자금 */}
                                        {cat.id === "house" && (
                                            <>
                                                {/* 주택자금 세부 항목 */}
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">🏠 주택자금 세부 항목</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                주택청약저축 납입액 (원)
                                                                <Tooltip content="연간 300만원 한도, 40% 소득공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.housingSubscription)}
                                                                onChange={(e) => handleInputChange("housingSubscription", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                주택임차차입금 원리금상환액 (원)
                                                                <Tooltip content="연간 400만원 한도, 40% 소득공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.rentLoanPayment)}
                                                                onChange={(e) => handleInputChange("rentLoanPayment", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                장기주택저당차입금 이자상환액 (원)
                                                                <Tooltip content="상환기간·방식에 따라 300~1,800만원 한도, 전액 소득공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.mortgageInterest)}
                                                                onChange={(e) => handleInputChange("mortgageInterest", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                월세 세액공제 (원)
                                                                <Tooltip content="연간 1,000만원 한도, 총급여 5,500만원 이하 17%, 초과 15%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.monthlyRent)}
                                                                onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        <p className="font-semibold">▸ 소득공제</p>
                                                        <p>주택청약저축: {formatNumber(Math.min(inputs.housingSubscription, 3000000))}원 × 40% (한도 300만원)</p>
                                                        <p>주택임차차입금: {formatNumber(Math.min(inputs.rentLoanPayment, 4000000))}원 × 40% (한도 400만원)</p>
                                                        <p>장기주택저당차입금: {formatNumber(inputs.mortgageInterest)}원 (전액 공제)</p>
                                                        <p className="font-semibold border-t border-black pt-1 mt-2">▸ 세액공제</p>
                                                        <p>월세: {formatNumber(Math.min(inputs.monthlyRent, 10000000))}원 × {inputs.salary <= 55000000 ? "17%" : "15%"} (한도 1,000만원)</p>
                                                    </div>
                                                </div>

                                                {/* 주택자금 공제 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">주택자금 소득공제</p>
                                                    <p className="text-2xl font-black">
                                                        {formatNumber(
                                                            Math.round(Math.min(inputs.housingSubscription, 3000000) * 0.4) +
                                                            Math.round(Math.min(inputs.rentLoanPayment, 4000000) * 0.4) +
                                                            inputs.mortgageInterest
                                                        )}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-2 border-t border-black pt-2">
                                                        <span className="font-bold">월세 세액공제:</span> {formatNumber(Math.round(Math.min(inputs.monthlyRent, 10000000) * (inputs.salary <= 55000000 ? 0.17 : 0.15)))}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">💡 무주택 세대주 요건 충족 시 적용</p>
                                                </div>
                                            </>
                                        )}

                                        {/* 연금계좌 */}
                                        {cat.id === "pension" && (
                                            <>
                                                {/* 연금계좌 세부 항목 */}
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">💰 연금계좌 세부 항목</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                연금저축 납입액 (원)
                                                                <Tooltip content="연간 600만원 한도, 12% 세액공제 (지방세 제외)">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.pensionSavings)}
                                                                onChange={(e) => handleInputChange("pensionSavings", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                퇴직연금(IRP) 납입액 (원)
                                                                <Tooltip content="연금저축 포함 연간 900만원 한도, 12% 세액공제 (지방세 제외)">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.irp)}
                                                                onChange={(e) => handleInputChange("irp", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                ISA 만기 전환금액 (원)
                                                                <Tooltip content="ISA 만기 후 연금계좌 전환 시 추가 300만원 한도 (10%), 12% 세액공제 (지방세 제외)">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.isaTransfer)}
                                                                onChange={(e) => handleInputChange("isaTransfer", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 보장성 보험료 세부 항목 */}
                                                <div className="space-y-4 border-t-2 border-black pt-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">🛡️ 보장성 보험료</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                일반 보장성 보험료 (원)
                                                                <Tooltip content="연간 100만원 한도, 12% 세액공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.generalInsurance)}
                                                                onChange={(e) => handleInputChange("generalInsurance", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                장애인 전용 보장성 보험료 (원)
                                                                <Tooltip content="연간 100만원 한도, 15% 세액공제">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.disabledInsurance)}
                                                                onChange={(e) => handleInputChange("disabledInsurance", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        {(inputs.pensionSavings > 0 || inputs.irp > 0 || inputs.isaTransfer > 0) && (
                                                            <>
                                                                <p className="font-semibold">▸ 연금계좌</p>
                                                                <p>공제율: 12% (지방세 제외)</p>
                                                                {inputs.pensionSavings > 0 && (
                                                                    <p>연금저축: {formatNumber(Math.min(inputs.pensionSavings, 6000000))}원 (한도 600만원)</p>
                                                                )}
                                                                {inputs.irp > 0 && (
                                                                    <p>IRP: {formatNumber(Math.min(inputs.irp, 9000000 - Math.min(inputs.pensionSavings, 6000000)))}원 (총 900만원 한도)</p>
                                                                )}
                                                                {inputs.isaTransfer > 0 && (
                                                                    <p>ISA 전환: {formatNumber(Math.min(inputs.isaTransfer * 0.1, 3000000))}원 (10%, 한도 300만원)</p>
                                                                )}
                                                            </>
                                                        )}
                                                        {(inputs.generalInsurance > 0 || inputs.disabledInsurance > 0) && (
                                                            <>
                                                                <p className="font-semibold border-t border-black pt-1 mt-2">▸ 보장성 보험료</p>
                                                                {inputs.generalInsurance > 0 && (
                                                                    <p>일반 보장성 보험: {formatNumber(Math.min(inputs.generalInsurance, 1000000))}원 × 12% (한도 100만원)</p>
                                                                )}
                                                                {inputs.disabledInsurance > 0 && (
                                                                    <p>장애인 전용 보험: {formatNumber(Math.min(inputs.disabledInsurance, 1000000))}원 × 15% (한도 100만원)</p>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* 연금계좌 공제 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">연금계좌 세액공제</p>
                                                    <p className="text-2xl font-black">
                                                        {formatNumber(Math.round(
                                                            (Math.min(inputs.pensionSavings, 6000000) +
                                                                Math.min(inputs.irp, 9000000 - Math.min(inputs.pensionSavings, 6000000)) +
                                                                Math.min(inputs.isaTransfer * 0.1, 3000000)) * 0.12
                                                        ))}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-2 border-t border-black pt-2">
                                                        <span className="font-bold">보장성 보험료 세액공제:</span> {formatNumber(
                                                            Math.round(Math.min(inputs.generalInsurance, 1000000) * 0.12) +
                                                            Math.round(Math.min(inputs.disabledInsurance, 1000000) * 0.15)
                                                        )}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">💡 연금저축 + IRP 합계 최대 900만원, ISA 전환 추가 300만원</p>
                                                </div>
                                            </>
                                        )}

                                        {/* 기부금 */}
                                        {cat.id === "donation" && (
                                            <>
                                                {/* 기부금 세부 항목 */}
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-sm border-b-2 border-black pb-2">❤️ 기부금 세부 항목</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                정치자금 기부금 (원)
                                                                <Tooltip content="10만원 이하 100/110, 초과 15%, 3천만원 초과 25%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.politicalDonation)}
                                                                onChange={(e) => handleInputChange("politicalDonation", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                고향사랑 기부금 (원)
                                                                <Tooltip content="10만원 이하 100/110, 초과 15% (일반+특별재난 합산 2,000만원 한도)">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.hometownDonation)}
                                                                onChange={(e) => handleInputChange("hometownDonation", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                고향사랑 특별재난지역 (원)
                                                                <Tooltip content="10만원 이하 100/110, 초과 30% (일반+특별재난 합산 2,000만원 한도)">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.hometownDisaster)}
                                                                onChange={(e) => handleInputChange("hometownDisaster", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                특례기부금 (원)
                                                                <Tooltip content="소득 100% 한도, 1천만원 이하 15%, 초과 30%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.specialDonation)}
                                                                onChange={(e) => handleInputChange("specialDonation", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                우리사주조합 기부금 (원)
                                                                <Tooltip content="소득 30% 한도, 1천만원 이하 15%, 초과 30%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.employeeDonation)}
                                                                onChange={(e) => handleInputChange("employeeDonation", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                일반기부금 - 종교단체 외 (원)
                                                                <Tooltip content="소득 30% 한도, 1천만원 이하 15%, 초과 30%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.designatedDonation)}
                                                                onChange={(e) => handleInputChange("designatedDonation", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="font-bold flex items-center gap-2">
                                                                일반기부금 - 종교단체 (원)
                                                                <Tooltip content="소득 10% 한도, 1천만원 이하 15%, 초과 30%">
                                                                    <Info size={14} className="text-gray-400 cursor-help" />
                                                                </Tooltip>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="neo-input"
                                                                value={formatNumber(inputs.religiousDonation)}
                                                                onChange={(e) => handleInputChange("religiousDonation", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 계산식 */}
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black space-y-2">
                                                    <p className="font-bold text-sm">계산식</p>
                                                    <div className="text-sm space-y-1">
                                                        {(() => {
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

                                                            const totalDeduction = politicalDeduction + hometownDeduction + disasterDeduction +
                                                                specialDeduction + employeeDeduction + designatedDeduction + religiousDeduction;

                                                            return (
                                                                <>
                                                                    {inputs.politicalDonation > 0 && (
                                                                        <>
                                                                            <p className="font-semibold">▸ 정치자금 기부금</p>
                                                                            {Math.min(inputs.politicalDonation, 100000) > 0 && (
                                                                                <p>　{formatNumber(Math.min(inputs.politicalDonation, 100000))}원 × 100/110 = <span className="font-bold text-blue-600">{formatNumber(Math.round(politicalBase))}원</span></p>
                                                                            )}
                                                                            {politicalExcess15 > 0 && (
                                                                                <p>　{formatNumber(politicalExcess15)}원 × 15% = <span className="font-bold text-blue-600">{formatNumber(Math.round(politicalExcess15 * 0.15))}원</span></p>
                                                                            )}
                                                                            {politicalExcess25 > 0 && (
                                                                                <p>　{formatNumber(politicalExcess25)}원 × 25% = <span className="font-bold text-blue-600">{formatNumber(Math.round(politicalExcess25 * 0.25))}원</span></p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {inputs.hometownDonation > 0 && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 고향사랑 기부금</p>
                                                                            {Math.min(hometownLimited, 100000) > 0 && (
                                                                                <p>　{formatNumber(Math.min(hometownLimited, 100000))}원 × 100/110 = <span className="font-bold text-blue-600">{formatNumber(Math.round(hometownBase))}원</span></p>
                                                                            )}
                                                                            {Math.max(0, hometownLimited - 100000) > 0 && (
                                                                                <p>　{formatNumber(Math.max(0, hometownLimited - 100000))}원 × 15% = <span className="font-bold text-blue-600">{formatNumber(Math.round(hometownExcess))}원</span></p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {inputs.hometownDisaster > 0 && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 고향사랑 특별재난지역</p>
                                                                            {Math.min(hometownDisasterLimited, 100000) > 0 && (
                                                                                <p>　{formatNumber(Math.min(hometownDisasterLimited, 100000))}원 × 100/110 = <span className="font-bold text-green-600">{formatNumber(Math.round(disasterBase))}원</span></p>
                                                                            )}
                                                                            {Math.max(0, hometownDisasterLimited - 100000) > 0 && (
                                                                                <p>　{formatNumber(Math.max(0, hometownDisasterLimited - 100000))}원 × 30% = <span className="font-bold text-green-600">{formatNumber(Math.round(disasterExcess))}원</span></p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {inputs.specialDonation > 0 && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 특례기부금</p>
                                                                            {Math.min(inputs.specialDonation, 10000000) > 0 && (
                                                                                <p>　{formatNumber(Math.min(inputs.specialDonation, 10000000))}원 × 15% = <span className="font-bold text-blue-600">{formatNumber(Math.round(special15))}원</span></p>
                                                                            )}
                                                                            {Math.max(0, inputs.specialDonation - 10000000) > 0 && (
                                                                                <p>　{formatNumber(Math.max(0, inputs.specialDonation - 10000000))}원 × 30% = <span className="font-bold text-blue-600">{formatNumber(Math.round(special30))}원</span></p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {inputs.employeeDonation > 0 && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 우리사주조합 기부금</p>
                                                                            <p>　한도: 소득의 30% = {formatNumber(Math.round(employeeLimit))}원</p>
                                                                            {employee15 > 0 && (
                                                                                <p>　{formatNumber(Math.min(employeeLimited, 10000000))}원 × 15% = <span className="font-bold text-blue-600">{formatNumber(Math.round(employee15))}원</span></p>
                                                                            )}
                                                                            {employee30 > 0 && (
                                                                                <p>　{formatNumber(Math.max(0, employeeLimited - 10000000))}원 × 30% = <span className="font-bold text-blue-600">{formatNumber(Math.round(employee30))}원</span></p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {inputs.designatedDonation > 0 && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 일반기부금 (종교단체 외)</p>
                                                                            <p>　한도: 소득의 30% = {formatNumber(Math.round(designatedLimit))}원</p>
                                                                            {designated15 > 0 && (
                                                                                <p>　{formatNumber(Math.min(designatedLimited, 10000000))}원 × 15% = <span className="font-bold text-blue-600">{formatNumber(Math.round(designated15))}원</span></p>
                                                                            )}
                                                                            {designated30 > 0 && (
                                                                                <p>　{formatNumber(Math.max(0, designatedLimited - 10000000))}원 × 30% = <span className="font-bold text-blue-600">{formatNumber(Math.round(designated30))}원</span></p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {inputs.religiousDonation > 0 && (
                                                                        <>
                                                                            <p className="font-semibold border-t border-black pt-1 mt-2">▸ 일반기부금 (종교단체)</p>
                                                                            <p>　한도: 소득의 10% = {formatNumber(Math.round(religiousLimit))}원</p>
                                                                            {religious15 > 0 && (
                                                                                <p>　{formatNumber(Math.min(religiousLimited, 10000000))}원 × 15% = <span className="font-bold text-blue-600">{formatNumber(Math.round(religious15))}원</span></p>
                                                                            )}
                                                                            {religious30 > 0 && (
                                                                                <p>　{formatNumber(Math.max(0, religiousLimited - 10000000))}원 × 30% = <span className="font-bold text-blue-600">{formatNumber(Math.round(religious30))}원</span></p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>

                                                {/* 기부금 공제 합계 */}
                                                <div className="bg-neo-yellow p-4 border-2 border-black">
                                                    <p className="font-bold mb-1">❤️ 기부금 세액공제</p>
                                                    <p className="text-2xl font-black">
                                                        {(() => {
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

                                                            const totalDeduction = politicalDeduction + hometownDeduction + disasterDeduction +
                                                                special15 + special30 + employee15 + employee30 + designated15 + designated30 + religious15 + religious30;

                                                            return formatNumber(Math.round(totalDeduction));
                                                        })()}원
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-2 border-t border-black pt-2">
                                                        {inputs.politicalDonation > 0 && (
                                                            <span>정치자금: {formatNumber(Math.round(Math.min(inputs.politicalDonation, 100000) * (100 / 110) + Math.min(Math.max(0, inputs.politicalDonation - 100000), 30000000) * 0.15 + Math.max(0, inputs.politicalDonation - 100000 - 30000000) * 0.25))}원 | </span>
                                                        )}
                                                        {inputs.hometownDonation > 0 && (
                                                            <span>고향사랑: {formatNumber(Math.round(Math.min(Math.min(inputs.hometownDonation, 20000000), 100000) * (100 / 110) + Math.max(0, Math.min(inputs.hometownDonation, 20000000) - 100000) * 0.15))}원 | </span>
                                                        )}
                                                        총 기부액: {formatNumber(inputs.politicalDonation + inputs.hometownDonation + inputs.hometownDisaster + inputs.specialDonation + inputs.employeeDonation + inputs.designatedDonation + inputs.religiousDonation)}원
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}

                {/* 계산하기 버튼 */}
                <button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className={clsx(
                        "neo-btn w-full",
                        isCalculating
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-neo-orange hover:bg-neo-yellow"
                    )}
                >
                    {isCalculating ? (
                        <>
                            <RefreshCw size={20} className="animate-spin" />
                            계산 중...
                        </>
                    ) : (
                        <>
                            <Calculator size={20} />
                            예상 환급액 계산하기
                        </>
                    )}
                </button>
            </div>

            {/* Floating Result Panel */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <div className="neo-card bg-neo-black text-white mb-4">
                        <h3 className="text-lg font-bold text-gray-400 mb-1">
                            예상 환급액
                        </h3>
                        <div className={clsx(
                            "text-4xl font-black mb-4",
                            result ? (result.refund >= 0 ? "text-neo-cyan" : "text-red-400") : "text-gray-500"
                        )}>
                            {result
                                ? `${result.refund >= 0 ? "+" : ""}${formatNumber(result.refund)}원`
                                : "계산을 시작하세요"
                            }
                        </div>

                        {result && (
                            <div className="space-y-2 text-sm border-t border-gray-700 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">과세표준</span>
                                    <span>{formatNumber(result.taxableIncome)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">산출세액</span>
                                    <span>{formatNumber(result.calculatedTax)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">세액공제 합계</span>
                                    <span className="text-neo-yellow">-{formatNumber(result.totalTaxCredit)}원</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-700 pt-2">
                                    <span>결정세액</span>
                                    <span className="font-bold">{formatNumber(result.finalTax)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>기납부세액</span>
                                    <span className="font-bold">{formatNumber(result.withheldTax)}원</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {result && (
                        <div className="neo-card bg-white mb-4 text-sm">
                            <h4 className="font-bold mb-3">공제 내역</h4>
                            <div className="space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span>근로소득공제</span>
                                    <span>{formatNumber(result.incomeDeduction)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>인적공제</span>
                                    <span>{formatNumber(result.personalDeduction)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>신용카드 공제</span>
                                    <span>{formatNumber(result.cardDeduction)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>의료비 세액공제</span>
                                    <span>{formatNumber(result.medicalDeduction)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>교육비 세액공제</span>
                                    <span>{formatNumber(result.educationDeduction)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>주택자금 공제</span>
                                    <span>{formatNumber(result.housingDeduction)}원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>연금계좌 세액공제</span>
                                    <span>{formatNumber(result.pensionDeduction)}원</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <button className="neo-btn w-full bg-neo-orange hover:bg-neo-yellow">
                        <Sparkles size={20} />
                        AI 최적화 제안 받기
                    </button>

                    <div className="mt-4 bg-white border-2 border-black p-4 text-sm">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <AlertCircle size={16} className="text-red-500" />
                            주의사항
                        </h4>
                        <p className="text-gray-600">
                            이 결과는 시뮬레이션 값이며, 실제 국세청 확정 자료와 다를 수
                            있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
