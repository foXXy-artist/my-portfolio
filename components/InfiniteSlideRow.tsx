"use client";
// ════════════════════════════════════════════════
// components/InfiniteSlideRow.tsx — 무한 슬라이드 한 줄
// ════════════════════════════════════════════════
import { useRef, useEffect, useCallback, useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";

interface Props {
  products:  Product[];
  direction: 1 | -1;   // 1 = 오른쪽, -1 = 왼쪽
}

const BASE_SPEED  = 0.2;
const ARROW_BOOST = 3.0;
const BOOST_DECAY = 0.96; 

export default function InfiniteSlideRow({ products, direction }: Props) {
  const { addItem } = useCart();
  const trackRef    = useRef<HTMLDivElement>(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(0);
  const isDragging  = useRef(false);
  const dragStartX  = useRef(0);
  const dragStartPos = useRef(0);
  const boostRef    = useRef(0);

  // ✨ [반응형 크기 상태] 기본 PC 사이즈는 360px
  const [cardSize, setCardSize] = useState(360);

  // ✨ 화면 크기가 변할 때마다 카드 사이즈 자연스럽게 조정 (모바일 맞춤)
  useEffect(() => {
    const handleResize = () => {
      // 화면이 768px(모바일/태블릿)보다 작으면 화면 너비의 60% 크기로 축소, 크면 360px 유지
      const newSize = window.innerWidth < 768 ? window.innerWidth * 0.6 : 360;
      setCardSize(newSize);
    };

    handleResize(); // 처음 렌더링 시 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 배열 길이 계산 (PC/모바일 상관없이 넉넉하게 2500px 이상 채우도록 복사)
  let baseProducts = [...products];
  if (baseProducts.length > 0) {
    while (baseProducts.length * 360 < 2500) {
      baseProducts = [...baseProducts, ...products];
    }
  }
  
  // 변경된 카드 사이즈를 반영하여 전체 슬라이드 너비 재계산
  const TOTAL_W = baseProducts.length * cardSize;
  const repeated = [...baseProducts, ...baseProducts, ...baseProducts];

  const normalize = useCallback((pos: number) => {
    let p = pos % TOTAL_W;
    if (p > 0) p -= TOTAL_W;
    return p;
  }, [TOTAL_W]);

  useEffect(() => {
    if (products.length === 0) return; 

    let last = 0;
    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (!trackRef.current) return;

      const dt = Math.min(ts - last, 50);
      last = ts;
      if (isDragging.current) return; 

      boostRef.current *= Math.pow(BOOST_DECAY, dt / 16.67);
      if (Math.abs(boostRef.current) < 0.01) boostRef.current = 0;

      const speed = (BASE_SPEED + Math.abs(boostRef.current)) * direction;
      posRef.current = normalize(posRef.current - speed);
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, normalize, products.length]);

  const handleArrow = (dir: 1 | -1) => {
    boostRef.current = ARROW_BOOST * dir * direction * -1;
  };

  const handleDragStart = (clientX: number) => {
    isDragging.current  = true;
    dragStartX.current  = clientX;
    dragStartPos.current = posRef.current;
  };
  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = clientX - dragStartX.current;
    posRef.current = normalize(dragStartPos.current + dx);
    trackRef.current.style.transform = `translateX(${posRef.current}px)`;
  };
  const handleDragEnd = () => { isDragging.current = false; };

  // 마우스 이벤트 (PC)
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();

  // 터치 이벤트 (모바일)
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  if (products.length === 0) return null;

  return (
    // ✨ 전체 높이도 cardSize에 맞춰 자동으로 줄어들게 설정
    <div style={{ position: "relative", width: "100%", height: cardSize, overflow: "hidden" }}>
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}  
        onTouchEnd={onTouchEnd}    
        style={{
          display:  "flex",
          position: "absolute",
          top:      0,
          left:     0,
          cursor:   "grab",
          userSelect: "none",
          willChange: "transform",
        }}
      >
        {repeated.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            style={{
              width:    cardSize, // ✨ 고정 360 -> 반응형 크기 적용
              height:   cardSize, // ✨ 고정 360 -> 정사각형 유지
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#ffffff",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              draggable={false}
              loading="eager"
              decoding="async"
              style={{
                width:     "100%",
                height:    "100%",
                objectFit: "cover",
                display:   "block",
                backgroundColor: "transparent",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            />
            {/* 호버 오버레이 */}
            <div
              className="card-overlay"
              style={{
                position:        "absolute",
                inset:           0,
                backgroundColor: "rgba(0,0,0,0.55)",
                display:         "flex",
                flexDirection:   "column",
                alignItems:      "center",
                justifyContent:  "center",
                gap:             8,
                opacity:         0,
                transition:      "opacity 0.25s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
            >
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 16 }}>
                {product.name}
              </p>
              <p style={{ color: "#eeeeee", fontSize: 14 }}>
                {product.price.toLocaleString("ko-KR")}원
              </p>
              <button
                onClick={() => addItem(product)}
                style={{
                  marginTop:       8,
                  padding:         "10px 24px",
                  backgroundColor: "#ffffff",
                  color:           "#111111",
                  border:          "none",
                  borderRadius:    6,
                  fontWeight:      700,
                  cursor:          "pointer",
                  fontSize:        14,
                }}
              >
                장바구니 담기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 왼쪽 화살표 */}
      <button
        onClick={() => handleArrow(-1)}
        style={{
          position:        "absolute",
          left:            12,
          top:             "50%",
          transform:       "translateY(-50%)",
          background:      "none",
          border:          "none",
          fontSize:        28,
          color:           "rgba(0,0,0,0.8)",
          cursor:          "pointer",
          zIndex:          10,
          lineHeight:      1,
          padding:         "4px 8px",
        }}
      >
        ‹
      </button>

      {/* 오른쪽 화살표 */}
      <button
        onClick={() => handleArrow(1)}
        style={{
          position:        "absolute",
          right:           12,
          top:             "50%",
          transform:       "translateY(-50%)",
          background:      "none",
          border:          "none",
          fontSize:        28,
          color:           "rgba(0,0,0,0.8)",
          cursor:          "pointer",
          zIndex:          10,
          lineHeight:      1,
          padding:         "4px 8px",
        }}
      >
        ›
      </button>
    </div>
  );
}