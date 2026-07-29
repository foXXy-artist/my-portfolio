// app/api/orders/route.ts — 주문 생성 API (서버사이드 fallback용)
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("orders")
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "주문 처리 실패" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // 관리자만 접근 가능
  const session = req.cookies.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json(data ?? []);
}
