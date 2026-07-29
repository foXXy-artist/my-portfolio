"use client";

import { useScrollProgress } from "./hooks/useScrollProgress";

export default function ScrollbarThumb() {
  const progress = useScrollProgress();

  const TRACK_START = 74;   // 스크롤바 이미지 시작 위치(px)
  const TRACK_END   = 845;  // 스크롤바 이미지 끝 위치(px)
  const currentTop  = TRACK_START + (TRACK_END - TRACK_START) * progress;

  return (
    // 💡 핵심: 1440px짜리 투명한 래퍼로 감싸서 화면 중앙에 고정합니다.
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1440px] h-screen pointer-events-none z-[927]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/body.png" 
        alt=""
        style={{
          position: "absolute", // fixed 대신 absolute로 변경! (이제 1440px 래퍼가 기준이 됨)
          right: "0px",         // 1440px 박스 안에서의 오른쪽 끝에 붙음
          width: "131px",       
          top: `${currentTop}px`,
          transition: "top 0.08s linear",
          pointerEvents: "none",
          zIndex: 926
        }}
      />
    </div>
  );
}