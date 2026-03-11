import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "기초자료 등록",
    description: "연말정산에 필요한 급여, 지출, 가족, 공제 데이터를 입력하고 관리하세요. 엑셀 업로드와 OCR 기능을 지원합니다.",
    robots: {
        index: false,  // 개인정보 페이지이므로 검색엔진 제외
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
