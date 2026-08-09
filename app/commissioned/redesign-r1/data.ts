/**
 * app/commissioned/redesign-r1/data.ts
 *
 * 시안 전용 결정론 계산 모델 + 카피 데이터.
 * - 난수(Math.random) · 현재시각(Date.now / new Date) 사용 없음. 연도는 상수.
 * - 색/토큰 참조 없음(순수 로직).
 * - 세법 수치는 2026년 기준을 단순화한 "시연용" 모델이다. 실제 신고 결과와 다를 수 있다.
 */

export const TAX_YEAR = 2026;

/** 시안 라우트 루트 — 시안은 자립해야 하므로 앱 정본 경로로 나가지 않는다. */
export const R1 = "/commissioned/redesign-r1";

/** 실재하는 앱 라우트 (법적 고지) */
export const LEGAL = {
  terms: "/terms",
  privacy: "/privacy",
} as const;

const MAN = 10_000;

/* ────────────────────────────────────────────────────────────────────
 * 입력
 * ──────────────────────────────────────────────────────────────────── */

export type DependentsKey = 0 | 1 | 2 | 3;
export type HousingKey = "rent" | "jeonse" | "own";

export interface DiagnosisInput {
  /** 연간 총급여 (만원) */
  salaryManwon: number;
  /** 본인 제외 기본공제 대상 부양가족 수 */
  dependents: DependentsKey;
  /** 연간 신용·체크카드 사용액 (만원) */
  cardManwon: number;
  /** 주거 형태 */
  housing: HousingKey;
}

export const DEFAULT_INPUT: DiagnosisInput = {
  salaryManwon: 4800,
  dependents: 1,
  cardManwon: 1800,
  housing: "rent",
};

export const SALARY_RANGE = { min: 2400, max: 12000, step: 100 } as const;
export const CARD_RANGE = { min: 0, max: 4000, step: 100 } as const;

export const DEPENDENT_OPTIONS: { key: DependentsKey; label: string }[] = [
  { key: 0, label: "없음" },
  { key: 1, label: "1명" },
  { key: 2, label: "2명" },
  { key: 3, label: "3명+" },
];

export const HOUSING_OPTIONS: { key: HousingKey; label: string }[] = [
  { key: "rent", label: "월세" },
  { key: "jeonse", label: "전세" },
  { key: "own", label: "자가" },
];

/* ────────────────────────────────────────────────────────────────────
 * 포맷터 — toLocaleString 을 쓰지 않는다(런타임 ICU 차이로 인한 SSR 불일치 회피)
 * ──────────────────────────────────────────────────────────────────── */

export function won(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = String(Math.abs(rounded));
  let out = "";
  for (let i = 0; i < digits.length; i += 1) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += ",";
    out += digits[i];
  }
  return sign + out;
}

/** 원 단위 잔돈 정리 (10원 단위 절사·반올림) */
function r10(value: number): number {
  return Math.round(value / 10) * 10;
}

/* ────────────────────────────────────────────────────────────────────
 * 세액 모델
 * ──────────────────────────────────────────────────────────────────── */

/** 근로소득공제 (단순화 표, 한도 2,000만원) */
function earnedIncomeDeduction(gross: number): number {
  let deduction: number;
  if (gross <= 5_000_000) deduction = gross * 0.7;
  else if (gross <= 15_000_000)
    deduction = 3_500_000 + (gross - 5_000_000) * 0.4;
  else if (gross <= 45_000_000)
    deduction = 7_500_000 + (gross - 15_000_000) * 0.15;
  else if (gross <= 100_000_000)
    deduction = 12_000_000 + (gross - 45_000_000) * 0.05;
  else deduction = 14_750_000 + (gross - 100_000_000) * 0.02;
  return Math.min(deduction, 20_000_000);
}

const BRACKETS: { upTo: number; rate: number }[] = [
  { upTo: 14_000_000, rate: 0.06 },
  { upTo: 50_000_000, rate: 0.15 },
  { upTo: 88_000_000, rate: 0.24 },
  { upTo: 150_000_000, rate: 0.35 },
  { upTo: Number.POSITIVE_INFINITY, rate: 0.38 },
];

/** 한계세율 (지방소득세 10% 가산 포함) */
function marginalRate(taxBase: number): number {
  const bracket =
    BRACKETS.find((b) => taxBase <= b.upTo) ?? BRACKETS[BRACKETS.length - 1];
  return bracket.rate * 1.1;
}

/* ────────────────────────────────────────────────────────────────────
 * 진단 결과
 * ──────────────────────────────────────────────────────────────────── */

export type DeductionKey =
  | "monthlyRent"
  | "pension"
  | "housingLoan"
  | "medical"
  | "donation"
  | "card"
  | "insurance"
  | "education";

/**
 * found   — 놓치고 있을 가능성이 높은 항목 (추가 환급 여지)
 * covered — 회사 연말정산에서 대체로 자동 반영되는 항목
 * none    — 이 조건에서 해당 사항 없음
 */
export type FindingStatus = "found" | "covered" | "none";

export interface Finding {
  key: DeductionKey;
  label: string;
  kind: "소득공제" | "세액공제";
  status: FindingStatus;
  /** 추가 환급 예상액 (원) */
  savings: number;
  /** 한 줄 근거 */
  basis: string;
  /** 펼쳤을 때 보이는 계산 근거 */
  detail: string;
}

export interface Diagnosis {
  findings: Finding[];
  foundTotal: number;
  foundCount: number;
  /** 한계세율 (예: 16.5) */
  marginalRatePct: string;
  taxBase: number;
}

const STATUS_ORDER: Record<FindingStatus, number> = {
  found: 0,
  covered: 1,
  none: 2,
};

export function diagnose(input: DiagnosisInput): Diagnosis {
  const gross = input.salaryManwon * MAN;
  const card = input.cardManwon * MAN;

  const eid = earnedIncomeDeduction(gross);
  const pensionPremium = Math.min(gross * 0.045, 3_300_000);
  const personal = 1_500_000 * (1 + input.dependents);
  const taxBase = Math.max(0, gross - eid - pensionPremium - personal);
  const rate = marginalRate(taxBase);
  const ratePct = (rate * 100).toFixed(1);
  const lowIncome = gross <= 55_000_000;

  const findings: Finding[] = [];

  /* 1. 월세액 세액공제 — 가장 자주 누락되는 항목 */
  if (input.housing === "rent") {
    const paid = Math.min(gross * 0.1, 7_500_000);
    const creditRate = lowIncome ? 0.17 : 0.15;
    const savings = r10(paid * creditRate * 1.1);
    findings.push({
      key: "monthlyRent",
      label: "월세",
      kind: "세액공제",
      status: "found",
      savings,
      basis: `연 월세액 ${won(paid)}원 · 공제율 ${(creditRate * 100).toFixed(0)}%`,
      detail: `무주택 세대주 기준 연 월세액 ${won(paid)}원(한도 750만원)에 공제율 ${(creditRate * 100).toFixed(0)}%${lowIncome ? " (총급여 5,500만원 이하)" : ""}를 적용하고, 지방소득세 감소분 10%를 더한 값입니다. 임대차계약서 주소와 주민등록 주소가 같아야 하며, 회사 제출 서류에는 대개 포함되지 않아 본인이 직접 신청해야 합니다.`,
    });
  } else {
    findings.push({
      key: "monthlyRent",
      label: "월세",
      kind: "세액공제",
      status: "none",
      savings: 0,
      basis: "월세 거주가 아니어서 해당 없음",
      detail:
        "월세액 세액공제는 무주택 세대주가 국민주택규모 이하 주택에 월세로 거주할 때 적용됩니다. 현재 선택한 주거 형태에는 해당하지 않습니다.",
    });
  }

  /* 2. 연금저축 세액공제 — 납입 여력 미사용분 */
  {
    const room = Math.min(6_000_000, gross * 0.06);
    const creditRate = lowIncome ? 0.15 : 0.12;
    const savings = r10(room * creditRate * 1.1);
    findings.push({
      key: "pension",
      label: "연금저축",
      kind: "세액공제",
      status: "found",
      savings,
      basis: `미사용 납입 여력 ${won(room)}원 · 공제율 ${(creditRate * 100).toFixed(0)}%`,
      detail: `연금저축 납입 한도 600만원 중 이 소득 구간에서 통상 남기는 여력 ${won(room)}원에 공제율 ${(creditRate * 100).toFixed(0)}%${lowIncome ? " (총급여 5,500만원 이하)" : ""}와 지방소득세 감소분을 반영했습니다. 12월 31일까지 추가 납입하면 그해 귀속분으로 인정됩니다.`,
    });
  }

  /* 3. 주택자금 — 전세대출 원리금 / 장기주택저당 이자 */
  if (input.housing === "jeonse") {
    const principal = Math.min(gross * 0.1, 4_000_000);
    const deduction = principal * 0.4;
    const savings = r10(deduction * rate);
    findings.push({
      key: "housingLoan",
      label: "주택자금",
      kind: "소득공제",
      status: "found",
      savings,
      basis: `전세대출 원리금 ${won(principal)}원의 40%`,
      detail: `주택임차차입금 원리금 상환액 ${won(principal)}원의 40%인 ${won(deduction)}원을 소득에서 빼고, 한계세율 ${ratePct}%를 곱한 값입니다. 은행 상환 내역이 간소화 자료에 잡히지 않는 경우가 있어 누락이 잦습니다.`,
    });
  } else if (input.housing === "own") {
    const interest = Math.min(gross * 0.04, 6_000_000);
    const savings = r10(interest * rate);
    findings.push({
      key: "housingLoan",
      label: "주택자금",
      kind: "소득공제",
      status: "found",
      savings,
      basis: `장기주택저당 이자 ${won(interest)}원 전액 공제`,
      detail: `장기주택저당차입금 이자 상환액 ${won(interest)}원을 한도 내에서 전액 소득공제하고 한계세율 ${ratePct}%를 곱한 값입니다. 취득 시점·상환 방식에 따라 한도가 달라지므로 대출 조건 확인이 필요합니다.`,
    });
  } else {
    findings.push({
      key: "housingLoan",
      label: "주택자금",
      kind: "소득공제",
      status: "none",
      savings: 0,
      basis: "차입금이 없어 해당 없음",
      detail:
        "주택자금 공제는 전세자금 대출 원리금 상환액이나 장기주택저당차입금 이자 상환액이 있을 때 적용됩니다. 월세 거주는 월세액 세액공제로 따로 계산합니다.",
    });
  }

  /* 4. 의료비 세액공제 — 총급여 3% 초과분 */
  {
    const spend = gross * (0.024 + 0.01 * input.dependents);
    const threshold = gross * 0.03;
    const excess = Math.max(0, spend - threshold);
    const savings = r10(excess * 0.15 * 1.1);
    findings.push({
      key: "medical",
      label: "의료비",
      kind: "세액공제",
      status: savings > 0 ? "found" : "none",
      savings,
      basis:
        savings > 0
          ? `총급여 3% 초과분 ${won(excess)}원 · 공제율 15%`
          : "총급여 3% 문턱을 넘지 못해 해당 없음",
      detail:
        savings > 0
          ? `이 조건에서 가정한 연간 의료비 ${won(spend)}원에서 총급여의 3%인 ${won(threshold)}원을 뺀 ${won(excess)}원에 공제율 15%와 지방소득세 감소분을 적용했습니다. 안경·콘택트렌즈, 시력교정술, 산후조리원 비용은 간소화 자료에 자동으로 잡히지 않아 특히 자주 빠집니다.`
          : `연간 의료비가 총급여의 3%(${won(threshold)}원)를 넘어야 공제가 시작됩니다. 이 조건에서는 문턱에 미치지 않지만, 부양가족 의료비를 합산하면 넘어설 수 있습니다.`,
    });
  }

  /* 5. 기부금 세액공제 */
  {
    const amount = Math.min(gross * 0.004, 500_000);
    const savings = r10(amount * 0.15 * 1.1);
    findings.push({
      key: "donation",
      label: "기부금",
      kind: "세액공제",
      status: "found",
      savings,
      basis: `미등록 기부금 ${won(amount)}원 · 공제율 15%`,
      detail: `종교단체·후원 플랫폼 기부처럼 간소화 자료에 등록되지 않는 기부금 ${won(amount)}원을 기준으로 공제율 15%와 지방소득세 감소분을 반영했습니다. 기부금 영수증만 있으면 소급 신청이 가능합니다.`,
    });
  }

  /* 6. 신용카드 소득공제 — 대개 자동 반영 */
  {
    const threshold = gross * 0.25;
    const excess = Math.max(0, card - threshold);
    const deduction = Math.min(excess * 0.15, 3_000_000);
    const savings = r10(deduction * rate);
    findings.push({
      key: "card",
      label: "신용카드",
      kind: "소득공제",
      status: deduction > 0 ? "covered" : "none",
      savings,
      basis:
        deduction > 0
          ? `최저사용금액 ${won(threshold)}원 초과분 반영 완료`
          : `사용액이 최저사용금액 ${won(threshold)}원에 못 미침`,
      detail:
        deduction > 0
          ? `카드 사용액 ${won(card)}원에서 총급여의 25%인 ${won(threshold)}원을 뺀 ${won(excess)}원에 공제율 15%를 적용해 소득공제 ${won(deduction)}원(한도 300만원), 한계세율 ${ratePct}%를 곱하면 ${won(savings)}원입니다. 국세청 간소화 자료로 자동 반영되는 항목이라 별도 발견분으로 세지 않습니다.`
          : `총급여의 25%인 ${won(threshold)}원을 넘게 써야 공제가 시작됩니다. 현재 사용액 ${won(card)}원은 문턱 아래입니다. 체크카드·현금영수증은 공제율이 더 높으니 문턱을 넘기는 구간에서 결제 수단을 바꾸는 편이 유리합니다.`,
    });
  }

  /* 7. 보험료 세액공제 — 대개 자동 반영 */
  {
    const premium = Math.min(1_000_000, 400_000 + input.dependents * 200_000);
    const savings = r10(premium * 0.12 * 1.1);
    findings.push({
      key: "insurance",
      label: "보험료",
      kind: "세액공제",
      status: "covered",
      savings,
      basis: `보장성보험료 ${won(premium)}원 반영 완료`,
      detail: `보장성보험료 ${won(premium)}원(한도 100만원)에 공제율 12%와 지방소득세 감소분을 적용한 값입니다. 보험사 자료가 간소화 서비스로 넘어와 대체로 자동 반영됩니다.`,
    });
  }

  /* 8. 교육비 세액공제 */
  if (input.dependents >= 1) {
    const spend = input.dependents * 2_400_000;
    const savings = r10(spend * 0.15 * 1.1);
    findings.push({
      key: "education",
      label: "교육비",
      kind: "세액공제",
      status: "covered",
      savings,
      basis: `부양가족 ${input.dependents}명 교육비 ${won(spend)}원 반영 완료`,
      detail: `부양가족 1인당 교육비 240만원을 기준으로 ${input.dependents}명분 ${won(spend)}원에 공제율 15%와 지방소득세 감소분을 적용했습니다. 학교·학원 자료는 간소화 서비스에서 대체로 조회됩니다.`,
    });
  } else {
    findings.push({
      key: "education",
      label: "교육비",
      kind: "세액공제",
      status: "none",
      savings: 0,
      basis: "부양가족이 없어 해당 없음",
      detail:
        "교육비 세액공제는 본인 학자금 또는 기본공제 대상 부양가족의 교육비가 있을 때 적용됩니다. 부양가족을 1명 이상 선택하면 계산에 반영됩니다.",
    });
  }

  findings.sort((a, b) => {
    const order = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (order !== 0) return order;
    if (b.savings !== a.savings) return b.savings - a.savings;
    return a.key < b.key ? -1 : 1;
  });

  const found = findings.filter((f) => f.status === "found");

  return {
    findings,
    foundTotal: found.reduce((sum, f) => sum + f.savings, 0),
    foundCount: found.length,
    marginalRatePct: ratePct,
    taxBase,
  };
}

/* ────────────────────────────────────────────────────────────────────
 * 정적 카피 데이터
 * ──────────────────────────────────────────────────────────────────── */

export const DEDUCTION_NAMES = [
  "의료비",
  "교육비",
  "기부금",
  "보험료",
  "신용카드",
  "주택자금",
  "연금저축",
  "월세",
] as const;

export const METHOD_STEPS = [
  {
    no: "01",
    title: "자료를 한자리에 모읍니다",
    body: "카드사·병원·보험사·은행에 흩어진 지출 자료를 불러와 공제 항목별로 자동 분류합니다. 영수증을 찾아 헤맬 필요가 없습니다.",
  },
  {
    no: "02",
    title: "8개 항목을 서로 대조합니다",
    body: "의료비·교육비·기부금·보험료·신용카드·주택자금·연금저축·월세를 교차 검증해, 중복 신청과 누락을 동시에 잡아냅니다.",
  },
  {
    no: "03",
    title: `${TAX_YEAR}년 개정 내용을 적용합니다`,
    body: `바뀐 공제 한도와 공제율을 그대로 반영합니다. 작년 기준으로 계산했다면 놓쳤을 금액까지 ${TAX_YEAR}년 기준으로 다시 확인합니다.`,
  },
] as const;

export const REVIEWS = [
  {
    name: "정하늘",
    role: "제조업 · 직장인 7년차",
    quote:
      "5년째 월세를 살면서 월세 세액공제를 한 번도 신청하지 않았다는 걸 여기서 처음 알았습니다. 올해분만 89만원이었어요.",
  },
  {
    name: "배소윤",
    role: "IT · 직장인 3년차",
    quote:
      "회사에서 준 서류대로만 냈는데, 안경 구입비와 후원금이 빠져 있었습니다. 영수증 두 장 올리니 바로 금액이 늘었습니다.",
  },
] as const;

export const STATS = [
  { value: "10만+", label: "누적 사용자" },
  { value: "35만원", label: "평균 추가 환급액" },
  { value: "98%", label: "사용자 만족도" },
] as const;
