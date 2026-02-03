"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, LayoutDashboard, ClipboardList, Home } from "lucide-react";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";

export function Navigation() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isLanding = pathname === "/";
    const isAuthPage = pathname === "/login" || pathname === "/signup";
    const showMobileNav = !isLanding && !isAuthPage;

    return (
        <>
            <nav className="border-b-[3px] border-black bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <div className="w-8 h-8 bg-black flex items-center justify-center text-white">
                            <Calculator size={20} strokeWidth={3} />
                        </div>
                        <span className="font-head text-xl font-black tracking-tighter">
                            TAX<span className="text-neo-orange">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    {!isLanding && !isAuthPage && (
                        <div className="hidden md:flex gap-2">
                            <Link
                                href="/dashboard"
                                className={clsx(
                                    "neo-nav-item",
                                    pathname === "/dashboard" && "active"
                                )}
                            >
                                DASHBOARD
                            </Link>
                            <Link
                                href="/calculator"
                                className={clsx(
                                    "neo-nav-item",
                                    pathname === "/calculator" && "active"
                                )}
                            >
                                CALCULATOR
                            </Link>
                            <Link
                                href="/admin"
                                className={clsx(
                                    "neo-nav-item",
                                    pathname === "/admin" && "active"
                                )}
                            >
                                ADMIN
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        {session ? (
                            // 로그인 상태: 모든 페이지에서 사용자 정보 표시
                            <>
                                <div className="hidden md:block font-bold text-sm">
                                    {session.user?.name || "사용자"}님
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200 overflow-hidden">
                                    <img
                                        src={session.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                        alt="User"
                                    />
                                </div>
                                {isLanding ? (
                                    // 메인 페이지에서는 대시보드 가기 버튼도 표시
                                    <Link
                                        href="/dashboard"
                                        className="px-4 py-2 font-black border-2 border-black bg-neo-yellow hover:bg-yellow-400 text-sm shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                                    >
                                        대시보드
                                    </Link>
                                ) : null}
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="hidden md:block px-3 py-1.5 font-bold text-sm border-2 border-black bg-white hover:bg-red-100 shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : isLanding || isAuthPage ? (
                            // 비로그인 상태 + 메인/인증 페이지: 로그인/회원가입 버튼
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 font-black border-2 border-black bg-neo-yellow hover:bg-yellow-400 text-sm shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                                >
                                    로그인
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 font-black border-2 border-black bg-white hover:bg-gray-100 text-sm shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                                >
                                    회원가입
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            {showMobileNav && (
                <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[3px] border-black">
                    <div className="flex justify-around items-center h-16">
                        <Link
                            href="/dashboard"
                            className={clsx(
                                "flex flex-col items-center justify-center flex-1 h-full transition-all",
                                pathname === "/dashboard"
                                    ? "bg-neo-yellow text-black"
                                    : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <LayoutDashboard size={22} strokeWidth={pathname === "/dashboard" ? 2.5 : 2} />
                            <span className="text-xs font-bold mt-1">대시보드</span>
                        </Link>
                        <Link
                            href="/calculator"
                            className={clsx(
                                "flex flex-col items-center justify-center flex-1 h-full transition-all",
                                pathname === "/calculator"
                                    ? "bg-neo-cyan text-black"
                                    : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <Calculator size={22} strokeWidth={pathname === "/calculator" ? 2.5 : 2} />
                            <span className="text-xs font-bold mt-1">계산기</span>
                        </Link>
                        <Link
                            href="/admin"
                            className={clsx(
                                "flex flex-col items-center justify-center flex-1 h-full transition-all",
                                pathname === "/admin"
                                    ? "bg-neo-orange text-black"
                                    : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <ClipboardList size={22} strokeWidth={pathname === "/admin" ? 2.5 : 2} />
                            <span className="text-xs font-bold mt-1">기초자료</span>
                        </Link>
                    </div>
                </nav>
            )}
        </>
    );
}
