import * as React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  errorText?: React.ReactNode;
  /** 금액 입력 모드 — Mono + tabular + 우측 정렬 + 단위 suffix */
  amount?: boolean;
  suffix?: React.ReactNode;
}

/**
 * 기입란. 서류 조판이므로 라운드 없는 각진 경계이고, 면은 지면(base)과 같다 —
 * 회색 면 위 입력은 문서가 아니라 앱 UI 로 읽힌다.
 *
 * 포커스 링은 전역 :focus-visible outline 이 담당하므로 ring-<색>/30 을 두지
 * 않는다. 30% 알파 링은 흰 배경에서 3:1 미달이다.
 */
const baseField =
  "w-full h-10 px-3 bg-base text-hi text-body placeholder:text-dim transition-colors duration-150";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      helpText,
      errorText,
      amount = false,
      suffix,
      id,
      className,
      disabled,
      ...props
    },
    ref,
  ) {
    const reactId = React.useId();
    const fieldId = id ?? reactId;
    const helpId = helpText ? `${fieldId}-help` : undefined;
    const errorId = errorText ? `${fieldId}-err` : undefined;
    const describedBy = errorId ?? helpId;

    // 경계는 edge-strong(3.03:1) — WCAG 1.4.11 이 요구하는 컨트롤 경계 대비.
    // 장식용 괘선(edge, 1.48:1)을 여기 쓰면 조작 가능한 요소가 안 보인다.
    const fieldBorder = errorText
      ? "border border-rose"
      : "border border-edge-strong hover:border-hi";

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={fieldId} className="text-body-sm font-medium text-hi">
            {label}
          </label>
        ) : null}

        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            aria-describedby={describedBy}
            aria-invalid={errorText ? true : undefined}
            disabled={disabled}
            className={clsx(
              baseField,
              fieldBorder,
              amount && "font-mono text-right tabular-nums pr-9",
              disabled && "bg-surface-2 text-dim cursor-not-allowed",
              className,
            )}
            {...props}
          />
          {amount || suffix ? (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-body-sm text-dim">
              {suffix ?? "원"}
            </span>
          ) : null}
        </div>

        {errorText ? (
          <p id={errorId} className="text-caption text-rose">
            {errorText}
          </p>
        ) : helpText ? (
          <p id={helpId} className="text-caption text-dim">
            {helpText}
          </p>
        ) : null}
      </div>
    );
  },
);
