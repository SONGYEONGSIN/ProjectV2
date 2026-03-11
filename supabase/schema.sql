-- =============================================
-- TAXAI Supabase Schema
-- Supabase SQL Editor에서 실행하세요
-- =============================================

-- =============================================
-- 회원 관리 (Users)
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  image TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  provider TEXT DEFAULT 'google',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for anon"
  ON users FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Admin 데이터 (연도별 세금 기초자료)
CREATE TABLE IF NOT EXISTS admin_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  year INTEGER NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, year)
);

-- Tax 계산 결과 데이터
CREATE TABLE IF NOT EXISTS tax_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- RLS (Row Level Security) 활성화
ALTER TABLE admin_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_data ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자가 자기 데이터만 접근 가능
-- 참고: NextAuth 사용 시 서버 API에서 user_id를 직접 필터링하므로
-- anon key로 접근할 때는 service_role 또는 별도 정책 필요
-- 여기서는 API Route에서 인증을 처리하므로 anon key에 대한 접근을 허용

CREATE POLICY "Allow all operations for anon"
  ON admin_data FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for anon"
  ON tax_data FOR ALL
  USING (true)
  WITH CHECK (true);

-- =============================================
-- 게시판 (Board)
-- =============================================
CREATE TABLE IF NOT EXISTS board_posts (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL DEFAULT '일반' CHECK (category IN ('일반', '질문', 'FAQ', '공지')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE board_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for anon"
  ON board_posts FOR ALL
  USING (true)
  WITH CHECK (true);

-- 인덱스 (빠른 조회)
CREATE INDEX IF NOT EXISTS idx_admin_data_user_year ON admin_data(user_id, year);
CREATE INDEX IF NOT EXISTS idx_tax_data_user ON tax_data(user_id);
CREATE INDEX IF NOT EXISTS idx_board_posts_created ON board_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_board_posts_pinned ON board_posts(is_pinned, created_at DESC);
