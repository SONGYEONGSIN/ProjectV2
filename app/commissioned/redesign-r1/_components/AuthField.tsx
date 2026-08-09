"use client";

/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import { useId, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

/**
 * 신고서 기입란 형태의 입력 필드.
 * 카드/박스가 아니라 라벨 + 밑줄 괘선으로 구성한다(Doc.tsx 의 FieldFrame 과
 * 같은 조판 언어). 폼 접근성 계약은 그대로 유지:
 * label 연결 · autocomplete · aria-invalid · aria-describedby · aria-pressed.
 */
export interface AuthFieldProps {
  label: string;
  type: "email" | "password";
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}

export function AuthField({
  label,
  type,
  autoComplete,
  value,
  onChange,
  placeholder,
  hint,
  error,
  disabled,
}: AuthFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold text-[var(--cx-fg)]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isPassword && revealed ? "text" : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`mt-1 w-full border-0 border-b bg-transparent px-0 py-2.5 text-[15px] text-[var(--cx-fg)] transition-colors placeholder:text-[var(--cx-muted)] disabled:opacity-60 ${
            isPassword ? "pr-10" : ""
          } ${
            error
              ? "border-b-[var(--cx-alert)]"
              : "border-b-[var(--cx-edge)] hover:border-b-[var(--cx-fg)]"
          }`}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((prev) => !prev)}
            aria-pressed={revealed}
            aria-label={revealed ? "비밀번호 숨기기" : "비밀번호 표시"}
            className="absolute right-0 bottom-1.5 p-1.5 text-[var(--cx-muted)] transition-colors hover:text-[var(--cx-fg)]"
          >
            {revealed ? (
              <EyeOff size={16} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>

      {hint && !error ? (
        <p id={hintId} className="mt-1.5 text-[11px] text-[var(--cx-muted)]">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-[var(--cx-alert)]"
        >
          <AlertCircle
            size={12}
            strokeWidth={2.25}
            aria-hidden="true"
            className="mt-0.5 shrink-0"
          />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
