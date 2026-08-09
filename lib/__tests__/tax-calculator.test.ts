import { describe, expect, it } from "vitest";
import { calculateTax, type TaxCalculationInputs } from "../tax-calculator";

/**
 * 특성화 테스트 — 현재 출력을 박제한다.
 *
 * 이 테스트는 "계산이 옳은가"를 묻지 않는다. "재개편 작업 중 계산이 바뀌었는가"만
 * 묻는다. 스냅샷 값은 손으로 계산한 것이 아니라 현 구현의 실제 출력이며,
 * `npx vitest run -u` 로 생성했다.
 *
 * 배경: app/calculator/page.tsx 는 이 파일을 import 하지 않고 거의 동일한 사본을
 * 자체 보유하며, 화면 최종 환급액은 그 페이지의 JSX 안에서만 계산된다.
 * 두 구현은 여러 항목에서 다른 답을 낸다(별건 과제로 분리됨).
 * 여기서 고정하는 것은 lib 쪽 — dashboard 가 쓰는 경로다.
 *
 * 스냅샷이 깨지면 둘 중 하나다:
 *   1) 계산 로직을 건드렸다 → 되돌린다. 이번 재개편은 로직 무접촉이 원칙이다.
 *   2) 의도한 수정이다 → 세무 근거를 확인하고 `-u` 로 갱신하며 그 근거를 커밋에 남긴다.
 */

/** 모든 필드 0. 케이스마다 필요한 값만 덮어쓴다. */
const ZERO: TaxCalculationInputs = {
  salary: 0,
  withheldTax: 0,
  dependents: 0,
  nationalPension: 0,
  healthInsurance: 0,
  longTermCare: 0,
  employmentInsurance: 0,
  cardChildren: 0,
  creditCard: 0,
  debitCard: 0,
  cash: 0,
  traditionalMarket: 0,
  publicTransport: 0,
  culture: 0,
  infertility: 0,
  premature: 0,
  selfDisabledSenior: 0,
  otherFamily: 0,
  insuranceReimbursement: 0,
  selfEducation: 0,
  preschool: 0,
  elementary: 0,
  university: 0,
  housingSubscription: 0,
  rentLoanPayment: 0,
  mortgageInterest: 0,
  monthlyRent: 0,
  pensionSavings: 0,
  irp: 0,
  isaTransfer: 0,
  generalInsurance: 0,
  disabledInsurance: 0,
  politicalDonation: 0,
  hometownDonation: 0,
  hometownDisaster: 0,
  specialDonation: 0,
  employeeDonation: 0,
  designatedDonation: 0,
  religiousDonation: 0,
  childrenOver8: 0,
  birthAdoption: "none",
};

const make = (over: Partial<TaxCalculationInputs>): TaxCalculationInputs => ({
  ...ZERO,
  ...over,
});

/** 4대보험을 총급여에서 통상 요율로 근사 — 케이스마다 손으로 적는 수고를 줄인다. */
const withInsurance = (salary: number, over: Partial<TaxCalculationInputs> = {}) =>
  make({
    salary,
    nationalPension: Math.round(salary * 0.045),
    healthInsurance: Math.round(salary * 0.0354),
    longTermCare: Math.round(salary * 0.0046),
    employmentInsurance: Math.round(salary * 0.009),
    ...over,
  });

describe("calculateTax — 특성화(현재 출력 고정)", () => {
  it("C1 급여만 있고 공제가 전무한 최소 입력", () => {
    expect(calculateTax(make({ salary: 30_000_000 }))).toMatchSnapshot();
  });

  it("C2 평균 직장인 — 4,800만 / 부양가족 1 / 카드 사용", () => {
    expect(
      calculateTax(
        withInsurance(48_000_000, {
          dependents: 1,
          withheldTax: 1_200_000,
          creditCard: 18_000_000,
          debitCard: 3_000_000,
          publicTransport: 600_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C3 총급여 5,500만 경계 — 월세·연금저축 공제율 분기점", () => {
    expect(
      calculateTax(
        withInsurance(55_000_000, {
          dependents: 1,
          withheldTax: 1_800_000,
          monthlyRent: 7_200_000,
          pensionSavings: 4_000_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C4 5,500만 바로 위 — C3 와 공제율이 갈려야 한다", () => {
    expect(
      calculateTax(
        withInsurance(55_000_001, {
          dependents: 1,
          withheldTax: 1_800_000,
          monthlyRent: 7_200_000,
          pensionSavings: 4_000_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C5 의료비 문턱(총급여 3%) 초과 + 난임·미숙아 별도 요율", () => {
    expect(
      calculateTax(
        withInsurance(60_000_000, {
          dependents: 2,
          withheldTax: 2_400_000,
          infertility: 3_000_000,
          premature: 1_000_000,
          selfDisabledSenior: 2_000_000,
          otherFamily: 4_000_000,
          insuranceReimbursement: 500_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C6 주택자금 3종 동시 — 청약·전세원리금·저당차입금 이자", () => {
    expect(
      calculateTax(
        withInsurance(70_000_000, {
          dependents: 2,
          withheldTax: 3_600_000,
          housingSubscription: 2_400_000,
          rentLoanPayment: 6_000_000,
          mortgageInterest: 5_000_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C7 연금계좌 한도 초과 입력 — 캡이 걸리는지", () => {
    expect(
      calculateTax(
        withInsurance(80_000_000, {
          dependents: 0,
          withheldTax: 5_000_000,
          pensionSavings: 12_000_000,
          irp: 12_000_000,
          isaTransfer: 5_000_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C8 기부금 전 유형 동시", () => {
    expect(
      calculateTax(
        withInsurance(90_000_000, {
          dependents: 1,
          withheldTax: 7_000_000,
          politicalDonation: 200_000,
          hometownDonation: 300_000,
          hometownDisaster: 100_000,
          specialDonation: 1_000_000,
          employeeDonation: 500_000,
          designatedDonation: 2_000_000,
          religiousDonation: 1_500_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C9 자녀세액공제 + 출산·입양(셋째)", () => {
    expect(
      calculateTax(
        withInsurance(65_000_000, {
          dependents: 4,
          withheldTax: 2_000_000,
          childrenOver8: 3,
          birthAdoption: "third1",
          preschool: 3_000_000,
          elementary: 2_000_000,
        }),
      ),
    ).toMatchSnapshot();
  });

  it("C10 고소득 1.2억 — 최고 세율구간 + 근로소득세액공제 축소", () => {
    expect(
      calculateTax(
        withInsurance(120_000_000, {
          dependents: 2,
          withheldTax: 12_000_000,
          creditCard: 30_000_000,
          selfEducation: 5_000_000,
          generalInsurance: 1_200_000,
        }),
      ),
    ).toMatchSnapshot();
  });
});
