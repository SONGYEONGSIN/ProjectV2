// 관리자 이메일 목록 (환경변수 또는 기본값)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "ysong2526@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase());

/**
 * 주어진 이메일이 관리자인지 확인
 */
export function isAdmin(email: string | null | undefined): boolean {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * 관리자만 사용 가능한 카테고리
 */
export const ADMIN_ONLY_CATEGORIES = ["Q&A", "공지"];
