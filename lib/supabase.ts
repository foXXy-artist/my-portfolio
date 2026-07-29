// ════════════════════════════════════════════════
// lib/supabase.ts — Supabase 클라이언트 초기화
//
// ✅ 설정 방법:
//   1. https://supabase.com 에서 프로젝트 생성
//   2. .env.local 파일에 아래 두 줄 추가:
//      NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//      NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
//   3. Supabase SQL Editor에서 아래 테이블 생성:
//
//   create table orders (
//     id uuid primary key default gen_random_uuid(),
//     created_at timestamptz default now(),
//     customer_name text not null,
//     customer_phone text not null,
//     customer_address text not null,
//     delivery_memo text default '',
//     order_password text not null,
//     items jsonb not null,
//     total_amount integer not null,
//     status text default '입금대기'
//   );
// ════════════════════════════════════════════════
import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);