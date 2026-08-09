"use client";

/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * 시안 전체 모션 기본값.
 * reducedMotion="user" — prefers-reduced-motion 사용자에게 transform/layout 애니메이션을
 * 자동으로 끈다(진입 opacity 는 1로 수렴하므로 잔존하지 않는다).
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
