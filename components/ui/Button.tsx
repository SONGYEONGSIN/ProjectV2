import * as React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

/**
 * 서류 조판의 버튼은 각진 면이다. pill(rounded-full)은 둥근 카드와 함께
 * 문서 언어와 충돌한다.
 *
 * 포커스 링을 여기서 만들지 않는다 — globals.css 의 `:focus-visible` 전역
 * outline(accent 2px)이 이미 담당한다. ring-<색>/40 을 겹치면 중복일 뿐 아니라,
 * 40% 알파 적색 링은 흰 배경에서 3:1 에 못 미쳐 오히려 접근성이 후퇴한다.
 */
const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none";

const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-caption",
  md: "h-10 px-4 text-body",
};

const variantClass: Record<Variant, string> = {
  // 주 행동 — accent 면. 페이지당 하나가 원칙이다.
  primary: "bg-accent text-ink hover:opacity-90",
  // 보조 — 면 없이 컨트롤 경계(3.03:1)만
  secondary: "bg-base text-hi border border-edge-strong hover:bg-surface",
  ghost: "bg-transparent text-mid hover:text-hi hover:bg-surface",
  // 파괴적 액션 — rose 는 accent 와 명도로 구분된다(9.13:1 vs 4.80:1)
  danger: "bg-rose text-ink hover:opacity-90",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          base,
          sizeClass[size],
          variantClass[variant],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="opacity-70">{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

/**
 * Link 스타일이 필요할 때 — Button 대신 사용. 동일 variant/size 시각.
 * 기존 button을 anchor로 바꿀 수 없는 상황(Next.js Link 래핑 등)에서 적용.
 */
type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    { variant = "primary", size = "md", className, ...props },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={clsx(
          base,
          sizeClass[size],
          variantClass[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
