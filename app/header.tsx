"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{ 
        zIndex: 100,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.05)"
      }}
      // 💡 w-[1440px]를 w-full max-w-[1440px]로 변경.
      // 💡 h-[65px]를 화면 비율에 맞게 줄어들도록 h-[min(4.51vw,65px)]로 변경 (65/1440 = 4.51%)
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[min(4.51vw,65px)] bg-white flex items-center justify-center"
    >
      <div className="w-full h-full flex items-center justify-center">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/XX.png"
            alt="logo"
            // 💡 로고 크기도 164.5px 고정에서 화면 크기에 비례하여 축소되도록 변경 (164.5/1440 = 11.42%)
            style={{ height: "min(11.42vw, 164.5px)", width: "auto", display: "block" }}
          />
        </Link>
      </div>
    </header>
  );
}