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
      
      {/* ✨ 모바일 반응형 처리를 위한 CSS 스타일 추가 */}
      {/* InfiniteSlideRow 컴포넌트 내부의 이미지들이 모바일에서 자연스럽게 리사이징 되도록 제어합니다. */}
      <style>{`
        .responsive-slide-container {
          width: 100%;
          max-width: 1440px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        /* 📱 모바일 화면 (가로 768px 이하)일 때 이미지 크기 자동 축소 */
        @media (max-width: 768px) {
          .responsive-slide-container img {
            max-width: 65vw !important; /* 화면 너비의 65% 사이즈로 자동 조절 */
            height: auto !important;
            object-fit: contain !important;
          }
        }
      `}</style>

      {/* ✨ [변경됨] width: 1440 고정을 풀고 className으로 반응형 스타일을 적용했습니다. */}
      <div className="responsive-slide-container">
        {SLIDE_ROWS.map((rowProducts, idx) => (
          <InfiniteSlideRow 
            key={idx} 
            products={rowProducts} 
            direction={idx % 2 === 0 ? 1 : -1}  
          />
        ))}
      </div>

      {/* 🛒 플로팅 장바구니 버튼 (모바일 화면에 맞게 여백 및 크기 미세 조정) */}
      <button
        onClick={openCart}
        style={{
          position:        "fixed",
          bottom:          "24px",  
          right:           "24px",
          width:           "56px",  
          height:          "56px",
          borderRadius:    "50%",
          backgroundColor: "#ffffff",
          color:           "#111111",
          border:          "3px solid #111111",
          cursor:          "pointer",
          fontSize:        "24px",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          boxShadow:       "0 6px 24px rgba(0,0,0,0.3)",
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
            top:             -4, 
            right:           -4,
            backgroundColor: "#ff3b30",
            color:           "#ffffff",
            borderRadius:    "50%",
            width:           "24px", 
            height:          "24px",
            fontSize:        "12px",
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