import React, { useState } from "react";
import {
  Home,
  Calculator,
  Settings,
  Bell,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  FileText,
  CreditCard,
  Building,
  HeartPulse,
  GraduationCap,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCw,
  Camera,
  Plus,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { LoginView } from "./components/LoginView";
import { SignupView } from "./components/SignupView";

// --- Types ---
type Tab =
  | "dashboard"
  | "calculator"
  | "admin"
  | "landing"
  | "login"
  | "signup";

interface AIAlert {
  id: string;
  type: "high" | "medium" | "low";
  message: string;
  detail: string;
}

// --- Mock Data ---
const MOCK_ALERTS: AIAlert[] = [
  {
    id: "1",
    type: "high",
    message: "신용카드 30만원 추가 사용 시",
    detail:
      "15만원 추가 절세 가능합니다. (현재 공제 문턱까지 98% 도달)",
  },
  {
    id: "2",
    type: "medium",
    message: "퇴직연금(IRP) 300만원 납입 추천",
    detail:
      "최대 45만원 세액공제를 받을 수 있습니다. 올해 한도가 남아있습니다.",
  },
  {
    id: "3",
    type: "low",
    message: "기부금 10만원으로 9만원 공제",
    detail:
      "정치자금 기부금 10만원 이하는 전액 세액공제 됩니다.",
  },
];

const MOCK_CHANGES_2026 = [
  {
    id: "1",
    title: "결혼세액공제 신설",
    desc: "혼인신고 시 1인당 50만원 (부부 합산 100만원) 세액공제 적용",
  },
  {
    id: "2",
    title: "주택마련저축 한도 상향",
    desc: "청약저축 소득공제 납입 한도가 연 240만원에서 300만원으로 상향",
  },
  {
    id: "3",
    title: "ISA 연금계좌 전환",
    desc: "ISA 만기 자금을 연금계좌로 전환 시 세액공제 한도 추가 부여",
  },
];

// --- Components ---

const Tooltip = ({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-black text-white text-xs p-3 border-[2px] border-white shadow-[4px_4px_0px_0px_#00D9FF]"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Badge = ({
  type,
}: {
  type: "high" | "medium" | "low" | "new";
}) => {
  const styles = {
    high: "bg-neo-orange text-white",
    medium: "bg-neo-yellow text-black",
    low: "bg-neo-cyan text-black",
    new: "bg-neo-black text-white animate-pulse",
  };

  const labels = {
    high: "HIGH IMPACT",
    medium: "MEDIUM",
    low: "INFO",
    new: "NEW 2026",
  };

  return (
    <span
      className={clsx(
        "px-2 py-0.5 text-[10px] font-black border border-black",
        styles[type],
      )}
    >
      {labels[type]}
    </span>
  );
};

// --- Views ---

const LandingView = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in text-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 relative"
      >
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-neo-yellow rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-neo-cyan rounded-full blur-xl opacity-50 animate-pulse delay-75"></div>

        <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4 relative z-10">
          TAX<span className="text-neo-orange">AI</span>
        </h1>
        <div className="text-2xl md:text-3xl font-bold border-2 border-black bg-white inline-block px-6 py-2 shadow-[8px_8px_0px_0px_#000] rotate-[-2deg]">
          2026 AI 연말정산 솔루션
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-16">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#00D9FF]"
        >
          <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-transparent">
            <Sparkles size={24} />
          </div>
          <h3 className="text-xl font-black mb-2">
            AI 실시간 분석
          </h3>
          <p className="text-sm font-bold text-gray-500">
            소비 패턴을 분석하여
            <br />
            최적의 공제 전략을 제안합니다.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#FFB800]"
        >
          <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-transparent">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-xl font-black mb-2">
            예상 환급액 계산
          </h3>
          <p className="text-sm font-bold text-gray-500">
            2026년 세법 개정안을 반영한
            <br />
            정확한 환급액을 확인하세요.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#FF5E00]"
        >
          <div className="bg-neo-black text-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-transparent">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-xl font-black mb-2">
            원클릭 관리
          </h3>
          <p className="text-sm font-bold text-gray-500">
            복잡한 서류 없이
            <br />
            데이터 연동으로 간편하게.
          </p>
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative px-12 py-6 bg-neo-black text-white text-2xl font-black tracking-tight border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
      >
        <span className="relative z-10 flex items-center gap-3">
          무료로 시작하기
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-neo-orange translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform border-2 border-black"></div>
      </motion.button>

      <p className="mt-8 text-sm font-bold text-gray-400">
        * 2026년 세법 개정안 완벽 반영
      </p>
    </div>
  );
};

const DashboardView = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Card */}
      <div className="neo-card bg-neo-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp size={120} />
        </div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-neo-orange rounded-full"></span>
          2026년 예상 환급액
        </h2>
        <div className="flex flex-col md:flex-row items-end gap-4 mb-4">
          <span className="text-5xl md:text-7xl font-black tracking-tighter text-neo-black">
            956,610
            <span className="text-2xl text-gray-500 font-bold ml-1">
              원
            </span>
          </span>
          <div className="neo-badge bg-neo-cyan text-black mb-2">
            지난해 대비 +12.3% ▲
          </div>
        </div>
        <div className="w-full bg-gray-200 h-4 border-2 border-black mt-4 relative">
          <div className="absolute top-0 left-0 h-full bg-neo-orange w-[75%] border-r-2 border-black animate-pulse"></div>
        </div>
        <p className="text-xs font-bold mt-2 text-right">
          환급 목표 달성률 75%
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Analysis */}
        <div className="neo-card bg-white">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2 border-b-2 border-black pb-2">
            <Sparkles size={20} className="text-neo-orange" />
            AI 실시간 분석 리포트
          </h3>
          <div className="space-y-4">
            {MOCK_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="border-2 border-black p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge type={alert.type} />
                  <ArrowRight size={16} />
                </div>
                <h4 className="font-bold text-lg leading-tight mb-1">
                  {alert.message}
                </h4>
                <p className="text-sm text-gray-600">
                  {alert.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2026 Changes */}
        <div className="neo-card bg-neo-black text-white">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2 border-b-2 border-white pb-2 text-white">
            <Bell size={20} className="text-neo-yellow" />
            2026 세법 변경사항 감지
          </h3>
          <div className="space-y-4">
            {MOCK_CHANGES_2026.map((change) => (
              <div
                key={change.id}
                className="bg-gray-900 border-2 border-white p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge type="new" />
                </div>
                <h4 className="font-bold text-neo-yellow mb-1">
                  {change.title}
                </h4>
                <p className="text-sm text-gray-300">
                  {change.desc}
                </p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-white text-black font-bold py-3 hover:bg-neo-yellow transition-colors border-2 border-transparent hover:border-white">
            전체 변경사항 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

const CalculatorView = () => {
  const categories = [
    {
      id: "salary",
      label: "총급여 및 기본공제",
      icon: Wallet,
      color: "bg-neo-cyan",
    },
    {
      id: "card",
      label: "신용카드 등 사용액",
      icon: CreditCard,
      color: "bg-neo-yellow",
    },
    {
      id: "medical",
      label: "의료비",
      icon: HeartPulse,
      color: "bg-neo-orange",
    },
    {
      id: "edu",
      label: "교육비",
      icon: GraduationCap,
      color: "bg-neo-cyan",
    },
    {
      id: "house",
      label: "주택자금",
      icon: Building,
      color: "bg-neo-yellow",
    },
    {
      id: "pension",
      label: "연금계좌",
      icon: PiggyBank,
      color: "bg-neo-orange",
    },
  ];

  const [openSection, setOpenSection] = useState<string | null>(
    "salary",
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      {/* Input Section */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-black">
            상세 공제 입력
          </h2>
          <button className="flex items-center gap-2 text-sm font-bold underline decoration-2 decoration-neo-orange">
            <RefreshCw size={14} /> 초기화
          </button>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#000]"
          >
            <button
              onClick={() =>
                setOpenSection(
                  openSection === cat.id ? null : cat.id,
                )
              }
              className={clsx(
                "w-full flex items-center justify-between p-4 font-bold text-lg transition-colors",
                openSection === cat.id
                  ? cat.color
                  : "hover:bg-gray-50",
              )}
            >
              <div className="flex items-center gap-3">
                <cat.icon size={20} strokeWidth={2.5} />
                {cat.label}
              </div>
              {openSection === cat.id ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </button>

            <AnimatePresence>
              {openSection === cat.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t-[3px] border-black space-y-6 bg-white">
                    {/* Mock Inputs for Salary */}
                    {cat.id === "salary" && (
                      <>
                        <div className="space-y-2">
                          <label className="font-bold flex items-center gap-2">
                            연간 총급여액
                            <Tooltip content="식대 등 비과세 소득을 제외한 연간 근로소득 합계액입니다. 원천징수영수증의 16번 항목을 확인하세요.">
                              <Info
                                size={16}
                                className="text-gray-400 cursor-help"
                              />
                            </Tooltip>
                          </label>
                          <input
                            type="text"
                            className="neo-input"
                            defaultValue="56,822,780"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-bold flex items-center gap-2">
                            부양가족 수 (본인 포함)
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={num}
                                className={clsx(
                                  "flex-1 py-2 border-2 border-black font-bold",
                                  num === 1
                                    ? "bg-black text-white"
                                    : "bg-white",
                                )}
                              >
                                {num}명
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Mock Inputs for Card */}
                    {cat.id === "card" && (
                      <>
                        <div className="space-y-2">
                          <label className="font-bold">
                            신용카드 사용액
                          </label>
                          <input
                            type="text"
                            className="neo-input"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-bold">
                            체크카드/현금영수증
                          </label>
                          <input
                            type="text"
                            className="neo-input"
                            placeholder="0"
                          />
                        </div>
                        <div className="bg-neo-yellow/20 p-4 border-2 border-black text-sm font-bold flex gap-2">
                          <Sparkles size={16} />
                          TIP: 신용카드는 총급여의 25%까지만
                          사용하고, 초과분은 체크카드를 사용하는
                          것이 유리합니다.
                        </div>
                      </>
                    )}

                    <div className="flex justify-end">
                      <button className="bg-black text-white px-6 py-2 font-bold hover:bg-gray-800">
                        저장하기
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Floating Result Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <div className="neo-card bg-neo-black text-white mb-4">
            <h3 className="text-lg font-bold text-gray-400 mb-1">
              예상 환급액
            </h3>
            <div className="text-4xl font-black text-neo-cyan mb-4">
              + 956,610원
            </div>
            <div className="space-y-2 text-sm border-t border-gray-700 pt-4">
              <div className="flex justify-between">
                <span>결정세액</span>
                <span>1,200,000원</span>
              </div>
              <div className="flex justify-between">
                <span>기납부세액</span>
                <span>2,156,610원</span>
              </div>
            </div>
          </div>

          <button className="neo-btn w-full bg-neo-orange hover:bg-neo-yellow">
            <Sparkles size={20} />
            AI 최적화 제안 받기
          </button>

          <div className="mt-4 bg-white border-2 border-black p-4 text-sm">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              주의사항
            </h4>
            <p className="text-gray-600">
              이 결과는 시뮬레이션 값이며, 실제 국세청 확정
              자료와 다를 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminView = () => {
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
                <h3 className="text-lg md:text-xl font-black">
                  급여 데이터
                </h3>
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
              <label className="block font-bold mb-2">
                총급여 (세전)
              </label>
              <input
                type="text"
                className="neo-input"
                defaultValue="5,682,278"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">
                비과세 소득
              </label>
              <input
                type="text"
                className="neo-input"
                defaultValue="100,000"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">
                국민연금
              </label>
              <input
                type="text"
                className="neo-input"
                defaultValue="225,852"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">
                건강보험
              </label>
              <input
                type="text"
                className="neo-input"
                defaultValue="185,420"
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
              <span className="font-bold text-lg tracking-tight">
                50,000원
              </span>
            </div>
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
              <span className="font-bold">대중교통</span>
              <span className="font-bold text-lg tracking-tight">
                80,000원
              </span>
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
};

// --- Helper Icons for Calculator ---
function Wallet(props: React.SVGProps<SVGSVGElement>) {
  return <CreditCard {...props} />;
}
function PiggyBank(props: React.SVGProps<SVGSVGElement>) {
  return <Building {...props} />;
}
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const Footer = () => {
  return (
    <footer className="border-t-[3px] border-black bg-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black flex items-center justify-center text-white">
                <Calculator size={20} strokeWidth={3} />
              </div>
              <span className="font-head text-xl font-black tracking-tighter">
                TAX<span className="text-neo-orange">AI</span>
              </span>
            </div>
            <p className="text-sm font-bold text-gray-600 leading-relaxed">
              복잡한 연말정산,
              <br />
              AI와 함께 쉽고 빠르게 해결하세요.
            </p>
          </div>

          <div>
            <h4 className="font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-neo-cyan rounded-full border border-black"></span>
              SERVICE
            </h4>
            <ul className="space-y-2 text-sm font-bold text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-neo-cyan hover:underline decoration-2 underline-offset-2"
                >
                  기능 소개
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neo-cyan hover:underline decoration-2 underline-offset-2"
                >
                  요금 안내
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neo-cyan hover:underline decoration-2 underline-offset-2"
                >
                  자주 묻는 질문
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-neo-yellow rounded-full border border-black"></span>
              LEGAL
            </h4>
            <ul className="space-y-2 text-sm font-bold text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-neo-yellow hover:underline decoration-2 underline-offset-2"
                >
                  이용약관
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neo-yellow hover:underline decoration-2 underline-offset-2"
                >
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-neo-orange rounded-full border border-black"></span>
              CONTACT
            </h4>
            <ul className="space-y-2 text-sm font-bold text-gray-600">
              <li>customer@taxai.com</li>
              <li>02-1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-bold text-gray-500">
            © 2026 TaxAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-cyan flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer shadow-[2px_2px_0px_0px_#000]">
              <span className="font-black text-xs">FB</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-yellow flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer shadow-[2px_2px_0px_0px_#000]">
              <span className="font-black text-xs">IG</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-orange flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer shadow-[2px_2px_0px_0px_#000]">
              <span className="font-black text-xs">YT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("landing");

  return (
    <div className="min-h-screen pb-24 md:pb-0 flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b-[3px] border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setActiveTab("landing")}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white">
              <Calculator size={20} strokeWidth={3} />
            </div>
            <span className="font-head text-xl font-black tracking-tighter">
              TAX<span className="text-neo-orange">AI</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2">
            {activeTab !== "landing" && (
              <>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={clsx(
                    "neo-nav-item",
                    activeTab === "dashboard" && "active",
                  )}
                >
                  DASHBOARD
                </button>
                <button
                  onClick={() => setActiveTab("calculator")}
                  className={clsx(
                    "neo-nav-item",
                    activeTab === "calculator" && "active",
                  )}
                >
                  CALCULATOR
                </button>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={clsx(
                    "neo-nav-item",
                    activeTab === "admin" && "active",
                  )}
                >
                  ADMIN
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {activeTab !== "landing" ? (
              <>
                <div className="hidden md:block font-bold text-sm">
                  홍길동님 (근로소득자)
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200 overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="User"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("login")}
                  className="px-4 py-2 font-black border-2 border-black bg-neo-yellow hover:bg-yellow-400 text-sm shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  로그인
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className="px-4 py-2 font-black border-2 border-black bg-white hover:bg-gray-100 text-sm shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  회원가입
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <LandingView
                onStart={() => setActiveTab("dashboard")}
              />
            </motion.div>
          )}
          {activeTab === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <LoginView
                onLogin={() => setActiveTab("dashboard")}
                onSignup={() => setActiveTab("signup")}
              />
            </motion.div>
          )}
          {activeTab === "signup" && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SignupView
                onSignup={() => setActiveTab("dashboard")}
                onLogin={() => setActiveTab("login")}
              />
            </motion.div>
          )}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DashboardView />
            </motion.div>
          )}
          {activeTab === "calculator" && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <CalculatorView />
            </motion.div>
          )}
          {activeTab === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AdminView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Mobile Bottom Navigation */}
      {activeTab !== "landing" && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-black flex justify-around p-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={clsx(
              "flex flex-col items-center p-2 rounded-lg",
              activeTab === "dashboard"
                ? "text-neo-orange"
                : "text-gray-400",
            )}
          >
            <Home size={24} strokeWidth={3} />
            <span className="text-[10px] font-black mt-1">
              HOME
            </span>
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={clsx(
              "flex flex-col items-center p-2 rounded-lg",
              activeTab === "calculator"
                ? "text-neo-cyan"
                : "text-gray-400",
            )}
          >
            <Calculator size={24} strokeWidth={3} />
            <span className="text-[10px] font-black mt-1">
              CALC
            </span>
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={clsx(
              "flex flex-col items-center p-2 rounded-lg",
              activeTab === "admin"
                ? "text-neo-yellow"
                : "text-gray-400",
            )}
          >
            <Settings size={24} strokeWidth={3} />
            <span className="text-[10px] font-black mt-1">
              ADMIN
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
