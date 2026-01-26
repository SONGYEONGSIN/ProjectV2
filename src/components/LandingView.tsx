import { useState } from 'react';
import {
    Calculator,
    ArrowRight,
    TrendingUp,
    FileText,
    Search,
    AlertCircle,
    Menu,
    X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingViewProps {
    onStart: () => void;
    onLogin: () => void;
    onSignup: () => void;
}

export const LandingView = ({ onStart, onLogin, onSignup }: LandingViewProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-background text-foreground">

            {/* Marquee Banner */}
            <div className="bg-neo-black text-white py-2 overflow-hidden whitespace-nowrap border-b-[3px] border-neo-black">
                <div className="inline-block animate-marquee">
                    <span className="mx-4 font-head text-sm">⚠️ 2026 연말정산 시즌 OPEN</span>
                    <span className="mx-4 font-head text-sm">•</span>
                    <span className="mx-4 font-head text-sm">지금 바로 AI 무료 진단</span>
                    <span className="mx-4 font-head text-sm">•</span>
                    <span className="mx-4 font-head text-sm">최대 환급액 보장</span>
                    <span className="mx-4 font-head text-sm">•</span>
                    <span className="mx-4 font-head text-sm">⚠️ 2026 연말정산 시즌 OPEN</span>
                    <span className="mx-4 font-head text-sm">•</span>
                    <span className="mx-4 font-head text-sm">지금 바로 AI 무료 진단</span>
                    <span className="mx-4 font-head text-sm">•</span>
                    <span className="mx-4 font-head text-sm">최대 환급액 보장</span>
                </div>
            </div>

            {/* Header */}
            <header className="border-b-[3px] border-neo-black bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-neo-yellow border-[3px] border-neo-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                            <Calculator size={24} strokeWidth={3} />
                        </div>
                        <span className="font-head text-2xl font-black tracking-tighter">TAX<span className="text-neo-orange">AI</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 font-head font-bold text-sm">
                        <a href="#" className="hover:underline decoration-4 decoration-neo-yellow underline-offset-4">FEATURES</a>
                        <a href="#" className="hover:underline decoration-4 decoration-neo-cyan underline-offset-4">HOW IT WORKS</a>
                        <a href="#" className="hover:underline decoration-4 decoration-neo-orange underline-offset-4">PRICING</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={onLogin} className="font-bold border-b-2 border-black hover:bg-black hover:text-white transition-colors px-2 py-1">LOGIN</button>
                        <button onClick={onSignup} className="neo-btn py-2 px-4 text-sm shadow-[3px_3px_0px_0px_#000]">START FREE</button>
                    </div>

                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-0 top-[116px] bg-white z-40 p-8 border-t-[3px] border-neo-black"
                    >
                        <div className="flex flex-col gap-6 text-2xl font-head font-black">
                            <a href="#">FEATURES</a>
                            <a href="#">HOW IT WORKS</a>
                            <a href="#">PRICING</a>
                            <div className="h-1 bg-black w-full my-4"></div>
                            <button onClick={onStart} className="neo-btn w-full">START FREE</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="border-b-[3px] border-neo-black bg-neo-yellow/20 relative overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-20 left-10 w-16 h-16 bg-neo-orange border-[3px] border-neo-black rounded-full md:block hidden animate-bounce duration-[2000ms]"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-neo-cyan border-[3px] border-neo-black rotate-12 md:block hidden"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full border-[3px] border-neo-black opacity-50 blur-3xl -z-10"></div>

                <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
                    <div className="neo-badge bg-black text-white mb-6 animate-pulse">2026 BETA ACCESS</div>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                        TAX RETURN<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-orange to-neo-cyan stroke-black decoration-clone" style={{ WebkitTextStroke: "3px black" }}>SIMULATOR</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold max-w-2xl mb-12 bg-white border-[3px] border-neo-black p-4 shadow-[4px_4px_0px_0px_#000]">
                        AI가 당신의 소비 패턴을 분석하여 <span className="bg-neo-cyan px-1">숨겨진 공제금</span>을 찾아냅니다.
                        <br className="hidden md:block" />복잡한 세법은 저희에게 맡기세요.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <button onClick={onStart} className="neo-btn text-xl px-8 py-4 flex items-center justify-center gap-2 group">
                            내 환급액 확인하기 <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                        </button>
                        <button className="bg-white text-black border-[3px] border-neo-black font-head font-bold px-8 py-4 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all text-xl">
                            데모 영상 보기
                        </button>
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="bg-white border-b-[3px] border-neo-black py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
                            Why Use <br />
                            <span className="text-neo-cyan underline decoration-4 underline-offset-8">Tax AI?</span>
                        </h2>
                        <p className="text-lg font-bold text-right max-w-sm ml-auto bg-black text-white p-4 -rotate-1">
                            우리는 단순히 계산만 하지 않습니다.<br />
                            당신의 돈을 찾아드립니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">

                        {/* Feature 1: Main */}
                        <div className="md:col-span-8 bg-neo-cyan border-[3px] border-neo-black p-8 shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between group hover:bg-neo-cyan/90 transition-colors min-h-[300px]">
                            <div className="flex justify-between items-start">
                                <div className="bg-white border-[3px] border-neo-black p-3 rounded-none">
                                    <Search size={32} strokeWidth={3} />
                                </div>
                                <div className="text-6xl font-black text-white/50">01</div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black mb-4">AI 정밀 분석 시스템</h3>
                                <p className="text-xl font-bold bg-white border-[3px] border-neo-black p-4 inline-block shadow-[4px_4px_0px_0px_#000]">
                                    50가지 이상의 공제 항목을 0.1초 만에 스캔합니다.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2: Side */}
                        <div className="md:col-span-4 bg-neo-orange border-[3px] border-neo-black p-8 shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between group hover:-rotate-1 transition-transform min-h-[300px]">
                            <div className="flex justify-between items-start">
                                <div className="bg-white border-[3px] border-neo-black p-3 rounded-none">
                                    <TrendingUp size={32} strokeWidth={3} />
                                </div>
                                <div className="text-6xl font-black text-white/50">02</div>
                            </div>
                            <h3 className="text-2xl font-black bg-black text-white p-2 inline-block">평균 120만원<br />추가 환급</h3>
                        </div>

                        {/* Feature 3: Side */}
                        <div className="md:col-span-4 bg-neo-yellow border-[3px] border-neo-black p-8 shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between group hover:rotate-1 transition-transform min-h-[300px]">
                            <div className="flex justify-between items-start">
                                <div className="bg-white border-[3px] border-neo-black p-3 rounded-none">
                                    <FileText size={32} strokeWidth={3} />
                                </div>
                                <div className="text-6xl font-black text-white/50">03</div>
                            </div>
                            <h3 className="text-2xl font-black">OCR 영수증<br />자동 인식</h3>
                        </div>

                        {/* Feature 4: Wide */}
                        <div className="md:col-span-8 bg-white border-[3px] border-neo-black p-8 shadow-[8px_8px_0px_0px_#000] flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
                            <div className="flex-1">
                                <h3 className="text-3xl font-black mb-4 uppercase">Data Security</h3>
                                <p className="font-bold mb-6">
                                    당신의 금융 데이터는 은행 수준의 보안으로 암호화되어 관리됩니다.
                                    절대 외부로 유출되지 않으니 안심하세요.
                                </p>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1 border-[2px] border-neo-black bg-gray-100 font-bold text-xs uppercase">AES-256</div>
                                    <div className="px-3 py-1 border-[2px] border-neo-black bg-gray-100 font-bold text-xs uppercase">ISO 27001</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 aspect-square bg-neo-orange border-[3px] border-neo-black flex items-center justify-center p-8">
                                <AlertCircle size={64} strokeWidth={3} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Marquee Separator */}
            <div className="bg-neo-cyan border-y-[3px] border-neo-black py-6 overflow-hidden -rotate-1 scale-105 z-10">
                <div className="inline-block animate-marquee whitespace-nowrap">
                    <span className="font-head text-4xl font-black mx-8 text-white stroke-black" style={{ WebkitTextStroke: "2px black" }}>DON'T LEAVE MONEY ON THE TABLE</span>
                    <span className="font-head text-4xl font-black mx-8 text-black">DON'T LEAVE MONEY ON THE TABLE</span>
                    <span className="font-head text-4xl font-black mx-8 text-white stroke-black" style={{ WebkitTextStroke: "2px black" }}>DON'T LEAVE MONEY ON THE TABLE</span>
                    <span className="font-head text-4xl font-black mx-8 text-black">DON'T LEAVE MONEY ON THE TABLE</span>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white py-12">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-head font-black tracking-tighter">TAX<span className="text-neo-yellow">AI</span></div>

                    <div className="flex gap-6 font-head text-sm">
                        <a href="#" className="hover:text-neo-orange transition-colors">TERMS</a>
                        <a href="#" className="hover:text-neo-cyan transition-colors">PRIVACY</a>
                        <a href="#" className="hover:text-neo-yellow transition-colors">CONTACT</a>
                    </div>

                    <div className="text-sm font-bold text-gray-500">
                        © 2026 TAX AI INC. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </footer>
        </div>
    );
};
