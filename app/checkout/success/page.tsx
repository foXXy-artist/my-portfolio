"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); // (참고: 나중에 필요하면 쓸 수 있도록 주문번호 데이터는 남겨두었습니다)
  
  const { clearCart } = useCart();

  // 💡 성공 페이지가 화면에 렌더링되자마자 장바구니를 안전하게 비워줍니다.
  useEffect(() => {
    if (clearCart) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <div style={{
      width: "100%",
      maxWidth: "480px",              // 모바일 환경에 맞게 최대 너비 설정
      margin: "0 auto",               
      padding: "24px 16px",           // 모바일 화면에 맞게 패딩 축소
      backgroundColor: "#ffffff",     
      borderRadius: "16px",           
      boxSizing: "border-box",
    }}>
      
      {/* 🖼️ [이미지 삽입 영역] 기존 축포 이모지가 있던 자리입니다. */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {/* 
          👇 여기에 사장님이 원하시는 이미지를 넣어주세요! 👇
          
          방법 1. 프로젝트의 public 폴더 안에 이미지를 넣은 경우 (예: foxxy-logo.png)
          <img src="/foxxy-logo.png" alt="성공" style={{ width: "120px", height: "auto" }} />

          방법 2. 외부 이미지 링크를 그대로 가져다 쓸 경우
          <img src="https://사이트주소.com/이미지.png" alt="성공" style={{ width: "120px", height: "auto" }} />
        */}
      </div>

      {/* 📝 1. 상단 완료 메시지 영역 */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ 
          fontSize: "24px",           // 모바일에 적합한 사이즈로 축소
          fontWeight: 800,            
          marginBottom: "12px",       
          color: "#111111",
          wordBreak: "keep-all"       // 어색한 줄바꿈 방지
        }}>
          주문이 정상적으로 접수되었습니다!
        </h1>
        <p style={{ 
          color: "#333333",           
          fontSize: "15px",           
          fontWeight: 600,            
          lineHeight: 1.5,
          wordBreak: "keep-all"       
        }}>
          foXXy가 곧 당신에게 찾아갑니다!
        </p>
      </div>

      {/* 📝 2. 중앙 안내 박스 영역 (계좌 삭제됨) */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px",                  // 컴포넌트 간격 모바일에 맞게 축소
        width: "100%" 
      }}>
        
        {/* 🚨 환불 및 제작 안내 문구 박스 */}
        <div style={{
          backgroundColor: "#fff8f8", 
          padding: "16px",            // 패딩 축소
          borderRadius: "8px",        
          border: "1px solid #fecdca",
          textAlign: "center",
          wordBreak: "keep-all"       
        }}>
          <p style={{ 
            fontSize: "14px",         // 모바일 가독성을 위해 폰트 축소
            color: "#d92d20",         
            fontWeight: 600, 
            lineHeight: 1.5, 
            margin: 0 
          }}>
            입금이 확인된 이후 상품 제작 및 발송이 진행됩니다.<br/>
            <strong>제작이 시작된 이후에는 환불이 어려우니</strong><br/>이 점 유의해 주시기 바랍니다.
          </p>
        </div>
        
        {/* 🛍️ 3. 쇼핑 계속하기 버튼 */}
        <div style={{ marginTop: "16px", width: "100%" }}>
          <Link href="/shop" style={{
            display: "block",
            width: "100%",             // 버튼이 모바일 화면에 꽉 차게 변경
            padding: "16px",       
            backgroundColor: "#111111", 
            color: "#ffffff",           
            fontSize: "16px",           
            fontWeight: 800,            
            borderRadius: "8px",        
            textDecoration: "none",
            textAlign: "center",
            boxSizing: "border-box"
          }}>
            쇼핑 계속하기
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main style={{
      backgroundColor: "#ffffff",     
      minHeight: "100vh",             
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "60px",             // 모바일 상단 헤더 공간을 고려하여 축소
      paddingBottom: "40px",          
      paddingLeft: "16px",            // 좌우 기본 여백 추가
      paddingRight: "16px",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <Suspense fallback={<div style={{ color: "#111" }}>로딩 중...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}