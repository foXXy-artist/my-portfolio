"use client";

import React, { useState, useEffect } from "react";

export default function ResponsiveLayoutWrapper({
  children,
  zIndex,
}: {
  children: React.ReactNode;
  zIndex: number;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // 1440px보다 좁아지면 비율에 맞춰 축소
      if (currentWidth < 1440) {
        setScale(currentWidth / 1440);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        // 💡 가운데 정렬(translateX)과 화면 축소(scale)를 동시에 적용
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: "top center", // 상단 중앙을 기준으로 줄어듦
        width: "1440px",
        height: "100%",
        pointerEvents: "none",
        zIndex: zIndex,
      }}
    >
      {children}
    </div>
  );
}