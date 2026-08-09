/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import Link from "next/link";
import { R1 } from "../data";

/**
 * 시안 전용 마크 — 길이가 다른 세 개의 막대(= 공제 항목)이고, 가장 짧은
 * 마지막 막대만 레드다. "아직 채워지지 않은 몫" 을 뜻하며 표의 ■ 발견 표식과
 * 같은 신호다. 서류 조판에 맞춰 모서리 라운드를 없앤 사각 괘선 형태.
 * 앱 정본 로고(ㅌ 자모)를 import 하지 않고 시안 안에서 자립한다.
 */
export function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="3" fill="var(--cx-fg)" />
      <rect x="2" y="10.5" width="14" height="3" fill="var(--cx-fg)" />
      <rect x="2" y="16" width="8" height="3" fill="var(--cx-accent)" />
    </svg>
  );
}

export function BrandLockup({
  className = "",
  caption,
}: {
  className?: string;
  caption?: string;
}) {
  return (
    <div className={className}>
      <Link
        href={R1}
        className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70"
      >
        <BrandMark />
        <span className="cx-display text-[16px] font-semibold tracking-[-0.03em] text-[var(--cx-fg)]">
          taxback365
        </span>
      </Link>
      {caption ? (
        <p className="mt-2 text-[12px] text-[var(--cx-muted)]">{caption}</p>
      ) : null}
    </div>
  );
}
