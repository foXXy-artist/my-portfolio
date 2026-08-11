"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import OverlayModal from "./OverlayModal";

const MOBILE_SCALE = 2.12;
const DESKTOP_BASE  = 1440;

const CONFIG = {
  images: {
    circle:  "/images/circle.png",
    topBun:  "/images/top-bun.png",
    cheese:  "/images/cheese.png",
    lettuce: "/images/lettuce.png",
    patty:   "/images/patty.png",
    tomato:  "/images/tomato.png",
    botBun:  "/images/bot-bun.png",
  },
  container: { top: 0, left: 0, width: 268, height: 268, zIndex: 9100 },
  circle: {
    closed: { left: 31, top: 24, width: 93, zIndex: 9110, rotate: -1 },
    open:   { left: 63, top: 79, width: 134, zIndex: 9110, rotate: -1 },
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  layers: {
    topBun: {
      closed: { left: 39, top:  20, width:  71.5, zIndex: 9155, rotate:  0 },
      open:   { left: 81, top:  24, width:  88,   zIndex: 9155, rotate: -3 },
      hover:  { scale: 1.12, translateX: 0, translateY: -4, rotate: 5, brightness: 1.0 },
    },
    cheese: {
      closed: { left: 30, top:  51, width:  90,   zIndex: 9156, rotate:  0 },
      open:   { left: 74, top:  79, width: 109,   zIndex: 9156, rotate:  7 },
      hover:  { scale: 1.12, translateX: 0, translateY: -2, rotate: -5, brightness: 1.0 },
    },
    lettuce: {
      closed: { left: 36, top:  57, width:  79,   zIndex: 9151, rotate: -2 },
      open:   { left: 77, top: 113, width: 105,   zIndex: 9151, rotate: 12 },
      hover:  { scale: 1.12, translateX: 0, translateY: -0.5, rotate: -9, brightness: 1.0 },
    },
    patty: {
      closed: { left: 34, top:  59, width:  85.5, zIndex: 9153, rotate:  0 },
      open:   { left: 79, top: 144, width: 105,   zIndex: 9153, rotate:  6 },
      hover:  { scale: 1.12, translateX: 0, translateY:  1, rotate: -8, brightness: 1.0 },
    },
    tomato: {
      closed: { left: 39, top:  74, width:  81,   zIndex: 9152, rotate:  0 },
      open:   { left: 83, top: 182, width: 100,   zIndex: 9152, rotate: 12 },
      hover:  { scale: 1.12, translateX: 0, translateY:  2, rotate: -10, brightness: 1.0 },
    },
    botBun: {
      closed: { left: 38, top:  82, width:  84,   zIndex: 9154, rotate:  0 },
      open:   { left: 84, top: 210, width: 101,   zIndex: 9154, rotate:  3 },
      hover:  { scale: 1.12, translateX: 0, translateY:  3, rotate: -3, brightness: 1.0 },
    },
  },
  menuLabels: [
    {
      id:   "artworkletter", src:  "/images/artworkletter.png", href: "/artwork-list",
      closed: { left:  34, top:  96, width: 81,  height: 21, zIndex: 9111, rotate:  3 },
      open:   { left:  91, top:  97, width: 81,  height: 21, zIndex: 9156, rotate:  3 },
      hover:  { scale: 1.2, translateX: -0.2, translateY: 0, rotate: -3 },
    },
    {
      id:   "aboutfoxxyletter", src:  "/images/aboutfoxxyletter.png", href: "/about-foxxy",
      closed: { left:  -10, top: 67, width: 125, height: 22, zIndex: 9111, rotate: -1 },
      open:   { left:  63, top: 132, width: 128, height: 22, zIndex: 9156, rotate: -1 },
      hover:  { scale: 1.1,  translateX: -0.3, translateY: 0, rotate: 1.5 },
    },
    {
      id:   "aboutmeletter", src:  "/images/aboutmeletter.png", href: "/about-me",
      closed: { left:  36, top: 50, width: 75,  height: 18, zIndex: 9111, rotate: -1 },
      open:   { left:  97, top: 171, width: 80,  height: 20, zIndex: 9156, rotate: -4 },
      hover:  { scale: 1.2,  translateX: 1, translateY: 0, rotate: 2 },
    },
    {
      id:   "shop", src:  "/images/shop.png", href: "/shop",
      closed: { left: 60, top: 80, width: 45,  height: 18, zIndex: 9111, rotate: -9 },
      open:   { left: 115, top: 200, width: 45,  height: 18, zIndex: 9156, rotate: -9 },
      hover:  { scale: 1.2,  translateX: 1, translateY: 0, rotate: 3 },
    },
  ],
  layerTransition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  labelOpenTransition:  "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  labelCloseTransition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  overlays: {
    "top-bun": { imageSrc: "/images/bun overlay.png",     imageW: 553, imageH: 299 },
    "cheese":  { imageSrc: "/images/cheese overlay.png",  imageW: 553, imageH: 299 },
    "lettuce": { imageSrc: "/images/lettuce overlay.png", imageW: 553, imageH: 299 },
    "patty":   { imageSrc: "/images/patty overlay.png",   imageW: 553, imageH: 299 },
    "tomato":  { imageSrc: "/images/tomato overlay.png",  imageW: 553, imageH: 299 },
    "bot-bun": { imageSrc: "/images/bun overlay2.png",    imageW: 553, imageH: 299 },
  },
};

type OverlayId = "top-bun"|"cheese"|"lettuce"|"patty"|"tomato"|"bot-bun"|null;
type LayerKey  = keyof typeof CONFIG.layers;

export default function BurgerMenu() {
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<OverlayId>(null);
  const [hoveredLayer,  setHoveredLayer]  = useState<LayerKey | string | null>(null);
  const [scaleRatio,    setScaleRatio]    = useState(1);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // 창 크기에 따른 스케일링 및 터치 기기 감지
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setScaleRatio(MOBILE_SCALE);
      } else if (width < DESKTOP_BASE) {
        setScaleRatio(width / DESKTOP_BASE);
      } else {
        setScaleRatio(1);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    // 호버 지원 여부 및 터치 기기 감지 (모바일 환경 구분)
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        window.matchMedia("(hover: none)").matches || 
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0
      );
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 모바일 환경에서 햄버거 메뉴 바깥 영역 클릭(터치) 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      // 오버레이 모달이 열려있을 땐 메뉴를 닫지 않음
      if (activeOverlay) return; 

      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setHoveredLayer(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen, activeOverlay]);

  const { images, layers, menuLabels, container, circle } = CONFIG;

  const cs = isMenuOpen ? circle.open : circle.closed;
  const circleStyle: React.CSSProperties = {
    position: "absolute", left: cs.left, top: cs.top, width: cs.width,
    zIndex: cs.zIndex, transform: `rotate(${cs.rotate}deg)`,
    transition: circle.transition, pointerEvents: "none",
  };

  function layerStyle(key: LayerKey): React.CSSProperties {
    const state = isMenuOpen ? layers[key].open : layers[key].closed;
    const hc = layers[key].hover;
    const isHovered = hoveredLayer === key && isMenuOpen;
    const sc = isHovered ? hc.scale : 1;
    const tx = isHovered ? hc.translateX : 0;
    const ty = isHovered ? hc.translateY : 0;
    const rot = state.rotate + (isHovered ? hc.rotate : 0);
    const br = isHovered ? hc.brightness : 1;

    return {
      position: "absolute", left: state.left, top: state.top, width: state.width,
      zIndex: state.zIndex, transform: `rotate(${rot}deg) scale(${sc}) translate(${tx}px, ${ty}px)`,
      filter: `brightness(${br})`, transition: CONFIG.layerTransition, cursor: "pointer",
    };
  }

  function labelStyle(label: typeof menuLabels[number]): React.CSSProperties {
    const state = isMenuOpen ? label.open : label.closed;
    const isHovered = hoveredLayer === label.id && isMenuOpen;
    const baseScale = isMenuOpen ? 1 : 0;
    const sc = isHovered ? label.hover.scale : 1;
    const tx = isHovered ? label.hover.translateX : 0;
    const ty = isHovered ? label.hover.translateY : 0;
    const rot = state.rotate + (isHovered ? label.hover.rotate : 0);

    return {
      position: "absolute", left: state.left, top: state.top, width: state.width, height: state.height,
      zIndex: state.zIndex, transform: `rotate(${rot}deg) scale(${baseScale * sc}) translate(${tx}px, ${ty}px)`,
      transformOrigin: "center center", transition: isMenuOpen ? CONFIG.labelOpenTransition : CONFIG.labelCloseTransition,
      pointerEvents: isMenuOpen ? "auto" : "none", display: "block",
    };
  }

  // 레이어 클릭 시 처리 로직
  const handleLayerClick = (e: React.MouseEvent, overlayId: OverlayId) => {
    // 햄버거 메뉴가 닫혀있다면, 레이어 개별 클릭(오버레이 띄우기)을 막고 상위 컨테이너로 클릭 이벤트를 넘겨 메뉴를 엽니다.
    if (!isMenuOpen) {
      return; 
    }
    // 메뉴가 열려있을 때만 이벤트를 가로채 오버레이를 엽니다.
    e.stopPropagation();
    setActiveOverlay(overlayId);
  };

  return (
    <>
      <div
        style={{
          position: "fixed", top: container.top, left: container.left,
          width: container.width, height: container.height, zIndex: container.zIndex,
          pointerEvents: "none",
          transform: `scale(${scaleRatio})`,
          transformOrigin: "top left"
        }}
      >
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: isMenuOpen ? 268 : 130, 
            height: isMenuOpen ? 268 : 130, 
            pointerEvents: "auto", 
          }}
          // 터치 기기일 경우 호버 이벤트를 무시하여 원치 않는 작동 방지
          onMouseEnter={!isTouchDevice ? () => setIsMenuOpen(true) : undefined}
          onMouseLeave={!isTouchDevice ? () => { setIsMenuOpen(false); setHoveredLayer(null); } : undefined}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img src={images.circle} alt="" style={circleStyle} />

          {menuLabels.map((label) => (
            <Link
              key={label.id} href={label.href} style={labelStyle(label)}
              onMouseEnter={!isTouchDevice ? () => setHoveredLayer(label.id) : undefined}
              onMouseLeave={!isTouchDevice ? () => setHoveredLayer(null) : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              {label.src ? (
                <img src={label.src} alt={label.id} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#888", fontSize: 9, fontFamily: "monospace" }}>{label.id}</span>
                </div>
              )}
            </Link>
          ))}

          <img src={images.topBun} alt="" style={layerStyle("topBun")}
            onMouseEnter={!isTouchDevice ? () => setHoveredLayer("topBun") : undefined} 
            onMouseLeave={!isTouchDevice ? () => setHoveredLayer(null) : undefined} 
            onClick={(e) => handleLayerClick(e, "top-bun")} />
          <img src={images.cheese} alt="" style={layerStyle("cheese")}
            onMouseEnter={!isTouchDevice ? () => setHoveredLayer("cheese") : undefined} 
            onMouseLeave={!isTouchDevice ? () => setHoveredLayer(null) : undefined} 
            onClick={(e) => handleLayerClick(e, "cheese")} />
          <img src={images.lettuce} alt="" style={layerStyle("lettuce")}
            onMouseEnter={!isTouchDevice ? () => setHoveredLayer("lettuce") : undefined} 
            onMouseLeave={!isTouchDevice ? () => setHoveredLayer(null) : undefined} 
            onClick={(e) => handleLayerClick(e, "lettuce")} />
          <img src={images.patty} alt="" style={layerStyle("patty")}
            onMouseEnter={!isTouchDevice ? () => setHoveredLayer("patty") : undefined} 
            onMouseLeave={!isTouchDevice ? () => setHoveredLayer(null) : undefined} 
            onClick={(e) => handleLayerClick(e, "patty")} />
          <img src={images.tomato} alt="" style={layerStyle("tomato")}
            onMouseEnter={!isTouchDevice ? () => setHoveredLayer("tomato") : undefined} 
            onMouseLeave={!isTouchDevice ? () => setHoveredLayer(null) : undefined} 
            onClick={(e) => handleLayerClick(e, "tomato")} />
          <img src={images.botBun} alt="" style={layerStyle("botBun")}
            onMouseEnter={!isTouchDevice ? () => setHoveredLayer("botBun") : undefined} 
            onMouseLeave={!isTouchDevice ? () => setHoveredLayer(null) : undefined} 
            onClick={(e) => handleLayerClick(e, "bot-bun")} />
        </div>
      </div>

      {activeOverlay && (
        <OverlayModal
          imageSrc={CONFIG.overlays[activeOverlay].imageSrc}
          imageW={CONFIG.overlays[activeOverlay].imageW}
          imageH={CONFIG.overlays[activeOverlay].imageH}
          onClose={() => setActiveOverlay(null)}
        />
      )}
    </>
  );
}