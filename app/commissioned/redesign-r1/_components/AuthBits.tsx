"use client";

/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { LEGAL } from "../data";

export type SubmitState = "idle" | "submitting" | "done";

/**
 * Google "G" 마크 — 공식 4색을 유지한다(타사 브랜드 가이드).
 * 색값은 commission.css 의 --cx-brand-google-* 4종에만 있고 시안 팔레트·조판
 * 변경의 영향을 받지 않는다. 이 토큰들을 지우면 fill 이 검정으로 폴백해
 * 로고가 사라지므로 CSS 재작성 시 반드시 보존할 것.
 */
function GoogleMark() {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="var(--cx-brand-google-blue)"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="var(--cx-brand-google-green)"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84.81-.81z"
        fill="var(--cx-brand-google-yellow)"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="var(--cx-brand-google-red)"
      />
    </svg>
  );
}

/** 보조 경로. 시안이므로 실제 인증을 부르지 않고 상태만 시연한다. */
export function GoogleButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2.5 border border-[var(--cx-edge)] bg-transparent text-[14px] font-semibold text-[var(--cx-fg)] transition-colors duration-150 hover:bg-[var(--cx-fg-06)] disabled:opacity-60"
    >
      <GoogleMark />
      {label}
    </button>
  );
}

/** 구분 괘선 + 가운데 라벨. */
export function FormDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--cx-rule-row)]" />
      <span className="cx-eyebrow text-[10px] font-semibold uppercase text-[var(--cx-muted)]">
        {label}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--cx-rule-row)]" />
    </div>
  );
}

/** 제출 상태를 시각 + 스크린리더 양쪽에 알린다. */
export function FormStatus({
  state,
  submittingText,
  doneText,
}: {
  state: SubmitState;
  submittingText: string;
  doneText: string;
}) {
  return (
    <p
      role="status"
      aria-live="polite"
      className="flex min-h-[16px] items-center gap-2 text-[12px] text-[var(--cx-muted)]"
    >
      {state === "submitting" ? (
        <>
          <Loader2
            size={13}
            strokeWidth={2}
            aria-hidden="true"
            className="animate-spin"
          />
          {submittingText}
        </>
      ) : null}
      {state === "done" ? (
        <>
          <CheckCircle2
            size={13}
            strokeWidth={2}
            aria-hidden="true"
            className="text-[var(--cx-fg)]"
          />
          {doneText}
        </>
      ) : null}
    </p>
  );
}

export function LegalLinks({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <Link
        href={LEGAL.terms}
        className="underline underline-offset-2 transition-colors hover:text-[var(--cx-fg)]"
      >
        이용약관
      </Link>
      {" · "}
      <Link
        href={LEGAL.privacy}
        className="underline underline-offset-2 transition-colors hover:text-[var(--cx-fg)]"
      >
        개인정보처리방침
      </Link>
    </span>
  );
}
