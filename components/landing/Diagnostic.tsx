"use client";


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
} from "@/lib/landing/diagnosis";
import type {
  DeductionKey,
  DiagnosisInput,
  Finding,
  FindingStatus,
} from "@/lib/landing/diagnosis";
import { FieldFrame, StatusMark } from "@/components/common/Doc";

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
            className="range-doc"
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
            className="range-doc"
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
          <legend className="block w-full border-b border-hi pb-1.5 text-[12px] font-semibold text-hi">
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
          <legend className="block w-full border-b border-hi pb-1.5 text-[12px] font-semibold text-hi">
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

      <p className="mt-6 text-[11px] text-mid">
        적용 한계세율{" "}
        <span className="font-mono tabular-nums text-hi">
          {result.marginalRatePct}%
        </span>{" "}
        · 과세표준{" "}
        <span className="font-mono tabular-nums text-hi">
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
          <tr className="border-b border-hi">
            <th
              scope="col"
              className="w-[40%] pb-2 text-[10px] font-semibold uppercase md:w-[52%] tracking-[0.2em] text-mid"
            >
              항목
            </th>
            <th
              scope="col"
              className="w-[20%] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-mid"
            >
              상태
            </th>
            <th
              scope="col"
              aria-sort={ariaSort}
              className="w-[40%] pb-2 text-right text-[10px] font-semibold uppercase md:w-[28%] tracking-[0.2em] text-mid"
            >
              <button
                type="button"
                onClick={cycleSort}
                className="inline-flex items-center gap-1.5 text-mid transition-colors hover:text-hi"
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
          <tr className="border-t-2 border-hi">
            <th
              scope="row"
              className="pt-4 align-baseline text-[13px] font-semibold"
            >
              합계
            </th>
            <td className="pt-4 align-baseline text-[11px] text-mid">
              발견 <span className="font-mono tabular-nums text-hi">{result.foundCount}</span>
              건
            </td>
            <td className="font-mono tabular-nums text-heading-lg pt-4 text-right align-baseline">
              {won(result.foundTotal)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* 면책. "중앙값 지출" 같은 표현은 실제 통계가 있는 것처럼 읽히는데
       * 이 진단기의 지출 계수는 통계가 아니라 가정값이다. 미검증 스탯(35만원)을
       * 면책 근거로 인용하지도 않는다. */}
      <p className="mt-4 text-[11px] leading-relaxed text-mid">
        <span className="font-semibold text-hi">
          예시 가정값으로 계산한 참고용 금액입니다.
        </span>{" "}
        실제 지출 자료가 아니라 조건별 가정치를 적용했으므로 실제 환급액과는
        다릅니다. 정확한 금액은 가입 후 본인의 증빙 자료로 계산됩니다.
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
      <span className="block cursor-pointer border border-edge-strong px-4 py-1.5 text-center text-[13px] text-mid transition-colors hover:text-hi peer-checked:border-hi peer-checked:bg-hi peer-checked:font-semibold peer-checked:text-base peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
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
  const panelId = `dx-detail-${finding.key}`;
  const meta = STATUS_META[finding.status];

  return (
    <Fragment>
      <tr className="border-b border-edge">
        <td className="py-3 align-top">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full min-w-0 items-baseline gap-2.5 text-left"
          >
            <span className="font-mono tabular-nums shrink-0 text-[11px] text-mid">
              {pad(index)}
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold">
                {finding.label}
                <ChevronDown
                  size={12}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className={`ml-1.5 inline-block align-middle text-mid transition-transform duration-150 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </span>
              <span className="mt-0.5 hidden text-[11px] text-mid md:block">
                {finding.kind} · {finding.basis}
              </span>
            </span>
          </button>
        </td>

        <td className="py-3 align-top">
          <span className="flex items-center gap-1.5 text-[11px] text-hi">
            <StatusMark kind={meta.mark} />
            {meta.label}
          </span>
        </td>

        <td className="font-mono tabular-nums py-3 text-right align-top text-[14px]">
          {finding.savings > 0 ? won(finding.savings) : "—"}
        </td>
      </tr>

      <tr id={panelId} hidden={!open} className="border-b border-edge">
        <td colSpan={3} className="pb-4 text-[12px] leading-relaxed text-mid">
          <span className="block max-w-[52rem] md:pl-[1.9rem]">
            {finding.detail}
          </span>
        </td>
      </tr>
    </Fragment>
  );
}
