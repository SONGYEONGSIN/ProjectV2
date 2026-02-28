// Tax Data Store - localStorage를 활용한 세금 데이터 저장/로드 유틸리티

import { TaxData } from './ai-recommendation';

const TAX_DATA_KEY = 'tax_calculator_data';
const ADMIN_DATA_KEY = 'admin_data';

// 세금 데이터 저장
export function saveTaxData(data: TaxData): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TAX_DATA_KEY, JSON.stringify(data));
    }
}

// 세금 데이터 로드
export function loadTaxData(): TaxData | null {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(TAX_DATA_KEY);
        if (stored) {
            try {
                return JSON.parse(stored) as TaxData;
            } catch {
                return null;
            }
        }
    }
    return null;
}

// Admin 데이터 타입
export interface AdminData {
    year: number;
    salary: {
        totalSalary: number;
        mealAllowance?: number;
        childrenUnder6?: number;
        prepaidTax?: number;
        nationalPension: number;
        healthInsurance: number;
        longTermCare?: number;
        employmentInsurance?: number;
    };
    spending: {
        creditCard: number;
        debitCard: number;
        cash: number;
        publicTransport: number;
        traditionalMarket?: number;
        culture?: number;
    };
    family?: {
        spouse?: boolean;
        children?: number;
        parents?: number;
        siblings?: number;
        foster?: number;
        recipient?: number;
    };
}

// Admin 데이터 저장
export function saveAdminData(data: AdminData): void {
    if (typeof window !== 'undefined') {
        const key = `${ADMIN_DATA_KEY}_${data.year}`;
        localStorage.setItem(key, JSON.stringify(data));
    }
}

// Admin 데이터 로드
export function loadAdminData(year: number): AdminData | null {
    if (typeof window !== 'undefined') {
        const key = `${ADMIN_DATA_KEY}_${year}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                return JSON.parse(stored) as AdminData;
            } catch {
                return null;
            }
        }
    }
    return null;
}

// 모든 Admin 데이터 삭제
export function clearAdminData(year?: number): void {
    if (typeof window !== 'undefined') {
        if (year) {
            localStorage.removeItem(`${ADMIN_DATA_KEY}_${year}`);
        } else {
            // 모든 연도 데이터 삭제
            Object.keys(localStorage)
                .filter(key => key.startsWith(ADMIN_DATA_KEY))
                .forEach(key => localStorage.removeItem(key));
        }
    }
}

// 세금 데이터 삭제
export function clearTaxData(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TAX_DATA_KEY);
    }
}
