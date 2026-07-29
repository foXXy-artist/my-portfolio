"use client";
// ════════════════════════════════════════════════
// components/CartDrawer.tsx — 우측 장바구니 서랍
// ════════════════════════════════════════════════
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, removeItem, updateQty, updateSize, totalAmount, getItemPrice } = useCart(); // ✨ getItemPrice 불러오기

  if (!isOpen) return null;

  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";
  const isAllSizesSelected = items.length > 0 && items.every(item => item.size !== "");

  return (
    <>
      <div
        onClick={closeCart}
        style={{
          position: "fixed", inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 99998,
        }}
      />

      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "100%", maxWidth: 380,
        backgroundColor: "#ffffff",
        zIndex: 99999, display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.18)",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111111" }}>장바구니</span>
          <button onClick={closeCart} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#111111" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <p style={{ color: "#666666", textAlign: "center", marginTop: 40 }}>장바구니가 비어 있습니다</p>
          ) : (
            items.map(({ cartItemId, product, quantity, size }) => {
              const currentPrice = getItemPrice(product, size); // ✨ 현재 선택된 사이즈의 가격 가져오기

              return (
                <div key={cartItemId} style={{ display: "flex", gap: 12, marginBottom: 20, padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <img src={product.image} alt={product.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 6, backgroundColor: "transparent" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontWeight: 600, color: "#111111", marginBottom: 8 }}>{product.name}</p>
                      <button onClick={() => removeItem(cartItemId)} style={{ background: "none", border: "none", cursor: "pointer", color: "#999999", fontSize: 13, padding: 0 }}>✕</button>
                    </div>

                    <select
                      value={size || ""}
                      onChange={(e) => updateSize(cartItemId, e.target.value)}
                      style={{ width: "100%", padding: "6px 8px", marginBottom: 12, borderRadius: 4, border: "1px solid #ccc", fontSize: 14, color: "#111", outline: "none", backgroundColor: "#fff" }}
                    >
                      <option value="" disabled>사이즈를 선택해주세요</option>
                      {(product.sizes || ["Free"]).map(s => {
                        const optPrice = getItemPrice(product, s);
                        return (
                          <option key={s} value={s}>{s} ({fmt(optPrice)})</option>
                        );
                      })}
                    </select>

                    {size ? (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button onClick={() => updateQty(cartItemId, quantity - 1)} style={{ width: 28, height: 28, border: "1px solid #ccc", background: "#fff", cursor: "pointer", borderRadius: 4, color: "#111111", fontSize: 16 }}>−</button>
                          <span style={{ minWidth: 24, textAlign: "center", color: "#111111" }}>{quantity}</span>
                          <button onClick={() => updateQty(cartItemId, quantity + 1)} style={{ width: 28, height: 28, border: "1px solid #ccc", background: "#fff", cursor: "pointer", borderRadius: 4, color: "#111111", fontSize: 16 }}>＋</button>
                        </div>
                        {/* ✨ 바뀐 가격을 곱해서 렌더링 */}
                        <p style={{ fontWeight: 700, color: "#111111", fontSize: 15, margin: 0 }}>{fmt(currentPrice * quantity)}</p>
                      </div>
                    ) : (
                      <p style={{ fontSize: 13, color: "#ff3b30", margin: 0 }}>↑ 먼저 옵션(사이즈)을 선택해주세요.</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #e5e5e5", backgroundColor: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontWeight: 600, color: "#111111" }}>총 금액</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#ff3b30" }}>{fmt(totalAmount)}</span>
            </div>
            <button
              disabled={!isAllSizesSelected}
              onClick={() => { closeCart(); router.push("/checkout"); }}
              style={{
                width: "100%", padding: "16px 0",
                backgroundColor: isAllSizesSelected ? "#111111" : "#cccccc",
                color: "#ffffff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700,
                cursor: isAllSizesSelected ? "pointer" : "not-allowed",
              }}
            >
              {isAllSizesSelected ? "결제하기" : "사이즈를 모두 선택해주세요"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}