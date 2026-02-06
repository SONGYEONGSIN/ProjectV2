"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Sparkles, Bell, Target, ChevronUp, ChevronDown, AlertCircle, CheckCircle2, Lightbulb, PiggyBank, CreditCard, Home, Heart, GraduationCap, Gift, Building, Loader2, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { loadTaxData, loadAdminData, generateDeductionAnalysis, DeductionAnalysis } from "@/lib/tax-store";
import { generateRecommendations, getDefaultRecommendations, calculateTotalPotentialSaving, AIRecommendation, convertAdminDataToTaxData, generateRecommendationsFromAnalysis } from "@/lib/ai-recommendation";
import { calculateTax, convertAdminToTaxInputs } from "@/lib/tax-calculator";

interface NewsArticle {
    id: string;
    title: string;
    source: string;
    time: string;
    url: string;
    isNew: boolean;
}

interface AIAlert {
    id: string;
    type: "high" | "medium" | "low";
    message: string;
    detail: string;
    potentialSaving: string;
}

interface DeductionItem {
    id: string;
    category: string;
    type: "소득공제" | "세액공제";
    amount: number;
    limit: number;
    icon: React.ElementType;
    status: "optimal" | "good" | "warning" | "critical";
}

const MOCK_ALERTS: AIAlert[] = [
    {
        id: "1",
        type: "high",
        message: "신용카드 30만원 추가 사용 시",
        detail: "현재 공제 문턱까지 98% 도달했습니다. 조금만 더 사용하면 최대 공제를 받을 수 있습니다.",
        potentialSaving: "+15만원",
    },
    {
        id: "2",
        type: "high",
        message: "퇴직연금(IRP) 300만원 납입 추천",
        detail: "올해 한도가 남아있습니다. 연말 전에 납입하면 추가 세액공제 가능합니다.",
        potentialSaving: "+45만원",
    },
    {
        id: "3",
        type: "medium",
        message: "기부금 10만원으로 전액 공제",
        detail: "정치자금 기부금 10만원 이하는 전액 세액공제 됩니다.",
        potentialSaving: "+10만원",
    },
    {
        id: "4",
        type: "low",
        message: "의료비 추가 지출 검토",
        detail: "현재 의료비 공제 문턱(총급여 3%)에 근접했습니다.",
        potentialSaving: "+8만원",
    },
];

const MOCK_DEDUCTIONS: DeductionItem[] = [
    {
        id: "1",
        category: "신용카드 등 사용금액",
        type: "소득공제",
        amount: 2500000,
        limit: 3000000,
        icon: CreditCard,
        status: "good",
    },
    {
        id: "2",
        category: "주택마련저축",
        type: "소득공제",
        amount: 2400000,
        limit: 3000000,
        icon: Home,
        status: "good",
    },
    {
        id: "3",
        category: "의료비",
        type: "세액공제",
        amount: 850000,
        limit: 7000000,
        icon: Heart,
        status: "warning",
    },
    {
        id: "4",
        category: "교육비",
        type: "세액공제",
        amount: 3000000,
        limit: 3000000,
        icon: GraduationCap,
        status: "optimal",
    },
    {
        id: "5",
        category: "기부금",
        type: "세액공제",
        amount: 200000,
        limit: 1000000,
        icon: Gift,
        status: "critical",
    },
    {
        id: "6",
        category: "연금저축/IRP",
        type: "세액공제",
        amount: 4000000,
        limit: 7000000,
        icon: PiggyBank,
        status: "warning",
    },
    {
        id: "7",
        category: "보험료",
        type: "세액공제",
        amount: 1000000,
        limit: 1000000,
        icon: Building,
        status: "optimal",
    },
];

const MOCK_NEWS_ARTICLES = [
    {
        id: "1",
        title: "2026년 결혼세액공제 신설, 신혼부부 최대 100만원 환급",
        source: "한국경제",
        time: "2시간 전",
        isNew: true,
        url: "https://www.google.com/search?q=2026+결혼세액공제",
    },
    {
        id: "2",
        title: "청약저축 소득공제 한도 300만원으로 상향...연말정산 혜택 확대",
        source: "매일경제",
        time: "3시간 전",
        isNew: true,
        url: "https://www.google.com/search?q=청약저축+소득공제+한도+상향",
    },
    {
        id: "3",
        title: "연금저축 세액공제, 2026년부터 이렇게 바뀝니다",
        source: "조선비즈",
        time: "5시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=연금저축+세액공제+2026",
    },
    {
        id: "4",
        title: "ISA 만기자금 연금계좌 전환 시 추가 세액공제 혜택",
        source: "머니투데이",
        time: "6시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=ISA+연금계좌+전환+세액공제",
    },
    {
        id: "5",
        title: "신용카드 vs 체크카드, 연말정산 절세 전략 총정리",
        source: "중앙일보",
        time: "8시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=신용카드+체크카드+연말정산",
    },
    {
        id: "6",
        title: "의료비 공제 문턱 3% 기준, 이렇게 활용하세요",
        source: "한국경제",
        time: "10시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=의료비+공제+3%25+기준",
    },
    {
        id: "7",
        title: "자녀세액공제 확대...다자녀 가구 최대 혜택은?",
        source: "동아일보",
        time: "12시간 전",
        isNew: false,
        url: "https://www.google.com/search?q=자녀세액공제+다자녀",
    },
    {
        id: "8",
        title: "기부금 세액공제율 인상, 나눔의 가치 더 커졌다",
        source: "매일경제",
        time: "1일 전",
        isNew: false,
        url: "https://www.google.com/search?q=기부금+세액공제율+인상",
    },
    {
        id: "9",
        title: "월세 세액공제 한도 상향, 무주택 세입자 절세 팁",
        source: "SBS뉴스",
        time: "1일 전",
        isNew: false,
        url: "https://www.google.com/search?q=월세+세액공제+한도",
    },
    {
        id: "10",
        title: "퇴직연금 IRP 납입, 연말 전 꼭 챙겨야 할 이유",
        source: "KBS뉴스",
        time: "2일 전",
        isNew: false,
        url: "https://www.google.com/search?q=퇴직연금+IRP+연말정산",
    },
];

function formatNumber(num: number): string {
    return Math.round(num).toLocaleString("ko-KR");
}

function getUtilizationColor(rate: number): string {
    if (rate >= 90) return "bg-neo-cyan";
    if (rate >= 70) return "bg-neo-yellow";
    if (rate >= 40) return "bg-neo-orange";
    return "bg-red-400";
}

function getStatusBadge(status: DeductionItem["status"], utilizationRate?: number) {
    // 활용률 기준으로 상태 결정: 95% 이상=최적, 70% 이상=양호, 40% 이상=개선, 40% 미만=미달
    const effectiveStatus = utilizationRate !== undefined
        ? (utilizationRate >= 95 ? "optimal" : utilizationRate >= 70 ? "good" : utilizationRate >= 40 ? "warning" : "critical")
        : status;

    switch (effectiveStatus) {
        case "optimal":
            return <span className="inline-block px-2 py-1 text-xs font-bold bg-neo-cyan border-2 border-black whitespace-nowrap">최적</span>;
        case "good":
            return <span className="inline-block px-2 py-1 text-xs font-bold bg-neo-yellow border-2 border-black whitespace-nowrap">양호</span>;
        case "warning":
            return <span className="inline-block px-2 py-1 text-xs font-bold bg-neo-orange border-2 border-black whitespace-nowrap">개선</span>;
        case "critical":
            return <span className="inline-block px-2 py-1 text-xs font-bold bg-red-400 border-2 border-black text-white whitespace-nowrap">미달</span>;
    }
}

function ArrowRight({
    size = 24,
    ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

export default function DashboardPage() {
    const [goalAmount, setGoalAmount] = useState(1200000);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [showAllNews, setShowAllNews] = useState(false);  // 더보기 상태
    const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
    const [hasUserData, setHasUserData] = useState(false);
    const [deductionItems, setDeductionItems] = useState<DeductionAnalysis[]>([]);
    const [hasAdminData, setHasAdminData] = useState(false);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [totalPrepaidTax, setTotalPrepaidTax] = useState(0); // 기납부세액 총액 (목표 상한선)
    const [totalSalary, setTotalSalary] = useState(0); // 총급여

    // AI 개인화 조언 상태
    const [aiAdvice, setAiAdvice] = useState<string>("");
    const [aiAdviceLoading, setAiAdviceLoading] = useState(false);
    const [aiAdviceError, setAiAdviceError] = useState<string>("");
    const [showAiModal, setShowAiModal] = useState(false);

    const goalProgress = Math.min(100, Math.round((currentAmount / goalAmount) * 100));

    const totalPotentialSaving = calculateTotalPotentialSaving(aiRecommendations);

    // Admin 데이터로 공제 분석, 환급액 계산, AI 추천 생성 (통합)
    useEffect(() => {
        // 2026년 우선, 없으면 2025년 데이터 사용
        let adminData = loadAdminData(2026);
        if (!adminData) {
            adminData = loadAdminData(2025);
        }
        if (adminData) {
            const analysis = generateDeductionAnalysis(adminData);
            setDeductionItems(analysis);
            setHasAdminData(true);

            // 공통 세금 계산 모듈 사용
            const taxInputs = convertAdminToTaxInputs(adminData);
            const taxResult = calculateTax(taxInputs);

            // 기납부세액 저장 (목표 상한선)
            const withheldTax = adminData.salary.prepaidTax || 0;
            setTotalPrepaidTax(withheldTax);

            // 환급액 설정 (Calculator와 동일한 계산 결과)
            setCurrentAmount(taxResult.refund);

            // 목표 금액 초기화: 최대 환급 가능 금액 (기납부세액)
            if (withheldTax > 0) {
                setGoalAmount(withheldTax);
            }

            // AI 추천 생성 - 공제 항목별 상세 분석 결과 기반으로 생성
            const calculatedSalary = Object.values(adminData.salary.monthly as Record<string, number>).reduce((sum: number, val: number) => sum + (val || 0), 0);
            setTotalSalary(calculatedSalary);
            const recommendations = generateRecommendationsFromAnalysis(analysis, calculatedSalary);
            if (recommendations.length > 0) {
                setAiRecommendations(recommendations);
                setHasUserData(true);
            } else {
                setAiRecommendations(getDefaultRecommendations());
                setHasUserData(false);
            }
        } else {
            // 데이터 없으면 기본 Mock 사용
            setDeductionItems(MOCK_DEDUCTIONS.map(d => ({
                id: d.id,
                category: d.category,
                type: d.type,
                amount: d.amount,
                limit: d.limit,
                status: d.status,
            })));
            setHasAdminData(false);
            setCurrentAmount(0);

            // 기존 TaxData 확인 (Calculator 데이터가 있으면 사용)
            const taxData = loadTaxData();
            if (taxData && taxData.salary > 0) {
                const recommendations = generateRecommendations(taxData);
                setAiRecommendations(recommendations);
                setHasUserData(true);
            } else {
                setAiRecommendations(getDefaultRecommendations());
                setHasUserData(false);
            }
        }
    }, []);

    // 뉴스 가져오기
    useEffect(() => {
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
            } finally {
                setNewsLoading(false);
            }
        }
        fetchNews();
    }, []);

    // AI 개인화 조언 요청 함수
    const fetchAiAdvice = async () => {
        if (!hasAdminData || deductionItems.length === 0) return;

        setShowAiModal(true);  // 모달 열기
        setAiAdviceLoading(true);
        setAiAdviceError("");

        try {
            const response = await fetch("/api/ai-advice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    salary: totalSalary,
                    deductionItems: deductionItems.map(item => ({
                        category: item.category,
                        type: item.type,
                        amount: item.amount,
                        limit: item.limit,
                        status: item.status
                    })),
                    currentRefund: currentAmount,
                    prepaidTax: totalPrepaidTax
                })
            });

            const data = await response.json();

            if (response.ok && data.advice) {
                setAiAdvice(data.advice);
            } else {
                setAiAdviceError(data.error || "AI 조언 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("AI Advice Error:", error);
            setAiAdviceError("AI 조언 요청 중 오류가 발생했습니다.");
        } finally {
            setAiAdviceLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Summary Card with Goal Setting */}
            <div className="neo-card bg-neo-white relative overflow-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Current Refund */}
                    <div className="lg:col-span-2 relative">
                        {/* 배경 장식 아이콘 */}
                        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                            <TrendingUp size={120} />
                        </div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className={`w-3 h-3 ${currentAmount >= 0 ? 'bg-neo-orange' : 'bg-red-500'} rounded-full`}></span>
                            2026년 예상 {currentAmount >= 0 ? '환급액' : '추가납부액'}
                        </h2>
                        <div className="flex flex-col md:flex-row items-end gap-4 mb-4">
                            {hasAdminData ? (
                                <span className={`text-5xl md:text-7xl font-black tracking-tighter ${currentAmount >= 0 ? 'text-neo-black' : 'text-red-600'}`}>
                                    {currentAmount > 0 ? '-' : currentAmount < 0 ? '+' : ''}{formatNumber(Math.abs(currentAmount))}
                                    <span className="text-2xl text-gray-500 font-bold ml-1">원</span>
                                </span>
                            ) : (
                                <span className="text-2xl md:text-3xl font-bold text-gray-400">
                                    기초자료를 먼저 입력해주세요
                                </span>
                            )}
                            {hasAdminData && currentAmount >= 0 && (
                                <div className="neo-badge bg-neo-cyan text-black mb-2">
                                    예상 환급
                                </div>
                            )}
                            {hasAdminData && currentAmount < 0 && (
                                <div className="neo-badge bg-red-400 text-white mb-2">
                                    추가 납부 예상
                                </div>
                            )}
                        </div>

                        {/* Progress to Goal */}
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold">목표 달성률</span>
                                <span className="text-sm font-bold">{currentAmount >= 0 ? `${goalProgress}%` : '-'}</span>
                            </div>
                            <div className="w-full bg-gray-200 h-4 border-2 border-black relative">
                                <div
                                    className={`absolute top-0 left-0 h-full ${currentAmount >= 0 ? 'bg-neo-orange' : 'bg-red-400'} border-r-2 border-black transition-all duration-500`}
                                    style={{ width: currentAmount >= 0 ? `${goalProgress}%` : '0%' }}
                                ></div>
                            </div>
                            {currentAmount >= 0 ? (
                                <p className="text-xs font-bold mt-2 text-gray-600">
                                    목표까지 <span className="text-neo-orange">{formatNumber(goalAmount - currentAmount)}원</span> 남음
                                </p>
                            ) : (
                                <p className="text-xs font-bold mt-2 text-red-500">
                                    ⚠️ 추가 공제 받을 수 있는 항목을 확인해 주세요.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Goal Setting */}
                    <div className="border-l-0 lg:border-l-4 border-black pl-0 lg:pl-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Target size={20} className="text-neo-orange" />
                            환급액 목표 설정
                        </h3>
                        <div className="space-y-3">
                            {/* 기납부세액 표시 */}
                            {totalPrepaidTax > 0 && (
                                <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 border border-gray-300">
                                    최대 환급 가능: <span className="font-bold text-neo-black">{formatNumber(totalPrepaidTax)}원</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setGoalAmount(prev => Math.max(100000, prev - 100000))}
                                    className="w-10 h-10 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center justify-center"
                                >
                                    <ChevronDown size={20} />
                                </button>
                                <div className="flex-1 border-2 border-black p-3 bg-white text-center font-black text-xl">
                                    {formatNumber(goalAmount)}원
                                </div>
                                <button
                                    onClick={() => {
                                        const maxGoal = totalPrepaidTax > 0 ? totalPrepaidTax : Infinity;
                                        setGoalAmount(prev => Math.min(prev + 100000, maxGoal));
                                    }}
                                    disabled={totalPrepaidTax > 0 && goalAmount >= totalPrepaidTax}
                                    className={`w-10 h-10 border-2 border-black font-bold flex items-center justify-center ${totalPrepaidTax > 0 && goalAmount >= totalPrepaidTax
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    <ChevronUp size={20} />
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[800000, 1000000, 1500000].map((amount) => {
                                    const isDisabled = totalPrepaidTax > 0 && amount > totalPrepaidTax;
                                    return (
                                        <button
                                            key={amount}
                                            onClick={() => !isDisabled && setGoalAmount(amount)}
                                            disabled={isDisabled}
                                            className={`py-2 border-2 border-black text-sm font-bold transition-all ${isDisabled
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : goalAmount === amount
                                                    ? "bg-neo-yellow shadow-[2px_2px_0px_0px_#000]"
                                                    : "bg-white hover:bg-gray-100"
                                                }`}
                                        >
                                            {formatNumber(amount)}
                                        </button>
                                    );
                                })}
                            </div>
                            {(() => {
                                const optimizedAmount = currentAmount + totalPotentialSaving;
                                if (optimizedAmount >= 0) {
                                    return (
                                        <p className="text-xs text-gray-600 font-medium">
                                            AI 추천: 최적화 시 <span className="text-neo-orange font-bold">{formatNumber(optimizedAmount)}원</span> 달성 가능
                                        </p>
                                    );
                                } else {
                                    return (
                                        <p className="text-xs text-gray-600 font-medium">
                                            AI 추천: 최적화 시 추가납부 <span className="text-red-500 font-bold">{formatNumber(Math.abs(optimizedAmount))}원</span>으로 감소 가능
                                        </p>
                                    );
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Deduction Analysis Table */}
            <div className="neo-card bg-white">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2 border-b-2 border-black pb-3">
                    <Sparkles size={24} className="text-neo-orange" />
                    AI 공제 항목별 상세 분석
                    <span className="ml-auto text-sm font-medium text-gray-500">2026년 기준</span>
                </h3>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-4 border-black">
                                <th className="text-left py-3 px-4 font-black">공제 항목</th>
                                <th className="text-center py-3 px-4 font-black hidden sm:table-cell">구분</th>
                                <th className="text-right py-3 px-4 font-black">공제 금액</th>
                                <th className="text-right py-3 px-4 font-black hidden md:table-cell">최대한도</th>
                                <th className="text-center py-3 px-4 font-black">활용률</th>
                                <th className="text-center py-3 px-4 font-black">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deductionItems.map((item, index) => {
                                const iconMap: Record<string, React.ElementType> = {
                                    "기본공제 (인적공제)": Users,
                                    "4대보험": Building,
                                    "신용카드 등 사용금액": CreditCard,
                                    "주택자금\n(청약저축+임차차입금)": Home,
                                    "주택자금\n(장기주택저당차입금이자상환)": Home,
                                    "월세": Home,
                                    "의료비": Heart,
                                    "교육비": GraduationCap,
                                    "기부금": Gift,
                                    "연금저축/IRP": PiggyBank,
                                    "보험료": Building,
                                    "자녀": Users,
                                };
                                const Icon = iconMap[item.category] || CreditCard;
                                const maxValue = item.maxBenefit || item.limit;
                                const utilizationRate = maxValue > 0
                                    ? Math.min(100, Math.round((item.amount / maxValue) * 100))
                                    : (item.amount > 0 ? 100 : 0); // 한도 없는 항목은 공제액이 있으면 100%
                                return (
                                    <tr
                                        key={item.id}
                                        className={`border-b-2 border-black hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            }`}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 border-2 border-black bg-neo-yellow flex items-center justify-center">
                                                    <Icon size={20} />
                                                </div>
                                                <span className="font-bold whitespace-pre-line">{item.category}</span>
                                            </div>
                                        </td>
                                        <td className="text-center py-4 px-2 sm:px-4 hidden sm:table-cell">
                                            <span className={`px-2 py-1 text-xs font-bold border-2 border-black whitespace-nowrap ${item.type === "소득공제" ? "bg-neo-cyan" : "bg-neo-orange"
                                                }`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base">
                                            <div className="font-bold whitespace-nowrap">{formatNumber(Math.round(item.amount))}원</div>
                                            {item.thresholdInfo && (
                                                <div className="text-xs text-gray-400 mt-0.5 whitespace-pre-line text-right">{item.thresholdInfo}</div>
                                            )}
                                        </td>
                                        <td className="text-right py-4 px-4 text-gray-500 hidden md:table-cell whitespace-pre-line">
                                            {item.category === "교육비" ? (
                                                <span className="text-xs">본인: 한도 없음{"\n"}미취학: 1인당 3,000,000원{"\n"}초중고: 1인당 3,000,000원{"\n"}대학: 1인당 9,000,000원</span>
                                            ) : item.category === "의료비" ? (
                                                <span className="text-xs">난임시술비: 한도 없음{"\n"}미숙아·선천성: 한도 없음{"\n"}본인/장애/만65/6세: 한도 없음{"\n"}그 밖의 부양가족: 7,000,000원</span>
                                            ) : item.category === "기부금" && item.donationLimits ? (
                                                <span className="text-xs">
                                                    정치자금: {formatNumber(item.donationLimits.politicalFund)}원{"\n"}
                                                    고향사랑/특별재난: {formatNumber(item.donationLimits.hometownDisaster)}원{"\n"}
                                                    특례기부금: {formatNumber(item.donationLimits.specialDonation)}원{"\n"}
                                                    우리사주조합: {formatNumber(item.donationLimits.employeeStock)}원{"\n"}
                                                    일반기부(종교): {formatNumber(item.donationLimits.generalReligious)}원{"\n"}
                                                    일반기부(종교 외): {formatNumber(item.donationLimits.generalNonReligious)}원
                                                </span>
                                            ) : item.category === "자녀" && item.childLimits ? (
                                                <span className="text-xs">
                                                    자녀 세액공제:{"\n"}
                                                    1명: {formatNumber(item.childLimits.first)}원{"\n"}
                                                    2명: {formatNumber(item.childLimits.second)}원{"\n"}
                                                    3명 이상: {formatNumber(item.childLimits.thirdPlus)}원{"\n"}
                                                    ───{"\n"}
                                                    출생·입양 공제:{"\n"}
                                                    첫째: {formatNumber(item.childLimits.birthFirst)}원{"\n"}
                                                    둘째: {formatNumber(item.childLimits.birthSecond)}원{"\n"}
                                                    셋째 이상: 1인당 {formatNumber(item.childLimits.birthThirdPlus)}원
                                                </span>
                                            ) : (
                                                <>{formatNumber(item.limit)}원</>
                                            )}
                                        </td>
                                        <td className="py-3 px-1 sm:px-4">
                                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                                                <div className="w-12 sm:w-20 h-3 bg-gray-200 border border-black relative">
                                                    <div
                                                        className={`h-full ${getUtilizationColor(utilizationRate)} transition-all`}
                                                        style={{ width: `${Math.min(100, utilizationRate)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs sm:text-sm font-bold w-10 sm:w-12 text-right">{utilizationRate}%</span>
                                            </div>
                                        </td>
                                        <td className="text-center py-3 px-1 sm:px-4">
                                            {getStatusBadge(item.status, utilizationRate)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 border-2 border-black bg-gray-50">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={24} className="text-neo-cyan flex-shrink-0" />
                            <div>
                                <p className="font-bold">전체 공제 활용률</p>
                                <p className="text-sm text-gray-600">{deductionItems.length}개 항목 중 {deductionItems.filter(d => d.status === "optimal").length}개 최적화 완료</p>
                            </div>
                        </div>

                        {/* 소득공제 / 세액공제 분리 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t-2 border-gray-300">
                            {/* 소득공제 */}
                            <div className="p-4 bg-neo-cyan border-2 border-black">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 text-xs font-bold bg-white border-2 border-black">소득공제</span>
                                    <span className="text-sm font-medium">과세표준 감소</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-700">현재 공제액</p>
                                        <p className="text-xl sm:text-2xl font-black">{formatNumber(deductionItems.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.amount, 0))}원</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-700">최대 한도</p>
                                        <p className="text-lg font-bold text-gray-800">{formatNumber(deductionItems.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.limit, 0))}원</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full bg-white h-2 border border-black">
                                    <div
                                        className="h-full bg-neo-black"
                                        style={{
                                            width: `${(() => {
                                                const total = deductionItems.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.limit, 0);
                                                return total > 0 ? Math.round(deductionItems.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.amount, 0) / total * 100) : 0;
                                            })()}%`
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* 세액공제 */}
                            <div className="p-4 bg-neo-orange border-2 border-black">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 text-xs font-bold bg-white border-2 border-black">세액공제</span>
                                    <span className="text-sm font-medium text-white">납부세액 직접 감소</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-800">현재 공제액</p>
                                        <p className="text-xl sm:text-2xl font-black text-white">{formatNumber(deductionItems.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.amount, 0))}원</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-800">최대 한도</p>
                                        <p className="text-lg font-bold text-white">{formatNumber(deductionItems.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.limit, 0))}원</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full bg-white h-2 border border-black">
                                    <div
                                        className="h-full bg-neo-black"
                                        style={{
                                            width: `${(() => {
                                                const total = deductionItems.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.limit, 0);
                                                return total > 0 ? Math.round(deductionItems.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.amount, 0) / total * 100) : 0;
                                            })()}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* 전체 합계 */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-3 border-t-2 border-gray-300">
                            <div className="text-center sm:text-left">
                                <span className="text-sm font-medium text-gray-600">전체 합계: </span>
                                <span className="font-black text-lg">{formatNumber(deductionItems.reduce((sum, d) => sum + d.amount, 0))}원</span>
                                <span className="text-gray-500"> / </span>
                                <span className="font-bold text-gray-600">{formatNumber(deductionItems.reduce((sum, d) => sum + d.limit, 0))}원</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="w-3 h-3 bg-neo-cyan border border-black"></span>
                                <span>소득공제</span>
                                <span className="w-3 h-3 bg-neo-orange border border-black ml-2"></span>
                                <span>세액공제</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Recommendations */}
                <div className="neo-card bg-white">
                    <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-2">
                        <h3 className="text-xl font-black flex items-center gap-2">
                            <Lightbulb size={20} className="text-neo-yellow" />
                            AI 절세 추천
                            {hasAdminData && (
                                <button
                                    onClick={fetchAiAdvice}
                                    disabled={aiAdviceLoading}
                                    className={`ml-2 px-3 py-1.5 font-bold border-2 border-black text-xs transition-all flex items-center gap-1 ${aiAdviceLoading
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-neo-cyan to-cyan-400 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                                        }`}
                                >
                                    <Sparkles size={14} />
                                    {aiAdviceLoading ? "분석 중..." : "제미니 분석 요청"}
                                </button>
                            )}
                        </h3>
                        <span className="neo-badge bg-neo-orange text-white text-sm">
                            -{formatNumber(totalPotentialSaving)}원 가능
                        </span>
                    </div>
                    <div className="space-y-4">
                        {aiRecommendations.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Lightbulb size={32} className="mx-auto mb-2 text-gray-300" />
                                <p>계산기에서 데이터를 입력하면 AI 추천을 받을 수 있습니다.</p>
                            </div>
                        ) : (
                            aiRecommendations.map((rec) => (
                                <div
                                    key={rec.id}
                                    className="border-2 border-black p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer bg-white"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge type={rec.priority} />
                                        {rec.potentialSaving > 0 && (
                                            <span className="text-lg font-black text-neo-cyan">
                                                -{formatNumber(rec.potentialSaving)}원
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-lg leading-tight mb-1">
                                        {rec.message}
                                    </h4>
                                    <p className="text-sm text-gray-600">{rec.detail}</p>
                                    {rec.action && (
                                        <p className="text-xs text-neo-orange font-bold mt-2">
                                            💡 {rec.action}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                        {!hasUserData && (
                            <Link href="/calculator">
                                <button className="w-full py-3 font-bold border-2 border-black bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all">
                                    계산기로 이동 →
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                {/* 연말정산 뉴스 */}
                <div className="neo-card bg-neo-black text-white">
                    <div className="flex items-center justify-between mb-4 border-b-2 border-white pb-2">
                        <h3 className="text-xl font-black flex items-center gap-2 text-white">
                            <Bell size={20} className="text-neo-yellow" />
                            연말정산 뉴스
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <span className="w-2 h-2 bg-neo-cyan rounded-full animate-pulse"></span>
                                3시간마다 업데이트
                            </span>
                            <button
                                onClick={() => setShowAllNews(!showAllNews)}
                                className="text-sm font-bold text-neo-yellow hover:text-white transition-colors flex items-center gap-1"
                            >
                                {showAllNews ? '접기 -' : '더보기 +'}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {newsLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 size={32} className="text-neo-yellow animate-spin" />
                                <span className="ml-3 text-gray-400">뉴스를 불러오는 중...</span>
                            </div>
                        ) : newsArticles.length > 0 ? (
                            <>
                                {/* 10일 이내 뉴스 (항상 표시) */}
                                {newsArticles
                                    .filter(article => {
                                        // "N일 전" 형식에서 일수 추출
                                        const dayMatch = article.time.match(/(\d+)일/);
                                        if (dayMatch) {
                                            return parseInt(dayMatch[1]) <= 10;
                                        }
                                        // "N시간 전" 또는 "NEW"는 항상 표시
                                        return true;
                                    })
                                    .map((article) => (
                                        <a
                                            key={article.id}
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-gray-900 border border-gray-700 p-3 hover:bg-gray-800 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {article.isNew && (
                                                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-neo-orange text-white border border-neo-orange">NEW</span>
                                                        )}
                                                        <span className="text-xs text-gray-400">{article.source}</span>
                                                        <span className="text-xs text-gray-500">•</span>
                                                        <span className="text-xs text-gray-500">{article.time}</span>
                                                    </div>
                                                    <h4 className="font-medium text-sm text-white group-hover:text-neo-yellow transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h4>
                                                </div>
                                                <ArrowRight size={16} className="text-gray-500 group-hover:text-neo-yellow transition-colors flex-shrink-0 mt-1" />
                                            </div>
                                        </a>
                                    ))}

                                {/* 10일 이후 뉴스 (더보기 클릭 시만 표시) */}
                                {showAllNews && newsArticles
                                    .filter(article => {
                                        const dayMatch = article.time.match(/(\d+)일/);
                                        return dayMatch && parseInt(dayMatch[1]) > 10;
                                    })
                                    .map((article) => (
                                        <a
                                            key={article.id}
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-gray-800 border border-gray-600 p-3 hover:bg-gray-700 transition-colors cursor-pointer group opacity-80"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs text-gray-400">{article.source}</span>
                                                        <span className="text-xs text-gray-500">•</span>
                                                        <span className="text-xs text-gray-500">{article.time}</span>
                                                    </div>
                                                    <h4 className="font-medium text-sm text-gray-300 group-hover:text-neo-yellow transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h4>
                                                </div>
                                                <ArrowRight size={16} className="text-gray-500 group-hover:text-neo-yellow transition-colors flex-shrink-0 mt-1" />
                                            </div>
                                        </a>
                                    ))}
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                뉴스를 불러올 수 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="neo-card bg-neo-yellow">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <AlertCircle size={32} className="text-neo-black" />
                        <div>
                            <h3 className="text-xl font-black">지금 바로 절세 최적화를 시작하세요!</h3>
                            <p className="text-sm font-medium">AI가 분석한 추천 항목을 실행하면 최대 <span className="font-bold">{formatNumber(totalPotentialSaving)}원</span> 추가 환급 가능</p>
                        </div>
                    </div>
                    <Link href="/calculator">
                        <button className="px-8 py-4 bg-neo-black text-white font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
                            절세 시뮬레이션 시작
                        </button>
                    </Link>
                </div>
            </div>

            {/* Gemini AI 분석 모달 */}
            {showAiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* 배경 오버레이 */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => !aiAdviceLoading && setShowAiModal(false)}
                    />

                    {/* 모달 컨텐츠 */}
                    <div className="relative w-full max-w-2xl max-h-[80vh] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden flex flex-col m-auto">
                        {/* 모달 헤더 */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-neo-cyan to-cyan-400 border-b-2 border-black">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <Sparkles size={24} />
                                🤖 Gemini AI 맞춤 절세 분석
                            </h3>
                            {!aiAdviceLoading && (
                                <button
                                    onClick={() => setShowAiModal(false)}
                                    className="w-10 h-10 flex items-center justify-center font-black text-2xl border-2 border-black bg-white hover:bg-gray-100 transition-colors"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* 모달 바디 */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {aiAdviceLoading ? (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <Loader2 size={48} className="text-neo-cyan animate-spin mb-4" />
                                    <p className="font-bold text-lg">Gemini AI가 분석 중입니다...</p>
                                    <p className="text-sm text-gray-600 mt-1">잠시만 기다려주세요</p>
                                </div>
                            ) : aiAdviceError ? (
                                <div className="p-4 bg-red-100 border-2 border-red-500">
                                    <p className="text-red-700 font-bold flex items-center gap-2">
                                        <AlertCircle size={20} />
                                        {aiAdviceError}
                                    </p>
                                    <button
                                        onClick={fetchAiAdvice}
                                        className="mt-3 px-4 py-2 font-bold border-2 border-black bg-white hover:bg-gray-100"
                                    >
                                        다시 시도
                                    </button>
                                </div>
                            ) : aiAdvice ? (
                                <div
                                    className="whitespace-pre-wrap text-neo-black leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: aiAdvice
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/###\s?(.*)/g, '<h4 class="font-black text-lg mt-4 mb-2 text-neo-cyan">$1</h4>')
                                            .replace(/##\s?(.*)/g, '<h3 class="font-black text-xl mt-4 mb-2 border-b-2 border-black pb-1">$1</h3>')
                                            .replace(/\n/g, '<br/>')
                                    }}
                                />
                            ) : null}
                        </div>

                        {/* 모달 푸터 */}
                        {!aiAdviceLoading && aiAdvice && (
                            <div className="p-4 bg-gray-100 border-t-2 border-black flex justify-end gap-2">
                                <button
                                    onClick={fetchAiAdvice}
                                    className="px-4 py-2 font-bold border-2 border-black bg-white hover:bg-gray-50"
                                >
                                    다시 분석
                                </button>
                                <button
                                    onClick={() => setShowAiModal(false)}
                                    className="px-4 py-2 font-bold border-2 border-black bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
                                >
                                    닫기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div >
    );
}
