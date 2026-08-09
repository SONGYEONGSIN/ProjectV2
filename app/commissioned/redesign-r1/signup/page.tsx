"use client";

/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import { useId, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { AuthField } from "../_components/AuthField";
import {
  FormDivider,
  FormStatus,
  GoogleButton,
  LegalLinks,
} from "../_components/AuthBits";
import type { SubmitState } from "../_components/AuthBits";
import { BrandLockup } from "../_components/Brand";
import { CTA_CLASS, DocHead, SectionMark } from "../_components/Doc";
import { R1, TAX_YEAR } from "../data";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HAS_LETTER = /[A-Za-z]/;
const HAS_DIGIT = /[0-9]/;

interface SignupErrors {
  email?: string;
  password?: string;
  confirm?: string;
  agree?: string;
}

/**
 * 가입 — 아키타입 "센터드"(좁은 단일 문서 단). 로그인의 "스플릿"과 중복 없음.
 * 랜딩과 같은 서류 조판 언어. 카드 테두리/면 없이 문서 폭과 괘선으로만 구성한다.
 * 인증 로직은 더미다(정본 §2).
 */
export default function CommissionSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [state, setState] = useState<SubmitState>("idle");

  const agreeErrorId = useId();
  const busy = state !== "idle";

  const confirmMismatch = confirm.length > 0 && confirm !== password;
  const confirmError = errors.confirm
    ? errors.confirm
    : confirmMismatch
      ? "비밀번호가 일치하지 않습니다."
      : undefined;
  const confirmHint =
    !confirmError && confirm.length > 0 ? "비밀번호가 일치합니다." : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: SignupErrors = {};

    if (!email.trim()) {
      next.email = "이메일을 입력해 주세요.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "이메일 형식이 올바르지 않습니다. 예: name@company.com";
    }

    if (password.length < 8) {
      next.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (!HAS_LETTER.test(password) || !HAS_DIGIT.test(password)) {
      next.password = "영문과 숫자를 각각 하나 이상 포함해 주세요.";
    }

    if (confirm !== password) {
      next.confirm = "비밀번호가 일치하지 않습니다.";
    }

    if (!agree) {
      next.agree = "약관과 개인정보처리방침에 동의해야 가입할 수 있습니다.";
    }

    setErrors(next);
    if (next.email || next.password || next.confirm || next.agree) return;

    setState("submitting");
    window.setTimeout(() => setState("done"), 700);
  }

  return (
    <div className="min-w-0 pb-12">
      <DocHead
        title={`${TAX_YEAR} 귀속 · 근로소득 연말정산`}
        meta="서식 R1-S · 신규"
      />

      <div className="mx-auto w-full max-w-[460px] pt-7 md:pt-10">
        <SectionMark no="01" label="신규 등록" />

        <div className="mt-5">
          <BrandLockup />
        </div>

        <h1 className="cx-h2 cx-display mt-6 font-extrabold text-balance">
          3분이면, 놓친 공제가 보입니다.
        </h1>
        <p className="mt-3 border-b border-[var(--cx-rule-section)] pb-6 text-[13px] leading-[1.75] text-[var(--cx-muted)]">
          이메일만 있으면 시작할 수 있습니다. 카드·의료비 자료 연동은 가입 뒤에
          해도 됩니다.
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
            autoComplete="new-password"
            placeholder="영문·숫자 포함 8자 이상"
            hint="영문과 숫자를 섞어 8자 이상으로 만들어 주세요."
            value={password}
            disabled={busy}
            error={errors.password}
            onChange={(value) => {
              setPassword(value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />

          <AuthField
            label="비밀번호 확인"
            type="password"
            autoComplete="new-password"
            placeholder="한 번 더 입력해 주세요"
            value={confirm}
            disabled={busy}
            error={confirmError}
            hint={confirmHint}
            onChange={(value) => {
              setConfirm(value);
              if (errors.confirm)
                setErrors((prev) => ({ ...prev, confirm: undefined }));
            }}
          />

          <div className="border-t border-[var(--cx-rule-row)] pt-5">
            <label className="flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-[var(--cx-muted)]">
              <input
                type="checkbox"
                checked={agree}
                disabled={busy}
                aria-invalid={errors.agree ? true : undefined}
                aria-describedby={errors.agree ? agreeErrorId : undefined}
                onChange={(event) => {
                  setAgree(event.target.checked);
                  if (errors.agree)
                    setErrors((prev) => ({ ...prev, agree: undefined }));
                }}
                className="mt-0.5 size-4 shrink-0 accent-[var(--cx-fg)]"
              />
              <span>
                이용약관 및 개인정보 수집·이용에 동의합니다.{" "}
                <span className="font-semibold text-[var(--cx-fg)]">(필수)</span>
              </span>
            </label>

            <p className="mt-2 pl-[26px] text-[11px] text-[var(--cx-muted)]">
              전문 보기: <LegalLinks />
            </p>

            {errors.agree ? (
              <p
                id={agreeErrorId}
                className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-[var(--cx-alert)]"
              >
                <AlertCircle
                  size={12}
                  strokeWidth={2.25}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                />
                <span>{errors.agree}</span>
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={busy}
            aria-busy={state === "submitting"}
            className={`${CTA_CLASS} w-full disabled:opacity-70`}
          >
            {state === "done" ? "가입 완료" : "무료로 시작하기"}
            {state === "idle" ? (
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            ) : null}
          </button>

          <FormStatus
            state={state}
            submittingText="계정을 만드는 중입니다."
            doneText="가입되었습니다. 시안이므로 화면은 이동하지 않습니다."
          />
        </form>

        <div className="mt-6 space-y-4">
          <FormDivider label="또는" />
          <GoogleButton
            label="Google로 가입하기"
            disabled={busy}
            onClick={() => {
              setState("submitting");
              window.setTimeout(() => setState("done"), 700);
            }}
          />
        </div>

        <p className="mt-6 text-[12px] text-[var(--cx-muted)]">
          이미 계정이 있으신가요?{" "}
          <Link
            href={`${R1}/login`}
            className="font-semibold text-[var(--cx-fg)] underline underline-offset-4"
          >
            로그인
          </Link>
        </p>

        <p className="cx-num mt-5 border-t-2 border-[var(--cx-rule-doc)] pt-3 text-[10px] tracking-[0.12em] text-[var(--cx-muted)]">
          {TAX_YEAR} 귀속 · 가입 즉시 8개 항목 진단
        </p>
      </div>
    </div>
  );
}
