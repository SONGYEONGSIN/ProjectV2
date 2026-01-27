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
    salary: number;
    dependents: number;
    nationalPension: number;
    healthInsurance: number;
    employmentInsurance: number;
    creditCard: number;
    debitCard: number;
    medical: number;
    education: number;
    housing: number;
    pension: number;
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
            label: "연금계좌",
            icon: Building,
            color: "bg-neo-yellow",
        },
    ];

    const [openSection, setOpenSection] = useState<string | null>("salary");
    const [inputs, setInputs] = useState<FormInputs>({
        salary: 56822780,
        dependents: 1,
        nationalPension: 2520000,
        healthInsurance: 1980000,
        employmentInsurance: 510000,
        creditCard: 12000000,
        debitCard: 5000000,
        medical: 2500000,
        education: 3000000,
        housing: 2400000,
        pension: 4000000,
    });
    const [result, setResult] = useState<TaxResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleInputChange = (field: keyof FormInputs, value: string | number) => {
        if (typeof value === "string") {
            setInputs(prev => ({ ...prev, [field]: parseNumber(value) }));
        } else {
            setInputs(prev => ({ ...prev, [field]: value }));
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

    const handleReset = () => {
        setInputs({
            salary: 0,
            dependents: 1,
            nationalPension: 0,
            healthInsurance: 0,
            employmentInsurance: 0,
            creditCard: 0,
            debitCard: 0,
            medical: 0,
            education: 0,
            housing: 0,
            pension: 0,
        });
        setResult(null);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-black">상세 공제 입력</h2>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 text-sm font-bold underline decoration-2 decoration-neo-orange"
                    >
                        <RefreshCw size={14} /> 초기화
                    </button>
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
                                                        연간 총급여액
                                                        <Tooltip content="식대 등 비과세 소득을 제외한 연간 근로소득 합계액입니다. 원천징수영수증의 16번 항목을 확인하세요.">
                                                            <Info
                                                                size={16}
                                                                className="text-gray-400 cursor-help"
                                                            />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.salary)}
                                                        onChange={(e) => handleInputChange("salary", e.target.value)}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* 기본공제 */}
                                        {cat.id === "basic" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        부양가족 수 (본인 포함)
                                                        <Tooltip content="본인을 포함한 부양가족 수입니다. 1인당 150만원 기본공제가 적용됩니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <div className="flex gap-2">
                                                        {[1, 2, 3, 4, 5].map((num) => (
                                                            <button
                                                                key={num}
                                                                onClick={() => handleInputChange("dependents", num)}
                                                                className={clsx(
                                                                    "flex-1 py-2 border-2 border-black font-bold transition-colors",
                                                                    inputs.dependents === num ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                                                                )}
                                                            >
                                                                {num}명
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-neo-yellow/20 p-4 border-2 border-black text-sm">
                                                    <p className="font-bold mb-1">인적공제 예상액</p>
                                                    <p className="text-gray-600">
                                                        {inputs.dependents}명 × 150만원 = {formatNumber(inputs.dependents * 1500000)}원
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* 4대보험 */}
                                        {cat.id === "insurance" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        국민연금 납입액
                                                        <Tooltip content="급여에서 공제된 연간 국민연금 납입액입니다. 전액 소득공제됩니다.">
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
                                                        건강보험료 (장기요양보험 포함)
                                                        <Tooltip content="급여에서 공제된 연간 건강보험료입니다. 전액 소득공제됩니다.">
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
                                                        고용보험료
                                                        <Tooltip content="급여에서 공제된 연간 고용보험료입니다. 전액 소득공제됩니다.">
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
                                                <div className="bg-neo-orange/20 p-4 border-2 border-black text-sm">
                                                    <p className="font-bold mb-1">4대보험 소득공제 합계</p>
                                                    <p className="text-gray-600">
                                                        {formatNumber(inputs.nationalPension + inputs.healthInsurance + inputs.employmentInsurance)}원 (전액 공제)
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* 신용카드 등 사용액 */}
                                        {cat.id === "card" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold">신용카드 사용액</label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.creditCard)}
                                                        onChange={(e) => handleInputChange("creditCard", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-bold">
                                                        체크카드/현금영수증
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.debitCard)}
                                                        onChange={(e) => handleInputChange("debitCard", e.target.value)}
                                                    />
                                                </div>
                                                <div className="bg-neo-yellow/20 p-4 border-2 border-black text-sm font-bold flex gap-2">
                                                    <Sparkles size={16} />
                                                    TIP: 신용카드는 총급여의 25%까지만 사용하고, 초과분은
                                                    체크카드를 사용하는 것이 유리합니다.
                                                </div>
                                            </>
                                        )}

                                        {/* 의료비 */}
                                        {cat.id === "medical" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        본인 및 부양가족 의료비
                                                        <Tooltip content="총급여의 3%를 초과하는 금액의 15%가 세액공제됩니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.medical)}
                                                        onChange={(e) => handleInputChange("medical", e.target.value)}
                                                    />
                                                </div>
                                                <div className="bg-neo-orange/20 p-4 border-2 border-black text-sm">
                                                    <p className="font-bold mb-1">의료비 공제 기준</p>
                                                    <p className="text-gray-600">
                                                        총급여 {formatNumber(inputs.salary)}원의 3% = {formatNumber(Math.round(inputs.salary * 0.03))}원 초과분부터 공제
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* 교육비 */}
                                        {cat.id === "edu" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold">본인 교육비</label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.education)}
                                                        onChange={(e) => handleInputChange("education", e.target.value)}
                                                    />
                                                </div>
                                                <div className="bg-neo-cyan/20 p-4 border-2 border-black text-sm font-bold flex gap-2">
                                                    <Sparkles size={16} />
                                                    TIP: 대학원, 직업능력개발훈련비도 교육비 공제 대상입니다.
                                                </div>
                                            </>
                                        )}

                                        {/* 주택자금 */}
                                        {cat.id === "house" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        주택청약저축 납입액
                                                        <Tooltip content="연간 최대 300만원까지 공제 가능합니다.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.housing)}
                                                        onChange={(e) => handleInputChange("housing", e.target.value)}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* 연금계좌 */}
                                        {cat.id === "pension" && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="font-bold flex items-center gap-2">
                                                        연금저축/IRP 납입액
                                                        <Tooltip content="연간 최대 900만원까지 세액공제 가능. 총급여 5,500만원 이하 시 16.5%, 초과 시 13.2% 공제율 적용.">
                                                            <Info size={16} className="text-gray-400 cursor-help" />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="neo-input"
                                                        value={formatNumber(inputs.pension)}
                                                        onChange={(e) => handleInputChange("pension", e.target.value)}
                                                    />
                                                </div>
                                                <div className="bg-neo-orange/20 p-4 border-2 border-black text-sm">
                                                    <p className="font-bold mb-1">연금계좌 세액공제율</p>
                                                    <p className="text-gray-600">
                                                        현재 총급여 기준: {inputs.salary <= 55000000 ? "16.5%" : "13.2%"} 적용
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
