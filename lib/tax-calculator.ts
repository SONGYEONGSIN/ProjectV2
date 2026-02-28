/**
 * 세금 계산 모듈 (2026년 기준)
 * Calculator와 Dashboard에서 공유하는 세금 계산 로직
 */

import { AdminData } from "./tax-store";

// 세금 계산 입력 인터페이스
export interface TaxCalculationInputs {
    salary: number;              // 총급여액
    withheldTax: number;         // 기납부세액 (소득세)
    dependents: number;          // 총 부양가족 수
    // 4대보험
    nationalPension: number;
    healthInsurance: number;
    longTermCare: number;
    employmentInsurance: number;
    // 카드 사용액
    cardChildren?: number;
    creditCard: number;
    debitCard: number;
    cash: number;
    traditionalMarket: number;
    publicTransport: number;
    culture: number;
    // 의료비
    infertility: number;
    premature: number;
    selfDisabledSenior: number;
    otherFamily: number;
    insuranceReimbursement: number;
    // 교육비
    selfEducation: number;
    preschool: number;
    elementary: number;
    university: number;
    // 주택자금
    housingSubscription: number;
    rentLoanPayment: number;
    mortgageInterest: number;
    monthlyRent: number;
    // 연금 및 보험
    pensionSavings: number;
    irp: number;
    isaTransfer?: number;
    generalInsurance: number;
    disabledInsurance: number;
    // 기부금
    politicalDonation: number;
    hometownDonation: number;
    hometownDisaster: number;
    specialDonation: number;
    employeeDonation: number;
    designatedDonation: number;
    religiousDonation: number;
    // 자녀공제
    childrenOver8: number;
    birthAdoption: "none" | "first" | "second" | "third1" | "third2" | "third3";
}

// 세금 계산 결과 인터페이스
export interface TaxCalculationResult {
    salary: number;
    earnedIncome: number;
    incomeDeduction: number;
    totalIncomeDeduction: number;
    personalDeduction: number;
    cardDeduction: number;
    medicalDeduction: number;
    educationDeduction: number;
    housingDeduction: number;
    pensionDeduction: number;
    donationDeduction: number;
    socialInsuranceDeduction: number;
    childTaxCredit: number;
    earnedIncomeTaxCredit: number;
    insuranceDeduction: number;
    taxableIncome: number;
    calculatedTax: number;
    totalTaxCredit: number;
    finalTax: number;
    withheldTax: number;
    refund: number;
}

/**
 * 세금 계산 함수 (CALCULATOR_FORMULAS.md 기준 - 2026년)
 */
export function calculateTax(inputs: TaxCalculationInputs): TaxCalculationResult {
    const salary = inputs.salary;

    // ==========================================
    // 1. 근로소득공제 (2026년 기준)
    // ==========================================
    let incomeDeduction = 0;
    if (salary <= 5000000) {
        incomeDeduction = salary * 0.7;
    } else if (salary <= 15000000) {
        incomeDeduction = 3500000 + (salary - 5000000) * 0.4;
    } else if (salary <= 45000000) {
        incomeDeduction = 7500000 + (salary - 15000000) * 0.15;
    } else if (salary <= 100000000) {
        incomeDeduction = 12000000 + (salary - 45000000) * 0.05;
    } else {
        incomeDeduction = 14750000 + (salary - 100000000) * 0.02;
    }

    const earnedIncome = salary - incomeDeduction;

    // ==========================================
    // 2. 소득공제 항목
    // ==========================================

    // 인적공제 (부양가족 1인당 150만원)
    const personalDeduction = inputs.dependents * 1500000;

    // 4대보험 소득공제 (전액 공제)
    const socialInsuranceDeduction =
        inputs.nationalPension +
        inputs.healthInsurance +
        inputs.longTermCare +
        inputs.employmentInsurance;

    // 신용카드 등 소득공제
    const threshold = salary * 0.25;
    let cardDeduction = 0;
    let cardRemaining = threshold;

    const creditExcess = Math.max(0, inputs.creditCard - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.creditCard);
    const debitExcess = Math.max(0, inputs.debitCard - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.debitCard);
    const cashExcess = Math.max(0, inputs.cash - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.cash);
    const transportExcess = Math.max(0, inputs.publicTransport - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.publicTransport);
    const marketExcess = Math.max(0, inputs.traditionalMarket - cardRemaining);
    cardRemaining = Math.max(0, cardRemaining - inputs.traditionalMarket);
    const cultureExcess = Math.max(0, inputs.culture - cardRemaining);

    const creditDeduction = Math.round(creditExcess * 0.15);
    const debitDeduction = Math.round(debitExcess * 0.30);
    const cashDeduction = Math.round(cashExcess * 0.30);
    const basicDeduction = creditDeduction + debitDeduction + cashDeduction;

    let baseLimit = 3000000;
    if (salary > 120000000) {
        baseLimit = 2000000;
    } else if (salary > 70000000) {
        baseLimit = 2500000;
    }
    baseLimit += Math.min((inputs.cardChildren || 0) * 500000, 1000000);
    const finalBasic = Math.min(basicDeduction, baseLimit);

    const transportDeduction = Math.round(transportExcess * 0.40);
    const marketDeduction = Math.round(marketExcess * 0.40);
    const cultureDeductionVal = salary <= 70000000 ? Math.round(cultureExcess * 0.30) : 0;
    const additionalDeduction = transportDeduction + marketDeduction + cultureDeductionVal;

    let additionalLimit = 3000000;
    if (salary > 120000000) {
        additionalLimit = 2000000;
    } else if (salary > 70000000) {
        additionalLimit = 2500000;
    }
    const finalAdditional = Math.min(additionalDeduction, additionalLimit);
    cardDeduction = finalBasic + finalAdditional;

    // 주택자금 소득공제
    let housingIncomeDeduction = 0;
    if (salary <= 70000000 && inputs.housingSubscription > 0) {
        housingIncomeDeduction += Math.min(inputs.housingSubscription, 3000000) * 0.40;
    }
    housingIncomeDeduction += Math.min(inputs.rentLoanPayment * 0.40, 4000000);
    housingIncomeDeduction += Math.min(inputs.mortgageInterest, 18000000);

    const totalIncomeDeduction = personalDeduction + socialInsuranceDeduction + cardDeduction + housingIncomeDeduction;

    // 과세표준
    let taxableIncome = earnedIncome - totalIncomeDeduction;
    taxableIncome = Math.max(0, taxableIncome);

    // ==========================================
    // 3. 산출세액 (2026년 세율)
    // ==========================================
    let calculatedTax = 0;
    if (taxableIncome <= 14000000) {
        calculatedTax = taxableIncome * 0.06;
    } else if (taxableIncome <= 50000000) {
        calculatedTax = 840000 + (taxableIncome - 14000000) * 0.15;
    } else if (taxableIncome <= 88000000) {
        calculatedTax = 6240000 + (taxableIncome - 50000000) * 0.24;
    } else if (taxableIncome <= 150000000) {
        calculatedTax = 15360000 + (taxableIncome - 88000000) * 0.35;
    } else if (taxableIncome <= 300000000) {
        calculatedTax = 37060000 + (taxableIncome - 150000000) * 0.38;
    } else if (taxableIncome <= 500000000) {
        calculatedTax = 94060000 + (taxableIncome - 300000000) * 0.4;
    } else if (taxableIncome <= 1000000000) {
        calculatedTax = 174060000 + (taxableIncome - 500000000) * 0.42;
    } else {
        calculatedTax = 384060000 + (taxableIncome - 1000000000) * 0.45;
    }

    // ==========================================
    // 4. 세액공제 항목
    // ==========================================

    // 의료비 세액공제
    const medicalThreshold = salary * 0.03;
    const totalMedical = inputs.infertility + inputs.premature + inputs.selfDisabledSenior + inputs.otherFamily;
    const netMedical = Math.max(0, totalMedical - inputs.insuranceReimbursement);

    let medicalDeduction = 0;
    const eligibleMedical = Math.max(0, netMedical - medicalThreshold);

    if (eligibleMedical > 0) {
        const ratio = eligibleMedical / netMedical;
        medicalDeduction += inputs.infertility * ratio * 0.30;
        medicalDeduction += inputs.premature * ratio * 0.20;
        medicalDeduction += inputs.selfDisabledSenior * ratio * 0.15;
        medicalDeduction += Math.min(inputs.otherFamily * ratio, 7000000) * 0.15;
    }

    // 교육비 세액공제
    let educationDeduction = 0;
    educationDeduction += inputs.selfEducation * 0.15;
    educationDeduction += Math.min(inputs.preschool, 3000000) * 0.15;
    educationDeduction += Math.min(inputs.elementary, 3000000) * 0.15;
    educationDeduction += Math.min(inputs.university, 9000000) * 0.15;

    // 주택자금 세액공제 (월세)
    let housingTaxCredit = 0;
    if (inputs.monthlyRent > 0) {
        const rentRate = salary <= 55000000 ? 0.17 : 0.15;
        housingTaxCredit = Math.min(inputs.monthlyRent, 10000000) * rentRate;
    }

    // 연금계좌 세액공제
    const pensionRate = 0.12;
    const pensionSavingsLimit = Math.min(inputs.pensionSavings, 6000000);
    const irpLimit = Math.min(inputs.irp, 9000000 - pensionSavingsLimit);
    const isaLimit = Math.min((inputs.isaTransfer || 0) * 0.1, 3000000);
    const pensionDeduction = (pensionSavingsLimit + irpLimit + isaLimit) * pensionRate;

    // 보장성 보험료 세액공제
    const generalInsuranceCredit = Math.min(inputs.generalInsurance, 1000000) * 0.12;
    const disabledInsuranceCredit = Math.min(inputs.disabledInsurance, 1000000) * 0.15;
    const insuranceDeduction = generalInsuranceCredit + disabledInsuranceCredit;

    // 기부금 세액공제
    let donationDeduction = 0;

    if (inputs.politicalDonation > 0) {
        const politicalBase = Math.min(inputs.politicalDonation, 100000) * (100 / 110);
        const politicalExcess = Math.max(0, inputs.politicalDonation - 100000);
        const politicalExcess15 = Math.min(politicalExcess, 30000000);
        const politicalExcess25 = Math.max(0, politicalExcess - 30000000);
        donationDeduction += politicalBase + politicalExcess15 * 0.15 + politicalExcess25 * 0.25;
    }

    if (inputs.hometownDonation > 0) {
        const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
        const hometownBase = Math.min(hometownLimited, 100000) * (100 / 110);
        const hometownExcess = Math.max(0, hometownLimited - 100000) * 0.15;
        donationDeduction += hometownBase + hometownExcess;
    }

    if (inputs.hometownDisaster > 0) {
        const hometownLimited = Math.min(inputs.hometownDonation, 20000000);
        const disasterLimited = Math.min(inputs.hometownDisaster, Math.max(0, 20000000 - hometownLimited));
        const disasterBase = Math.min(disasterLimited, 100000) * (100 / 110);
        const disasterExcess = Math.max(0, disasterLimited - 100000) * 0.30;
        donationDeduction += disasterBase + disasterExcess;
    }

    if (inputs.specialDonation > 0) {
        const special15 = Math.min(inputs.specialDonation, 10000000) * 0.15;
        const special30 = Math.max(0, inputs.specialDonation - 10000000) * 0.30;
        donationDeduction += special15 + special30;
    }

    if (inputs.employeeDonation > 0) {
        const employeeLimited = Math.min(inputs.employeeDonation, earnedIncome * 0.30);
        const employee15 = Math.min(employeeLimited, 10000000) * 0.15;
        const employee30 = Math.max(0, employeeLimited - 10000000) * 0.30;
        donationDeduction += employee15 + employee30;
    }

    if (inputs.designatedDonation > 0) {
        const designatedLimited = Math.min(inputs.designatedDonation, earnedIncome * 0.30);
        const designated15 = Math.min(designatedLimited, 10000000) * 0.15;
        const designated30 = Math.max(0, designatedLimited - 10000000) * 0.30;
        donationDeduction += designated15 + designated30;
    }

    if (inputs.religiousDonation > 0) {
        const religiousLimited = Math.min(inputs.religiousDonation, earnedIncome * 0.10);
        const religious15 = Math.min(religiousLimited, 10000000) * 0.15;
        const religious30 = Math.max(0, religiousLimited - 10000000) * 0.30;
        donationDeduction += religious15 + religious30;
    }

    // ==========================================
    // 5. 자녀 세액공제
    // ==========================================
    let childTaxCredit = 0;
    const childrenOver8 = inputs.childrenOver8 || 0;
    if (childrenOver8 === 1) {
        childTaxCredit += 250000;
    } else if (childrenOver8 === 2) {
        childTaxCredit += 550000;
    } else if (childrenOver8 >= 3) {
        childTaxCredit += 550000 + (childrenOver8 - 2) * 400000;
    }

    const birthAdoption = inputs.birthAdoption || "none";
    if (birthAdoption === "first") {
        childTaxCredit += 300000;
    } else if (birthAdoption === "second") {
        childTaxCredit += 500000;
    } else if (birthAdoption === "third1") {
        childTaxCredit += 700000;
    } else if (birthAdoption === "third2") {
        childTaxCredit += 1400000;
    } else if (birthAdoption === "third3") {
        childTaxCredit += 2100000;
    }

    // ==========================================
    // 6. 근로소득세액공제
    // ==========================================
    let earnedIncomeTaxCredit = 0;
    if (calculatedTax <= 1300000) {
        earnedIncomeTaxCredit = calculatedTax * 0.55;
    } else {
        earnedIncomeTaxCredit = 715000 + (calculatedTax - 1300000) * 0.30;
    }

    let earnedIncomeTaxCreditLimit = 0;
    if (salary <= 33000000) {
        earnedIncomeTaxCreditLimit = 740000;
    } else if (salary <= 70000000) {
        earnedIncomeTaxCreditLimit = Math.max(660000, 740000 - (salary - 33000000) * 0.008);
    } else if (salary <= 120000000) {
        earnedIncomeTaxCreditLimit = Math.max(500000, 660000 - (salary - 70000000) * 0.5);
    } else {
        earnedIncomeTaxCreditLimit = Math.max(200000, 500000 - (salary - 120000000) * 0.5);
    }
    earnedIncomeTaxCredit = Math.min(earnedIncomeTaxCredit, earnedIncomeTaxCreditLimit);

    // 총 세액공제
    const totalTaxCredit =
        earnedIncomeTaxCredit +
        medicalDeduction +
        educationDeduction +
        housingTaxCredit +
        pensionDeduction +
        insuranceDeduction +
        donationDeduction +
        childTaxCredit;

    // 결정세액
    const finalTax = Math.max(0, calculatedTax - totalTaxCredit);

    // 환급액 또는 추가납부액
    const refund = inputs.withheldTax - finalTax;

    return {
        salary: Math.round(salary),
        earnedIncome: Math.round(earnedIncome),
        incomeDeduction: Math.round(incomeDeduction),
        totalIncomeDeduction: Math.round(totalIncomeDeduction),
        personalDeduction: Math.round(personalDeduction),
        cardDeduction: Math.round(cardDeduction),
        medicalDeduction: Math.round(medicalDeduction),
        educationDeduction: Math.round(educationDeduction),
        housingDeduction: Math.round(housingIncomeDeduction + housingTaxCredit),
        pensionDeduction: Math.round(pensionDeduction + insuranceDeduction),
        donationDeduction: Math.round(donationDeduction),
        socialInsuranceDeduction: Math.round(socialInsuranceDeduction),
        childTaxCredit: Math.round(childTaxCredit),
        earnedIncomeTaxCredit: Math.round(earnedIncomeTaxCredit),
        insuranceDeduction: Math.round(insuranceDeduction),
        taxableIncome: Math.round(taxableIncome),
        calculatedTax: Math.round(calculatedTax),
        totalTaxCredit: Math.round(totalTaxCredit),
        finalTax: Math.round(finalTax),
        withheldTax: inputs.withheldTax,
        refund: Math.round(refund),
    };
}

/**
 * Admin 데이터를 세금 계산 입력으로 변환
 */
export function convertAdminToTaxInputs(adminData: AdminData): TaxCalculationInputs {
    // 연봉 계산 = 급여 + 상여 + 자녀학자금
    const annualSalary = adminData.salary.totalSalary +
        (adminData.salary.bonus || 0) +
        (adminData.salary.childTuition || 0);

    // 보육수당 비과세 = 6세 이하 자녀 수 × 20만원 × 12개월
    const childcareAllowance = (adminData.salary.childrenUnder6 || 0) * 200000 * 12;

    // 총 비과세 = 식대 + 보육수당
    const totalNonTaxable = (adminData.salary.mealAllowance || 0) + childcareAllowance;

    // 총급여 = 연봉 - 비과세
    const salary = annualSalary - totalNonTaxable;

    // 부양가족 수 계산
    const dependents = 1 +
        (adminData.family?.spouse ? 1 : 0) +
        (adminData.family?.children || 0) +
        (adminData.family?.parents || 0) +
        (adminData.family?.siblings || 0) +
        (adminData.family?.foster || 0) +
        (adminData.family?.recipient || 0);

    return {
        salary,
        withheldTax: adminData.salary.prepaidTax || 0,
        dependents,
        // 4대보험
        nationalPension: adminData.salary.nationalPension || 0,
        healthInsurance: adminData.salary.healthInsurance || 0,
        longTermCare: adminData.salary.longTermCare || 0,
        employmentInsurance: adminData.salary.employmentInsurance || 0,
        // 카드 사용액
        cardChildren: adminData.family?.children || 0,
        creditCard: adminData.spending?.creditCard || 0,
        debitCard: adminData.spending?.debitCard || 0,
        cash: adminData.spending?.cash || 0,
        traditionalMarket: adminData.spending?.traditionalMarket || 0,
        publicTransport: adminData.spending?.publicTransport || 0,
        culture: adminData.spending?.culture || 0,
        // 의료비 - Admin에 상세 필드 없으면 0
        infertility: 0,
        premature: 0,
        selfDisabledSenior: adminData.deductions?.medical || 0,
        otherFamily: 0,
        insuranceReimbursement: 0,
        // 교육비
        selfEducation: 0,
        preschool: 0,
        elementary: adminData.deductions?.education || 0,
        university: 0,
        // 주택자금
        housingSubscription: 0,
        rentLoanPayment: 0,
        mortgageInterest: 0,
        monthlyRent: 0,
        // 연금 및 보험
        pensionSavings: adminData.deductions?.pension || 0,
        irp: 0,
        isaTransfer: 0,
        generalInsurance: adminData.deductions?.insurance || 0,
        disabledInsurance: 0,
        // 기부금 - Admin에 상세 기부금 필드 없으므로 전체 금액만 정치자금에 임시 할당
        politicalDonation: 0,
        hometownDonation: 0,
        hometownDisaster: 0,
        specialDonation: 0,
        employeeDonation: 0,
        designatedDonation: adminData.deductions?.donation || 0,  // 일반 기부금으로 간주
        religiousDonation: 0,
        // 자녀공제
        childrenOver8: adminData.family?.childrenOver8 || 0,
        birthAdoption: adminData.family?.birthAdoption || "none",
    };
}
