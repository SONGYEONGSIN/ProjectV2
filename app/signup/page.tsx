"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (formData.password.length < 8) {
            setError("비밀번호는 8자 이상이어야 합니다.");
            return;
        }
        router.push("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in px-4 py-12">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block bg-neo-cyan border-[4px] border-black px-6 py-3 mb-6 shadow-[8px_8px_0px_0px_#000] transform rotate-2"
                    >
                        <Users size={40} strokeWidth={3} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
                        회원가입
                    </h1>
                    <p className="text-base md:text-xl font-bold text-gray-600">
                        무료로 시작하고 최대 환급액을 받아보세요! 🚀
                    </p>
                </div>

                {/* Main Card */}
                <div className="neo-card bg-white">
                    {/* Social Signup */}
                    <div className="space-y-4 mb-8">
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            className="w-full py-4 border-[4px] border-black font-black text-lg flex items-center justify-center gap-3 bg-white hover:bg-gray-50 shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] transition-all"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84.81-.81z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google로 3초 만에 가입
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                            className="w-full py-4 border-[4px] border-black font-black text-lg flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-900 shadow-[6px_6px_0px_0px_#FFB800] hover:shadow-[8px_8px_0px_0px_#FFB800] transition-all"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub로 가입하기
                        </motion.button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-black"></div>
                        <div className="relative z-10 text-center">
                            <span className="bg-white px-6 font-black text-lg">OR</span>
                        </div>
                    </div>

                    {/* Email Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div>
                            <label className="block font-black text-sm mb-2 uppercase tracking-wide">
                                이름
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="홍길동"
                                className="w-full p-4 border-[4px] border-black font-bold text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_#00D9FF] transition-shadow bg-white"
                            />
                        </div>
                        <div>
                            <label className="block font-black text-sm mb-2 uppercase tracking-wide">
                                이메일
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="w-full p-4 border-[4px] border-black font-bold text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_#00D9FF] transition-shadow bg-white"
                            />
                        </div>
                        <div>
                            <label className="block font-black text-sm mb-2 uppercase tracking-wide">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="최소 8자 이상"
                                className="w-full p-4 border-[4px] border-black font-bold text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_#00D9FF] transition-shadow bg-white"
                            />
                        </div>
                        <div>
                            <label className="block font-black text-sm mb-2 uppercase tracking-wide">
                                비밀번호 확인
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="비밀번호를 한번 더 입력해주세요"
                                className={`w-full p-4 border-[4px] border-black font-bold text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_#00D9FF] transition-shadow bg-white ${error ? "border-red-500" : ""}`}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-100 border-2 border-red-500 p-3 flex items-center gap-2 text-red-600 font-bold">
                                <AlertTriangle size={20} />
                                {error}
                            </div>
                        )}

                        {/* Terms Agreement */}
                        <label className="flex items-start gap-3 p-4 border-[3px] border-black mb-6 cursor-pointer group hover:bg-gray-50 transition-colors">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-6 h-6 mt-0.5 border-[3px] border-black flex-shrink-0 flex items-center justify-center transition-colors ${agreeTerms ? 'bg-neo-cyan' : 'bg-white group-hover:bg-neo-yellow'}`}>
                                {agreeTerms && (
                                    <CheckCircle2
                                        size={18}
                                        strokeWidth={3}
                                    />
                                )}
                            </div>
                            <span className="text-sm font-bold leading-relaxed">
                                <Link href="/terms" className="text-neo-orange underline decoration-[2px]">
                                    이용약관
                                </Link>{" "}
                                및{" "}
                                <Link href="/privacy" className="text-neo-orange underline decoration-[2px]">
                                    개인정보처리방침
                                </Link>
                                에 동의합니다
                            </span>
                        </label>

                        {/* Signup Button */}
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-5 bg-neo-cyan text-black font-black text-xl border-[4px] border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[10px_10px_0px_0px_#000] transition-all mb-6 flex items-center justify-center gap-3"
                        >
                            무료로 시작하기
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.div>
                        </motion.button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center p-4 border-[3px] border-dashed border-gray-300">
                        <p className="font-bold text-gray-600 mb-2">
                            이미 계정이 있으신가요?
                        </p>
                        <Link
                            href="/login"
                            className="font-black text-lg text-neo-cyan hover:underline decoration-[3px] flex items-center justify-center gap-2 mx-auto"
                        >
                            로그인하러 가기 →
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
