import Link from "next/link";
import { BrandLockup } from "@/components/layout/Brand";

/**
 * 문서의 판권면(colophon).
 *
 * 머리말은 백지 + 괘선이지만, 판권면은 본문이 끝났음을 알리는 서류 관습대로
 * surface(본문 대비 1.17:1)로 아주 얕은 면을 준다.
 *
 * 헤딩 판단: 이전에는 열 제목에 <h4> 를 썼는데, /login·/signup 은 h1 만 있고
 * h2·h3 가 없어 h4 를 두면 레벨 스킵이 된다. 셸은 13 라우트 공용이므로 최악
 * 조건을 기준으로 잡아야 한다. 그래서 셸에는 헤딩을 만들지 않고, 열 제목을
 * <p> 로 두고 <ul aria-labelledby> 로 접근성 이름을 연결한다. 스크린리더는
 * "서비스, 목록, 항목 3개"로 읽고, 페이지의 단일 h1 원칙이 보존된다.
 */

const SERVICE_LINKS = [
  { label: "환급 계산기", href: "/calculator" },
  { label: "대시보드", href: "/dashboard" },
  { label: "게시판", href: "/board" },
];

const LEGAL_LINKS = [
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
];

const EXTERNAL_LINKS = [
  {
    label: "국세청",
    href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6435&cntntsId=7871",
  },
  { label: "한국납세자연맹", href: "https://www.koreatax.org/tax/index.php3" },
];

const COLUMN_TITLE_CLASS =
  "text-caption font-semibold uppercase tracking-[0.2em] text-mid border-b border-edge pb-2";
const LINK_CLASS =
  "text-body-sm text-mid underline-offset-4 transition-colors hover:text-hi hover:underline";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-hi bg-surface">
      <div className="container mx-auto w-full max-w-[1200px] px-4 md:px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
          <div className="col-span-2 min-w-0 md:col-span-1">
            <BrandLockup />
            <p className="mt-3 text-caption leading-relaxed text-mid">
              한국 직장인을 위한
              <br />
              연말정산 환급 SaaS.
            </p>
          </div>

          <div className="min-w-0">
            <p id="foot-service" className={COLUMN_TITLE_CLASS}>
              서비스
            </p>
            <ul aria-labelledby="foot-service" className="mt-3 space-y-2">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p id="foot-legal" className={COLUMN_TITLE_CLASS}>
              법적 고지
            </p>
            <ul aria-labelledby="foot-legal" className="mt-3 space-y-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p id="foot-contact" className={COLUMN_TITLE_CLASS}>
              문의
            </p>
            <ul aria-labelledby="foot-contact" className="mt-3 space-y-2">
              <li className="font-mono text-caption break-all text-mid">
                ysong2526@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-hi pt-4 md:flex-row md:items-baseline">
          <p className="font-mono tabular-nums text-caption tracking-[0.12em] text-mid">
            © 2026 taxback365. All rights reserved.
          </p>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-body-sm text-mid">
            <span className="text-caption font-semibold uppercase tracking-[0.2em]">
              참고
            </span>
            {EXTERNAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
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
