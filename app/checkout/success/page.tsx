"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); // (참고: 나중에 필요하면 쓸 수 있도록 주문번호 데이터는 남겨두었습니다)

  return (
    <div style={{
      width: "100%",
      maxWidth: "1440px", 
      margin: "0 auto",               
      padding: "40px 20px",           
      backgroundColor: "#ffffff",     
      borderRadius: "16px",           
      boxSizing: "border-box",
    }}>
      
      {/* 🖼️ [이미지 삽입 영역] 기존 축포 이모지가 있던 자리입니다. */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        {/* 
          👇 여기에 사장님이 원하시는 이미지를 넣어주세요! 👇
          
          방법 1. 프로젝트의 public 폴더 안에 이미지를 넣은 경우 (예: foxxy-logo.png)
          <img src="/foxxy-logo.png" alt="성공" style={{ width: "150px", height: "auto" }} />

          방법 2. 외부 이미지 링크를 그대로 가져다 쓸 경우
          <img src="https://사이트주소.com/이미지.png" alt="성공" style={{ width: "150px", height: "auto" }} />
        */}
      </div>

      {/* 📝 1. 상단 완료 메시지 영역 */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ 
          fontSize: "32px",           
          fontWeight: 800,            // 볼드한 글씨체 유지
          marginBottom: "16px",       
          color: "#111111"            
        }}>
          주문이 정상적으로 접수되었습니다!
        </h1>
        <p style={{ 
          color: "#333333",           // 글자 색상 (진한 회색)
          fontSize: "18px",           // 조금 더 잘 보이도록 크기 키움
          fontWeight: 600,            // 약간 굵게
          lineHeight: 1.6             
        }}>
          foXXy가 곧 당신에게 찾아갑니다!
        </p>
      </div>

      {/* 📝 2. 중앙 안내 박스 영역 (계좌 삭제됨) */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px",                  
        maxWidth: "800px",            
        margin: "0 auto",             
        width: "100%" 
      }}>
        
        {/* 🚨 환불 및 제작 안내 문구 박스 */}
        <div style={{
          backgroundColor: "#fff8f8", 
          padding: "24px",            
          borderRadius: "8px",        
          border: "1px solid #fecdca",
          textAlign: "center"         
        }}>
          <p style={{ 
            fontSize: "15px", 
            color: "#d92d20",         
            fontWeight: 600, 
            lineHeight: 1.6, 
            margin: 0 
          }}>
            입금이 확인된 이후 상품 제작 및 발송이 진행됩니다.<br/>
            <strong>제작이 시작된 이후에는 환불이 어려우니</strong> 이 점 유의해 주시기 바랍니다.
          </p>
        </div>
        
        {/* 🛍️ 3. 쇼핑 계속하기 버튼 */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Link href="/shop" style={{
            display: "inline-block",
            padding: "20px 64px",       
            backgroundColor: "#111111", 
            color: "#ffffff",           
            fontSize: "18px",           
            fontWeight: 800,            
            borderRadius: "8px",        
            textDecoration: "none",     
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
      paddingTop: "120px",            
      paddingBottom: "80px",          
      width: "100%"
    }}>
      <Suspense fallback={<div style={{ color: "#111" }}>로딩 중...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}