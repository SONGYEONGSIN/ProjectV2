"use client";

import { useState, useRef, useCallback } from "react";
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
} from "lucide-react";
import clsx from "clsx";
import * as XLSX from "xlsx";

interface FormData {
    totalSalary: string;
    nonTaxableIncome: string;
    nationalPension: string;
    healthInsurance: string;
}

interface Notification {
    type: "success" | "error";
    message: string;
}

interface SpendingItem {
    id: string;
    name: string;
    amount: string;
}

export default function AdminPage() {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [clickedBtn, setClickedBtn] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        totalSalary: "5,682,278",
        nonTaxableIncome: "100,000",
        nationalPension: "225,852",
        healthInsurance: "185,420",
    });
    const [notification, setNotification] = useState<Notification | null>(null);
    const [showCameraModal, setShowCameraModal] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // 지출 항목 상태
    const [spendingItems, setSpendingItems] = useState<SpendingItem[]>([
        { id: "1", name: "신용카드", amount: "1,234,567" },
        { id: "2", name: "체크카드", amount: "456,789" },
        { id: "3", name: "현금영수증", amount: "50,000" },
        { id: "4", name: "대중교통", amount: "80,000" },
    ]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemAmount, setNewItemAmount] = useState("");

    const handleButtonClick = (btnName: string, callback?: () => void) => {
        setClickedBtn(btnName);
        callback?.();
        setTimeout(() => setClickedBtn(null), 300);
    };

    const showNotification = (type: "success" | "error", message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
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
        };
        setSpendingItems(prev => [...prev, newItem]);
        setNewItemName("");
        setNewItemAmount("");
        setShowAddItemModal(false);
        showNotification("success", `"${newItemName}" 항목이 추가되었습니다!`);
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
                let newFormData: Partial<FormData> = {};

                jsonData.forEach((row) => {
                    if (!row || row.length < 2) return;
                    const label = String(row[0]).toLowerCase();
                    const value = Number(row[1]) || 0;

                    if (label.includes("총급여") || label.includes("급여") || label.includes("salary")) {
                        newFormData.totalSalary = formatNumber(value);
                    } else if (label.includes("비과세") || label.includes("non-tax")) {
                        newFormData.nonTaxableIncome = formatNumber(value);
                    } else if (label.includes("국민연금") || label.includes("pension")) {
                        newFormData.nationalPension = formatNumber(value);
                    } else if (label.includes("건강보험") || label.includes("health")) {
                        newFormData.healthInsurance = formatNumber(value);
                    }
                });

                if (Object.keys(newFormData).length > 0) {
                    setFormData(prev => ({ ...prev, ...newFormData }));
                    showNotification("success", `엑셀 데이터를 성공적으로 불러왔습니다!`);
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

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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

            {/* Notification Toast */}
            {notification && (
                <div className={clsx(
                    "fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] animate-fade-in",
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
                                    onChange={(e) => setNewItemAmount(e.target.value)}
                                />
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
                            onClick={() => handleButtonClick(`year-${year}`, () => setSelectedYear(year))}
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
                                <FileText size={14} className={clsx("md:w-4 md:h-4", clickedBtn === "excel" && "animate-spin")} /> 엑셀 업로드
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
                                <Camera size={14} className={clsx("md:w-4 md:h-4", clickedBtn === "ocr" && "animate-pulse")} /> OCR 촬영
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold mb-2">총급여 (세전)</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={formData.totalSalary}
                                onChange={(e) => handleInputChange("totalSalary", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">비과세 소득</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={formData.nonTaxableIncome}
                                onChange={(e) => handleInputChange("nonTaxableIncome", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">국민연금</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={formData.nationalPension}
                                onChange={(e) => handleInputChange("nationalPension", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">건강보험</label>
                            <input
                                type="text"
                                className="neo-input"
                                value={formData.healthInsurance}
                                onChange={(e) => handleInputChange("healthInsurance", e.target.value)}
                            />
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
                        <button
                            onClick={() => handleButtonClick("sync")}
                            className={clsx(
                                "w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border-2 border-black font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_#000] transition-all",
                                clickedBtn === "sync"
                                    ? "bg-neo-cyan translate-x-[4px] translate-y-[4px] shadow-none"
                                    : "bg-black text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
                            )}
                        >
                            <RefreshCw size={14} className={clsx("md:w-4 md:h-4", clickedBtn === "sync" && "animate-spin")} /> 데이터 동기화
                        </button>
                    </div>

                    <div className="space-y-4">
                        {spendingItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b-2 border-gray-100 pb-2 group">
                                <span className="font-bold">{item.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-lg tracking-tight">
                                        {item.amount}원
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
                    onClick={() => handleButtonClick("save", () => showNotification("success", "저장되었습니다!"))}
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
        </div>
    );
}
