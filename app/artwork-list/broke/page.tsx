"use client";

import React, { useState, useCallback, useRef } from "react";

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
  { id: "elevator", type: "image", src: "/images/elevator.jpg", top: "0px", left: "136px", width: "1135px", height: "2857px", rotate: "0deg", zIndex: 1 },
  { id: "top box", type: "image", src: "/images/top box.png", top: "126px", left: "336px", width: "769px", height: "253px", rotate: "0deg", zIndex: 2 },
  { id: "circle foXXy red", type: "image", src: "/images/circle foXXy red.png", top: "287px", left: "1000px", width: "118px", rotate: "0deg", zIndex: 3 },
  { id: "2", type: "image", src: "/images/broke/2.png", top: "228px", left: "502px", width: "137px", rotate: "0deg", zIndex: 3 },
  { id: "image", type: "image", src: "/images/broke/image.png", top: "225px", left: "663px", width: "367px", height: "93.5px", rotate: "0deg", zIndex: 3 },
  { id: "poor", type: "image", src: "/images/broke/poor.png", top: "107px", left: "984px", width: "78px", rotate: "0deg", zIndex: 3 },
  { id: "zany face", type: "image", src: "/images/broke/zany face.png", top: "196px", left: "1078px", width: "58px", rotate: "16deg", zIndex: 3 },
  { id: "v", type: "image", src: "/images/broke/v.png", top: "220px", left: "1114px", width: "52px", rotate: "0deg", zIndex: 3 },
  { id: "v2", type: "image", src: "/images/broke/v2.png", top: "213px", left: "1041px", width: "52px", height: "52px", rotate: "6deg", zIndex: 3 },
  { id: "Debut edition doodle", type: "image", src: "/images/Debut edition doodle.png", top: "83px", left: "505px", width: "414px", rotate: "0deg", zIndex: 3 },
  { id: "yellow box", type: "image", src: "/images/yellow box.png", top: "109px", left: "287px", width: "206px", rotate: "0deg", zIndex: 3 },
  { id: "Broke", type: "image", src: "/images/broke/Broke.png", top: "113px", left: "291px", width: "270px", rotate: "0deg", zIndex: 4 },
  { id: "wing money", type: "image", src: "/images/broke/wing money.png", top: "176px", left: "307px", width: "25px", rotate: "-18deg", zIndex: 4 },
  { id: "wing money2", type: "image", src: "/images/broke/wing money2.png", top: "130px", left: "301px", width: "38px", rotate: "21deg", zIndex: 4 },
  { id: "broke doodle", type: "image", src: "/images/broke/broke doodle.png", top: "326px", left: "548px", width: "186px", rotate: "0deg", zIndex: 4 },
  { id: "whole box", type: "image", src: "/images/broke/whole box.png", top: "247px", left: "1179px", width: "220px", rotate: "6deg", zIndex: 4 },
  { id: "collect me now", type: "image", src: "/images/collect me now.png", top: "346px", left: "254px", width: "274px", rotate: "0deg", zIndex: 3 },
  { id: "video", type: "video", src: "/images/broke/video.mp4", top: "505px", left: "220px", width: "237.5px", rotate: "0deg", zIndex: 3 },
  { id: "tv_filter", type: "image", src: "/images/tv_filter.png", top: "413px", left: "194px", width: "357px", rotate: "0deg", zIndex: 4 },
  { id: "thief", type: "image", src: "/images/broke/thief.png", top: "413px", left: "84px", width: "126px", rotate: "-3deg", zIndex: 5 },
  { id: "speak-bubble", type: "image", src: "/images/broke/speak-bubble.png", top: "374px", left: "145px", width: "83px", rotate: "4deg", zIndex: 5 },
  { id: "dollar", type: "image", src: "/images/broke/dollar.png", top: "377px", left: "170px", width: "34px", rotate: "14deg", zIndex: 6 },
  { id: "detail", type: "image", src: "/images/broke/detail.png", top: "834px", left: "208px", width: "986px", rotate: "0deg", zIndex: 4 },
  { id: "detail view", type: "image", src: "/images/detail view.png", top: "801px", left: "186px", width: "349px", rotate: "0deg", zIndex: 5 },
  { id: "broke render", type: "image", src: "/images/broke/broke render.png", top: "551px", left: "495px", width: "464px", rotate: "0deg", zIndex: 5 },
  { id: "coin", type: "image", src: "/images/broke/coin.png", top: "421px", left: "1190px", width: "46px", rotate: "-3deg", zIndex: 5 },
  { id: "metamong", type: "image", src: "/images/broke/metamong.png", top: "728px", left: "108px", width: "111px", rotate: "0deg", zIndex: 6 },
  { id: "360view", type: "video", src: "/images/broke/360view.mp4", top: "575px", left: "1123px", width: "271px", rotate: "0deg", zIndex: 6 },
  { id: "foXXy box", type: "image", src: "/images/foXXy box.png", top: "2195px", left: "732px", width: "462px", rotate: "0deg", zIndex: 5 },
  { id: "yellow foxxy", type: "image", src: "/images/yellow foxxy.png", top: "2065px", left: "144px", width: "298px", rotate: "5deg", zIndex: 5 },
  { id: "box bot", type: "image", src: "/images/broke/box bot.png", top: "1400px", left: "3px", width: "235px", rotate: "-17deg", zIndex: 6 },
  { id: "drag", type: "image", src: "/images/drag.png", top: "1700px", left: "0px", width: "206px", rotate: "0deg", zIndex: 6 },
  { id: "bottom", type: "image", src: "/images/broke/bottom.jpg", top: "2287px", left: "232px", width: "424px", rotate: "-180deg", zIndex: 6 },
  { id: "title", type: "image", src: "/images/broke/title.png", top: "468px", left: "720px", width: "192px", rotate: "0deg", zIndex: 6 },
  { id: "size", type: "image", src: "/images/broke/size.png", top: "541px", left: "749px", width: "402px", rotate: "0deg", zIndex: 6 },
  
  {
    id: "broke wallet hand",
    type: "image",
    src: "/images/broke/broke wallet hand.png",
    top: "666px", 
    left: "936px", 
    width: "224px",
    height: "139px",
    rotate: "2deg",
    zIndex: 5,
  }
];

const DROP_IMAGES = [
  "/images/broke/teddy bear.png", 
  "/images/broke/teddy bear2.png",
  "/images/broke/leaf.png",
  "/images/broke/pink teddy bear.png",
  "/images/broke/fly cartoon.png",
];

interface DroppedItem {
  id: number;
  src: string;
  left: number;
  top: number;
  dropDist: number;
  rotMax: string;
}

export default function Page() {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const shakeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    setIsShaking(false);
    if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
    
    // 1. 지갑 흔들기(털기) 애니메이션 시작
    setTimeout(() => {
      setIsShaking(true);
      shakeTimeoutRef.current = setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }, 10);

    // 2. 지갑이 위로 치켜들려 내용물이 쏟아지는 시점에 이미지 생성
    setTimeout(() => {
      const dropId = Date.now() + Math.random();
      const randomImgSrc = DROP_IMAGES[Math.floor(Math.random() * DROP_IMAGES.length)];
      
      // 💡 지정해주신 구역 (left: 980px ~ width: 50px / top: 773px ~ height: 59px) 안에서 드랍 생성되도록 수정
      const startX = 966 + (Math.random() * 12); // left 980 ~ 1030 사이
      const startY = 782 + (Math.random() * 10); // top 773 ~ 832 사이
      
      const dropDistance = 3500; 
      const randomRotation = (Math.random() * 360 - 180) + "deg"; 

      setDroppedItems((prev) => [
        ...prev,
        {
          id: dropId,
          src: randomImgSrc,
          left: startX,
          top: startY,
          dropDist: dropDistance,
          rotMax: randomRotation,
        },
      ]);

      setTimeout(() => {
        setDroppedItems((prev) => prev.filter((item) => item.id !== dropId));
      }, 2000);
    }, 220);
  }, []);

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
      <style>{`
        /* 💥 손목을 고정하고 지갑을 위로 강하게 들었다가 반동으로 제자리로 돌아오는 애니메이션 */
        @keyframes springWallet {
          0%   { transform: rotate(2deg); }
          20%  { transform: rotate(10deg); }   
          50%  { transform: rotate(-35deg); }  
          75%  { transform: rotate(10deg); }   
          90%  { transform: rotate(-3deg); }   
          100% { transform: rotate(2deg); }    
        }

        /* ⏬ 캔버스 밖으로 쭉 떨어지는 애니메이션 */
        @keyframes dropStraight {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(var(--drop-dist)) rotate(var(--rot-max)); opacity: 0; }
        }
        
        .falling-item {
          animation: dropStraight 1.8s cubic-bezier(0.5, 0, 0.8, 0.2) forwards;
          pointer-events: none;
        }
      `}</style>

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
              onClick={item.id === "broke wallet hand" ? handleTriggerClick : undefined}
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height ?? "auto",
                transform: item.id !== "broke wallet hand" && item.rotate ? `rotate(${item.rotate})` : undefined,
                zIndex: item.zIndex ?? 0,
                display: "block",
                cursor: item.id === "broke wallet hand" ? "pointer" : "default",
                transition: "none",
                animation: item.id === "broke wallet hand" && isShaking ? "springWallet 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)" : "none",
                transformOrigin: item.id === "broke wallet hand" ? "right center" : "center",
              }}
            />
          )
        )}

        {droppedItems.map((drop) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={drop.id}
            src={drop.src}
            alt="dropped item"
            className="falling-item"
            style={{
              position: "absolute",
              left: `${drop.left}px`,
              top: `${drop.top}px`,
              
              /* 💡 크기를 기존(100px)의 95%인 95px로 수정 */
              width: "70px", 
              
              /* 💡 유저님이 적용하신 zIndex 유지 */
              zIndex: 5, 
              
              ...( {
                "--drop-dist": `${drop.dropDist}px`,
                "--rot-max": drop.rotMax,
              } as React.CSSProperties ),
            }}
          />
        ))}
      </div>
    </main>
  );
}