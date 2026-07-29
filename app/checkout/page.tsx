"use client";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart, getItemPrice } = useCart(); // ✨ getItemPrice 추가
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", phone: "", zonecode: "", address: "", detailAddress: "", memo: "", password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setForm({ ...form, zonecode: data.zonecode, address: fullAddress });
    setIsPostcodeOpen(false);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("우리은행 1002-059-437741");
    setCopied(true);
    setTimeout(() => { setCopied(false); }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return alert("장바구니가 비어 있습니다.");
    if (!form.name || !form.phone || !form.address || !form.detailAddress || !form.password) {
      return alert("필수 정보를 모두 입력해주세요. (상세 주소 포함)");
    }

    setLoading(true);
    const combinedAddress = `[${form.zonecode}] ${form.address} ${form.detailAddress}`;

    // ✨ DB 저장을 위해 아이템 정리 (실제 적용된 사이즈별 가격 기준)
    const orderItemsForDb = items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      price: getItemPrice(item.product, item.size), // ✨ 여기서 계산
      quantity: item.quantity,
      size: item.size
    }));

    try {
      const { data, error } = await supabase.from("orders").insert([
        {
          customer_name: form.name,
          customer_phone: form.phone,
          customer_address: combinedAddress,
          delivery_memo: form.memo,
          order_password: form.password,
          items: orderItemsForDb,
          total_amount: totalAmount,
          status: "입금대기",
        },
      ]).select();

      if (error) throw error;
      const orderId = data?.[0]?.id || "unknown";
      if (clearCart) clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch (err: any) {
      alert("주문 중 오류가 발생했습니다: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      backgroundColor: "#ffffff", minHeight: "100vh", width: "100%",
      display: "flex", flexDirection: "column", alignItems: "center",
      paddingTop: "90px", paddingBottom: "80px", color: "#111111"
    }}>
      <div style={{ width: "100%", maxWidth: "1000px", padding: "0 20px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: "center" }}>주문서 작성</h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
          
          <form onSubmit={handleSubmit} style={{ flex: "1 1 400px", backgroundColor: "#ffffff", padding: 32, borderRadius: 16, border: "1px solid #e5e5e5", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>배송 정보</h2>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, marginBottom: 8, color: "#666" }}>이름 *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: 12, borderRadius: 8, backgroundColor: "#f9f9f9", border: "1px solid #ccc", color: "#111" }} placeholder="홍길동" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, marginBottom: 8, color: "#666" }}>연락처 *</label>
              <input type="text" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: "100%", padding: 12, borderRadius: 8, backgroundColor: "#f9f9f9", border: "1px solid #ccc", color: "#111" }} placeholder="010-0000-0000" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, marginBottom: 8, color: "#666" }}>배송지 주소 *</label>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input type="text" required readOnly value={form.zonecode} style={{ width: "100px", padding: 12, borderRadius: 8, backgroundColor: "#f0f0f0", border: "1px solid #ccc", color: "#111" }} placeholder="우편번호" />
                <button type="button" onClick={() => setIsPostcodeOpen(!isPostcodeOpen)} style={{ padding: "0 16px", borderRadius: 8, backgroundColor: "#111", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>주소 검색</button>
              </div>
              {isPostcodeOpen && <div style={{ border: "1px solid #ccc", marginBottom: 8, borderRadius: 8, overflow: "hidden" }}><DaumPostcodeEmbed onComplete={handleAddressComplete} autoClose={false} /></div>}
              <input type="text" required readOnly value={form.address} style={{ width: "100%", padding: 12, borderRadius: 8, backgroundColor: "#f0f0f0", border: "1px solid #ccc", color: "#111", marginBottom: 8 }} placeholder="기본 주소" />
              <input type="text" required value={form.detailAddress} onChange={(e) => setForm({ ...form, detailAddress: e.target.value })} style={{ width: "100%", padding: 12, borderRadius: 8, backgroundColor: "#f9f9f9", border: "1px solid #ccc", color: "#111" }} placeholder="상세 주소 (동, 호수 등)" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, marginBottom: 8, color: "#666" }}>배송 메모</label>
              <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })} style={{ width: "100%", padding: 12, borderRadius: 8, backgroundColor: "#f9f9f9", border: "1px solid #ccc", color: "#111", height: 80, resize: "none" }} placeholder="문 앞에 놓아주세요" />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: 14, marginBottom: 8, color: "#666" }}>주문 확인용 비밀번호 * (숫자 4자리)</label>
              <input type="password" required maxLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: "100%", padding: 12, borderRadius: 8, backgroundColor: "#f9f9f9", border: "1px solid #ccc", color: "#111" }} placeholder="비회원 주문 확인 시 사용됩니다" />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", padding: 16, backgroundColor: "#111", color: "#fff", fontWeight: 800, borderRadius: 8, border: "none", cursor: "pointer", fontSize: 16 }}>
              {loading ? "처리 중..." : `주문 접수하기`}
            </button>
          </form>

          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ backgroundColor: "#ffffff", padding: 32, borderRadius: 16, border: "1px solid #e5e5e5", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>주문 상품 요약</h2>
              {items.length === 0 ? (
                <p style={{ color: "#888" }}>장바구니가 비어 있습니다.</p>
              ) : (
                <div>
                  {items.map(({ cartItemId, product, quantity, size }) => {
                    const currentPrice = getItemPrice(product, size); // ✨ 여기서도 가격 동기화
                    return (
                      <div key={cartItemId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
                        <div>
                          <p style={{ fontWeight: 600 }}>{product.name}</p>
                          <p style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                            {size && `옵션: ${size} / `}수량: {quantity}개
                          </p>
                        </div>
                        <p style={{ fontWeight: 600 }}>{(currentPrice * quantity).toLocaleString()}원</p>
                      </div>
                    );
                  })}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 18, fontWeight: 800 }}>
                    <span>총 결제금액</span>
                    <span style={{ color: "#ff3b30" }}>{totalAmount.toLocaleString()}원</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ backgroundColor: "#f8f9fa", padding: 32, borderRadius: 16, border: "1px solid #e5e5e5" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#111" }}>무통장 입금 안내</h2>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>
                아래 계좌로 총 결제금액을 입금해 주시면, 입금 확인 후 배송이 시작됩니다. (주문자명과 입금자명이 동일해야 합니다.)
              </p>
              <div style={{ backgroundColor: "#ffffff", padding: 20, borderRadius: 8, border: "1px solid #ccc", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span onClick={handleCopyAccount} title="클릭해서 계좌번호 복사" style={{ fontSize: 16, fontWeight: 800, color: "#111", textDecoration: "underline", textUnderlineOffset: "4px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    우리은행 1002-059-437741
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </span>
                  {copied && <span style={{ fontSize: "12px", color: "#059669", fontWeight: 700, backgroundColor: "#ecfdf5", padding: "4px 8px", borderRadius: "4px", border: "1px solid #a7f3d0" }}>✓ 복사되었습니다!</span>}
                </div>
                <p style={{ fontSize: 14, color: "#666", margin: 0 }}>예금주: 김정수</p>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#fff8f8", borderRadius: "8px" }}>
                <p style={{ fontSize: "13.5px", color: "#d92d20", lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
                  * 1인 제작 및 프리오더 방식으로 아트토이가 만들어져, 입금 확인 후 3~4주 이내에 순차적으로 배송되는 점 양해 부탁드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}