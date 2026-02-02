"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
    DollarSign,
    CreditCard,
    FileText,
    Camera,
    RefreshCw,
    Plus,
    X,
    CheckCircle,
    AlertCircle,
    Users,
} from "lucide-react";
import clsx from "clsx";
import * as XLSX from "xlsx";
import { saveAdminData, loadAdminData, AdminData } from "@/lib/tax-store";

// 월별 급여 데이터
interface MonthlySalaryData {
    totalSalary: string;
    mealAllowance: string;         // 비과세 식대
    nationalPension: string;       // 국민연금
    healthInsurance: string;       // 건강보험
    longTermCare: string;          // 노인장기요양보험
    employmentInsurance: string;   // 고용보험
    prepaidTax: string;            // 기납부세액 (소득세)
    localIncomeTax: string;        // 기납부세액 (지방소득세)
}

interface Notification {
    type: "success" | "error";
    message: string;
}

interface SpendingItem {
    id: string;
    name: string;
    amount: string;
    month: number; // 1~12월
}

export default function AdminPage() {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [monthlySalary, setMonthlySalary] = useState<{ [month: number]: MonthlySalaryData }>(() => {
        const defaultData: MonthlySalaryData = {
            totalSalary: "0",
            mealAllowance: "0",
            nationalPension: "0",
            healthInsurance: "0",
            longTermCare: "0",
            employmentInsurance: "0",
            prepaidTax: "0",
            localIncomeTax: "0",
        };
        const initial: { [month: number]: MonthlySalaryData } = {};
        for (let m = 1; m <= 12; m++) {
            initial[m] = { ...defaultData };
        }
        return initial;
    });
    const [clickedBtn, setClickedBtn] = useState<string | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [showCameraModal, setShowCameraModal] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // 지출 항목 상태
    const [spendingItems, setSpendingItems] = useState<SpendingItem[]>([
        { id: "1", name: "신용카드", amount: "1,234,567", month: 1 },
        { id: "2", name: "체크카드", amount: "456,789", month: 1 },
        { id: "3", name: "현금영수증", amount: "50,000", month: 1 },
        { id: "4", name: "대중교통", amount: "80,000", month: 1 },
    ]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemAmount, setNewItemAmount] = useState("");
    const [newItemMonth, setNewItemMonth] = useState(1); // 신규 항목 월 선택

    // 가족정보 상태 (기본공제 - 본인 제외)
    const [familyData, setFamilyData] = useState({
        spouse: false,
        children: 0,
        childrenUnder6: 0,       // 6세 이하 자녀 수 (보육수당)
        childrenOver8: 0,        // 8세 이상 자녀 수 (자녀세액공제)
        birthAdoption: "none" as "none" | "first" | "second" | "third1" | "third2" | "third3",  // 출생·입양자
        parents: 0,
        siblings: 0,
        foster: 0,               // 위탁아동
        recipient: 0,            // 기초생활수급자
        disabled: 0,
        seniorOver70: 0,
        singleParent: false,
    });

    const handleButtonClick = (btnName: string, callback?: () => void) => {
        setClickedBtn(btnName);
        callback?.();
        setTimeout(() => setClickedBtn(null), 300);
    };

    const showNotification = (type: "success" | "error", message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // 저장된 데이터 불러오기 (연도별)
    const loadYearData = (year: number) => {
        const savedData = loadAdminData(year);
        if (savedData) {
            // 월별 급여 데이터 복원
            if (savedData.salary.monthly) {
                setMonthlySalary(savedData.salary.monthly);
            } else {
                // 구버전 호환: 단일 데이터를 12개월에 복사
                const legacyData: MonthlySalaryData = {
                    totalSalary: savedData.salary.totalSalary?.toLocaleString("ko-KR") || "0",
                    mealAllowance: savedData.salary.mealAllowance?.toLocaleString("ko-KR") || "0",
                    nationalPension: savedData.salary.nationalPension?.toLocaleString("ko-KR") || "0",
                    healthInsurance: savedData.salary.healthInsurance?.toLocaleString("ko-KR") || "0",
                    longTermCare: savedData.salary.longTermCare?.toLocaleString("ko-KR") || "0",
                    employmentInsurance: savedData.salary.employmentInsurance?.toLocaleString("ko-KR") || "0",
                    prepaidTax: savedData.salary.prepaidTax?.toLocaleString("ko-KR") || "0",
                    localIncomeTax: savedData.salary.localIncomeTax?.toLocaleString("ko-KR") || "0",
                };
                const monthlyInit: { [month: number]: MonthlySalaryData } = {};
                for (let m = 1; m <= 12; m++) {
                    monthlyInit[m] = { ...legacyData };
                }
                setMonthlySalary(monthlyInit);
            }
            // 6세 이하 자녀 수는 가족 정보로 복원
            if (savedData.salary.childrenUnder6 !== undefined) {
                setFamilyData(prev => ({ ...prev, childrenUnder6: savedData.salary.childrenUnder6 }));
            }
            // 지출 항목 복원 - spendingItems 배열 우선 사용 (없으면 구버전 호환)
            if (savedData.spendingItems && savedData.spendingItems.length > 0) {
                // 새 형식: spendingItems 배열 직접 복원
                setSpendingItems(savedData.spendingItems);
            } else {
                // 구버전 호환: 카테고리별 복원
                const restoredSpending: SpendingItem[] = [];
                if (savedData.spending.creditCard > 0) {
                    restoredSpending.push({ id: "1", name: "신용카드", amount: savedData.spending.creditCard.toLocaleString("ko-KR"), month: 1 });
                }
                if (savedData.spending.debitCard > 0) {
                    restoredSpending.push({ id: "2", name: "체크카드", amount: savedData.spending.debitCard.toLocaleString("ko-KR"), month: 1 });
                }
                if (savedData.spending.cash > 0) {
                    restoredSpending.push({ id: "3", name: "현금영수증", amount: savedData.spending.cash.toLocaleString("ko-KR"), month: 1 });
                }
                if (savedData.spending.publicTransport > 0) {
                    restoredSpending.push({ id: "4", name: "대중교통", amount: savedData.spending.publicTransport.toLocaleString("ko-KR"), month: 1 });
                }
                setSpendingItems(restoredSpending.length > 0 ? restoredSpending : []);
            }
            // 가족정보 복원 (이전 데이터 호환)
            if (savedData.family) {
                setFamilyData({
                    spouse: savedData.family.spouse || false,
                    children: savedData.family.children || 0,
                    childrenUnder6: savedData.family.childrenUnder6 || savedData.salary.childrenUnder6 || 0,
                    childrenOver8: savedData.family.childrenOver8 || 0,
                    birthAdoption: savedData.family.birthAdoption || "none",
                    parents: savedData.family.parents || 0,
                    siblings: savedData.family.siblings || 0,
                    foster: savedData.family.foster || 0,
                    recipient: savedData.family.recipient || 0,
                    disabled: savedData.family.disabled || 0,
                    seniorOver70: savedData.family.seniorOver70 || 0,
                    singleParent: savedData.family.singleParent || false,
                });
            }
        } else {
            // 데이터 없을 시 초기화
            const defaultData: MonthlySalaryData = {
                totalSalary: "0",
                mealAllowance: "0",
                nationalPension: "0",
                healthInsurance: "0",
                longTermCare: "0",
                employmentInsurance: "0",
                prepaidTax: "0",
                localIncomeTax: "0",
            };
            const initial: { [month: number]: MonthlySalaryData } = {};
            for (let m = 1; m <= 12; m++) {
                initial[m] = { ...defaultData };
            }
            setMonthlySalary(initial);
            setSpendingItems([]);
            setFamilyData({
                spouse: false,
                children: 0,
                childrenUnder6: 0,
                childrenOver8: 0,
                birthAdoption: "none",
                parents: 0,
                siblings: 0,
                foster: 0,
                recipient: 0,
                disabled: 0,
                seniorOver70: 0,
                singleParent: false
            });
        }
    };

    // 초기 로드 - localStorage에서 마지막 선택 연도 복원
    useEffect(() => {
        const savedYear = localStorage.getItem("taxai_selected_year");
        const initialYear = savedYear ? parseInt(savedYear) : 2026; // 기본값 2026년
        setSelectedYear(initialYear);
        loadYearData(initialYear);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 연도 변경 시 데이터 리로드 + 선택 연도 저장
    const handleYearChange = (year: number) => {
        setSelectedYear(year);
        localStorage.setItem("taxai_selected_year", year.toString());
        loadYearData(year);
    };

    // 데이터 저장 함수
    const handleSave = () => {
        const parseAmount = (str: string): number => {
            return parseInt(str.replace(/[^0-9]/g, "")) || 0;
        };

        // 지출 항목에서 각 카테고리 금액 추출
        const getSpendingAmount = (name: string): number => {
            const item = spendingItems.find(i => i.name.includes(name));
            return item ? parseAmount(item.amount) : 0;
        };

        const adminData: AdminData = {
            year: selectedYear,
            salary: {
                monthly: monthlySalary,
                childrenUnder6: familyData.childrenUnder6 || 0,
                // 연간 합계 (계산기로 전달용)
                totalSalary: Object.values(monthlySalary).reduce((sum, m) => sum + parseAmount(m.totalSalary), 0),
                mealAllowance: Object.values(monthlySalary).reduce((sum, m) => sum + parseAmount(m.mealAllowance), 0),
                nationalPension: Object.values(monthlySalary).reduce((sum, m) => sum + parseAmount(m.nationalPension), 0),
                healthInsurance: Object.values(monthlySalary).reduce((sum, m) => sum + parseAmount(m.healthInsurance), 0),
                longTermCare: Object.values(monthlySalary).reduce((sum, m) => sum + parseAmount(m.longTermCare), 0),
                employmentInsurance: Object.values(monthlySalary).reduce((sum, m) => sum + parseAmount(m.employmentInsurance), 0),
                prepaidTax: Object.values(monthlySalary).reduce((sum, m) => sum + parseAmount(m.prepaidTax), 0),
            },
            spending: {
                creditCard: getSpendingAmount("신용카드"),
                debitCard: getSpendingAmount("체크카드"),
                cash: getSpendingAmount("현금영수증"),
                publicTransport: getSpendingAmount("대중교통"),
                traditionalMarket: getSpendingAmount("전통시장"),
                culture: getSpendingAmount("문화"),
            },
            family: {
                spouse: familyData.spouse,
                children: familyData.children,
                childrenUnder6: familyData.childrenUnder6,
                childrenOver8: familyData.childrenOver8,
                birthAdoption: familyData.birthAdoption,
                parents: familyData.parents,
                siblings: familyData.siblings,
                foster: familyData.foster,
                recipient: familyData.recipient,
                disabled: familyData.disabled,
                seniorOver70: familyData.seniorOver70,
                singleParent: familyData.singleParent,
            },
            deductions: {
                medical: 0,
                education: 0,
                housing: 0,
                pension: 0,
                insurance: 0,
                donation: 0,
            },
            spendingItems: spendingItems, // 지출 항목 원본 저장
            updatedAt: new Date().toISOString(),
        };

        saveAdminData(selectedYear, adminData);
        showNotification("success", "저장되었습니다!");
    };

    const handleAddItem = () => {
        if (!newItemName.trim() || !newItemAmount.trim()) {
            showNotification("error", "항목명과 금액을 모두 입력해주세요.");
            return;
        }
        const newItem: SpendingItem = {
            id: Date.now().toString(),
            name: newItemName,
            amount: newItemAmount,
            month: newItemMonth,
        };
        setSpendingItems(prev => [...prev, newItem]);
        setNewItemName("");
        setNewItemAmount("");
        setNewItemMonth(1);
        setShowAddItemModal(false);
        showNotification("success", `"${newItemName}" 항목이 ${newItemMonth}월에 추가되었습니다!`);
    };

    const handleDeleteItem = (id: string) => {
        setSpendingItems(prev => prev.filter(item => item.id !== id));
        showNotification("success", "항목이 삭제되었습니다.");
    };

    const formatNumber = (num: number): string => {
        return num.toLocaleString("ko-KR");
    };

    // Excel Upload Handler
    const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | number)[][];

                // Look for salary data in the Excel file
                let newSalaryData: Partial<MonthlySalaryData> = {};

                jsonData.forEach((row) => {
                    if (!row || row.length < 2) return;
                    const label = String(row[0]).toLowerCase();
                    const value = Number(row[1]) || 0;

                    if (label.includes("총급여") || label.includes("급여") || label.includes("salary")) {
                        newSalaryData.totalSalary = formatNumber(value);
                    } else if (label.includes("식대") || label.includes("비과세")) {
                        newSalaryData.mealAllowance = formatNumber(value);
                    } else if (label.includes("국민연금") || label.includes("pension")) {
                        newSalaryData.nationalPension = formatNumber(value);
                    } else if (label.includes("건강보험") || label.includes("health")) {
                        newSalaryData.healthInsurance = formatNumber(value);
                    } else if (label.includes("장기요양") || label.includes("long")) {
                        newSalaryData.longTermCare = formatNumber(value);
                    } else if (label.includes("고용보험") || label.includes("employment")) {
                        newSalaryData.employmentInsurance = formatNumber(value);
                    }
                });

                if (Object.keys(newSalaryData).length > 0) {
                    setMonthlySalary(prev => ({
                        ...prev,
                        [selectedMonth]: { ...prev[selectedMonth], ...newSalaryData }
                    }));
                    showNotification("success", `${selectedMonth}월 엑셀 데이터를 성공적으로 불러왔습니다!`);
                } else {
                    showNotification("error", "인식할 수 있는 데이터가 없습니다. 엑셀 형식을 확인해주세요.");
                }
            } catch {
                showNotification("error", "엑셀 파일을 읽는 중 오류가 발생했습니다.");
            }
        };
        reader.readAsArrayBuffer(file);
        e.target.value = ""; // Reset input
    };

    // Camera Functions
    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraActive(true);
            setCapturedImage(null);
        } catch {
            showNotification("error", "카메라에 접근할 수 없습니다. 권한을 확인해주세요.");
            setShowCameraModal(false);
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraActive(false);
    }, []);

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(videoRef.current, 0, 0);
            const imageData = canvas.toDataURL("image/jpeg");
            setCapturedImage(imageData);
            stopCamera();
        }
    };

    const handleCameraOpen = () => {
        setShowCameraModal(true);
        setTimeout(startCamera, 100);
    };

    const handleCameraClose = () => {
        stopCamera();
        setShowCameraModal(false);
        setCapturedImage(null);
    };

    const handleUseCapture = () => {
        // In a real implementation, this would send the image to an OCR API
        // For now, we'll just show a success message
        showNotification("success", "이미지가 캡처되었습니다. OCR 분석은 서버 연동이 필요합니다.");
        handleCameraClose();
    };

    const handleSalaryInputChange = (field: keyof MonthlySalaryData, value: string) => {
        // 숫자만 추출 후 천원단위 포맷팅
        const numericValue = value.replace(/[^0-9]/g, "");
        const formatted = numericValue ? parseInt(numericValue).toLocaleString("ko-KR") : "0";

        setMonthlySalary(prev => ({
            ...prev,
            [selectedMonth]: {
                ...prev[selectedMonth],
                [field]: formatted
            }
        }));
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Hidden file input for Excel upload */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                className="hidden"
            />

            {/* Notification Toast - 저장 버튼 위에 표시 */}
            {notification && (
                <div className={clsx(
                    "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] animate-fade-in md:bottom-28",
                    notification.type === "success" ? "bg-neo-cyan" : "bg-neo-orange"
                )}>
                    {notification.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-bold text-sm">{notification.message}</span>
                </div>
            )}

            {/* Add Item Modal */}
            {showAddItemModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="bg-white border-[3px] border-black p-6 max-w-md w-full mx-4 shadow-[8px_8px_0px_0px_#000]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-black">수동 항목 추가</h3>
                            <button
                                onClick={() => handleButtonClick("modalClose", () => setShowAddItemModal(false))}
                                className={clsx(
                                    "p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all",
                                    clickedBtn === "modalClose"
                                        ? "bg-neo-orange translate-x-[2px] translate-y-[2px] shadow-none"
                                        : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]"
                                )}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold mb-2">항목명</label>
                                <input
                                    type="text"
                                    className="neo-input"
                                    placeholder="예: 의료비, 교육비"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">금액 (원)</label>
                                <input
                                    type="text"
                                    className="neo-input"
                                    placeholder="예: 500,000"
                                    value={newItemAmount}
                                    onChange={(e) => {
                                        // 숫자만 추출 후 천 단위 포맷
                                        const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                        const formatted = numericValue ? parseInt(numericValue).toLocaleString("ko-KR") : "";
                                        setNewItemAmount(formatted);
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">월 선택</label>
                                <select
                                    className="neo-input"
                                    value={newItemMonth}
                                    onChange={(e) => setNewItemMonth(parseInt(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                                        <option key={m} value={m}>{m}월</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={() => handleButtonClick("modalCancel", () => setShowAddItemModal(false))}
                                className={clsx(
                                    "flex-1 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all",
                                    clickedBtn === "modalCancel"
                                        ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none"
                                        : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                                )}
                            >
                                취소
                            </button>
                            <button
                                onClick={() => handleButtonClick("modalAdd", handleAddItem)}
                                className={clsx(
                                    "flex-1 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all",
                                    clickedBtn === "modalAdd"
                                        ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none"
                                        : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                                )}
                            >
                                추가
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Camera Modal */}
            {showCameraModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="bg-white border-[3px] border-black p-4 max-w-lg w-full mx-4 shadow-[8px_8px_0px_0px_#000]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-black">OCR 촬영</h3>
                            <button
                                onClick={handleCameraClose}
                                className="p-2 hover:bg-gray-100 border-2 border-black"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="aspect-video bg-black mb-4 border-2 border-black overflow-hidden">
                            {capturedImage ? (
                                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                            ) : (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <div className="flex gap-2">
                            {capturedImage ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setCapturedImage(null);
                                            startCamera();
                                        }}
                                        className="flex-1 py-3 font-bold border-2 border-black bg-white hover:bg-gray-100"
                                    >
                                        다시 촬영
                                    </button>
                                    <button
                                        onClick={handleUseCapture}
                                        className="flex-1 py-3 font-bold border-2 border-black bg-neo-cyan hover:bg-cyan-300"
                                    >
                                        사용하기
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={captureImage}
                                    disabled={!isCameraActive}
                                    className={clsx(
                                        "w-full py-3 font-bold border-2 border-black",
                                        isCameraActive ? "bg-neo-yellow hover:bg-yellow-400" : "bg-gray-300 cursor-not-allowed"
                                    )}
                                >
                                    <Camera className="inline mr-2" size={20} />
                                    촬영하기
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-black uppercase">
                    기초자료 등록
                </h2>
                <div className="flex gap-2 flex-wrap">
                    {[2024, 2025, 2026].map((year) => (
                        <button
                            key={year}
                            onClick={() => handleButtonClick(`year-${year}`, () => handleYearChange(year))}
                            className={clsx(
                                "px-3 md:px-4 py-2 font-bold border-2 border-black text-sm shadow-[4px_4px_0px_0px_#000] transition-all",
                                selectedYear === year
                                    ? "bg-black text-white translate-x-[4px] translate-y-[4px] shadow-none"
                                    : clickedBtn === `year-${year}`
                                        ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none"
                                        : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                            )}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            {/* Monthly Data Grid */}
            <div className="space-y-8">
                {/* Salary Section */}
                <div className="bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-neo-cyan p-2 border-2 border-black">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-black">급여 데이터</h3>
                                <p className="text-xs md:text-sm font-bold text-gray-500">
                                    매월 급여명세서 기준 입력
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Month Tabs */}
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-1 mb-4 border-b-2 border-black pb-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                            <button
                                key={month}
                                onClick={() => handleButtonClick(`month-${month}`, () => setSelectedMonth(month))}
                                className={clsx(
                                    "py-2 font-bold text-sm border-2 border-black transition-all",
                                    selectedMonth === month
                                        ? "bg-black text-white shadow-none"
                                        : clickedBtn === `month-${month}`
                                            ? "bg-neo-cyan translate-x-[2px] translate-y-[2px] shadow-none"
                                            : "bg-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000]"
                                )}
                            >
                                {month}월
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold mb-2">월급여 (세전)</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.totalSalary || "0"}
                                onChange={(e) => handleSalaryInputChange("totalSalary", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">비과세 식대</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.mealAllowance || "0"}
                                onChange={(e) => handleSalaryInputChange("mealAllowance", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">국민연금</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.nationalPension || "0"}
                                onChange={(e) => handleSalaryInputChange("nationalPension", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">건강보험</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.healthInsurance || "0"}
                                onChange={(e) => handleSalaryInputChange("healthInsurance", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">노인장기요양보험</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.longTermCare || "0"}
                                onChange={(e) => handleSalaryInputChange("longTermCare", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">고용보험</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.employmentInsurance || "0"}
                                onChange={(e) => handleSalaryInputChange("employmentInsurance", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">기납부세액 (소득세)</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.prepaidTax || "0"}
                                onChange={(e) => handleSalaryInputChange("prepaidTax", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">기납부세액 (지방소득세)</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={monthlySalary[selectedMonth]?.localIncomeTax || "0"}
                                onChange={(e) => handleSalaryInputChange("localIncomeTax", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Family Info Section */}
                <div className="bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-neo-yellow p-2 border-2 border-black">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-black">가족 정보</h3>
                            <p className="text-xs md:text-sm font-bold text-gray-500">
                                인적공제 및 카드공제 한도 확대 적용
                            </p>
                        </div>
                    </div>

                    {/* 기본공제 섹션 */}
                    <div className="mb-6">
                        <h4 className="text-base font-black mb-3 px-2 py-1 bg-neo-cyan border-2 border-black inline-block">기본공제</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold mb-2">배우자공제</label>
                                <div className="flex gap-2">
                                    {[false, true].map((hasSpouse) => (
                                        <button
                                            key={hasSpouse ? "yes" : "no"}
                                            onClick={() => setFamilyData(prev => ({ ...prev, spouse: hasSpouse }))}
                                            className={clsx(
                                                "flex-1 p-3 border-[3px] border-black font-semibold text-lg transition-colors",
                                                familyData.spouse === hasSpouse ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                                            )}
                                        >
                                            {hasSpouse ? "있음" : "없음"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold mb-2">만 20세 이하 자녀 수</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="neo-input"
                                    value={familyData.children}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, children: Math.max(0, parseInt(e.target.value) || 0) }))}
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">직계존속 (만 60세 이상)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="neo-input"
                                    value={familyData.parents}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, parents: Math.max(0, parseInt(e.target.value) || 0) }))}
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">형제자매</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="neo-input"
                                    value={familyData.siblings}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, siblings: Math.max(0, parseInt(e.target.value) || 0) }))}
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">위탁아동 (6개월 이상)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="neo-input"
                                    value={familyData.foster}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, foster: Math.max(0, parseInt(e.target.value) || 0) }))}
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">기초생활수급자</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="neo-input"
                                    value={familyData.recipient}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, recipient: Math.max(0, parseInt(e.target.value) || 0) }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 세액공제 섹션 */}
                    <div className="mb-6">
                        <h4 className="text-base font-black mb-3 px-2 py-1 bg-neo-yellow border-2 border-black inline-block">세액공제</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold mb-2">만 8세 이상 자녀 수</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="neo-input"
                                    value={familyData.childrenOver8}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, childrenOver8: Math.max(0, parseInt(e.target.value) || 0) }))}
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">출생·입양자</label>
                                <select
                                    className="neo-input"
                                    value={familyData.birthAdoption}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, birthAdoption: e.target.value as "none" | "first" | "second" | "third1" | "third2" | "third3" }))}
                                >
                                    <option value="none">선택 안함</option>
                                    <option value="first">첫째</option>
                                    <option value="second">둘째</option>
                                    <option value="third1">셋째 이상 (1명)</option>
                                    <option value="third2">셋째 이상 (2명)</option>
                                    <option value="third3">셋째 이상 (3명)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 비과세 섹션 */}
                    <div>
                        <h4 className="text-base font-black mb-3 px-2 py-1 bg-neo-pink border-2 border-black inline-block">비과세</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold mb-2">만 6세 이하 자녀 수 (보육수당)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="neo-input"
                                    value={familyData.childrenUnder6}
                                    onChange={(e) => setFamilyData(prev => ({ ...prev, childrenUnder6: Math.max(0, parseInt(e.target.value) || 0) }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spending Section */}
                <div className="bg-white border-[3px] border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-neo-orange p-2 border-2 border-black">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-black">
                                    지출 데이터 (1월)
                                </h3>
                                <p className="text-xs md:text-sm font-bold text-gray-500">
                                    카드사 연동으로 자동 입력
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap w-full md:w-auto">
                            <button
                                onClick={() => handleButtonClick("excel", () => fileInputRef.current?.click())}
                                className={clsx(
                                    "flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all",
                                    clickedBtn === "excel"
                                        ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none"
                                        : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                                )}
                            >
                                <FileText size={14} className={clsx("md:w-4 md:h-4", clickedBtn === "excel" && "animate-spin")} /> 엑셀
                            </button>
                            <button
                                onClick={() => handleButtonClick("ocr", handleCameraOpen)}
                                className={clsx(
                                    "flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all",
                                    clickedBtn === "ocr"
                                        ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none"
                                        : "bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                                )}
                            >
                                <Camera size={14} className={clsx("md:w-4 md:h-4", clickedBtn === "ocr" && "animate-pulse")} /> OCR
                            </button>
                            <button
                                onClick={() => handleButtonClick("sync", () => showNotification("success", "카드사 연동 기능 준비중입니다!"))}
                                className={clsx(
                                    "flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all",
                                    clickedBtn === "sync"
                                        ? "bg-neo-cyan translate-x-[4px] translate-y-[4px] shadow-none"
                                        : "bg-black text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                                )}
                            >
                                <RefreshCw size={14} className={clsx("md:w-4 md:h-4", clickedBtn === "sync" && "animate-spin")} /> 동기화
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {spendingItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b-2 border-gray-100 pb-2 group">
                                <span className="font-bold">{item.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-lg tracking-tight">
                                        {parseInt(item.amount.replace(/[^0-9]/g, "") || "0").toLocaleString("ko-KR")}원
                                    </span>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 text-red-500 transition-opacity"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => handleButtonClick("addItem", () => setShowAddItemModal(true))}
                        className={clsx(
                            "w-full mt-6 py-3 border-2 border-dashed font-bold transition-all flex items-center justify-center gap-2",
                            clickedBtn === "addItem"
                                ? "border-black bg-neo-yellow text-black"
                                : "border-gray-300 text-gray-400 hover:border-black hover:text-black hover:bg-gray-50"
                        )}
                    >
                        <Plus size={16} /> 수동 항목 추가
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black flex justify-center gap-4 z-40 md:static md:bg-transparent md:border-none md:p-0 md:mt-8">
                <button
                    onClick={() => handleButtonClick("cancel")}
                    className={clsx(
                        "px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all",
                        clickedBtn === "cancel"
                            ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none"
                            : "bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                    )}
                >
                    변경취소
                </button>
                <button
                    onClick={() => handleButtonClick("save", handleSave)}
                    className={clsx(
                        "px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all",
                        clickedBtn === "save"
                            ? "bg-neo-orange translate-x-[4px] translate-y-[4px] shadow-none"
                            : "bg-neo-cyan hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                    )}
                >
                    저장하기
                </button>
            </div>
        </div >
    );
}
