"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/dashboard" });
    };

    const handleGithubLogin = () => {
        signIn("github", { callbackUrl: "/dashboard" });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in px-4">
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
                        className="inline-block bg-neo-orange border-[4px] border-black px-6 py-3 mb-6 shadow-[8px_8px_0px_0px_#000] transform -rotate-2"
                    >
                        <LogIn size={40} strokeWidth={3} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
                        로그인
                    </h1>
                    <p className="text-base md:text-xl font-bold text-gray-600">
                        AI 연말정산과 함께 최대 환급액을 받아보세요! 💰
                    </p>
                </div>

                {/* Main Card */}
                <div className="neo-card bg-white">
                    {/* Social Login */}
                    <div className="space-y-4 mb-8">
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
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
                            Google로 계속하기
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGithubLogin}
                            className="w-full py-4 border-[4px] border-black font-black text-lg flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-900 shadow-[6px_6px_0px_0px_#00D9FF] hover:shadow-[8px_8px_0px_0px_#00D9FF] transition-all"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub로 계속하기
                        </motion.button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-black"></div>
                        <div className="relative z-10 text-center">
                            <span className="bg-white px-6 font-black text-lg">OR</span>
                        </div>
                    </div>

                    {/* Email Login Form */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block font-black text-sm mb-2 uppercase tracking-wide">
                                이메일
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full p-4 border-[4px] border-black font-bold text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_#FFB800] transition-shadow bg-white"
                            />
                        </div>
                        <div>
                            <label className="block font-black text-sm mb-2 uppercase tracking-wide">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full p-4 border-[4px] border-black font-bold text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_#FFB800] transition-shadow bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-6 h-6 border-[3px] border-black bg-white group-hover:bg-neo-cyan transition-colors"></div>
                            <span className="font-bold text-sm">로그인 유지</span>
                        </label>
                        <button className="font-bold text-sm underline decoration-[2px] decoration-neo-orange hover:text-neo-orange">
                            비밀번호 찾기
                        </button>
                    </div>

                    {/* Login Button */}
                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-neo-black text-white font-black text-xl border-[4px] border-black shadow-[8px_8px_0px_0px_#FF5E00] hover:shadow-[10px_10px_0px_0px_#FF5E00] transition-all mb-6 flex items-center justify-center gap-3"
                    >
                        로그인하기
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.div>
                    </motion.button>

                    {/* Signup Link */}
                    <div className="text-center p-4 border-[3px] border-dashed border-gray-300">
                        <p className="font-bold text-gray-600 mb-2">
                            아직 계정이 없으신가요?
                        </p>
                        <Link
                            href="/signup"
                            className="font-black text-lg text-neo-orange hover:underline decoration-[3px] flex items-center justify-center gap-2 mx-auto"
                        >
                            무료로 회원가입하기 →
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
