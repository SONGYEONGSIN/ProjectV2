/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import Link from "next/link";
import { BrandLockup } from "./Brand";
import { R1 } from "../data";

/**
 * 시안 전용 상단 셸 = 문서의 머리말.
 * - 서버 컴포넌트: 인증이 더미라 useSession 이 필요 없고, 3페이지뿐이라
 *   usePathname 활성 표시도 필요 없다.
 * - .cx-shell 클래스가 commission.css 의 셸 숨김 규칙에서 자신을 제외시킨다.
 * - 앱 내비(대시보드·계산기·기초자료·게시판)는 넣지 않는다 — 인증 전 공개
 *   페이지에 앱 내비가 있으면 거짓말이다.
 * - 서류 조판이므로 색면으로 구분하지 않는다. 본문과 같은 백지 위에서
 *   2px 문서 경계선(--cx-shell-rule)이 머리말을 가른다.
 */
export function CommissionNav() {
  return (
    /* --cx-nav 는 불투명이다. sticky 라 본문이 밑으로 지나가는데 반투명이면
     * 괘선 위로 글자가 비쳐 서류의 결이 무너진다. backdrop-blur 도 쓰지 않는다. */
    <nav
      aria-label="주요 메뉴"
      className="cx-shell sticky top-0 z-40 border-b-2 border-[var(--cx-shell-rule)] bg-[var(--cx-nav)]"
    >
      <div className="mx-auto flex h-14 w-full max-w-[1152px] items-center justify-between gap-4 px-4 md:h-16">
        <BrandLockup />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={`${R1}/login`}
            className="text-[13px] font-semibold text-[var(--cx-muted)] underline-offset-4 transition-colors hover:text-[var(--cx-fg)] hover:underline"
          >
            로그인
          </Link>
          <Link
            href={`${R1}/signup`}
            className="inline-flex h-9 items-center bg-[var(--cx-accent)] px-4 text-[13px] font-semibold text-[var(--cx-on-accent)] transition-opacity duration-150 hover:opacity-90"
          >
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
