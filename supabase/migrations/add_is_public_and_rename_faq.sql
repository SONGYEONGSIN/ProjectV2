-- board_posts 테이블에 is_public 컬럼 추가 (기본값: true = 공개)
-- 기존 FAQ 카테고리를 Q&A로 변경

-- 1. is_public 컬럼 추가
ALTER TABLE board_posts ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;

-- 2. 기존 FAQ → Q&A 변경
UPDATE board_posts SET category = 'Q&A' WHERE category = 'FAQ';
