"use client";
import { useCart } from "@/contexts/CartContext";
import InfiniteSlideRow from "@/components/InfiniteSlideRow";
import { SLIDE_ROWS } from "@/lib/products";

export default function ShopPage() {
  const { openCart, totalCount } = useCart();

  return (
    <main style={{
      backgroundColor: "#ffffff", 
      minHeight:       "100vh",
      width:           "100%",
      display:         "flex",
      flexDirection:   "column",
      alignItems:      "center",
      paddingTop:      "65px", 
    }}>
      {/* ✨ [변경됨] height: 1440 고정을 풀고, 내용물이 늘어나는 만큼 자동으로 길어지게 합니다. */}
      <div style={{
        width:      1440,
        display:    "flex",
        flexDirection: "column",
        overflow:   "hidden",
        flexShrink: 0,
      }}>
        {/* ✨ [변경됨] SLIDE_ROWS 배열을 순회하면서 줄 개수만큼 알아서 생성합니다. */}
        {/* 짝수 줄은 오른쪽(1), 홀수 줄은 왼쪽(-1)으로 흐르도록 인덱스(idx)로 계산합니다. */}
        {SLIDE_ROWS.map((rowProducts, idx) => (
          <InfiniteSlideRow 
            key={idx} 
            products={rowProducts} 
            direction={idx % 2 === 0 ? 1 : -1}  
          />
        ))}
      </div>

      {/* 플로팅 장바구니 버튼 */}
      <button
        onClick={openCart}
        style={{
          position:        "fixed",
          bottom:          32,
          right:           32,
          width:           64,
          height:          64,
          borderRadius:    "50%",
          backgroundColor: "#ffffff",
          color:           "#111111",
          border:          "3px solid #111111",
          cursor:          "pointer",
          fontSize:        26,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          boxShadow:       "0 6px 24px rgba(0,0,0,0.4)",
          zIndex:          500,
          transition:      "transform 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        🛒
        {totalCount > 0 && (
          <span style={{
            position:        "absolute",
            top:             -4, right: -4,
            backgroundColor: "#ff3b30",
            color:           "#ffffff",
            borderRadius:    "50%",
            width:           24, height: 24,
            fontSize:        12,
            fontWeight:      800,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            border:          "2px solid #ffffff",
          }}>
            {totalCount}
          </span>
        )}
      </button>
    </main>
  );
}