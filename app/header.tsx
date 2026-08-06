"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // 💡 화면이 1440px보다 작을 때만 비율을 계산하여 축소 (최대 1배율 유지)
    const handleResize = () => setScale(Math.min(1, window.innerWidth / 1440));
    handleResize(); // 초기화
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] bg-white flex items-center justify-center"
      style={{
        zIndex: 100,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.05)",
        // 💡 원본 기준 65px에 스케일 비율을 곱하여 높이 자동 조절
        height: `${65 * scale}px`, 
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/XX.png"
            alt="logo"
            style={{ 
              // 💡 원본 기준 164.5px에 스케일 비율을 곱하여 로고 자동 축소
              width: `${164.5 * scale}px`, 
              height: "auto", 
              display: "block" 
            }}
          />
        </Link>
      </div>
    </header>
  );
}