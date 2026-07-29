"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

// ══════════════════════════════════════════════════════════════════
// ⚙️ [설정 공간 1] - 페이지 기본 설정
// ══════════════════════════════════════════════════════════════════
const CANVAS_H = 2857;                                 // 전체 페이지 세로 높이
const AUDIO_SRC = "/images/nirvxxa/water2.mp4";
const DOLLAR_EXIT_DURATION = 2.8;
const VIDEO_START_DELAY = 1200;                        // 💡 달러가 먼저 날아가고 렉 없이 영상이 켜지도록 기다리는 시간 (1.2초)
const DOLLAR_HIDDEN_Y  = -1257;                  
const DOLLAR_LAND_TOP  = -576;
const DOLLAR_LAND_LEFT = 874;
const DRAG_TRIGGER_PX  = 50;

// ══════════════════════════════════════════════════════════════════
// 🌊 [설정 공간 2] - 물 영상(water.mp4) 배치 및 크기 직접 설정
// ══════════════════════════════════════════════════════════════════
const WATER_VIDEO_SRC = "/images/nirvxxa/water2.mp4";   
const WATER_OPACITY = 0.65;                            
const CHROMA_TOLERANCE = 30;                           

const WATER_VIDEO_W = 1440;         
const WATER_VIDEO_H = 2857;         
const WATER_VIDEO_BOTTOM = 0;       
const WATER_VIDEO_LEFT = 0;         

const VIDEO_ABSOLUTE_TOP = CANVAS_H - WATER_VIDEO_BOTTOM - WATER_VIDEO_H;
// ══════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════
// 📊 [설정 공간 3] - 부력(떠오르는 높이) 조절
// ══════════════════════════════════════════════════════════════════
const BUOYANCY_SPEED_RATIO = 0.4;                      

const CUSTOM_FLOAT_CONFIG: Record<string, { speedRatio: number; maxFloatUp: number }> = {
  "foXXy box": { speedRatio: 0.65, maxFloatUp: 2150 },
  "yellow foxxy": { speedRatio: 0.65, maxFloatUp: 2450 },
  "bottom": { speedRatio: 0.6, maxFloatUp: 1050 },
  "detail": { speedRatio: 0.25, maxFloatUp: 220 }
};
// ══════════════════════════════════════════════════════════════════

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
  { id: "top box", type: "image", src: "/images/top box.png", top: "128px", left: "342px", width: "770px", height: "253px", rotate: "0deg", zIndex: 2 },
  { id: "circle foXXy red", type: "image", src: "/images/nirvxxa/circle foXXy red.png", top: "297px", left: "1025px", width: "104px", height: "88px", rotate: "0deg", zIndex: 3 },
  { id: "4", type: "image", src: "/images/nirvxxa/4.png", top: "224px", left: "495px", width: "131px", height: "82px", rotate: "0deg", zIndex: 3 },
  { id: "image", type: "image", src: "/images/nirvxxa/image.png", top: "216px", left: "648px", width: "378px", height: "91px", rotate: "0deg", zIndex: 3 },
  { id: "bubble", type: "image", src: "/images/nirvxxa/bubble.png", top: "99px", left: "980px", width: "118px", height: "74px", rotate: "0deg", zIndex: 3 },
  { id: "neutral_face", type: "image", src: "/images/nirvxxa/neutral_face.png", top: "208px", left: "1074px", width: "63px", height: "63px", rotate: "15deg", zIndex: 3 },
  { id: "Debut edition doodle", type: "image", src: "/images/Debut edition doodle.png", top: "83px", left: "505px", width: "414px", height: "130px", rotate: "0deg", zIndex: 3 },
  { id: "yellow box", type: "image", src: "/images/yellow box.png", top: "95px", left: "277px", width: "202px", height: "176px", rotate: "0deg", zIndex: 3 },
  { id: "real_nirvxxa", type: "image", src: "/images/nirvxxa/real_nirvxxa.png", top: "82px", left: "215px", width: "280px", height: "187px", rotate: "0deg", zIndex: 4 },
  { id: "money", type: "image", src: "/images/nirvxxa/money.png", top: "105px", left: "405px", width: "44px", height: "75px", rotate: "0deg", zIndex: 4 },
  { id: "nirvxxa doodle", type: "image", src: "/images/nirvxxa/nirvxxa doodle.png", top: "335px", left: "564px", width: "200px", height: "163px", rotate: "0deg", zIndex: 4 },
  { id: "whole box", type: "image", src: "/images/nirvxxa/whole box.png", top: "247px", left: "1179px", width: "220px", height: "171px", rotate: "6deg", zIndex: 4 },
  { id: "collect me now", type: "image", src: "/images/collect me now.png", top: "346px", left: "254px", width: "274px", height: "63px", rotate: "0deg", zIndex: 3 },
  { id: "video", type: "video", src: "/images/nirvxxa/video.mp4", top: "490px", left: "219px", width: "238px", height: "199", rotate: "0deg", zIndex: 3 },
  { id: "tv_filter", type: "image", src: "/images/tv_filter.png", top: "413px", left: "194px", width: "357px", height: "326px", rotate: "0deg", zIndex: 4 },
  { id: "nirvana baby", type: "image", src: "/images/nirvxxa/nirvana baby.png", top: "404px", left: "76px", width: "194px", height: "112px", rotate: "0deg", zIndex: 5 },
  { id: "detail", type: "image", src: "/images/nirvxxa/detail.png", top: "834px", left: "208px", width: "986px", height: "1315px", rotate: "0deg", zIndex: 2 },
  { id: "detail view", type: "image", src: "/images/detail view.png", top: "801px", left: "186px", width: "349px", height: "79px", rotate: "0deg", zIndex: 5 },
  { id: "gloomy day render", type: "image", src: "/images/gloomy day/gloomy day render.png", top: "579px", left: "501px", width: "433px", rotate: "0deg", zIndex: 5 },
  { id: "money2", type: "image", src: "/images/nirvxxa/money.png", top: "416px", left: "1175px", width: "95px", height: "163px", rotate: "8deg", zIndex: 5 },
  { id: "annong", type: "image", src: "/images/nirvxxa/annong.png", top: "749px", left: "146px", width: "85px", height: "99px", rotate: "0deg", zIndex: 6 },
  { id: "360 view", type: "video", src: "/images/gloomy day/360 view.mp4", top: "627px", left: "1119px", width: "271px", height: "331px", rotate: "0deg", zIndex: 6 },
  { id: "foXXy box", type: "image", src: "/images/foXXy box.png", top: "2195px", left: "732px", width: "462px", height: "208px", rotate: "0deg", zIndex: 3 },
  { id: "yellow foxxy", type: "image", src: "/images/nirvxxa/yellow foxxy.png", top: "2100px", left: "140px", width: "298px", height: "102px", rotate: "5deg", zIndex: 2 },
  { id: "box bot", type: "image", src: "/images/nirvxxa/box bot.png", top: "1400px", left: "3px", width: "235px", height: "182px", rotate: "-17deg", zIndex: 6 },
  { id: "drag", type: "image", src: "/images/drag.png", top: "1340px", left: "1151px", width: "206px", height: "89px", rotate: "0deg", zIndex: 6 },
  { id: "bottom", type: "image", src: "/images/nirvxxa/bottom.png", top: "1900px", left: "231px", width: "424px", height: "388px", rotate: "-180deg", zIndex: 2 },
];

const FIXED_IDS = new Set(["elevator"]);

// ══════════════════════════════════════════════════════════════════
// 🟢 [버거 수정 완벽 반영] 실시간 수면 감지 및 크로마키 제거 엔진
// ══════════════════════════════════════════════════════════════════
function RealtimeWaterTracker({ 
  src, style, className, onWaterLevelUpdate, chromaTolerance = 30
}: { 
  src: string; style?: React.CSSProperties; className?: string; 
  onWaterLevelUpdate?: (ratio: number) => void;
  chromaTolerance?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smoothedRatioRef = useRef(1.0); 

  const onWaterLevelUpdateRef = useRef(onWaterLevelUpdate);
  useEffect(() => {
    onWaterLevelUpdateRef.current = onWaterLevelUpdate;
  }, [onWaterLevelUpdate]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    video.playbackRate = 1.66;
    video.play().catch(e => console.log("비디오 가동 대기:", e));

    let animationId: number;

    const processFrame = () => {
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        const time = Date.now() / 1000;
        const sloshX = Math.cos(time * 1.2) * 8;  
        const sloshY = Math.sin(time * 1.8) * 12; 

        const drawX = sloshX - 10;
        const drawY = sloshY - 15;
        const drawW = canvas.width + 20;
        const drawH = canvas.height + 30;

        ctx.drawImage(video, drawX, drawY, drawW, drawH);
        
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        let foundSurface = false;
        let surfaceY = canvas.height;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const chroma = g - Math.max(r, b);
          
          if (chroma > chromaTolerance) {
            data[i + 3] = 0; 
          } else {
            if (!foundSurface) {
              surfaceY = Math.floor((i / 4) / canvas.width);
              foundSurface = true;
            }
          }
        }
        
        ctx.putImageData(frame, 0, 0);

        const targetRatio = foundSurface ? surfaceY / canvas.height : 1.0;
        
        if (video.ended) {
          smoothedRatioRef.current = targetRatio;
        } else {
          smoothedRatioRef.current += (targetRatio - smoothedRatioRef.current) * 0.15;
        }

        if (onWaterLevelUpdateRef.current) {
          onWaterLevelUpdateRef.current(smoothedRatioRef.current);
        }
      }
      
      animationId = requestAnimationFrame(processFrame);
    };

    animationId = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [src, chromaTolerance]);

  return (
    <>
      <video ref={videoRef} src={src} autoPlay muted playsInline crossOrigin="anonymous" style={{ display: "none" }} />
      <canvas ref={canvasRef} style={style} className={className} />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// FloatingItem — 실시간 물 높이에 연동되어 떠오르는 컴포넌트
// ══════════════════════════════════════════════════════════════════
interface FloatingItemProps {
  item: CanvasItem;
  waterTopPx: number;   
  index: number;           
}

function FloatingItem({ item, waterTopPx, index }: FloatingItemProps) {
  const isFixed = FIXED_IDS.has(item.id);

  const itemTopPx = parseInt(item.top, 10);
  const itemWidthPx = parseInt(item.width, 10);
  
  let itemHeightPx = item.height ? parseInt(item.height, 10) : itemWidthPx * 0.8;
  const itemBottomPx = itemTopPx + itemHeightPx;

  const isFloating = !isFixed && waterTopPx < itemBottomPx;
  
  let floatY = 0;
  if (isFloating) {
    let currentRatio = BUOYANCY_SPEED_RATIO;
    let currentMaxUp = 9999; 

    if (CUSTOM_FLOAT_CONFIG[item.id]) {
      currentRatio = CUSTOM_FLOAT_CONFIG[item.id].speedRatio;
      currentMaxUp = CUSTOM_FLOAT_CONFIG[item.id].maxFloatUp;
    }

    const calculatedFloat = (waterTopPx - itemBottomPx) * currentRatio;
    floatY = Math.max(-currentMaxUp, calculatedFloat);
  }

  const baseStyle: React.CSSProperties = {
    position:   "absolute",
    top:        item.top,
    left:       item.left,
    width:      item.width,
    height:     item.height ?? "auto",
    zIndex:     isFixed ? (item.zIndex ?? 0) : (item.zIndex ?? 0) + 10,
    display:    "block",
  };

  const content =
    item.type === "video" ? (
      <video src={item.src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.src} alt="" style={{ width: "100%", height: "100%", display: "block" }} draggable={false} />
    );

  if (isFixed) {
    return <div key={item.id} style={baseStyle}>{content}</div>;
  }

  const bobbingDelay = (index % 4) * 0.6;

  return (
    <motion.div
      key={item.id}
      style={{
        ...baseStyle,
        transformOrigin: "center bottom",
        y: floatY, 
        rotate: item.rotate ? parseFloat(item.rotate) : 0
      }}
    >
      <div 
        className={isFloating ? "floating-bobbing" : ""} 
        style={{ width: "100%", height: "100%", animationDelay: `${bobbingDelay}s` }}
      >
        {content}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE (메인 화면)
// ══════════════════════════════════════════════════════════════════
export default function Page() {
  const [dollarVisible, setDollarVisible]   = useState(false);
  const [dollarPulled,  setDollarPulled]    = useState(false); // 💡 달러가 당겨졌는지를 먼저 추적하는 상태 추가
  const [floodActive,   setFloodActive]     = useState(false); // 💡 물 렌더링은 나중에 추적
  
  const [waterTopPx, setWaterTopPx] = useState(CANVAS_H);

  const dragY = useMotionValue(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_SRC);
    if (audioRef.current) audioRef.current.playbackRate = 1.66;
    const t = setTimeout(() => setDollarVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ backgroundColor: "#FFFFFF", width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", position: "relative" }}>
      
      <style>{`
        @keyframes liquidBobbing {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-4px) translateX(-3px) rotate(-1.5deg); }
          66% { transform: translateY(2px) translateX(3px) rotate(1deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }
        .floating-bobbing {
          animation: liquidBobbing 3.5s infinite ease-in-out;
        }
      `}</style>

      <div style={{ position: "relative", width: "1440px", height: `${CANVAS_H}px`, backgroundImage: "url('/images/red error copy2.jpg')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden", flexShrink: 0 }}>
        
        {CANVAS_ITEMS.map((item, i) => (
          <FloatingItem key={item.id} item={item} waterTopPx={waterTopPx} index={i} />
        ))}

        {floodActive && (
          <div style={{ 
            position: "absolute", 
            zIndex: 100, 
            pointerEvents: "none",
            left: `${WATER_VIDEO_LEFT}px`, 
            bottom: `${WATER_VIDEO_BOTTOM}px`, 
            width: `${WATER_VIDEO_W}px`, 
            height: `${WATER_VIDEO_H}px`
          }}>
            <RealtimeWaterTracker
              src={WATER_VIDEO_SRC}
              chromaTolerance={CHROMA_TOLERANCE}
              onWaterLevelUpdate={(ratio) => {
                setWaterTopPx(VIDEO_ABSOLUTE_TOP + (WATER_VIDEO_H * ratio));
              }}
              style={{ width: "100%", height: "100%", display: "block", opacity: WATER_OPACITY }} 
            />
          </div>
        )}

        {dollarVisible && (
          <motion.div
            ref={dragRef}
            drag={!dollarPulled ? "y" : false}
            dragConstraints={{ top: 0, bottom: DRAG_TRIGGER_PX + 60 }}
            dragElastic={0.3}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y >= DRAG_TRIGGER_PX) {
                // 1️⃣ 달러 애니메이션 트리거 (과부하 없음, 부드럽게 날아감)
                setDollarPulled(true); 

                // 2️⃣ 지정된 시간(1.2초) 대기 후 영상 및 오디오 렌더링 트리거
                setTimeout(() => {
                  setFloodActive(true); 
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0; 
                    audioRef.current.play().catch(e => console.log("Audio play blocked", e));
                  }
                }, VIDEO_START_DELAY);

              } else {
                dragY.set(0); 
              }
            }}
            initial={{ y: DOLLAR_HIDDEN_Y }}
            animate={dollarPulled ? { y: -2200, opacity: 1, scale: 0.8 } : { y: 0 }}
            transition={
              dollarPulled 
                ? { duration: DOLLAR_EXIT_DURATION, ease: "easeInOut" } 
                : { delay: 0.1, duration: 1.0, type: "spring", stiffness: 80, damping: 14 }
            }
            style={{
              position:  "absolute", top: DOLLAR_LAND_TOP, left: DOLLAR_LAND_LEFT,
              zIndex: 200, cursor: dollarPulled ? "default" : "grab", touchAction: "none", userSelect: "none",
            }}
            whileDrag={!dollarPulled ? { cursor: "grabbing", scale: 1.04 } : {}}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nirvxxa/dollar.png" alt="dollar" draggable={false} style={{ width: 409, display: "block", pointerEvents: "none" }} />
            
            {!dollarPulled && (
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ textAlign: "center", marginTop: 8, fontSize: 22, color: "rgba(0,0,0,0.45)", lineHeight: 1 }}>
                ↓
              </motion.div>
            )}
          </motion.div>
        )}

      </div>
    </main>
  );
}