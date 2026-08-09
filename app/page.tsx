
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { Diagnostic } from "@/components/landing/Diagnostic";
import {
  CTA_CLASS,
  DataRow,
  DocHead,
  DocSection,
  SectionMark,
} from "@/components/common/Doc";
import {
  DEFAULT_INPUT,
  METHOD_STEPS,
    REVIEWS,
  STATS,
  TAX_YEAR,
  diagnose,
  won,
} from "@/lib/landing/diagnosis";

/**
 * 랜딩 — 페이지 전체를 한 장의 신고서로 조판한다(Document as Layout).
 * 정본 구조 기본형 5요소(Hero / 핵심 증명 / 방법 / 소셜프루프 / CTA)는
 * 순서로 유지하되, 각각을 문서의 절(節) No.01~05 로 조판했다.
 * 카드·면이 아니라 규칙선 3단과 좌측 번호 열의 고정 축이 구획을 만든다.
 */
export default function CommissionLandingPage() {
  const preview = diagnose(DEFAULT_INPUT);

  return (
    <div className="min-w-0">
      <DocHead
        title={`${TAX_YEAR} 귀속 · 근로소득 연말정산`}
        meta="서식 · 전 5절"
      />

      {/* ── 절 01 · 표제 ─────────────────────────────────────────── */}
      <section aria-labelledby="landing-title" className="pt-7 pb-14 md:pt-10 md:pb-20">
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-[5.5rem_minmax(0,1fr)]">
          <SectionMark no="01" label="표제" />

          <div className="min-w-0">
            <h1
              id="landing-title"
              className="text-display font-display font-extrabold text-balance"
            >
              연말정산에서
              <br />
              빠뜨린 것부터 봅니다.
            </h1>

            <div className="mt-8 grid gap-x-10 gap-y-8 border-t border-hi pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
              <p className="max-w-[34rem] text-[15px] leading-[1.75] text-mid">
                연말정산은 아는 만큼 돌려받습니다. taxback365는 8개 공제 항목을
                당신의 조건과 한 줄씩 대조해, 빠뜨린 항목을 금액과 함께 먼저
                적어 드립니다.
              </p>

              {/* 우측 요약 — 표의 금액 열과 같은 오른쪽 축에 정렬한다. */}
              <div className="min-w-0 md:text-right">
                <p className="tracking-[0.2em] text-[10px] font-semibold uppercase text-mid">
                  아직 신청하지 않은 금액
                </p>
                <p className="font-mono tabular-nums text-heading-lg mt-2">{won(preview.foundTotal)}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-mid">
                  총급여 {won(DEFAULT_INPUT.salaryManwon)}만원 · 부양가족{" "}
                  {DEFAULT_INPUT.dependents}명 · 월세 거주 · 8개 항목 중{" "}
                  <span className="font-mono tabular-nums text-hi">
                    {preview.foundCount}
                  </span>
                  건 발견
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 border-t border-hi pt-6 sm:flex-row sm:items-center sm:gap-6">
              <Link href="/signup" className={CTA_CLASS}>
                내가 놓친 공제 찾기
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
              <p className="text-[12px] text-mid">
                무료 진단 · 평균 4분 · 카드·의료비 자료 자동 정리
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 절 02 · 진단 (핵심 증명) ─────────────────────────────── */}
      <Reveal>
        <DocSection
          no="02"
          label="진단"
          headingId="landing-sec-02"
          title="조건을 고치면 금액과 순서가 바로 바뀝니다."
        >
          <p className="mt-3 max-w-[42rem] text-[13px] leading-relaxed text-mid">
            가입 전에도 결과를 볼 수 있습니다. 아래 네 칸을 채우면 8개 항목이
            다시 계산되고, 놓친 항목이 위로 올라옵니다.
          </p>
          <div className="mt-8">
            <Diagnostic />
          </div>
        </DocSection>
      </Reveal>

      {/* ── 절 03 · 방법 ─────────────────────────────────────────── */}
      <Reveal>
        <DocSection
          no="03"
          label="방법"
          headingId="landing-sec-03"
          title="서류를 뒤지지 않고, 대조해서 찾습니다."
        >
          <ol className="mt-6 border-t border-edge">
            {METHOD_STEPS.map((step) => (
              <li
                key={step.no}
                className="grid gap-x-6 gap-y-1.5 border-b border-edge py-5 md:grid-cols-[3rem_minmax(0,1fr)]"
              >
                <span className="font-mono tabular-nums text-[11px] text-mid">
                  {step.no}
                </span>
                <div className="min-w-0">
                  <h3 className="text-h3 font-semibold">{step.title}</h3>
                  <p className="mt-1.5 max-w-[46rem] text-[13px] leading-[1.75] text-mid">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </DocSection>
      </Reveal>

      {/* ── 절 04 · 기록 (소셜프루프) ────────────────────────────── */}
      <Reveal>
        <DocSection
          no="04"
          label="기록"
          headingId="landing-sec-04"
          title="이미 지나간 줄 알았던 돈을 되찾은 기록."
        >
          <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="min-w-0 border-t-2 border-hi pt-5"
              >
                <blockquote className="text-[15px] leading-[1.75]">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-4 border-t border-edge pt-3 text-[11px] text-mid">
                  <span className="font-semibold text-hi">
                    {review.name}
                  </span>
                  <span className="ml-2">{review.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 max-w-[34rem] border-t border-hi pt-1">
            {STATS.map((stat) => (
              <DataRow key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </DocSection>
      </Reveal>

      {/* ── 절 05 · 신청 ─────────────────────────────────────────── */}
      <Reveal>
        <DocSection
          no="05"
          label="신청"
          headingId="landing-sec-05"
          title="올해 놓칠 뻔한 공제, 지금 확인하세요."
        >
          <p className="mt-3 max-w-[38rem] text-[14px] leading-[1.75] text-mid">
            한 번 정리해 두면 다음 해부터는 바뀐 항목만 확인하면 됩니다.
            {TAX_YEAR}년 귀속분은 지금 신청할 수 있습니다.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 border-t border-hi pt-6 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/signup" className={CTA_CLASS}>
              무료로 진단 시작
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <p className="text-[12px] text-mid">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-semibold text-hi underline underline-offset-4"
              >
                로그인
              </Link>
            </p>
          </div>
        </DocSection>
      </Reveal>

      {/* 문서 종료 */}
      <p className="font-mono tabular-nums border-t-2 border-hi pt-3 text-[10px] tracking-[0.12em] text-mid">
        이상 · 서식       </p>
    </div>
  );
}
