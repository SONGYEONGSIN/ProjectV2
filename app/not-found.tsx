import Link from "next/link";
import { DocHead } from "@/components/common/Doc";

/**
 * 404 — 서류 조판. "요청하신 문서를 찾을 수 없음" 이라는 반려 통지처럼 다룬다.
 * 막다른 길이 되지 않도록 이어갈 경로 두 개를 둔다.
 */
export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[680px] py-8 md:py-12">
      <DocHead title="오류 통지" meta="HTTP 404" />

      <div className="mt-10 grid gap-x-8 gap-y-4 md:grid-cols-[5.5rem_1fr]">
        <p className="font-mono tabular-nums text-[11px] text-hi">No.404</p>

        <div className="min-w-0">
          <h1 className="font-display text-heading-lg font-extrabold tracking-[-0.03em] text-hi">
            요청하신 페이지가 없습니다.
          </h1>
          <p className="mt-4 text-body leading-[1.75] text-mid">
            주소가 바뀌었거나 삭제된 문서일 수 있습니다. 아래에서 이어서
            진행하세요.
          </p>

          <div className="mt-8 flex flex-col gap-3 border-t border-hi pt-6 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center bg-accent px-6 text-body font-semibold text-ink transition-opacity hover:opacity-90"
            >
              홈으로
            </Link>
            <Link
              href="/calculator"
              className="inline-flex h-11 items-center justify-center border border-edge-strong px-6 text-body font-semibold text-hi transition-colors hover:bg-surface"
            >
              환급 계산기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
