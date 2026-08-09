import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DocHead } from "@/components/common/Doc";

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[680px] py-8 md:py-12">
      <DocHead title="개인정보처리방침" meta="문서" />

      <div className="mt-10 grid gap-x-8 gap-y-3 md:grid-cols-[5.5rem_1fr]">
        <p className="font-mono tabular-nums text-[11px] text-hi">문서</p>
        <div className="min-w-0">
          <h1 className="font-display text-heading font-extrabold tracking-[-0.03em] text-hi">
            개인정보처리방침
          </h1>
          <Link
            href="/"
            className="mt-3 inline-flex items-center gap-1.5 text-body-sm text-mid underline-offset-4 transition-colors hover:text-hi hover:underline"
          >
            <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
            홈으로 돌아가기
          
          <p className="mt-3 text-caption text-mid">
            최종 수정일: 2026년 1월 1일
          </p></Link>
        </div>
      </div>

      <div className="mt-10 border-t-2 border-hi">
        <section className="grid gap-x-8 gap-y-2 border-b border-edge py-7 md:grid-cols-[5.5rem_1fr]">
          <p aria-hidden="true" className="font-mono tabular-nums text-[11px] text-hi">제1조</p>
          <div className="min-w-0">
            <h2 className="text-h3 font-semibold text-hi">
              <span className="sr-only">제1조 </span>
              개인정보의 수집 및 이용 목적
            </h2>
          <p className="text-body text-mid leading-[1.7] mb-3">
            taxback365는 다음 목적을 위해 개인정보를 수집·이용합니다:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-body text-mid ml-2">
            <li>회원 식별 및 회원제 서비스 이용</li>
            <li>연말정산 예상 환급액 계산 서비스 제공</li>
            <li>맞춤형 절세 전략 분석</li>
            <li>서비스 개선 및 신규 기능 개발</li>
            <li>고객 문의 응대 및 공지사항 전달</li>
          </ul>
        </div>
        </section>

        <section className="grid gap-x-8 gap-y-2 border-b border-edge py-7 md:grid-cols-[5.5rem_1fr]">
          <p aria-hidden="true" className="font-mono tabular-nums text-[11px] text-hi">제2조</p>
          <div className="min-w-0">
            <h2 className="text-h3 font-semibold text-hi">
              <span className="sr-only">제2조 </span>
              수집하는 개인정보 항목
            </h2>
          <div className="overflow-x-auto rounded-md border border-edge">
            <table className="w-full text-body-sm">
              <thead>
                <tr className="bg-surface-2 border-b border-edge">
                  <th className="px-4 py-3 text-left font-semibold text-mid w-32">
                    구분
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-mid">
                    수집 항목
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge">
                <tr>
                  <td className="px-4 py-3 font-medium text-hi">필수 정보</td>
                  <td className="px-4 py-3 text-mid">이름, 이메일, 비밀번호</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-hi">소득 정보</td>
                  <td className="px-4 py-3 text-mid">
                    급여, 비과세 소득, 국민연금, 건강보험료
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-hi">지출 정보</td>
                  <td className="px-4 py-3 text-mid">
                    신용카드·체크카드 사용액, 현금영수증, 의료비, 교육비
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-hi">자동 수집</td>
                  <td className="px-4 py-3 text-mid">
                    접속 IP, 서비스 이용 기록, 접속 로그
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </section>

        <section className="grid gap-x-8 gap-y-2 border-b border-edge py-7 md:grid-cols-[5.5rem_1fr]">
          <p aria-hidden="true" className="font-mono tabular-nums text-[11px] text-hi">제3조</p>
          <div className="min-w-0">
            <h2 className="text-h3 font-semibold text-hi">
              <span className="sr-only">제3조 </span>
              개인정보의 보유 및 이용 기간
            </h2>
          <div className="space-y-3 text-body text-mid leading-[1.7]">
            <p>
              <strong className="text-hi">1. 회원 정보:</strong> 회원 탈퇴
              시까지 보유하며, 탈퇴 후 즉시 파기합니다.
            </p>
            <p>
              <strong className="text-hi">2. 소득·지출 데이터:</strong> 연말정산
              완료 후 최대 5년간 보관 (국세기본법에 따른 보관 의무)
            </p>
            <p>
              <strong className="text-hi">3. 서비스 이용 기록:</strong> 3년간
              보관 후 파기
            </p>
          </div>
        </div>
        </section>

        <section className="grid gap-x-8 gap-y-2 border-b border-edge py-7 md:grid-cols-[5.5rem_1fr]">
          <p aria-hidden="true" className="font-mono tabular-nums text-[11px] text-hi">제4조</p>
          <div className="min-w-0">
            <h2 className="text-h3 font-semibold text-hi">
              <span className="sr-only">제4조 </span>
              개인정보의 제3자 제공
            </h2>
          <div className="rounded-md bg-accent/8 border border-accent/30 p-4 space-y-2">
            <p className="text-body text-hi font-medium">
              taxback365는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지
              않습니다.
            </p>
            <p className="text-body-sm text-mid">
              다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc list-inside space-y-1 text-body-sm text-mid ml-2">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 의해 요구되는 경우</li>
            </ul>
          </div>
        </div>
        </section>

        <section className="grid gap-x-8 gap-y-2 border-b border-edge py-7 md:grid-cols-[5.5rem_1fr]">
          <p aria-hidden="true" className="font-mono tabular-nums text-[11px] text-hi">제5조</p>
          <div className="min-w-0">
            <h2 className="text-h3 font-semibold text-hi">
              <span className="sr-only">제5조 </span>
              개인정보의 안전성 확보 조치
            </h2>
          <ul className="list-disc list-inside space-y-1.5 text-body text-mid ml-2">
            <li>개인정보 암호화 저장 (AES-256)</li>
            <li>SSL/TLS를 통한 데이터 전송 암호화</li>
            <li>정기적인 보안 점검 및 취약점 분석</li>
            <li>개인정보 접근 권한 최소화 및 접근 기록 관리</li>
            <li>해킹 등에 대비한 방화벽 운영</li>
          </ul>
        </div>
        </section>

        <section className="grid gap-x-8 gap-y-2 border-b border-edge py-7 md:grid-cols-[5.5rem_1fr]">
          <p aria-hidden="true" className="font-mono tabular-nums text-[11px] text-hi">제6조</p>
          <div className="min-w-0">
            <h2 className="text-h3 font-semibold text-hi">
              <span className="sr-only">제6조 </span>
              이용자의 권리
            </h2>
          <p className="text-body text-mid leading-[1.7] mb-3">
            이용자는 언제든지 다음의 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-body text-mid ml-2">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </ul>
          <p className="text-body text-mid leading-[1.7] mt-3">
            위 권리 행사는 서비스 내 &quot;설정 &gt; 개인정보 관리&quot; 메뉴
            또는 고객센터를 통해 가능합니다.
          </p>
        </div>
        </section>

        <section className="grid gap-x-8 gap-y-2 border-b border-edge py-7 md:grid-cols-[5.5rem_1fr]">
          <p aria-hidden="true" className="font-mono tabular-nums text-[11px] text-hi">제7조</p>
          <div className="min-w-0">
            <h2 className="text-h3 font-semibold text-hi">
              <span className="sr-only">제7조 </span>
              개인정보 보호책임자
            </h2>
          <div className="rounded-md bg-surface-2 border border-edge p-4">
            <p className="font-medium text-hi mb-2">개인정보 보호책임자</p>
            <ul className="text-body-sm text-mid space-y-1">
              <li>담당: 개인정보보호팀</li>
              <li className="font-mono">이메일: ysong2526@gmail.com</li>
            </ul>
          </div>
        </div>
        </section>

        <div className="border-t border-edge pt-6 mt-2">
          <p className="text-body-sm text-mid text-center">
            개인정보 처리에 관한 문의사항은{" "}
            <span className="font-mono text-hi">ysong2526@gmail.com</span>
            으로 연락 주시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
