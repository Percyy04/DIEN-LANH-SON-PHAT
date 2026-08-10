-- ====================================================================
-- CƠ ĐIỆN LẠNH SƠN PHÁT - SUPABASE DATABASE SCHEMA
-- Execute this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ====================================================================

-- 1. POSTS TABLE (BÀI VIẾT BLOG)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'KTV Sơn Phát',
  read_time TEXT NOT NULL DEFAULT '5 phút đọc',
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SERVICES TABLE (DỊCH VỤ ĐIỆN LẠNH)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  description TEXT NOT NULL,
  price_from TEXT NOT NULL,
  tag TEXT,
  badge_color TEXT,
  image TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  issues JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  price_table JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCTS TABLE (SẢN PHẨM MÁY LẠNH & MÁY LỌC NƯỚC)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT DEFAULT 'may-lanh',
  price TEXT NOT NULL,
  image TEXT NOT NULL,
  capacity TEXT NOT NULL,
  inverter BOOLEAN NOT NULL DEFAULT true,
  origin TEXT NOT NULL,
  warranty TEXT NOT NULL,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PROJECTS TABLE (DỰ ÁN CÔNG TRÌNH TIÊU BIỂU)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  completion_date TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CONTACT REQUESTS TABLE (YÊU CẦU ĐẶT LỊCH / BÁO GIÁ)
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  service TEXT,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, contacted, completed, cancelled
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow Public Read access for content tables
CREATE POLICY "Public Read Access for Posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Projects" ON public.projects FOR SELECT USING (true);

-- Allow Anyone to Insert Contact Requests (Lead Generation)
CREATE POLICY "Public Insert Access for Contact Requests" ON public.contact_requests FOR INSERT WITH CHECK (true);
