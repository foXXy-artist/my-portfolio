"use client";

import React from "react";

interface CanvasItem {
  id: string;
  type: "image" | "video";
  src: string;
  top: number;
  left: number;
  width: number;
  height?: number;
  rotate?: string;
  zIndex?: number;
}

const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 989;

const CANVAS_ITEMS: CanvasItem[] = [
  {
    id: "about me",
    type: "image",
    src: "/images/about me.png",
    top: 80,
    left: 30,
    width: 1380,
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "blur cd",
    type: "image",
    src: "/images/blur cd.png",
    top: 255,
    left: 41,
    width: 115,
    rotate: "-29deg",
    zIndex: 1,
  },
  {
    id: "computer app",
    type: "image",
    src: "/images/computer app.jpg",
    top: 657,
    left: 1279,
    width: 133,
    rotate: "15deg",
    zIndex: 1,
  },
];

export default function Page() {
  return (
    <main
      style={{
        backgroundColor: "#FFFFFF", 
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 💡 핵심 수정: 'center'를 'flex-start'로 변경하여 상단(Header 밑)에 밀착시킵니다.
        position: "relative",
      }}
    >
      {/* 🎨 반응형 배경 캔버스 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: `${CANVAS_WIDTH}px`, 
          aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`, 
          
          backgroundImage: "url('/images/sky check.jpg')", 
          backgroundSize: "cover",       
          backgroundPosition: "center",  
          backgroundRepeat: "no-repeat", 

          overflow: "hidden",
        }}
      >
        {CANVAS_ITEMS.map((item) => {
          const topPercent = `${(item.top / CANVAS_HEIGHT) * 100}%`;
          const leftPercent = `${(item.left / CANVAS_WIDTH) * 100}%`;
          const widthPercent = `${(item.width / CANVAS_WIDTH) * 100}%`;
          const heightPercent = item.height ? `${(item.height / CANVAS_HEIGHT) * 100}%` : "auto";

          const commonStyle: React.CSSProperties = {
            position: "absolute",
            top: topPercent,
            left: leftPercent,
            width: widthPercent,
            height: heightPercent,
            transform: item.rotate ? `rotate(${item.rotate})` : undefined,
            zIndex: item.zIndex ?? 0,
            display: "block",
          };

          return item.type === "video" ? (
            <video
              key={item.id}
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              style={{ ...commonStyle, objectFit: "cover" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt=""
              style={commonStyle}
            />
          );
        })}
      </div>
    </main>
  );
}