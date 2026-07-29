"use client";

import { useScrollProgress } from "./hooks/useScrollProgress";

export default function ScrollbarThumb() {
  // 🚨 [토이콘 기간 임시 숨김]
  // 아래 'return null;' 때문에 스크롤바가 화면에 나타나지 않습니다.
  // ---------------------------------------------------------------------
  // 💡 [토이콘 끝나고 복구하는 방법]
  // 토이콘이 끝난 후 아래 'return null;' 딱 한 줄만 지우시거나 
  // 맨 앞에 '//'를 붙여서 '// return null;' 로 만들어주시면 바로 원복됩니다!
  // ---------------------------------------------------------------------
  return null;

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