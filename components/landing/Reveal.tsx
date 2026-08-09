"use client";


import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * 스크롤 진입 리빌. once=true 로 한 번만 재생하고, reduced-motion 은
 * 상위 <MotionConfig reducedMotion="user"> 가 transform 을 무력화한다.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
