import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default Supabase environment variables from Vite or localStorage
const ENV_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const ENV_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const SUPABASE_SQL_SCHEMA = `-- ========================================================
-- آکادمی پارس نت | اسکریپت ساخت دیتابیس سوپابیس (Supabase SQL Schema)
-- قابل اجرا در بخش SQL Editor در پنل Supabase
-- ========================================================

-- 1. جدول کاربران (users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'student', -- 'student', 'instructor', 'admin'
  avatar TEXT,
  enrolled_course_ids TEXT[] DEFAULT '{}',
  purchased_file_ids TEXT[] DEFAULT '{}',
  wallet_balance BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. جدول دوره‌های آموزشی (courses)
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category TEXT NOT NULL,
  level TEXT DEFAULT 'جامع',
  price BIGINT NOT NULL DEFAULT 0,
  original_price BIGINT NOT NULL DEFAULT 0,
  image TEXT,
  instructor JSONB,
  duration_hours INT DEFAULT 0,
  episodes_count INT DEFAULT 0,
  students_count INT DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  seasons JSONB DEFAULT '[]',
  prerequisites TEXT[] DEFAULT '{}',
  what_you_will_learn TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. جدول فایل‌های دانلودی و سناریوها (digital_files)
CREATE TABLE IF NOT EXISTS public.digital_files (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price BIGINT NOT NULL DEFAULT 0,
  original_price BIGINT NOT NULL DEFAULT 0,
  image TEXT,
  file_format TEXT NOT NULL,
  file_size TEXT NOT NULL,
  version TEXT DEFAULT '1.0',
  downloads_count INT DEFAULT 0,
  download_url TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. جدول سفارشات و تراکنش‌ها (orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  user_email TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  total_amount BIGINT NOT NULL DEFAULT 0,
  discount_amount BIGINT NOT NULL DEFAULT 0,
  payable_amount BIGINT NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'completed', 'pending', 'failed'
  gateway TEXT DEFAULT 'zarinpal',
  ref_id TEXT,
  card_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. جدول تیکت‌های پشتیبانی (tickets)
CREATE TABLE IF NOT EXISTS public.tickets (
  id TEXT PRIMARY KEY,
  ticket_number TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT,
  subject TEXT NOT NULL,
  department TEXT DEFAULT 'technical',
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open', -- 'open', 'answered', 'closed'
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. جدول مقالات وبلاگ (articles)
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author TEXT,
  read_time TEXT,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. جدول تنظیمات سایت (site_settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL
);

-- فعال‌سازی دسترسی‌های RLS عمومی برای تست و توسعه
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read files" ON public.digital_files FOR SELECT USING (true);
CREATE POLICY "Allow public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read/write orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write tickets" ON public.tickets FOR ALL USING (true);
`;

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(customUrl?: string, customKey?: string): SupabaseClient | null {
  const url = customUrl || localStorage.getItem('parsnet_supabase_url') || ENV_SUPABASE_URL;
  const key = customKey || localStorage.getItem('parsnet_supabase_key') || ENV_SUPABASE_ANON_KEY;

  if (!url || !key || !url.startsWith('http')) {
    return null;
  }

  try {
    if (!clientInstance) {
      clientInstance = createClient(url, key);
    }
    return clientInstance;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
}

export function resetSupabaseClient(url: string, key: string) {
  if (url && key) {
    localStorage.setItem('parsnet_supabase_url', url);
    localStorage.setItem('parsnet_supabase_key', key);
    clientInstance = createClient(url, key);
  } else {
    localStorage.removeItem('parsnet_supabase_url');
    localStorage.removeItem('parsnet_supabase_key');
    clientInstance = null;
  }
}

export async function testSupabaseConnection(url: string, key: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!url || !key) {
      return { success: false, message: 'آدرس پروژه Supabase و کلید Anon Key نباید خالی باشند.' };
    }
    const testClient = createClient(url, key);
    // Attempt a light ping
    const { error } = await testClient.from('courses').select('id').limit(1);
    if (error && error.code !== 'PGRST116' && error.message.includes('FetchError')) {
      return { success: false, message: `خطا در اتصال به سرور: ${error.message}` };
    }
    return { success: true, message: 'اتصال به پروژه Supabase با موفقیت برقرار شد!' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `خطای اتصال: ${errorMsg}` };
  }
}
