import * as React from "react";
import clsx from "clsx";

// Dub 3-variant. 1차의 resting/raised는 호환 매핑으로 그대로 동작.
type Variant = "outlined" | "raised" | "subtle" | "resting";
type Padding = "sm" | "md" | "lg" | "none";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  padding?: Padding;
  interactive?: boolean;
}

const paddingClass: Record<Padding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * 서류 조판(Document as Layout)에서는 카드가 기본 단위가 아니다. 구획은 면이
 * 아니라 "선"이 만든다. 그래서 variant 를 각진 규칙선 컨테이너로 재정의한다 —
 * 라운드 제거, 면 사용 최소화, 경계는 괘선.
 *
 * 컴포넌트 이름과 호출처 12곳은 그대로 둔다. 이번 마이그레이션의 목표는 시각
 * 교체이지 API 정리가 아니며, 호출처를 함께 고치면 조판 회귀와 리팩토링 오류가
 * 뒤섞여 원인 분리가 불가능해진다. Doc.tsx 가 신규 조판을 담당하고, Card 제거는
 * 후속 PR 로 분리한다.
 */
const variantClass: Record<Variant, string> = {
  // 기본: 면 없이 괘선만. 문서의 한 구획.
  outlined: "border border-edge",
  resting: "border border-edge",
  // 강조 구획: 얕은 면 + 상단 문서 경계선
  raised: "bg-surface border-t-2 border-hi",
  // 밴드: 면만 (CTA 대역 등)
  subtle: "bg-surface",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "outlined",
    padding = "md",
    interactive = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        variantClass[variant],
        paddingClass[padding],
        interactive &&
          "transition-all duration-200 hover:border-edge-strong cursor-pointer",
        className,
      )}
      {...props}
    />
  );
});

interface CardHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({
  title,
  description,
  action,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={clsx("flex items-start justify-between gap-4 mb-4", className)}
      {...props}
    >
      <div className="min-w-0">
        <h3 className="text-h3 text-hi">{title}</h3>
        {description ? (
          <p className="text-body-sm text-mid mt-1">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  );
}
