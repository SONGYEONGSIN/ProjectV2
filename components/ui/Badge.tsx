import * as React from "react";
import clsx from "clsx";

type Variant =
  "success" | "warning" | "danger" | "info" | "neutral" | "outline";

/** 기존 코드 호환을 위한 legacy variant. 새 코드는 variant prop을 사용한다. */
type LegacyType = "high" | "medium" | "low" | "new";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  /** @deprecated 새 코드는 variant + children을 사용. legacy 호환 전용. */
  type?: LegacyType;
}

/**
 * 서류 조판의 표식. 두 가지를 고쳤다.
 *
 * 1. 알파 칩(bg-<색>/12)을 버렸다. 다크 배경에서는 12% 틴트가 면으로 읽혔지만
 *    흰 지면에서는 거의 보이지 않는다. 경계선과 텍스트 색으로 대체한다.
 * 2. 색만으로 의미를 전달하지 않는다(page-brief-core §2). variant 마다 앞에
 *    도형 표식을 붙여, 색을 구분하지 못해도 채운 사각 / 빈 사각 / 가로줄로
 *    구분된다.
 */
const variantClass: Record<Variant, string> = {
  success: "border border-accent text-accent-ink",
  warning: "border border-amber text-amber",
  danger: "border border-rose text-rose",
  info: "border border-sky text-sky",
  neutral: "border border-edge-strong text-mid",
  outline: "border border-edge-strong text-hi",
};

/** 색맹·흑백 인쇄에서도 구분되도록 하는 도형 표식. */
const variantMark: Record<Variant, string | null> = {
  success: "bg-accent", // 채운 사각
  warning: "bg-amber",
  danger: "bg-rose",
  info: "border border-sky", // 빈 사각
  neutral: "h-px w-2.5 bg-mid", // 가로줄
  outline: null, // 표식 없음
};

const legacyMap: Record<LegacyType, { variant: Variant; label: string }> = {
  high: { variant: "danger", label: "HIGH IMPACT" },
  medium: { variant: "warning", label: "MEDIUM" },
  low: { variant: "neutral", label: "INFO" },
  new: { variant: "info", label: "NEW 2026" },
};

export function Badge({
  variant,
  type,
  className,
  children,
  ...props
}: BadgeProps) {
  let resolvedVariant: Variant = variant ?? "neutral";
  let resolvedChildren: React.ReactNode = children;

  if (type && !variant && !children) {
    const mapped = legacyMap[type];
    resolvedVariant = mapped.variant;
    resolvedChildren = mapped.label;
  }

  const mark = variantMark[resolvedVariant];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-caption font-semibold",
        variantClass[resolvedVariant],
        className,
      )}
      {...props}
    >
      {mark ? (
        <span
          aria-hidden="true"
          className={clsx(
            "inline-block shrink-0",
            // 가로줄 표식은 자체 크기를 갖고, 사각 표식은 2.5 정사각
            mark.includes("h-px") ? mark : clsx("size-2.5", mark),
          )}
        />
      ) : null}
      {resolvedChildren}
    </span>
  );
}
