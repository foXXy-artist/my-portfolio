"use client";

import React, { useState, useCallback, useRef, useEffect, memo } from "react";

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

// ══════════════════════════════════════════════════════════════════════
// 💡 사용자님이 직접 작성하신 이미지 데이터 (100% 보존)
// ══════════════════════════════════════════════════════════════════════
const CANVAS_ITEMS: CanvasItem[] = [
  { id: "elevator", type: "image", src: "/images/elevator.jpg", top: "0px", left: "136px", width: "1135px", height: "2857px", rotate: "0deg", zIndex: 1 },
  { id: "top box", type: "image", src: "/images/top box.png", top: "125px", left: "320px", width: "784px", height: "258px", rotate: "0deg", zIndex: 2 },
  { id: "circle foXXy red", type: "image", src: "/images/circle foXXy red.png", top: "287px", left: "1000px", width: "118px", rotate: "0deg", zIndex: 3 },
  { id: "6", type: "image", src: "/images/half/6.png", top: "219px", left: "505px", width: "151px", rotate: "0deg", zIndex: 3 },
  { id: "image", type: "image", src: "/images/half/image.png", top: "147px", left: "551px", width: "575px", rotate: "0deg", zIndex: 3 },
  { id: "knife", type: "image", src: "/images/half/knife.png", top: "79px", left: "971px", width: "56px", rotate: "-37deg", zIndex: 3 },
  { id: "dizzy_face", type: "image", src: "/images/half/dizzy_face.png", top: "204px", left: "1053px", width: "69px", rotate: "10deg", zIndex: 3 },
  { id: "Debut edition doodle", type: "image", src: "/images/Debut edition doodle.png", top: "83px", left: "505px", width: "414px", rotate: "0deg", zIndex: 3 },
  { id: "yellow box", type: "image", src: "/images/yellow box.png", top: "113px", left: "273px", width: "203px", rotate: "0deg", zIndex: 3 },
  { id: "real_half", type: "image", src: "/images/half/real_half.png", top: "115px", left: "240px", width: "256px", rotate: "0deg", zIndex: 4 },
  { id: "scissors", type: "image", src: "/images/half/scissors.png", top: "129px", left: "409px", width: "52px", rotate: "26deg", zIndex: 4 },
  { id: "half doodle", type: "image", src: "/images/half/half doodle.png", top: "346px", left: "564px", width: "159px", rotate: "0deg", zIndex: 4 },
  { id: "whole box", type: "image", src: "/images/half/whole box.png", top: "247px", left: "1179px", width: "220px", rotate: "6deg", zIndex: 4 },
  { id: "collect me now", type: "image", src: "/images/collect me now.png", top: "346px", left: "254px", width: "274px", rotate: "0deg", zIndex: 3 },
  { id: "video", type: "video", src: "/images/gloomy day/video.mp4", top: "505px", left: "228px", width: "228px", rotate: "0deg", zIndex: 3 },
  { id: "tv_filter", type: "image", src: "/images/tv_filter.png", top: "413px", left: "194px", width: "357px", rotate: "0deg", zIndex: 4 },
  { id: "gwen", type: "image", src: "/images/half/gwen.png", top: "422px", left: "96px", width: "151px", rotate: "-7deg", zIndex: 5 },
  { id: "x", type: "image", src: "/images/half/x.png", top: "439px", left: "199px", width: "40px", rotate: "-16deg", zIndex: 6 },
  { id: "detail", type: "image", src: "/images/half/detail.png", top: "834px", left: "208px", width: "986px", rotate: "0deg", zIndex: 4 },
  { id: "detail view", type: "image", src: "/images/detail view.png", top: "801px", left: "186px", width: "349px", rotate: "0deg", zIndex: 5 },
  { id: "half render", type: "image", src: "/images/half/half render.png", top: "504px", left: "484px", width: "487px", rotate: "0deg", zIndex: 5 },
  { id: "cutter", type: "image", src: "/images/half/cutter.png", top: "474px", left: "1180px", width: "102px", rotate: "0deg", zIndex: 5 },
  { id: "ddogas", type: "image", src: "/images/half/ddogas.png", top: "735px", left: "111px", width: "128px", rotate: "-12deg", zIndex: 6 },
  { id: "360 view", type: "video", src: "/images/half/360 view.mp4", top: "627px", left: "1119px", width: "271px", height: "331px", rotate: "0deg", zIndex: 6 },
  { id: "foXXy box", type: "image", src: "/images/foXXy box.png", top: "2195px", left: "732px", width: "462px", rotate: "0deg", zIndex: 5 },
  { id: "yellow foxxy", type: "image", src: "/images/yellow foxxy.png", top: "2065px", left: "144px", width: "298px", rotate: "5deg", zIndex: 5 },
  { id: "box bot", type: "image", src: "/images/gloomy day/box bot.png", top: "1400px", left: "3px", width: "235px", rotate: "-17deg", zIndex: 6 },
  { id: "drag", type: "image", src: "/images/drag.png", top: "1340px", left: "1151px", width: "206px", rotate: "0deg", zIndex: 6 },
  { id: "bottom", type: "image", src: "/images/half/bottom.jpg", top: "2287px", left: "232px", width: "424px", rotate: "-180deg", zIndex: 6 },
];

// ══════════════════════════════════════════════════════════════════════
// 🚀 [개별 아이템 렌더러] (💡 스크롤 렉의 원인이었던 GPU 가속 옵션 제거!)
// ══════════════════════════════════════════════════════════════════════
interface CanvasItemRendererProps {
  item: CanvasItem;
  triggerSlash?: (rect: DOMRect) => void;
  isSliced?: boolean;
}

const CanvasItemRenderer = memo(function CanvasItemRenderer({ 
  item, 
  triggerSlash,
  isSliced
}: CanvasItemRendererProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isTriggerItem = ["knife", "gwen", "cutter", "scissors"].some(keyword => 
    item.src.toLowerCase().includes(keyword) || item.id.toLowerCase().includes(keyword)
  );

  const style: React.CSSProperties = {
    position: "absolute",
    top: item.top,
    left: item.left,
    width: item.width,
    height: item.height ?? "auto",
    zIndex: item.zIndex ?? 0,
    cursor: isTriggerItem && !isSliced ? "pointer" : "default",
    transition: "transform 0.15s ease-out",
  };

  if (isHovered && isTriggerItem && !isSliced) {
    style.transform = `scale(1.1) ${item.rotate ? `rotate(${item.rotate})` : ""}`;
  } else if (item.rotate) {
    style.transform = `rotate(${item.rotate})`;
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTriggerItem && !isSliced && triggerSlash) {
      triggerSlash(e.currentTarget.getBoundingClientRect());
    }
  };

  return (
    <div
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {item.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt={item.id} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <video src={item.src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      )}
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════
// 🖼️ [배경 및 아이템 렌더링 컨테이너] 
// ══════════════════════════════════════════════════════════════════════
const PageContent = memo(({ triggerSlash, isSliced }: { triggerSlash?: (rect: DOMRect) => void, isSliced?: boolean }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundImage: "url('/images/red error copy2.jpg')", 
        backgroundSize: "cover",       
        backgroundPosition: "center",  
        backgroundRepeat: "no-repeat", 
        overflow: "hidden",
      }}
    >
      {CANVAS_ITEMS.map((item) => (
        <CanvasItemRenderer key={item.id} item={item} triggerSlash={triggerSlash} isSliced={isSliced} />
      ))}
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════
// ⚡ 메인 페이지 (Kung Fu Slash 검기 애니메이션 + 미세하고 자연스러운 바운스 낙하)
// ══════════════════════════════════════════════════════════════════════
export default function Page() {
  const [slashPhase, setSlashPhase] = useState<'idle' | 'slashing' | 'sliced_waiting' | 'dropped'>('idle');
  const [slashRect, setSlashRect] = useState<DOMRect | null>(null);
  const [cutCoords, setCutCoords] = useState({ y1: 0, y2: 0, y3: 0, y4: 0 });

  const pieceA_Ref = useRef<{y: number; vy: number; bounces: number; maxBounces: number}>(null!);
  const pieceB_Ref = useRef<{y: number; vy: number; bounces: number; maxBounces: number}>(null!);
  
  const a_Ref = useRef<HTMLDivElement>(null);
  const b_Ref = useRef<HTMLDivElement>(null);

  // 🔪 절단 액션 발동
  const triggerSlash = useCallback((rect: DOMRect) => {
    if (slashPhase !== 'idle') return;

    setCutCoords({
      y1: 20 + Math.random() * 10,
      y3: 10 + Math.random() * 10,
      y2: 65 + Math.random() * 10,
      y4: 55 + Math.random() * 10,
    });

    setSlashRect(rect);
    setSlashPhase('slashing');

    setTimeout(() => {
      setSlashRect(null);
      setSlashPhase('sliced_waiting');
    }, 400);

  }, [slashPhase]);

  // 💡 [자연스러운 물리엔진] 툭 끊기지 않고 아주 미세하게 통통 튀며 에너지가 소멸됨
  useEffect(() => {
    if (slashPhase === 'sliced_waiting') {
      const dropTimer = setTimeout(() => {
        setSlashPhase('dropped');
        
        // 💡 maxBounces를 3으로 늘려 자연스럽게 멈출 때까지 계산되도록 수정
        pieceA_Ref.current = {y: 0, vy: 0, bounces: 0, maxBounces: 3}; 
        pieceB_Ref.current = {y: 0, vy: 0, bounces: 0, maxBounces: 3}; 

        let rafId: number;
        const startTime = performance.now(); 

        const animateDrop = (now: number) => {
          const a = a_Ref.current;
          const b = b_Ref.current;
          if (!a || !b) return;

          const pA = pieceA_Ref.current;
          const pB = pieceB_Ref.current;
          const elapsed = now - startTime;
          
          // 💡 중력을 다소 부드럽게 풀고, 튕기는 힘을 미세하게 유지해 자연스럽게 안착 유도 (절대 과하지 않게)
          const gravity = 1.5;         
          const bounceRatioA = 0.35;    
          const bounceRatioB = 0.3;   

          // 1. 중간조각 (2번째 레이어)
          if (pB.bounces < pB.maxBounces) {
            pB.vy += gravity; 
            pB.y += pB.vy;    
            if (pB.y >= 50) { 
              pB.y = 50;
              pB.vy = -pB.vy * bounceRatioB; 
              pB.bounces++;
            }
            b.style.transform = `translate(20px, ${pB.y}px) rotate(0.8deg)`;
          } else {
            b.style.transform = `translate(20px, 50px) rotate(0.8deg)`;
          }

          // 2. 윗조각 (맨 위 레이어) - 200ms(0.2초) 뒤에 시차를 두고 떨어짐
          if (elapsed > 200) {
            if (pA.bounces < pA.maxBounces) {
              pA.vy += gravity; 
              pA.y += pA.vy;    
              if (pA.y >= 90) { 
                pA.y = 90;
                pA.vy = -pA.vy * bounceRatioA; 
                pA.bounces++;
              }
              a.style.transform = `translate(-35px, ${pA.y}px) rotate(-1.5deg)`;
            } else {
              a.style.transform = `translate(-35px, 90px) rotate(-1.5deg)`;
            }
          }

          if (pA.bounces < pA.maxBounces || pB.bounces < pB.maxBounces) {
            rafId = requestAnimationFrame(animateDrop);
          }
        };

        rafId = requestAnimationFrame(animateDrop);
        return () => cancelAnimationFrame(rafId);
      }, 1250); 

      return () => clearTimeout(dropTimer);
    }
  }, [slashPhase]);

  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "1440px",
    height: "2857px", 
    transition: slashPhase === 'dropped' ? "none" : "transform 0.05s linear",
    willChange: slashPhase !== 'idle' && slashPhase !== 'dropped' ? "transform, clip-path" : "auto",
  };

  const slice1 = {
    ...wrapperStyle,
    clipPath: `polygon(0% 0%, 100% 0%, 100% ${cutCoords.y3}%, 0% ${cutCoords.y1}%)`,
    zIndex: 3
  };

  const slice2 = {
    ...wrapperStyle,
    clipPath: `polygon(0% ${cutCoords.y1}%, 100% ${cutCoords.y3}%, 100% ${cutCoords.y4}%, 0% ${cutCoords.y2}%)`,
    zIndex: 2
  };

  const slice3 = {
    ...wrapperStyle,
    clipPath: slashPhase !== 'idle' ? `polygon(0% ${cutCoords.y2}%, 100% ${cutCoords.y4}%, 100% 100%, 0% 100%)` : 'none',
    zIndex: 1
  };

  return (
    <main
      style={{
        backgroundColor: "#000000", 
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", width: "1440px", height: "2857px", overflow: "hidden" }}>
        
        <div style={slashPhase !== 'idle' ? slice3 : { width: "100%", height: "100%" }}>
          <PageContent triggerSlash={triggerSlash} isSliced={slashPhase !== 'idle'} />
        </div>

        {slashPhase !== 'idle' && (
          <>
            <div ref={b_Ref} style={slice2}><PageContent isSliced={true} /></div>
            <div ref={a_Ref} style={slice1}><PageContent isSliced={true} /></div>
          </>
        )}
      </div>

      {/* 💥 [가볍고 날렵한 검기 애니메이션] */}
      {slashPhase === 'slashing' && slashRect && (
        <>
          <style>{`
            @keyframes swordSlashFast {
              0% { transform: translate(-50%, -50%) rotate(var(--rot)) scaleX(0); opacity: 1; filter: drop-shadow(0 0 10px #fff); }
              20% { transform: translate(-50%, -50%) rotate(var(--rot)) scaleX(1); opacity: 1; filter: drop-shadow(0 0 20px #fff); }
              100% { transform: translate(-50%, -50%) rotate(var(--rot)) scaleX(1); opacity: 0; filter: drop-shadow(0 0 5px #fff); height: 1px; }
            }
            .sword-aura-fast {
              position: absolute;
              left: 50%;
              width: 150vw;
              height: 25px;
              background-color: #ffffff;
              border-radius: 50%;
              animation: swordSlashFast 0.25s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
              pointer-events: none;
              z-index: 9999;
            }
          `}</style>
          
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
            <div className="sword-aura-fast" style={{ top: `${cutCoords.y1}%`, '--rot': '-12deg', animationDelay: '0s' } as any} />
            <div className="sword-aura-fast" style={{ top: `${cutCoords.y2}%`, '--rot': '8deg', animationDelay: '0.1s' } as any} />
            <div className="sword-aura-fast" style={{ top: `50%`, '--rot': '45deg', animationDelay: '0.2s' } as any} />
          </div>
        </>
      )}
    </main>
  );
}