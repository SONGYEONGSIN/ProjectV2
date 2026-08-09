import Link from "next/link";

/**
 * 브랜드 마크 단일 출처.
 *
 * 이전에는 같은 로고가 4곳에 통째로 복붙돼 있었다 —
 * Navigation.tsx · Footer.tsx · app/login/page.tsx · app/signup/page.tsx.
 * 하나를 고치면 나머지 셋이 조용히 어긋나는 구조였다.
 *
 * 형상: 길이가 다른 세 개의 막대(= 공제 항목)이고 가장 짧은 마지막 막대만
 * accent 다. "아직 채워지지 않은 몫" 을 뜻하며, 명세표의 발견 표식과 같은
 * 신호다. 서류 조판에 맞춰 모서리 라운드가 없는 사각 괘선 형태.
 *
 * public/logo.svg · logo-icon.svg 는 파비콘·OG 용이라 이 컴포넌트로 대체할 수
 * 없다. 형상이 어긋나지 않도록 파일 교체 시 육안 대조가 필요하다
 * (.claude/plans/checklists/redesign-manual.md §G).
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
      <rect x="2" y="5" width="20" height="3" className="fill-hi" />
      <rect x="2" y="10.5" width="14" height="3" className="fill-hi" />
      <rect x="2" y="16" width="8" height="3" className="fill-accent" />
    </svg>
  );
}

export function BrandLockup({
  className = "",
  caption,
  size = 22,
}: {
  className?: string;
  caption?: string;
  size?: number;
}) {
  return (
    <div className={className}>
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70"
        aria-label="taxback365 홈"
      >
        <BrandMark size={size} />
        <span className="font-display text-[16px] font-semibold tracking-[-0.03em] text-hi">
          taxback365
        </span>
      </Link>
      {caption ? <p className="mt-2 text-caption text-mid">{caption}</p> : null}
    </div>
  );
}
