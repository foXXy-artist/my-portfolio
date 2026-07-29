// app/api/auth/admin/route.ts — 관리자 로그인 API
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_PASSWORD } from "@/lib/config";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // 세션 쿠키 설정 (24시간)
  res.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    maxAge:   60 * 60 * 24,
    path:     "/",
  });
  return res;
}
