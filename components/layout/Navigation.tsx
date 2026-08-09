"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  LayoutDashboard,
  ClipboardList,
  Clock,
  MessageSquareText,
} from "lucide-react";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import { BrandLockup } from "@/components/layout/Brand";

const SESSION_TIMEOUT = 30 * 60; // 30분 (초)

const APP_NAV = [
  { href: "/dashboard", label: "대시보드", Icon: LayoutDashboard, matcher: (p: string) => p === "/dashboard" },
  { href: "/calculator", label: "계산기", Icon: Calculator, matcher: (p: string) => p === "/calculator" },
  { href: "/admin", label: "기초자료", Icon: ClipboardList, matcher: (p: string) => p.startsWith("/admin") },
  { href: "/board", label: "게시판", Icon: MessageSquareText, matcher: (p: string) => p.startsWith("/board") },
];

/**
 * 문서의 머리말.
 *
 * 조판은 서류 언어로 바꾸되 동작은 전부 보존한다 — 30분 세션 타임아웃과 자동
 * 로그아웃, 인증 전/후 분기, 앱 내비 4종, 모바일 하단 탭바. 재개편 시안은
 * 공개 3면만 상정한 서버 컴포넌트였으므로 여기 로직이 시안에는 존재하지 않는다.
 * "이식"으로 착각해 시안 셸을 그대로 가져오면 앱 내비가 통째로 사라진다.
 *
 * 면이 아니라 선이 구획한다: 머리말은 본문과 같은 백지 위에서 2px 문서
 * 경계선(border-hi)으로 갈린다. sticky 라 본문이 밑으로 지나가므로 반투명·blur
 * 를 쓰지 않는다 — 면색이 스크롤에 따라 흔들리면 "구분된 영역"이 무너진다.
 */
export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLanding = pathname === "/";
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const showMobileNav = !isLanding && !isAuthPage;

  const [remainingTime, setRemainingTime] = useState(SESSION_TIMEOUT);
  const resetTimer = useCallback(() => setRemainingTime(SESSION_TIMEOUT), []);

  useEffect(() => {
    if (!session) return;

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          signOut({ callbackUrl: "/" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [session, resetTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isTimeWarning = remainingTime <= 5 * 60;

  return (
    <>
      <nav
        aria-label="주요 메뉴"
        className="sticky top-0 z-40 bg-base border-b-2 border-hi"
      >
        <div className="container mx-auto h-14 md:h-16 px-4 md:px-6 max-w-[1200px] flex items-center justify-between gap-4">
          <BrandLockup />

          {/* 데스크톱 앱 내비 — 인증 전 공개 페이지에는 두지 않는다 */}
          {!isLanding && !isAuthPage && (
            <div className="hidden md:flex items-center self-stretch">
              {APP_NAV.map(({ href, label, matcher }) => {
                const active = matcher(pathname);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative flex items-center px-4 text-body font-semibold transition-colors",
                      // active 표식은 accent 가 아니라 2px 검정 괘선이다.
                      // 서류 조판에서 위치를 가리키는 것은 색이 아니라 선이고,
                      // accent 는 CTA·상태 표식에 아껴 둔다.
                      active
                        ? "text-hi after:absolute after:inset-x-2 after:-bottom-[2px] after:h-[3px] after:bg-hi"
                        : "text-mid hover:text-hi",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-3 shrink-0">
            {session ? (
              <>
                <div className="hidden md:flex items-baseline gap-3">
                  <span className="text-body-sm font-semibold text-hi">
                    {session.user?.name || "사용자"}님
                  </span>
                  <span
                    className={clsx(
                      "inline-flex items-center gap-1 font-mono tabular-nums text-caption",
                      isTimeWarning ? "text-accent-ink" : "text-mid",
                    )}
                  >
                    <Clock size={11} strokeWidth={2} aria-hidden="true" />
                    <span>{formatTime(remainingTime)}</span>
                    <span className="sr-only">
                      {isTimeWarning ? "세션 곧 만료" : "세션 남은 시간"}
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex h-9 items-center border border-edge-strong px-3.5 text-body-sm font-semibold text-hi transition-colors hover:bg-surface"
                >
                  로그아웃
                </button>
              </>
            ) : isLanding || isAuthPage ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/login"
                  className="text-body-sm font-semibold text-mid underline-offset-4 transition-colors hover:text-hi hover:underline"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center bg-accent px-4 text-body-sm font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  회원가입
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      {/* 모바일 하단 탭바 — 인증 후 화면에서만. app/layout.tsx 의 pb-24 가 자리를 비워 둔다 */}
      {showMobileNav && (
        <nav
          aria-label="하단 메뉴"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-base border-t-2 border-hi"
        >
          <div className="flex justify-around items-stretch h-16">
            {APP_NAV.map(({ href, label, Icon, matcher }) => {
              const active = matcher(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "flex flex-col items-center justify-center flex-1 gap-1 border-t-[3px] transition-colors",
                    active
                      ? "border-hi text-hi"
                      : "border-transparent text-mid hover:text-hi",
                  )}
                >
                  <Icon size={20} strokeWidth={active ? 2.25 : 1.75} aria-hidden="true" />
                  <span
                    className={clsx(
                      "text-[11px]",
                      active ? "font-semibold" : "font-normal",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
