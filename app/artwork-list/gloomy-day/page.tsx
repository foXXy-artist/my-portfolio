"use client";

import React, { useState, useEffect, useRef } from "react";

// 캔버스 기준 사이즈
const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 2857;

interface CanvasItem {
  id: string;
  type: "image" | "video";
  src: string;
  top: string;
  left: string;
  width: string;
  height?: string;
  rotate?: string;
  zIndex?: number;
  objectFit?: "cover" | "fill" | "contain";
}

const CANVAS_ITEMS: CanvasItem[] = [
  {
    id: "elevator copy",
    type: "image",
    src: "/images/elevator copy.jpg",
    top: "0px",
    left: "136px",
    width: "1135px",
    height: "100%", // 반응형을 위해 100%로 변경
    rotate: "0deg",
    zIndex: 1,
    objectFit: "cover", // 틈새 없이 꽉 채우기
  },
  { id: "top box", type: "image", src: "/images/top box.png", top: "126px", left: "336px", width: "769px", height: "253px", rotate: "0deg", zIndex: 2 },
  {
    id: "red window",
    type: "image",
    src: "/images/red window.jpg",
    top: "467px",
    left: "730px",
    width: "455px",
    rotate: "0deg",
    zIndex: 2,
  },
  { id: "circle foXXy red", type: "image", src: "/images/circle foXXy red.png", top: "287px", left: "1000px", width: "118px", rotate: "0deg", zIndex: 3 },
  { id: "3", type: "image", src: "/images/gloomy day/3.png", top: "223px", left: "499px", width: "143px", rotate: "0deg", zIndex: 3 },
  { id: "image", type: "image", src: "/images/gloomy day/image.png", top: "151px", left: "602px", width: "488px", rotate: "0deg", zIndex: 3 },
  { id: "cloud rain", type: "image", src: "/images/gloomy day/cloud rain.png", top: "107px", left: "984px", width: "78px", rotate: "0deg", zIndex: 3 },
  { id: "pensive", type: "image", src: "/images/gloomy day/pensive.png", top: "208px", left: "1074px", width: "63px", rotate: "15deg", zIndex: 3 },
  { id: "Debut edition doodle", type: "image", src: "/images/Debut edition doodle.png", top: "83px", left: "505px", width: "414px", rotate: "0deg", zIndex: 3 },
  { id: "yellow box", type: "image", src: "/images/yellow box.png", top: "109px", left: "287px", width: "206px", rotate: "0deg", zIndex: 3 },
  { id: "gloomy day", type: "image", src: "/images/gloomy day/gloomy day.png", top: "113px", left: "291px", width: "270px", rotate: "0deg", zIndex: 4 },
  { id: "tornado", type: "image", src: "/images/gloomy day/tornado.png", top: "132px", left: "296px", width: "63px", rotate: "-8deg", zIndex: 4 },
  { id: "gloomy day doodle", type: "image", src: "/images/gloomy day/gloomy day doodle.png", top: "330px", left: "540px", width: "162px", rotate: "0deg", zIndex: 5 },
  { id: "whole box", type: "image", src: "/images/gloomy day/whole box.png", top: "247px", left: "1179px", width: "220px", rotate: "6deg", zIndex: 4 },
  { id: "collect me now", type: "image", src: "/images/collect me now.png", top: "346px", left: "254px", width: "274px", rotate: "0deg", zIndex: 3 },
  { id: "video", type: "video", src: "/images/gloomy day/video.mp4", top: "495px", left: "226px", width: "252.5px", rotate: "0deg", zIndex: 3 },
  { id: "tv_filter", type: "image", src: "/images/tv_filter.png", top: "393px", left: "192px", width: "399px", rotate: "0deg", zIndex: 4 },
  { id: "sinji", type: "image", src: "/images/gloomy day/sinji.png", top: "367px", left: "111px", width: "110px", rotate: "-8deg", zIndex: 5 },
  { id: "detail", type: "image", src: "/images/gloomy day/detail copy.jpg", top: "834px", left: "208px", width: "986px", rotate: "0deg", zIndex: 4 },
  { id: "detail view", type: "image", src: "/images/detail view.png", top: "801px", left: "186px", width: "349px", rotate: "0deg", zIndex: 5 },
  { id: "gloomy day render", type: "image", src: "/images/gloomy day/gloomy day render.png", top: "362px", left: "598px", width: "510px", rotate: "0deg", zIndex: 5 },
  { id: "gloom", type: "image", src: "/images/gloomy day/gloom.png", top: "386px", left: "1162px", width: "111px", rotate: "9deg", zIndex: 5 },
  { id: "pikachu", type: "image", src: "/images/gloomy day/pikachu.png", top: "722px", left: "114px", width: "101px", rotate: "0deg", zIndex: 6 },
  { id: "360 view", type: "video", src: "/images/gloomy day/360 view.mp4", top: "575px", left: "1123px", width: "271px", height: "331px", rotate: "0deg", zIndex: 6 },
  { id: "foXXy box", type: "image", src: "/images/foXXy box.png", top: "2195px", left: "732px", width: "462px", rotate: "0deg", zIndex: 5 },
  { id: "yellow foxxy", type: "image", src: "/images/yellow foxxy.png", top: "2065px", left: "144px", width: "298px", rotate: "5deg", zIndex: 5 },
  { id: "box bot", type: "image", src: "/images/gloomy day/box bot.png", top: "1400px", left: "3px", width: "235px", rotate: "-17deg", zIndex: 6 },
  { id: "drag", type: "image", src: "/images/drag.png", top: "1340px", left: "1151px", width: "206px", rotate: "0deg", zIndex: 6 },
  { id: "cigga", type: "image", src: "/images/cigga.png", top: "555px", left: "955px", width: "206px", rotate: "2deg", zIndex: 3 },
  { id: "bottom", type: "image", src: "/images/gloomy day/bottom.jpg", top: "2287px", left: "232px", width: "424px", rotate: "-180deg", zIndex: 6 },
];

// 반응형 좌표/크기 변환 도우미 함수
const getPercentX = (pxValue: string | number) => {
  if (typeof pxValue === "string" && pxValue.endsWith("%")) return pxValue;
  const num = typeof pxValue === "string" ? parseFloat(pxValue) : pxValue;
  return `${(num / CANVAS_WIDTH) * 100}%`;
};

const getPercentY = (pxValue: string | number) => {
  if (typeof pxValue === "string" && pxValue.endsWith("%")) return pxValue;
  const num = typeof pxValue === "string" ? parseFloat(pxValue) : pxValue;
  return `${(num / CANVAS_HEIGHT) * 100}%`;
};

// ══════════════════════════════════════════════════════════════════════
// 🌧️ 초경량 비 캔버스 애니메이션 컴포넌트
// ══════════════════════════════════════════════════════════════════════
const RainOverlay = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 내부 해상도는 원본 기준으로 유지하고 CSS로 리사이징하여 성능 최적화
    const width = (canvas.width = CANVAS_WIDTH);
    const height = (canvas.height = CANVAS_HEIGHT);

    const particles: { x: number; y: number; l: number; xs: number; ys: number }[] = [];
    const maxParticles = 250; // 파티클 개수 제한으로 성능 최적화[cite: 8]

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        l: Math.random() * 20 + 10,  
        xs: -1 + Math.random() * 2,  
        ys: Math.random() * 15 + 20, 
      });
    }

    let animationFrame: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(200, 215, 235, 0.45)"; 
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      ctx.beginPath();
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.xs, p.y + p.ys);
        p.x += p.xs;
        p.y += p.ys;
        
        if (p.y > height) {
          p.x = Math.random() * width;
          p.y = -20;
        }
      }
      ctx.stroke();
      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%", // CSS로 반응형 사이즈 조절
        height: "100%", // CSS로 반응형 사이즈 조절
        pointerEvents: "none",
        zIndex: 100, 
      }}
    />
  );
};

// ══════════════════════════════════════════════════════════════════════
// 메인 렌더링 컴포넌트
// ══════════════════════════════════════════════════════════════════════
export default function Page() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    if (loadedCount >= CANVAS_ITEMS.length) {
      const timer = setTimeout(() => {
        setIsRaining(true);
      }, 3300); // 4초 후 발동 로직 유지[cite: 8]
      
      return () => clearTimeout(timer);
    }
  }, [loadedCount]);

  const handleItemLoaded = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <main
      style={{
        backgroundColor: "#FFFFFF", 
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: `${CANVAS_WIDTH}px`, // 반응형 컨테이너 제한
          aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`, // 화면 비율 유지
          backgroundImage: "url('/images/red error copy2.jpg')", 
          backgroundSize: "cover",       
          backgroundPosition: "center",  
          backgroundRepeat: "no-repeat", 
          overflow: "hidden",
        }}
      >
        {CANVAS_ITEMS.map((item) => {
          const responsiveStyle: React.CSSProperties = {
            position: "absolute",
            top: getPercentY(item.top),
            left: getPercentX(item.left),
            width: getPercentX(item.width),
            height: item.height ? (item.height === "100%" ? "100%" : getPercentY(item.height)) : "auto",
            transform: item.rotate ? `rotate(${item.rotate})` : undefined,
            zIndex: item.zIndex ?? 0,
            display: "block",
            objectFit: item.objectFit || "contain",
          };

          return item.type === "video" ? (
            <video
              key={item.id}
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={handleItemLoaded}
              onError={handleItemLoaded}
              style={responsiveStyle}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt={item.id}
              onLoad={handleItemLoaded}
              onError={handleItemLoaded}
              style={responsiveStyle}
            />
          );
        })}

        {/* 🌧️ 1. 렉 없는 Canvas 비 애니메이션 */}
        <RainOverlay active={isRaining} />

        {/* 💡 2. 화면 전체 밝기 75% 감소 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: isRaining ? "rgba(0, 0, 0, 0.25)" : "transparent",
            transition: "background-color 4s ease-in-out", 
            pointerEvents: "none",
            zIndex: 99, 
          }}
        />
      </div>
    </main>
  );
}