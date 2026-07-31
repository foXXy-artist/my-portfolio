"use client";

import { useScrollProgress } from "./hooks/useScrollProgress";

export default function ScrollbarThumb() {
  const progress = useScrollProgress();

  // 💡 기존의 고정된 px 대신 화면 너비(vw)에 비례하는 동적 위치 계산식을 문자열로 생성합니다.
  // TRACK_START (74px)  -> 1440px 기준 약 5.14vw
  // TRACK_END   (845px) -> 1440px 기준 약 58.68vw
  const topPosition = `calc(min(5.14vw, 74px) + (min(58.68vw, 845px) - min(5.14vw, 74px)) * ${progress})`;

  return (
    // 💡 w-[1440px]를 w-full max-w-[1440px]로 변경하여 래퍼가 반응형으로 줄어들게 처리
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-screen pointer-events-none z-[927]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/body.png" 
        alt=""
        style={{
          position: "absolute", 
          right: "0px",         
          // 💡 스크롤바 이미지 너비(131px)도 래퍼에 비례하여 줄어들게 설정 (131/1440 = 9.1%)
          width: "min(9.1vw, 131px)",       
          // 💡 JS에서 px을 꽂아주는 대신 브라우저가 직접 계산하게 CSS calc() 식을 전달
          top: topPosition,
          transition: "top 0.08s linear",
          pointerEvents: "none",
          zIndex: 926
        }}
      />
    </div>
  );
}