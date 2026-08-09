"use client";

/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { AuthField } from "../_components/AuthField";
import {
  FormDivider,
  FormStatus,
  GoogleButton,
  LegalLinks,
} from "../_components/AuthBits";
import type { SubmitState } from "../_components/AuthBits";
import { BrandLockup } from "../_components/Brand";
import { CTA_CLASS, DocHead, SectionMark, StatusMark } from "../_components/Doc";
import { DEFAULT_INPUT, R1, TAX_YEAR, diagnose, won } from "../data";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * 로그인 — 아키타입 "스플릿"(좌 발췌 + 우 폼). 가입 페이지의 "센터드"와 중복 없음.
 * 랜딩과 같은 서류 조판 언어로 옮겼다: 카드 대신 괘선, 좌우는 세로 괘선으로 가른다.
 * 좌측 비주얼은 장식 그래픽이 아니라 명세표 발췌 — 이 서비스가 무엇을 하는지가
 * 곧 비주얼이 된다.
 * 인증 로직은 더미다(정본 §2). next-auth 의 signIn 을 호출하지 않는다.
 */
export default function CommissionLoginPage() {
  const preview = diagnose(DEFAULT_INPUT);
  const found = preview.findings.filter((item) => item.status === "found");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [state, setState] = useState<SubmitState>("idle");
  const [resetHint, setResetHint] = useState(false);

  const busy = state !== "idle";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { email?: string; password?: string } = {};

    if (!email.trim()) {
      next.email = "이메일을 입력해 주세요.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "이메일 형식이 올바르지 않습니다. 예: name@company.com";
    }

    if (!password) {
      next.password = "비밀번호를 입력해 주세요.";
    } else if (password.length < 8) {
      next.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    setErrors(next);
    if (next.email || next.password) return;

    setState("submitting");
    window.setTimeout(() => setState("done"), 700);
  }

  return (
    <div className="min-w-0 pb-12">
      <DocHead
        title={`${TAX_YEAR} 귀속 · 근로소득 연말정산`}
        meta="서식 R1-L · 확인"
      />

      <div className="grid gap-x-10 gap-y-10 pt-7 md:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        {/* ── 좌: 명세 발췌 (lg 이상). 모바일에서는 세로 길이를 줄이려 감춘다. */}
        <div className="hidden min-w-0 lg:block">
          <SectionMark no="01" label="발췌" />

          <p className="cx-h2 cx-display mt-5 font-extrabold text-balance">
            놓친 공제는
            <br />
            조용히 사라집니다.
          </p>
          <p className="mt-4 max-w-[28rem] text-[13px] leading-[1.75] text-[var(--cx-muted)]">
            간소화 자료에 잡히지 않는 항목은 끝까지 본인이 챙겨야 합니다.
            로그인하면 8개 공제 항목을 다시 대조해 드립니다.
          </p>

          <table className="mt-8 w-full table-fixed border-collapse text-left">
            <caption className="sr-only">
              기본 조건(총급여 4,800만원 · 부양가족 1명 · 월세 거주) 기준으로
              아직 신청하지 않은 공제 항목 발췌
            </caption>
            <thead>
              <tr className="border-b border-[var(--cx-rule-section)]">
                <th
                  scope="col"
                  className="cx-eyebrow w-[48%] pb-2 text-[10px] font-semibold uppercase text-[var(--cx-muted)]"
                >
                  항목
                </th>
                <th
                  scope="col"
                  className="cx-eyebrow w-[22%] pb-2 text-[10px] font-semibold uppercase text-[var(--cx-muted)]"
                >
                  상태
                </th>
                <th
                  scope="col"
                  className="cx-eyebrow w-[30%] pb-2 text-right text-[10px] font-semibold uppercase text-[var(--cx-muted)]"
                >
                  추가 환급액
                </th>
              </tr>
            </thead>
            <tbody>
              {found.map((item) => (
                <tr
                  key={item.key}
                  className="border-b border-[var(--cx-rule-row)]"
                >
                  <td className="py-2.5 text-[13px] font-semibold">
                    {item.label}
                  </td>
                  <td className="py-2.5">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <StatusMark kind="solid" />
                      발견
                    </span>
                  </td>
                  <td className="cx-num py-2.5 text-right text-[13px]">
                    {won(item.savings)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[var(--cx-rule-doc)]">
                <th scope="row" className="pt-3 text-[12px] font-semibold">
                  합계
                </th>
                <td className="pt-3 text-[11px] text-[var(--cx-muted)]">
                  발견{" "}
                  <span className="cx-num text-[var(--cx-fg)]">
                    {preview.foundCount}
                  </span>
                  건
                </td>
                <td className="cx-num pt-3 text-right text-[19px]">
                  {won(preview.foundTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ── 우: 폼 */}
        <div className="min-w-0 lg:border-l lg:border-[var(--cx-rule-section)] lg:pl-10">
          <BrandLockup />

          <h1 className="cx-h2 cx-display mt-6 font-extrabold">
            다시 시작하기
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--cx-muted)]">
            지난 진단 결과와 올려둔 자료가 그대로 있습니다.
          </p>

          <form className="mt-7 space-y-5" noValidate onSubmit={handleSubmit}>
            <AuthField
              label="이메일"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={email}
              disabled={busy}
              error={errors.email}
              onChange={(value) => {
                setEmail(value);
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />

            <AuthField
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              placeholder="8자 이상"
              value={password}
              disabled={busy}
              error={errors.password}
              onChange={(value) => {
                setPassword(value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 text-[12px] text-[var(--cx-muted)]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="size-4 accent-[var(--cx-fg)]"
                />
                로그인 유지
              </label>

              <button
                type="button"
                aria-expanded={resetHint}
                onClick={() => setResetHint((prev) => !prev)}
                className="text-[12px] text-[var(--cx-muted)] underline underline-offset-4 transition-colors hover:text-[var(--cx-fg)]"
              >
                비밀번호 찾기
              </button>
            </div>

            {resetHint ? (
              <p className="flex items-start gap-1.5 border-l-2 border-[var(--cx-rule-doc)] pl-3 text-[11px] leading-relaxed text-[var(--cx-muted)]">
                <Info
                  size={12}
                  strokeWidth={2.25}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
                <span>
                  재개편 시안이라 메일은 발송되지 않습니다. 실제 서비스에서는
                  입력한 주소로 재설정 링크를 보냅니다.
                </span>
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              aria-busy={state === "submitting"}
              className={`${CTA_CLASS} w-full disabled:opacity-70`}
            >
              {state === "done" ? "로그인 완료" : "로그인"}
              {state === "idle" ? (
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              ) : null}
            </button>

            <FormStatus
              state={state}
              submittingText="로그인 처리 중입니다."
              doneText="로그인되었습니다. 시안이므로 화면은 이동하지 않습니다."
            />
          </form>

          <div className="mt-6 space-y-4">
            <FormDivider label="또는" />
            <GoogleButton
              label="Google로 계속하기"
              disabled={busy}
              onClick={() => {
                setState("submitting");
                window.setTimeout(() => setState("done"), 700);
              }}
            />
          </div>

          <p className="mt-6 text-[12px] text-[var(--cx-muted)]">
            아직 계정이 없으신가요?{" "}
            <Link
              href={`${R1}/signup`}
              className="font-semibold text-[var(--cx-fg)] underline underline-offset-4"
            >
              무료로 시작하기
            </Link>
          </p>

          <p className="mt-5 border-t border-[var(--cx-rule-row)] pt-4 text-[11px] leading-relaxed text-[var(--cx-muted)]">
            로그인하면 <LegalLinks />에 동의한 것으로 봅니다.
          </p>
        </div>
      </div>
    </div>
  );
}
