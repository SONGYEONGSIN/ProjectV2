/* 시안 스코프 토큰 참조: 이 파일의 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 참조한다. raw hex 없음. */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./commission.css";
import { MotionRoot } from "./_components/MotionRoot";
import { CommissionNav } from "./_components/CommissionNav";
import { CommissionFooter } from "./_components/CommissionFooter";

export const metadata: Metadata = {
  title: "재개편 시안 R1",
  description:
    "taxback365 공개 페이지 재개편 시안 — 놓친 공제를 찾아내는 연말정산 진단.",
};

export default function CommissionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="cx-r1 relative flex min-h-screen w-full flex-col">
      {/*
       * 시안 캔버스. app/layout.tsx 는 무수정이므로 뷰포트 전면을 덮는 고정
       * 배경 레이어를 시안 안에서 깐다. 기존 셸은 commission.css 가 숨긴다.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[var(--cx-base)]"
      />

      <MotionRoot>
        <CommissionNav />

        {/*
         * commission.css 가 <main> 의 container/max-w-6xl/px-4/py-8 을 해제했으므로
         * 본문 폭·여백을 여기서 원래대로 되돌린다.
         * max-w-[1152px] + px-4 = 실폭 1120px — 기존 max-w-6xl(1152px) + px-4 와 동일.
         * py-8 도 기존 <main> 값 그대로 복원한다. 셸만 full-bleed 가 된다.
         */}
        <div className="mx-auto w-full max-w-[1152px] flex-1 px-4 py-8">
          {children}
        </div>

        <CommissionFooter />
      </MotionRoot>
    </div>
  );
}
