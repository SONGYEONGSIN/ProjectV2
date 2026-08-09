/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import type { ReactNode } from "react";

/**
 * 서류 조판 공용 부품 (Document as Layout).
 * 카드가 아니라 "규칙선 + 열 정렬"이 구획을 만든다.
 * 3페이지(랜딩·로그인·가입)가 같은 조판 언어를 쓰도록 여기에 모았다.
 */

/** 문서 머리 — 좌: 문서 종별 / 우: 서식 번호. 아래 2px 문서 경계선. */
export function DocHead({ title, meta }: { title: string; meta: string }) {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-[var(--cx-rule-doc)] pb-3">
      <p className="cx-eyebrow text-[10px] font-semibold uppercase">{title}</p>
      <p className="cx-num text-[10px] tracking-[0.12em] text-[var(--cx-muted)]">
        {meta}
      </p>
    </header>
  );
}

/** 절 표식 — No.0X + 절 이름. 페이지 좌측 번호 열의 기준점. */
export function SectionMark({ no, label }: { no: string; label: string }) {
  return (
    <p className="flex items-baseline gap-3 md:block">
      <span className="cx-num block text-[11px] text-[var(--cx-fg)]">
        No.{no}
      </span>
      <span className="cx-eyebrow mt-0 block text-[10px] font-semibold uppercase text-[var(--cx-muted)] md:mt-1.5">
        {label}
      </span>
    </p>
  );
}

/**
 * 절(節) — 상단 1px 구획선 + 좌측 번호 열 + 본문 열.
 * 번호 열 폭(5.5rem)이 페이지 전체에서 고정이라 절들이 같은 축에 선다.
 */
export function DocSection({
  no,
  label,
  title,
  children,
  headingId,
}: {
  no: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  headingId?: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-[var(--cx-rule-section)] pt-6 pb-14 md:pt-8 md:pb-20"
    >
      <div className="grid gap-x-6 gap-y-4 md:grid-cols-[5.5rem_minmax(0,1fr)]">
        <SectionMark no={no} label={label} />
        <div className="min-w-0">
          <h2
            id={headingId}
            className="cx-h2 cx-display font-extrabold text-balance"
          >
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * 기입란 — 라벨 / 값(우측 mono) / 1px 괘선 / 컨트롤.
 * 신고서의 기입 칸을 그대로 옮긴 형태. 진단 조작부와 인증 폼이 공유한다.
 */
export function FieldFrame({
  label,
  value,
  htmlFor,
  children,
  footer,
}: {
  label: string;
  value?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3 border-b border-[var(--cx-rule-section)] pb-1.5">
        {htmlFor ? (
          <label
            htmlFor={htmlFor}
            className="text-[12px] font-semibold text-[var(--cx-fg)]"
          >
            {label}
          </label>
        ) : (
          <span className="text-[12px] font-semibold text-[var(--cx-fg)]">
            {label}
          </span>
        )}
        {value ? <span className="cx-num shrink-0 text-[14px]">{value}</span> : null}
      </div>
      <div className="pt-3">{children}</div>
      {footer ? (
        <div className="pt-1 text-[10px] text-[var(--cx-muted)]">{footer}</div>
      ) : null}
    </div>
  );
}

/** 라벨/값 2열 괘선 행 — 스탯·요약처럼 표까지는 아닌 수치 나열용. */
export function DataRow({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--cx-rule-row)] py-3">
      <span className="min-w-0 text-[13px] text-[var(--cx-muted)]">
        {label}
        {note ? (
          <span className="ml-2 text-[11px] text-[var(--cx-muted)]">{note}</span>
        ) : null}
      </span>
      <span className="cx-num shrink-0 text-[15px] text-[var(--cx-fg)]">
        {value}
      </span>
    </div>
  );
}

/**
 * 상태 표식 — 색만으로 의미를 전달하지 않는다.
 * 채운 사각(레드) = 발견 / 빈 사각 = 반영 / 짧은 선 = 해당없음. 항상 텍스트 병행.
 */
export function StatusMark({ kind }: { kind: "solid" | "outline" | "none" }) {
  if (kind === "solid") {
    return (
      <span
        aria-hidden="true"
        className="inline-block size-2.5 shrink-0 bg-[var(--cx-accent)]"
      />
    );
  }
  if (kind === "outline") {
    return (
      <span
        aria-hidden="true"
        className="inline-block size-2.5 shrink-0 border border-[var(--cx-fg)]"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="inline-block h-px w-2.5 shrink-0 bg-[var(--cx-muted)]"
    />
  );
}

/** 신청 버튼 — 레드 면. 시안 전체에서 CTA 는 이 형태 하나뿐이다. */
export const CTA_CLASS =
  "inline-flex h-12 items-center justify-center gap-2 bg-[var(--cx-accent)] px-7 text-[15px] font-semibold text-[var(--cx-on-accent)] transition-opacity duration-150 hover:opacity-90";

/** 보조 버튼 — 면 없이 1px 괘선. */
export const GHOST_CLASS =
  "inline-flex h-12 items-center justify-center gap-2 border border-[var(--cx-edge)] px-6 text-[15px] font-semibold text-[var(--cx-fg)] transition-colors duration-150 hover:bg-[var(--cx-fg-06)]";
