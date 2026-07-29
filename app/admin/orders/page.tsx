"use client";
// ════════════════════════════════════════════════
// app/admin/orders/page.tsx — 관리자 주문 관리
// ════════════════════════════════════════════════
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Order, OrderStatus } from "@/types";

export default function AdminOrdersPage() {
  const router  = useRouter();
  const [orders,   setOrders]   = useState<Order[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [authOk,   setAuthOk]   = useState(false);
  const [filter,   setFilter]   = useState<OrderStatus | "전체">("전체");

  // ── 인증 확인 ───────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/auth/admin/check")
      .then(r => r.ok ? setAuthOk(true) : router.push("/admin/login"))
      .catch(() => router.push("/admin/login"));
  }, [router]);

  // ── 주문 목록 조회 ──────────────────────────────────────────────
  useEffect(() => {
    if (!authOk) return;
    const fetchOrders = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      setOrders((data ?? []) as Order[]);
      setLoading(false);
    };
    fetchOrders();
  }, [authOk]);

  // ── 주문 상태 변경 ──────────────────────────────────────────────
  const updateStatus = async (id: string, status: OrderStatus) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const fmt      = (n: number) => n.toLocaleString("ko-KR") + "원";
  const fmtDate  = (s: string) => new Date(s).toLocaleString("ko-KR");

  const filteredOrders = filter === "전체"
    ? orders
    : orders.filter(o => o.status === filter);

  const STATUS_COLORS: Record<string, string> = {
    "입금대기": "#ff9500",
    "입금완료": "#34c759",
    "배송중":   "#007aff",
    "배송완료": "#8e8e93",
    "취소":     "#ff3b30",
  };

  if (!authOk) return null;

  return (
    <main style={{ backgroundColor: "#f5f5f7", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111111" }}>주문 관리</h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "#666666" }}>
              전체 {orders.length}건
            </span>
            <button
              onClick={async () => {
                await fetch("/api/auth/admin/logout", { method: "POST" });
                router.push("/admin/login");
              }}
              style={{
                padding:         "8px 16px",
                backgroundColor: "#ffffff",
                color:           "#111111",
                border:          "1px solid #cccccc",
                borderRadius:    8,
                cursor:          "pointer",
                fontSize:        13,
              }}
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 필터 탭 */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {(["전체", "입금대기", "입금완료", "배송중", "배송완료", "취소"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding:         "8px 16px",
                backgroundColor: filter === s ? "#111111" : "#ffffff",
                color:           filter === s ? "#ffffff" : "#111111",
                border:          "1px solid #cccccc",
                borderRadius:    20,
                cursor:          "pointer",
                fontSize:        13,
                fontWeight:      filter === s ? 700 : 400,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* 주문 목록 */}
        {loading ? (
          <p style={{ color: "#666666", textAlign: "center", padding: 60 }}>불러오는 중...</p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ color: "#666666", textAlign: "center", padding: 60 }}>주문이 없습니다.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredOrders.map(order => (
              <div key={order.id} style={{
                backgroundColor: "#ffffff",
                borderRadius:    16,
                padding:         24,
                boxShadow:       "0 1px 6px rgba(0,0,0,0.08)",
              }}>
                {/* 주문 헤더 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#888888", marginBottom: 4, fontFamily: "monospace" }}>
                      {order.id}
                    </p>
                    <p style={{ fontSize: 13, color: "#555555" }}>
                      {fmtDate(order.created_at)}
                    </p>
                  </div>
                  {/* 상태 뱃지 + 변경 버튼 */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      padding:         "4px 12px",
                      backgroundColor: STATUS_COLORS[order.status] + "22",
                      color:           STATUS_COLORS[order.status],
                      borderRadius:    20,
                      fontSize:        13,
                      fontWeight:      700,
                    }}>
                      {order.status}
                    </span>
                    {/* 상태 변경 드롭다운 */}
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value as OrderStatus)}
                      style={{
                        padding:         "6px 10px",
                        border:          "1px solid #cccccc",
                        borderRadius:    8,
                        fontSize:        13,
                        color:           "#111111",
                        backgroundColor: "#ffffff",
                        cursor:          "pointer",
                      }}
                    >
                      {["입금대기", "입금완료", "배송중", "배송완료", "취소"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 주문자 정보 */}
                <div style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap:                 12,
                  padding:             "16px 0",
                  borderTop:           "1px solid #f0f0f0",
                  borderBottom:        "1px solid #f0f0f0",
                  marginBottom:        16,
                }}>
                  {[
                    { label: "주문자", value: order.customer_name },
                    { label: "연락처", value: order.customer_phone },
                    { label: "배송지", value: order.customer_address },
                  ].map(f => (
                    <div key={f.label}>
                      <p style={{ fontSize: 11, color: "#888888", marginBottom: 4 }}>{f.label}</p>
                      <p style={{ fontSize: 14, color: "#111111", fontWeight: 600 }}>{f.value}</p>
                    </div>
                  ))}
                  {order.delivery_memo && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <p style={{ fontSize: 11, color: "#888888", marginBottom: 4 }}>배송 메모</p>
                      <p style={{ fontSize: 14, color: "#555555" }}>{order.delivery_memo}</p>
                    </div>
                  )}
                </div>

                {/* 주문 상품 + 금액 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    {(order.items ?? []).map((item, i) => (
                      <p key={i} style={{ fontSize: 14, color: "#333333", marginBottom: 4 }}>
                        {item.productName} × {item.quantity}
                        <span style={{ color: "#888888", marginLeft: 8 }}>
                          {fmt(item.price * item.quantity)}
                        </span>
                      </p>
                    ))}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 13, color: "#888888", marginBottom: 4 }}>총 입금액</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#111111" }}>
                      {fmt(order.total_amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
