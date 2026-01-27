"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Sparkles, Bell, Target, ChevronUp, ChevronDown, AlertCircle, CheckCircle2, Lightbulb, PiggyBank, CreditCard, Home, Heart, GraduationCap, Gift, Building, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

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
    return num.toLocaleString("ko-KR");
}

function getUtilizationColor(rate: number): string {
    if (rate >= 90) return "bg-neo-cyan";
    if (rate >= 70) return "bg-neo-yellow";
    if (rate >= 40) return "bg-neo-orange";
    return "bg-red-400";
}

function getStatusBadge(status: DeductionItem["status"]) {
    switch (status) {
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
    const currentAmount = 956610;
    const goalProgress = Math.min(100, Math.round((currentAmount / goalAmount) * 100));

    const totalPotentialSaving = MOCK_ALERTS.reduce((sum, alert) => {
        const amount = parseInt(alert.potentialSaving.replace(/[^0-9]/g, "")) * 10000;
        return sum + amount;
    }, 0);

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

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Summary Card with Goal Setting */}
            <div className="neo-card bg-neo-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={120} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Current Refund */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-3 h-3 bg-neo-orange rounded-full"></span>
                            2026년 예상 환급액
                        </h2>
                        <div className="flex flex-col md:flex-row items-end gap-4 mb-4">
                            <span className="text-5xl md:text-7xl font-black tracking-tighter text-neo-black">
                                {formatNumber(currentAmount)}
                                <span className="text-2xl text-gray-500 font-bold ml-1">원</span>
                            </span>
                            <div className="neo-badge bg-neo-cyan text-black mb-2">
                                지난해 대비 +12.3% ▲
                            </div>
                        </div>

                        {/* Progress to Goal */}
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold">목표 달성률</span>
                                <span className="text-sm font-bold">{goalProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-4 border-2 border-black relative">
                                <div
                                    className="absolute top-0 left-0 h-full bg-neo-orange border-r-2 border-black transition-all duration-500"
                                    style={{ width: `${goalProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs font-bold mt-2 text-gray-600">
                                목표까지 <span className="text-neo-orange">{formatNumber(goalAmount - currentAmount)}원</span> 남음
                            </p>
                        </div>
                    </div>

                    {/* Goal Setting */}
                    <div className="border-l-0 lg:border-l-4 border-black pl-0 lg:pl-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Target size={20} className="text-neo-orange" />
                            환급액 목표 설정
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setGoalAmount(prev => Math.max(500000, prev - 100000))}
                                    className="w-10 h-10 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center justify-center"
                                >
                                    <ChevronDown size={20} />
                                </button>
                                <div className="flex-1 border-2 border-black p-3 bg-white text-center font-black text-xl">
                                    {formatNumber(goalAmount)}원
                                </div>
                                <button
                                    onClick={() => setGoalAmount(prev => prev + 100000)}
                                    className="w-10 h-10 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center justify-center"
                                >
                                    <ChevronUp size={20} />
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[800000, 1000000, 1500000].map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setGoalAmount(amount)}
                                        className={`py-2 border-2 border-black text-sm font-bold transition-all ${goalAmount === amount
                                            ? "bg-neo-yellow shadow-[2px_2px_0px_0px_#000]"
                                            : "bg-white hover:bg-gray-100"
                                            }`}
                                    >
                                        {formatNumber(amount)}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-600 font-medium">
                                AI 추천: 최적화 시 <span className="text-neo-orange font-bold">{formatNumber(currentAmount + totalPotentialSaving)}원</span> 달성 가능
                            </p>
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
                                <th className="text-right py-3 px-4 font-black hidden md:table-cell">한도</th>
                                <th className="text-center py-3 px-4 font-black">활용률</th>
                                <th className="text-center py-3 px-4 font-black">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_DEDUCTIONS.map((item, index) => {
                                const Icon = item.icon;
                                const utilizationRate = Math.round((item.amount / item.limit) * 100);
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
                                                <span className="font-bold">{item.category}</span>
                                            </div>
                                        </td>
                                        <td className="text-center py-4 px-2 sm:px-4 hidden sm:table-cell">
                                            <span className={`px-2 py-1 text-xs font-bold border-2 border-black whitespace-nowrap ${item.type === "소득공제" ? "bg-neo-cyan" : "bg-neo-orange"
                                                }`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="text-right py-3 px-2 sm:px-4 font-bold whitespace-nowrap text-sm sm:text-base">
                                            {formatNumber(item.amount)}원
                                        </td>
                                        <td className="text-right py-4 px-4 text-gray-500 hidden md:table-cell whitespace-nowrap">
                                            {formatNumber(item.limit)}원
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
                                            {getStatusBadge(item.status)}
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
                                <p className="text-sm text-gray-600">7개 항목 중 2개 최적화 완료</p>
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
                                        <p className="text-xl sm:text-2xl font-black">{formatNumber(MOCK_DEDUCTIONS.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.amount, 0))}원</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-700">최대 한도</p>
                                        <p className="text-lg font-bold text-gray-800">{formatNumber(MOCK_DEDUCTIONS.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.limit, 0))}원</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full bg-white h-2 border border-black">
                                    <div
                                        className="h-full bg-neo-black"
                                        style={{
                                            width: `${Math.round(MOCK_DEDUCTIONS.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.amount, 0) / MOCK_DEDUCTIONS.filter(d => d.type === "소득공제").reduce((sum, d) => sum + d.limit, 0) * 100)}%`
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
                                        <p className="text-xl sm:text-2xl font-black text-white">{formatNumber(MOCK_DEDUCTIONS.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.amount, 0))}원</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-800">최대 한도</p>
                                        <p className="text-lg font-bold text-white">{formatNumber(MOCK_DEDUCTIONS.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.limit, 0))}원</p>
                                    </div>
                                </div>
                                <div className="mt-2 w-full bg-white h-2 border border-black">
                                    <div
                                        className="h-full bg-neo-black"
                                        style={{
                                            width: `${Math.round(MOCK_DEDUCTIONS.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.amount, 0) / MOCK_DEDUCTIONS.filter(d => d.type === "세액공제").reduce((sum, d) => sum + d.limit, 0) * 100)}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* 전체 합계 */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-3 border-t-2 border-gray-300">
                            <div className="text-center sm:text-left">
                                <span className="text-sm font-medium text-gray-600">전체 합계: </span>
                                <span className="font-black text-lg">{formatNumber(MOCK_DEDUCTIONS.reduce((sum, d) => sum + d.amount, 0))}원</span>
                                <span className="text-gray-500"> / </span>
                                <span className="font-bold text-gray-600">{formatNumber(MOCK_DEDUCTIONS.reduce((sum, d) => sum + d.limit, 0))}원</span>
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
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2">
                        <Lightbulb size={20} className="text-neo-yellow" />
                        AI 절세 추천
                        <span className="ml-auto neo-badge bg-neo-orange text-white text-sm">
                            +{formatNumber(totalPotentialSaving)}원 가능
                        </span>
                    </h3>
                    <div className="space-y-4">
                        {MOCK_ALERTS.map((alert) => (
                            <div
                                key={alert.id}
                                className="border-2 border-black p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer bg-white"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <Badge type={alert.type} />
                                    <span className="text-lg font-black text-neo-cyan">{alert.potentialSaving}</span>
                                </div>
                                <h4 className="font-bold text-lg leading-tight mb-1">
                                    {alert.message}
                                </h4>
                                <p className="text-sm text-gray-600">{alert.detail}</p>
                            </div>
                        ))}
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
                            <Link href="/news" className="text-sm font-bold text-neo-yellow hover:text-white transition-colors flex items-center gap-1">
                                더보기 +
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {newsLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 size={32} className="text-neo-yellow animate-spin" />
                                <span className="ml-3 text-gray-400">뉴스를 불러오는 중...</span>
                            </div>
                        ) : newsArticles.length > 0 ? (
                            newsArticles.map((article) => (
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
                            ))
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
                        <button className="px-8 py-4 bg-neo-black text-white font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                            절세 시뮬레이션 시작
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
