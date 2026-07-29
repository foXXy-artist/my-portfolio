"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{ 
        zIndex: 100,
        // 💡 [여기에 추가됨!] 헤더 아래로 깔리는 부드러운 쉐도우 효과
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.05)"
      }}
      // w-full을 w-[1440px]로 변경하고, 모니터 중앙 정렬을 위해 left-1/2 -translate-x-1/2를 추가했습니다.
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[1440px] h-[65px] bg-white flex items-center justify-center"
    >
      {/* 바깥 header가 이미 1440px이므로 내부 div는 100% 꽉 차게 변경하여 구조를 단순화했습니다. */}
      <div className="w-full h-full flex items-center justify-center">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/XX.png"
            alt="logo"
            style={{ height: "164.5px", width: "auto", display: "block" }}
          />
        </Link>
      </div>
    </header>
  );
}