// app/api/auth/admin/logout/route.ts — 관리자 로그아웃
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_session");
  return res;
}
