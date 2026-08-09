"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            /* 툴팁은 문서의 일부가 아니라 임시 보조 설명이므로 면을 반전한다.
             * 흰 지면에서 surface-2(1.27:1)는 배경과 거의 구분되지 않아, 떠
             * 있는 요소라는 신호가 사라진다. 검정 면 + 흰 글씨 = 19.80:1. */
            className="absolute z-[9999] bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-hi text-base p-3 text-caption leading-relaxed pointer-events-none"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-hi"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
