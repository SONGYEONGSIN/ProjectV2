/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import Link from "next/link";
import { BrandLockup } from "./Brand";
import { LEGAL, R1 } from "../data";

/**
 * 시안 전용 하단 셸 = 문서의 판권면(colophon).
 * 기존 components/layout/Footer.tsx 의 정보 구조·문구·외부 URL 을 그대로 옮기고
 * 조판만 서류 언어로 바꿨다.
 *
 * 헤딩 판단: 기존 Footer 는 열 제목에 <h4> 를 썼는데, 이 시안의 /login·/signup
 * 은 h1 만 있고 h2·h3 가 없어 h4 를 두면 레벨 스킵이 된다. 그래서 셸에는 헤딩을
 * 만들지 않고, 열 제목을 <p> 로 두고 <ul aria-labelledby> 로 접근성 이름을
 * 연결했다. 페이지의 단일 h1 원칙과 헤딩 계층이 모두 보존된다.
 *
 * 면 판단: 머리말은 백지 + 괘선이지만, 판권면은 본문이 끝났음을 알리는
 * 관습대로 --cx-surface(본문 대비 1.17:1) 로 아주 얕은 면을 준다.
 */

const SERVICE_LINKS = [
  { label: "기능 소개", href: R1 },
  { label: "요금 안내", href: R1 },
  { label: "자주 묻는 질문", href: R1 },
];

const LEGAL_LINKS = [
  { label: "이용약관", href: LEGAL.terms },
  { label: "개인정보처리방침", href: LEGAL.privacy },
];

const EXTERNAL_LINKS = [
  {
    label: "국세청",
    href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6435&cntntsId=7871",
  },
  { label: "한국납세자연맹", href: "https://www.koreatax.org/tax/index.php3" },
];

const COLUMN_TITLE_CLASS =
  "cx-eyebrow text-[10px] font-semibold uppercase text-[var(--cx-muted)]";
const FOOTER_LINK_CLASS =
  "text-[13px] text-[var(--cx-muted)] underline-offset-4 transition-colors hover:text-[var(--cx-fg)] hover:underline";

export function CommissionFooter() {
  return (
    <footer className="cx-shell mt-auto border-t-2 border-[var(--cx-shell-rule)] bg-[var(--cx-surface)]">
      <div className="mx-auto w-full max-w-[1152px] px-4 py-12 md:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
          <div className="col-span-2 min-w-0 md:col-span-1">
            <BrandLockup />
            <p className="mt-3 text-[12px] leading-relaxed text-[var(--cx-muted)]">
              한국 직장인을 위한
              <br />
              연말정산 환급 SaaS.
            </p>
          </div>

          <div className="min-w-0">
            <p
              id="cx-r1-foot-service"
              className={`${COLUMN_TITLE_CLASS} border-b border-[var(--cx-rule-row)] pb-2`}
            >
              서비스
            </p>
            <ul
              aria-labelledby="cx-r1-foot-service"
              className="mt-3 space-y-2"
            >
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={FOOTER_LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p
              id="cx-r1-foot-legal"
              className={`${COLUMN_TITLE_CLASS} border-b border-[var(--cx-rule-row)] pb-2`}
            >
              법적 고지
            </p>
            <ul aria-labelledby="cx-r1-foot-legal" className="mt-3 space-y-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={FOOTER_LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p
              id="cx-r1-foot-contact"
              className={`${COLUMN_TITLE_CLASS} border-b border-[var(--cx-rule-row)] pb-2`}
            >
              문의
            </p>
            <ul aria-labelledby="cx-r1-foot-contact" className="mt-3 space-y-2">
              <li className="cx-num text-[12px] break-all text-[var(--cx-muted)]">
                ysong2526@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--cx-rule-section)] pt-4 md:flex-row md:items-baseline">
          <p className="cx-num text-[10px] tracking-[0.12em] text-[var(--cx-muted)]">
            © 2026 taxback365. All rights reserved.
          </p>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px] text-[var(--cx-muted)]">
            <span className="cx-eyebrow text-[10px] font-semibold uppercase">
              참고
            </span>
            {EXTERNAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK_CLASS}
              >
                {item.label}
              </a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
