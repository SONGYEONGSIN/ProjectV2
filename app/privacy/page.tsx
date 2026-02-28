import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-neo-orange mb-4"
                >
                    <ArrowLeft size={16} /> 홈으로 돌아가기
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-neo-cyan p-3 border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
                        <Shield size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black">개인정보처리방침</h1>
                        <p className="text-sm font-bold text-gray-500">
                            최종 수정일: 2026년 1월 1일
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="neo-card bg-white space-y-8">
                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-cyan">
                        제1조 (개인정보의 수집 및 이용 목적)
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        TAXAI는 다음 목적을 위해 개인정보를 수집·이용합니다:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>회원 식별 및 회원제 서비스 이용</li>
                        <li>연말정산 예상 환급액 계산 서비스 제공</li>
                        <li>AI 기반 맞춤형 절세 전략 분석</li>
                        <li>카드사·금융기관 데이터 연동 서비스</li>
                        <li>서비스 개선 및 신규 기능 개발</li>
                        <li>고객 문의 응대 및 공지사항 전달</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-cyan">
                        제2조 (수집하는 개인정보 항목)
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-[3px] border-black">
                            <thead>
                                <tr className="bg-neo-cyan">
                                    <th className="border-2 border-black p-3 text-left font-black">
                                        구분
                                    </th>
                                    <th className="border-2 border-black p-3 text-left font-black">
                                        수집 항목
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-2 border-black p-3 font-bold">
                                        필수 정보
                                    </td>
                                    <td className="border-2 border-black p-3 text-gray-700">
                                        이름, 이메일, 비밀번호
                                    </td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="border-2 border-black p-3 font-bold">
                                        소득 정보
                                    </td>
                                    <td className="border-2 border-black p-3 text-gray-700">
                                        급여, 비과세 소득, 국민연금, 건강보험료
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black p-3 font-bold">
                                        지출 정보
                                    </td>
                                    <td className="border-2 border-black p-3 text-gray-700">
                                        신용카드·체크카드 사용액, 현금영수증, 의료비, 교육비
                                    </td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="border-2 border-black p-3 font-bold">
                                        자동 수집
                                    </td>
                                    <td className="border-2 border-black p-3 text-gray-700">
                                        접속 IP, 서비스 이용 기록, 접속 로그
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-cyan">
                        제3조 (개인정보의 보유 및 이용 기간)
                    </h2>
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            <strong>1. 회원 정보:</strong> 회원 탈퇴 시까지 보유하며, 탈퇴 후
                            즉시 파기합니다.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>2. 소득·지출 데이터:</strong> 연말정산 완료 후 최대 5년간
                            보관 (국세기본법에 따른 보관 의무)
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>3. 서비스 이용 기록:</strong> 3년간 보관 후 파기
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-cyan">
                        제4조 (개인정보의 제3자 제공)
                    </h2>
                    <div className="bg-neo-cyan/20 border-2 border-black p-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                            TAXAI는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-2">
                            다만, 다음의 경우에는 예외로 합니다:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                            <li>이용자가 사전에 동의한 경우</li>
                            <li>법령에 의해 요구되는 경우</li>
                            <li>카드사 연동 시 해당 금융기관과의 데이터 교환</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-cyan">
                        제5조 (개인정보의 안전성 확보 조치)
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>개인정보 암호화 저장 (AES-256)</li>
                        <li>SSL/TLS를 통한 데이터 전송 암호화</li>
                        <li>정기적인 보안 점검 및 취약점 분석</li>
                        <li>개인정보 접근 권한 최소화 및 접근 기록 관리</li>
                        <li>해킹 등에 대비한 방화벽 운영</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-cyan">
                        제6조 (이용자의 권리)
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        이용자는 언제든지 다음의 권리를 행사할 수 있습니다:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>개인정보 열람 요구</li>
                        <li>오류 등이 있을 경우 정정 요구</li>
                        <li>삭제 요구</li>
                        <li>처리정지 요구</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        위 권리 행사는 서비스 내 &quot;설정 &gt; 개인정보 관리&quot; 메뉴 또는
                        고객센터를 통해 가능합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-cyan">
                        제7조 (개인정보 보호책임자)
                    </h2>
                    <div className="bg-gray-100 border-2 border-black p-4">
                        <p className="font-bold mb-2">개인정보 보호책임자</p>
                        <ul className="text-gray-700 space-y-1">
                            <li>담당: 개인정보보호팀</li>
                            <li>이메일: privacy@taxai.com</li>
                            <li>전화: 02-1234-5678</li>
                        </ul>
                    </div>
                </section>

                <div className="border-t-2 border-gray-200 pt-6 mt-8">
                    <p className="text-sm text-gray-500 text-center">
                        개인정보 처리에 관한 문의사항은{" "}
                        <span className="font-bold text-neo-cyan">privacy@taxai.com</span>
                        으로 연락 주시기 바랍니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
