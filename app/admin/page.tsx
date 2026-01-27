"use client";

import {
    DollarSign,
    CreditCard,
    FileText,
    Camera,
    RefreshCw,
    Plus,
} from "lucide-react";

export default function AdminPage() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-black uppercase">
                    Data Management
                </h2>
                <div className="flex gap-2 flex-wrap">
                    <button className="px-3 md:px-4 py-2 font-bold border-2 border-black bg-white text-sm">
                        2024
                    </button>
                    <button className="px-3 md:px-4 py-2 font-bold border-2 border-black bg-black text-white text-sm">
                        2025
                    </button>
                    <button className="px-3 md:px-4 py-2 font-bold border-2 border-black bg-white text-sm">
                        2026
                    </button>
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
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 font-bold text-xs md:text-sm">
                                <FileText size={14} className="md:w-4 md:h-4" /> 엑셀 업로드
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-black bg-neo-yellow hover:bg-yellow-400 font-bold text-xs md:text-sm">
                                <Camera size={14} className="md:w-4 md:h-4" /> OCR 촬영
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold mb-2">총급여 (세전)</label>
                            <input
                                type="text"
                                className="neo-input"
                                defaultValue="5,682,278"
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">비과세 소득</label>
                            <input type="text" className="neo-input" defaultValue="100,000" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">국민연금</label>
                            <input type="text" className="neo-input" defaultValue="225,852" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">건강보험</label>
                            <input type="text" className="neo-input" defaultValue="185,420" />
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
                        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-black text-white hover:bg-gray-800 font-bold text-xs md:text-sm">
                            <RefreshCw size={14} className="md:w-4 md:h-4" /> 데이터 동기화
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
                            <span className="font-bold">신용카드</span>
                            <span className="font-bold text-lg tracking-tight">
                                1,234,567원
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
                            <span className="font-bold">체크카드</span>
                            <span className="font-bold text-lg tracking-tight">
                                456,789원
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
                            <span className="font-bold">현금영수증</span>
                            <span className="font-bold text-lg tracking-tight">50,000원</span>
                        </div>
                        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
                            <span className="font-bold">대중교통</span>
                            <span className="font-bold text-lg tracking-tight">80,000원</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 font-bold text-gray-400 hover:border-black hover:text-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                        <Plus size={16} /> 수동 항목 추가
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-black flex justify-center gap-4 z-40 md:static md:bg-transparent md:border-none md:p-0 md:mt-8">
                <button className="px-6 py-3 font-bold border-2 border-black bg-white hover:bg-gray-100">
                    변경취소
                </button>
                <button className="px-6 py-3 font-bold border-2 border-black bg-neo-cyan hover:bg-cyan-300 shadow-[4px_4px_0px_0px_#000]">
                    저장하기
                </button>
            </div>
        </div>
    );
}
