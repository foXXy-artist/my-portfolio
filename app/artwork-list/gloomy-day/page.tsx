"use client";

import React, { useState, useEffect, useRef } from "react";

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
}

const CANVAS_ITEMS: CanvasItem[] = [
  {
    id: "elevator",
    type: "image",
    src: "/images/elevator.jpg",
    top: "0px",
    left: "136px",
    width: "1135px",
    height: "2857px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    id: "top box",
    type: "image",
    src: "/images/top box.png",
    top: "126px",
    left: "336px",
    width: "769px",
    height: "253px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "circle foXXy red",
    type: "image",
    src: "/images/circle foXXy red.png",
    top: "287px",
    left: "1000px",
    width: "118px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "3",
    type: "image",
    src: "/images/gloomy day/3.png",
    top: "223px",
    left: "499px",
    width: "143px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/gloomy day/image.png",
    top: "151px",
    left: "602px",
    width: "488px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "cloud rain",
    type: "image",
    src: "/images/gloomy day/cloud rain.png",
    top: "107px",
    left: "984px",
    width: "78px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "pensive",
    type: "image",
    src: "/images/gloomy day/pensive.png",
    top: "208px",
    left: "1074px",
    width: "63px",
    rotate: "15deg",
    zIndex: 3,
  },
  {
    id: "Debut edition doodle",
    type: "image",
    src: "/images/Debut edition doodle.png",
    top: "83px",
    left: "505px",
    width: "414px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "yellow box",
    type: "image",
    src: "/images/yellow box.png",
    top: "109px",
    left: "287px",
    width: "206px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "gloomy day",
    type: "image",
    src: "/images/gloomy day/gloomy day.png",
    top: "113px",
    left: "291px",
    width: "270px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "tornado",
    type: "image",
    src: "/images/gloomy day/tornado.png",
    top: "132px",
    left: "296px",
    width: "63px",
    rotate: "-8deg",
    zIndex: 4,
  },
  {
    id: "gloomy day doodle",
    type: "image",
    src: "/images/gloomy day/gloomy day doodle.png",
    top: "335px",
    left: "578px",
    width: "162px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/gloomy day/whole box.png",
    top: "247px",
    left: "1179px",
    width: "220px",
    rotate: "6deg",
    zIndex: 4,
  },
  {
    id: "collect me now",
    type: "image",
    src: "/images/collect me now.png",
    top: "346px",
    left: "254px",
    width: "274px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "video",
    type: "video",
    src: "/images/gloomy day/video.mp4",
    top: "505px",
    left: "228px",
    width: "228px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "tv_filter",
    type: "image",
    src: "/images/tv_filter.png",
    top: "413px",
    left: "194px",
    width: "357px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "sinji",
    type: "image",
    src: "/images/gloomy day/sinji.png",
    top: "404px",
    left: "108px",
    width: "99px",
    rotate: "-8deg",
    zIndex: 5,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/gloomy day/detail.png",
    top: "834px",
    left: "208px",
    width: "986px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "detail view",
    type: "image",
    src: "/images/detail view.png",
    top: "801px",
    left: "186px",
    width: "349px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "gloomy day render",
    type: "image",
    src: "/images/gloomy day/gloomy day render.png",
    top: "579px",
    left: "501px",
    width: "433px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "gloom",
    type: "image",
    src: "/images/gloomy day/gloom.png",
    top: "424px",
    left: "1162px",
    width: "111px",
    rotate: "4deg",
    zIndex: 5,
  },
  {
    id: "pikachu",
    type: "image",
    src: "/images/gloomy day/pikachu.png",
    top: "722px",
    left: "114px",
    width: "101px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/gloomy day/360 view.mp4",
    top: "575px",
    left: "1123px",
    width: "271px",
    height: "331px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "foXXy box",
    type: "image",
    src: "/images/foXXy box.png",
    top: "2195px",
    left: "732px",
    width: "462px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "yellow foxxy",
    type: "image",
    src: "/images/yellow foxxy.png",
    top: "2065px",
    left: "144px",
    width: "298px",
    rotate: "5deg",
    zIndex: 5,
  },
  {
    id: "box bot",
    type: "image",
    src: "/images/gloomy day/box bot.png",
    top: "1400px",
    left: "3px",
    width: "235px",
    rotate: "-17deg",
    zIndex: 6,
  },
  {
    id: "drag",
    type: "image",
    src: "/images/drag.png",
    top: "1340px",
    left: "1151px",
    width: "206px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "title",
    type: "image",
    src: "/images/gloomy day/title.png",
    top: "501px",
    left: "687px",
    width: "401px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "size",
    type: "image",
    src: "/images/gloomy day/size.png",
    top: "592px",
    left: "742px",
    width: "408px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "bottom",
    type: "image",
    src: "/images/gloomy day/bottom.jpg",
    top: "2287px",
    left: "232px",
    width: "424px",
    rotate: "-180deg",
    zIndex: 6,
  },
];

// ══════════════════════════════════════════════════════════════════════
// 🌧️ 초경량 비 캔버스 애니메이션 컴포넌트 (렉 제로 구현)
// ══════════════════════════════════════════════════════════════════════
const RainOverlay = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = 1440);
    const height = (canvas.height = 2857);

    // 빗방울 입자 생성 (성능을 위해 250개 제한)
    const particles: { x: number; y: number; l: number; xs: number; ys: number }[] = [];
    const maxParticles = 300; 

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        l: Math.random() * 20 + 10,  // 빗방울 길이
        xs: -1 + Math.random() * 2,  // x축 흩날림 속도 (살짝 흩날리게)
        ys: Math.random() * 15 + 20, // 떨어지는 y축 속도
      });
    }

    let animationFrame: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(200, 215, 235, 0.45)"; // 약간 푸르스름하고 투명한 빗물 색상
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      ctx.beginPath();
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.xs, p.y + p.ys);
        p.x += p.xs;
        p.y += p.ys;
        
        // 화면 아래로 떨어지면 다시 위에서 무작위 위치로 생성
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
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 100, // 가장 위에서 렌더링되게 설정
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

  // 💡 [핵심 로직] 모든 이미지가 로딩되었을 때 4초 타이머 발동
  useEffect(() => {
    if (loadedCount >= CANVAS_ITEMS.length) {
      const timer = setTimeout(() => {
        setIsRaining(true);
      }, 3300); // 4초 후 발동
      
      return () => clearTimeout(timer);
    }
  }, [loadedCount]);

  // 아이템 로딩(성공/에러 무관하게) 완료될 때 카운트를 증가시킵니다.
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
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "1440px",
          height: "2857px",
          backgroundImage: "url('/images/red error copy2.jpg')", 
          backgroundSize: "cover",       
          backgroundPosition: "center",  
          backgroundRepeat: "no-repeat", 
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {CANVAS_ITEMS.map((item) =>
          item.type === "video" ? (
            <video
              key={item.id}
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              // 데이터 로딩 완료 시 트리거
              onLoadedData={handleItemLoaded}
              onError={handleItemLoaded}
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height ?? "auto",
                transform: item.rotate ? `rotate(${item.rotate})` : undefined,
                zIndex: item.zIndex ?? 0,
                display: "block",
                objectFit: "cover",
              }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt={item.id}
              // 이미지 로딩 완료 시 트리거
              onLoad={handleItemLoaded}
              onError={handleItemLoaded}
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height ?? "auto",
                transform: item.rotate ? `rotate(${item.rotate})` : undefined,
                zIndex: item.zIndex ?? 0,
                display: "block",
              }}
            />
          )
        )}

        {/* 🌧️ 1. 렉 없는 Canvas 비 애니메이션 (활성화되면 나타남) */}
        <RainOverlay active={isRaining} />

        {/* 💡 2. 화면 전체 밝기 75% 감소 (25%의 어두운 반투명 막 생성) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            // isRaining이 true가 되는 순간 투명도 0 -> 0.25(25% 블랙)로 천천히 변함 (75% 밝기 효과)
            backgroundColor: isRaining ? "rgba(0, 0, 0, 0.25)" : "transparent",
            transition: "background-color 4s ease-in-out", // 4초 동안 아주 부드럽고 천천히 어두워짐
            pointerEvents: "none",
            zIndex: 99, // 이미지 위, 빗방울 아래에 배치
          }}
        />
      </div>
    </main>
  );
}