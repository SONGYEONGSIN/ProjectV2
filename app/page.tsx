"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
    Sparkles,
    TrendingUp,
    CheckCircle2,
    HeartPulse,
    GraduationCap,
    Gift,
    Shield,
    CreditCard,
    Home,
    PiggyBank,
    Building,
    Star,
    Quote,
    Users,
    Banknote,
    ThumbsUp,
} from "lucide-react";

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

const deductionCategories = [
    { icon: HeartPulse, label: "의료비", emoji: "🏥" },
    { icon: GraduationCap, label: "교육비", emoji: "📚" },
    { icon: Gift, label: "기부금", emoji: "💝" },
    { icon: Shield, label: "보험료", emoji: "🛡️" },
    { icon: CreditCard, label: "신용카드", emoji: "💳" },
    { icon: Home, label: "주택자금", emoji: "🏠" },
    { icon: PiggyBank, label: "연금저축", emoji: "🐷" },
    { icon: Building, label: "월세", emoji: "🏢" },
];

const reviews = [
    {
        name: "김민수",
        role: "직장인 5년차",
        content: "작년보다 30만원 더 환급받았어요! AI가 알려준 대로 연금저축 추가 납입했더니 효과가 있었네요.",
        rating: 5,
    },
    {
        name: "이지영",
        role: "프리랜서",
        content: "복잡한 공제 항목을 한눈에 볼 수 있어서 좋아요. 특히 의료비 공제 놓칠 뻔했는데 알림 덕분에 챙겼습니다.",
        rating: 5,
    },
    {
        name: "박준혁",
        role: "신입사원",
        content: "처음 연말정산 하는데 너무 쉬웠어요. 뭘 준비해야 하는지 다 알려줘서 헤매지 않았습니다.",
        rating: 5,
    },
];

const stats = [
    { icon: Users, value: "10만+", label: "누적 사용자", color: "text-neo-cyan" },
    { icon: Banknote, value: "35만원", label: "평균 환급액", color: "text-neo-orange" },
    { icon: ThumbsUp, value: "98%", label: "사용자 만족도", color: "text-neo-yellow" },
];

export default function LandingPage() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col items-center animate-fade-in">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 w-full">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative"
                >
                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-neo-yellow rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-neo-cyan rounded-full blur-xl opacity-50 animate-pulse delay-75"></div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 relative z-10 leading-tight">
                        연말정산, 더 이상
                        <br />
                        <span className="text-neo-orange">어렵지 않아요!</span>
                    </h1>
                    <p className="text-lg md:text-xl font-bold text-gray-600 mb-2">
                        AI가 도와주는 똑똑한 연말정산 시뮬레이터.
                    </p>
                    <div className="text-2xl md:text-3xl font-black border-2 border-black bg-white inline-block px-6 py-2 shadow-[8px_8px_0px_0px_#000] rotate-[-1deg]">
                        최대 환급액을 찾아드립니다.
                    </div>
                </motion.div>

                <Link href={session ? "/dashboard" : "/login"}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-6 bg-neo-black text-white text-2xl font-black tracking-tight border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {session ? "대시보드로 가기" : "무료로 시작하기"}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-neo-orange translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform border-2 border-black"></div>
                    </motion.button>
                </Link>

                <p className="mt-6 text-sm font-bold text-gray-400">
                    * 2026년 세법 개정안 완벽 반영
                </p>
            </section>

            {/* Features Section */}
            <section className="w-full max-w-5xl py-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                        왜 <span className="text-neo-orange">TAXAI</span>인가요?
                    </h2>
                    <p className="text-gray-600 font-bold">
                        복잡한 세금 계산, AI가 대신해드립니다
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#00D9FF]"
                    >
                        <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-transparent">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-2">AI 실시간 분석</h3>
                        <p className="text-sm font-bold text-gray-500">
                            소비 패턴을 분석하여
                            <br />
                            최적의 공제 전략을 제안합니다.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#FFB800]"
                    >
                        <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-transparent">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-2">예상 환급액 계산</h3>
                        <p className="text-sm font-bold text-gray-500">
                            2026년 세법 개정안을 반영한
                            <br />
                            정확한 환급액을 확인하세요.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#FF5E00]"
                    >
                        <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-transparent">
                            <CheckCircle2 size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-2">원클릭 관리</h3>
                        <p className="text-sm font-bold text-gray-500">
                            복잡한 서류 없이
                            <br />
                            데이터 연동으로 간편하게.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Deduction Categories Section */}
            <section className="w-full bg-gradient-to-b from-neo-cyan/10 to-neo-yellow/10 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-black mb-4">
                            놓치기 쉬운 공제 항목,
                            <br />
                            <span className="text-neo-cyan">한눈에 챙기세요! 👀</span>
                        </h2>
                        <p className="text-gray-600 font-bold">
                            클릭하면 바로 계산해볼 수 있어요
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {deductionCategories.map((cat, index) => (
                            <Link key={cat.label} href="/calculator">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -8, rotate: 2 }}
                                    className="bg-white border-[3px] border-black p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-[6px_6px_0px_0px_#000] transition-all"
                                >
                                    <span className="text-4xl">{cat.emoji}</span>
                                    <span className="font-black text-lg">{cat.label}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="w-full max-w-5xl py-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                        <span className="text-neo-orange">사용자 후기</span>
                    </h2>
                    <p className="text-gray-600 font-bold">
                        실제 사용자들이 경험한 TAXAI
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#000] relative"
                        >
                            <Quote
                                size={32}
                                className="text-gray-200 absolute top-4 right-4"
                            />
                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        fill="#FFB800"
                                        className="text-neo-yellow"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 font-bold mb-4 leading-relaxed">
                                &ldquo;{review.content}&rdquo;
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-100">
                                <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-cyan flex items-center justify-center font-black">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <p className="font-black">{review.name}</p>
                                    <p className="text-sm text-gray-500 font-bold">
                                        {review.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="w-full py-16 px-4 bg-gradient-to-r from-neo-orange/5 via-neo-cyan/5 to-neo-yellow/5">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-black mb-4">
                            이미 <span className="text-neo-orange">많은 분들</span>이
                            <br />
                            TAXAI와 함께하고 있어요 🚀
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border-[3px] border-black p-8 text-center shadow-[6px_6px_0px_0px_#000]"
                            >
                                <stat.icon size={40} className={`mx-auto mb-4 ${stat.color}`} strokeWidth={2.5} />
                                <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.color}`}>
                                    {stat.value}
                                </div>
                                <p className="font-bold text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-neo-black py-16 border-y-[3px] border-black">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                        지금 바로 시작하세요
                    </h2>
                    <p className="text-gray-400 font-bold mb-8">
                        복잡한 연말정산, AI와 함께라면 5분이면 충분합니다.
                    </p>
                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-neo-orange text-white text-xl font-black border-2 border-white hover:bg-neo-yellow hover:text-black transition-colors"
                        >
                            무료 회원가입
                        </motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
