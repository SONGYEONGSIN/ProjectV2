"use client";

/* 시안 스코프 토큰 참조: 색상은 commission.css 의 .cx-r1 CSS 변수(--cx-*)만 사용한다. raw hex 없음. */

import { Fragment, useId, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from "lucide-react";
import {
  CARD_RANGE,
  DEFAULT_INPUT,
  DEPENDENT_OPTIONS,
  HOUSING_OPTIONS,
  SALARY_RANGE,
  diagnose,
  won,
} from "../data";
import type {
  DeductionKey,
  DiagnosisInput,
  Finding,
  FindingStatus,
} from "../data";
import { FieldFrame, StatusMark } from "./Doc";

const STATUS_META: Record<
  FindingStatus,
  { label: string; mark: "solid" | "outline" | "none" }
> = {
  found: { label: "발견", mark: "solid" },
  covered: { label: "반영", mark: "outline" },
  none: { label: "해당없음", mark: "none" },
};

type SortMode = "status" | "amount-desc" | "amount-asc";

const SORT_LABEL: Record<SortMode, string> = {
  status: "상태순",
  "amount-desc": "금액 많은 순",
  "amount-asc": "금액 적은 순",
};

function pad(index: number): string {
  return index < 9 ? `0${index + 1}` : String(index + 1);
}

export function Diagnostic() {
  const [input, setInput] = useState<DiagnosisInput>(DEFAULT_INPUT);
  const [openKey, setOpenKey] = useState<DeductionKey | null>("monthlyRent");
  const [sortMode, setSortMode] = useState<SortMode>("status");

  const salaryId = useId();
  const cardId = useId();
  const dependentsName = useId();
  const housingName = useId();

  const result = useMemo(() => diagnose(input), [input]);

  const rows = useMemo(() => {
    const list = [...result.findings];
    if (sortMode === "amount-desc") {
      list.sort((a, b) => b.savings - a.savings || (a.key < b.key ? -1 : 1));
    } else if (sortMode === "amount-asc") {
      list.sort((a, b) => a.savings - b.savings || (a.key < b.key ? -1 : 1));
    }
    return list;
  }, [result, sortMode]);

  const ariaSort =
    sortMode === "amount-desc"
      ? "descending"
      : sortMode === "amount-asc"
        ? "ascending"
        : "none";

  function cycleSort() {
    setSortMode((prev) =>
      prev === "status"
        ? "amount-desc"
        : prev === "amount-desc"
          ? "amount-asc"
          : "status",
    );
  }

  return (
    /* relative — 안쪽 sr-only(position:absolute) 의 containing block 을 고정한다
     * (정본 §2 sr-only 앵커 규칙). */
    <div className="relative min-w-0">
      {/* ── 기입란 ─────────────────────────────────────────────── */}
      <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        <FieldFrame
          label="연간 총급여"
          htmlFor={salaryId}
          value={`${won(input.salaryManwon)}만원`}
          footer={
            <span className="flex justify-between">
              <span>2,400만원</span>
              <span>1억 2,000만원</span>
            </span>
          }
        >
          <input
            id={salaryId}
            className="cx-range"
            type="range"
            min={SALARY_RANGE.min}
            max={SALARY_RANGE.max}
            step={SALARY_RANGE.step}
            value={input.salaryManwon}
            onChange={(event) =>
              setInput((prev) => ({
                ...prev,
                salaryManwon: Number(event.target.value),
              }))
            }
          />
        </FieldFrame>

        <FieldFrame
          label="연간 카드 사용액"
          htmlFor={cardId}
          value={`${won(input.cardManwon)}만원`}
          footer={
            <span className="flex justify-between">
              <span>0원</span>
              <span>4,000만원</span>
            </span>
          }
        >
          <input
            id={cardId}
            className="cx-range"
            type="range"
            min={CARD_RANGE.min}
            max={CARD_RANGE.max}
            step={CARD_RANGE.step}
            value={input.cardManwon}
            onChange={(event) =>
              setInput((prev) => ({
                ...prev,
                cardManwon: Number(event.target.value),
              }))
            }
          />
        </FieldFrame>

        <fieldset className="min-w-0">
          {/* legend 는 fieldset 의 직계 첫 자식이어야 캡션으로 인식된다. */}
          <legend className="block w-full border-b border-[var(--cx-rule-section)] pb-1.5 text-[12px] font-semibold text-[var(--cx-fg)]">
            부양가족 (본인 제외)
          </legend>
          <div className="flex flex-wrap gap-2 pt-3">
            {DEPENDENT_OPTIONS.map((option) => (
              <Ballot
                key={option.key}
                name={dependentsName}
                label={option.label}
                checked={input.dependents === option.key}
                onSelect={() =>
                  setInput((prev) => ({ ...prev, dependents: option.key }))
                }
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="block w-full border-b border-[var(--cx-rule-section)] pb-1.5 text-[12px] font-semibold text-[var(--cx-fg)]">
            주거 형태
          </legend>
          <div className="flex flex-wrap gap-2 pt-3">
            {HOUSING_OPTIONS.map((option) => (
              <Ballot
                key={option.key}
                name={housingName}
                label={option.label}
                checked={input.housing === option.key}
                onSelect={() =>
                  setInput((prev) => ({ ...prev, housing: option.key }))
                }
              />
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-6 text-[11px] text-[var(--cx-muted)]">
        적용 한계세율{" "}
        <span className="cx-num text-[var(--cx-fg)]">
          {result.marginalRatePct}%
        </span>{" "}
        · 과세표준{" "}
        <span className="cx-num text-[var(--cx-fg)]">
          {won(result.taxBase)}원
        </span>{" "}
        · 정렬 {SORT_LABEL[sortMode]}
      </p>

      <p className="sr-only" role="status">
        추정 추가 환급액 {won(result.foundTotal)}원, 놓친 공제{" "}
        {result.foundCount}건, 정렬 {SORT_LABEL[sortMode]}
      </p>

      {/* ── 명세표 ─────────────────────────────────────────────── */}
      <table className="mt-10 w-full table-fixed border-collapse text-left">
        <caption className="sr-only">
          입력한 조건에 따른 8개 공제 항목별 추가 환급 예상액과 반영 상태. 금액
          열 제목을 눌러 정렬을 바꿀 수 있습니다.
        </caption>
        <thead>
          <tr className="border-b border-[var(--cx-rule-section)]">
            <th
              scope="col"
              className="w-[40%] pb-2 text-[10px] font-semibold uppercase md:w-[52%] cx-eyebrow text-[var(--cx-muted)]"
            >
              항목
            </th>
            <th
              scope="col"
              className="w-[20%] pb-2 text-[10px] font-semibold uppercase cx-eyebrow text-[var(--cx-muted)]"
            >
              상태
            </th>
            <th
              scope="col"
              aria-sort={ariaSort}
              className="w-[40%] pb-2 text-right text-[10px] font-semibold uppercase md:w-[28%] cx-eyebrow text-[var(--cx-muted)]"
            >
              <button
                type="button"
                onClick={cycleSort}
                className="inline-flex items-center gap-1.5 text-[var(--cx-muted)] transition-colors hover:text-[var(--cx-fg)]"
              >
                추가 환급액
                {sortMode === "amount-desc" ? (
                  <ArrowDown size={11} strokeWidth={2.5} aria-hidden="true" />
                ) : sortMode === "amount-asc" ? (
                  <ArrowUp size={11} strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  <ArrowUpDown size={11} strokeWidth={2.5} aria-hidden="true" />
                )}
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((finding, index) => (
            <Row
              key={finding.key}
              finding={finding}
              index={index}
              open={openKey === finding.key}
              onToggle={() =>
                setOpenKey((prev) =>
                  prev === finding.key ? null : finding.key,
                )
              }
            />
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t-2 border-[var(--cx-rule-doc)]">
            <th
              scope="row"
              className="pt-4 align-baseline text-[13px] font-semibold"
            >
              합계
            </th>
            <td className="pt-4 align-baseline text-[11px] text-[var(--cx-muted)]">
              발견 <span className="cx-num text-[var(--cx-fg)]">{result.foundCount}</span>
              건
            </td>
            <td className="cx-fig-lg pt-4 text-right align-baseline">
              {won(result.foundTotal)}
            </td>
          </tr>
        </tfoot>
      </table>

      <p className="mt-4 text-[11px] leading-relaxed text-[var(--cx-muted)]">
        동일 조건 사용자의 중앙값 지출을 적용한 상한 추정치입니다. 실제 환급액은
        증빙 자료에 따라 달라지며, taxback365 사용자의 평균 추가 환급액은
        35만원입니다.
      </p>
    </div>
  );
}

/** 기표란 — 선택 시 검정 면. 레드는 상태 표식·CTA 전용이라 여기 쓰지 않는다. */
function Ballot({
  name,
  label,
  checked,
  onSelect,
}: {
  name: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label className="relative block min-w-0">
      <input
        type="radio"
        name={name}
        className="peer sr-only"
        checked={checked}
        onChange={onSelect}
      />
      <span className="block cursor-pointer border border-[var(--cx-edge)] px-4 py-1.5 text-center text-[13px] text-[var(--cx-muted)] transition-colors hover:text-[var(--cx-fg)] peer-checked:border-[var(--cx-fg)] peer-checked:bg-[var(--cx-fg)] peer-checked:font-semibold peer-checked:text-[var(--cx-base)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[color:var(--cx-accent)]">
        {label}
      </span>
    </label>
  );
}

function Row({
  finding,
  index,
  open,
  onToggle,
}: {
  finding: Finding;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `cx-r1-detail-${finding.key}`;
  const meta = STATUS_META[finding.status];

  return (
    <Fragment>
      <tr className="border-b border-[var(--cx-rule-row)]">
        <td className="py-3 align-top">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full min-w-0 items-baseline gap-2.5 text-left"
          >
            <span className="cx-num shrink-0 text-[11px] text-[var(--cx-muted)]">
              {pad(index)}
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold">
                {finding.label}
                <ChevronDown
                  size={12}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className={`ml-1.5 inline-block align-middle text-[var(--cx-muted)] transition-transform duration-150 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </span>
              <span className="mt-0.5 hidden text-[11px] text-[var(--cx-muted)] md:block">
                {finding.kind} · {finding.basis}
              </span>
            </span>
          </button>
        </td>

        <td className="py-3 align-top">
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--cx-fg)]">
            <StatusMark kind={meta.mark} />
            {meta.label}
          </span>
        </td>

        <td className="cx-num py-3 text-right align-top text-[14px]">
          {finding.savings > 0 ? won(finding.savings) : "—"}
        </td>
      </tr>

      <tr id={panelId} hidden={!open} className="border-b border-[var(--cx-rule-row)]">
        <td colSpan={3} className="pb-4 text-[12px] leading-relaxed text-[var(--cx-muted)]">
          <span className="block max-w-[52rem] md:pl-[1.9rem]">
            {finding.detail}
          </span>
        </td>
      </tr>
    </Fragment>
  );
}
