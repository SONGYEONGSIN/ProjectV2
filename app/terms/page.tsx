import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
                    <div className="bg-neo-yellow p-3 border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
                        <FileText size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black">이용약관</h1>
                        <p className="text-sm font-bold text-gray-500">
                            최종 수정일: 2026년 1월 1일
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="neo-card bg-white space-y-8">
                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-orange">
                        제1조 (목적)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        본 약관은 TAXAI(이하 &quot;서비스&quot;)가 제공하는 AI 기반 연말정산
                        서비스의 이용조건 및 절차, 이용자와 서비스 제공자의 권리, 의무,
                        책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-orange">
                        제2조 (서비스의 정의)
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        TAXAI는 다음과 같은 서비스를 제공합니다:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>AI 기반 연말정산 예상 환급액 계산</li>
                        <li>소득공제 및 세액공제 항목 분석</li>
                        <li>맞춤형 절세 전략 제안</li>
                        <li>2026년 세법 개정안 반영 정보 제공</li>
                        <li>카드사 및 금융기관 데이터 연동</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-orange">
                        제3조 (이용계약의 성립)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        이용계약은 이용자가 본 약관에 동의하고, 서비스에서 정한 절차에 따라
                        회원가입을 완료한 시점에 성립됩니다. 이용자는 회원가입 시 정확하고
                        최신의 정보를 제공해야 합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-orange">
                        제4조 (서비스 이용)
                    </h2>
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            <strong>1. 서비스 이용 시간:</strong> 서비스는 연중무휴 24시간
                            제공됨을 원칙으로 합니다. 다만, 시스템 점검 등의 사유로 서비스가
                            일시 중단될 수 있습니다.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>2. 정보의 정확성:</strong> 서비스에서 제공하는 예상
                            환급액 및 절세 정보는 이용자가 입력한 정보를 기반으로 계산되며,
                            실제 국세청 확정 자료와 다를 수 있습니다.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>3. 세무 상담:</strong> 본 서비스는 세무 상담 서비스가
                            아니며, 구체적인 세무 문제는 공인된 세무사에게 상담하시기
                            바랍니다.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-orange">
                        제5조 (이용자의 의무)
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>정확한 개인정보 및 소득정보를 입력해야 합니다.</li>
                        <li>타인의 정보를 도용하거나 허위 정보를 입력해서는 안 됩니다.</li>
                        <li>서비스를 부정한 목적으로 이용해서는 안 됩니다.</li>
                        <li>
                            서비스의 운영을 방해하는 행위를 해서는 안 됩니다.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-orange">
                        제6조 (면책조항)
                    </h2>
                    <div className="bg-neo-yellow/20 border-2 border-black p-4">
                        <p className="text-gray-700 leading-relaxed">
                            서비스는 이용자가 입력한 정보를 기반으로 예상 환급액을 계산하며,
                            이는 참고용 정보입니다. 실제 세금 신고 및 환급은 국세청의 확정
                            자료에 따라 결정되며, 서비스는 계산 결과의 정확성에 대해 법적
                            책임을 지지 않습니다.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4 text-neo-orange">
                        제7조 (약관의 변경)
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을
                        변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해
                        공지합니다.
                    </p>
                </section>

                <div className="border-t-2 border-gray-200 pt-6 mt-8">
                    <p className="text-sm text-gray-500 text-center">
                        본 약관에 대한 문의사항은{" "}
                        <span className="font-bold text-neo-orange">customer@taxai.com</span>
                        으로 연락 주시기 바랍니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
