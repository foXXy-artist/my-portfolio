"use client";

import React, { useState } from "react";
import Link from "next/link";
import OverlayModal from "./OverlayModal";

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
      closed: { left:  -10, top: 67, width: 166, height: 22, zIndex: 9111, rotate: -1 },
      open:   { left:  46, top: 132, width: 169, height: 22, zIndex: 9156, rotate: -1 },
      hover:  { scale: 1.1,  translateX: -0.3, translateY: 0, rotate: 1.5 },
    },
    {
      id:   "aboutmeletter", src:  "/images/aboutmeletter.png", href: "/about-me",
      closed: { left:  36, top: 50, width: 75,  height: 18, zIndex: 9111, rotate: -1 },
      open:   { left:  97, top: 171, width: 80,  height: 20, zIndex: 9156, rotate: -4 },
      hover:  { scale: 1.2,  translateX: 1, translateY: 0, rotate: 2 },
    },
    {
      id:   "19plus", src:  "/images/19plus.png", href: "/shop",
      closed: { left: 60, top: 80, width: 29,  height: 18, zIndex: 9111, rotate: -9 },
      open:   { left: 119, top: 203, width: 29,  height: 18, zIndex: 9156, rotate: -9 },
      hover:  { scale: 1.2,  translateX: 1, translateY: 0, rotate: 3 },
    },
  ],
  layerTransition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  labelOpenTransition:  "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  labelCloseTransition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  overlays: {
    "top-bun": { imageSrc: "/images/bun overlay.png",     imageW: 614, imageH: 332 },
    "cheese":  { imageSrc: "/images/cheese overlay.png",  imageW: 614, imageH: 332 },
    "lettuce": { imageSrc: "/images/lettuce overlay.png", imageW: 614, imageH: 332 },
    "patty":   { imageSrc: "/images/patty overlay.png",   imageW: 614, imageH: 332 },
    "tomato":  { imageSrc: "/images/tomato overlay.png",  imageW: 614, imageH: 332 },
    "bot-bun": { imageSrc: "/images/bun overlay2.png",    imageW: 614, imageH: 332 },
  },
};

type OverlayId = "top-bun"|"cheese"|"lettuce"|"patty"|"tomato"|"bot-bun"|null;
type LayerKey  = keyof typeof CONFIG.layers;

export default function BurgerMenu() {
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<OverlayId>(null);
  const [hoveredLayer,  setHoveredLayer]  = useState<LayerKey | string | null>(null);

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

  return (
    <>
      <div
        style={{
          position: "fixed", top: container.top, left: container.left,
          width: container.width, height: container.height, zIndex: container.zIndex,
          // 💡 최상위 컨테이너는 클릭 영역 무시하여 밑에 있는 화살표가 클릭되게 함
          pointerEvents: "none",
        }}
      >
        {/* 💡 동적 마우스 인식 영역 (Hit Area): 메뉴가 닫혀있을 땐 작게, 열리면 크게 변함 */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: isMenuOpen ? 268 : 130, // 닫혀있을 땐 넓이를 130px로 축소
            height: isMenuOpen ? 268 : 130, // 닫혀있을 땐 높이를 130px로 축소
            pointerEvents: "auto", // 오직 이 범위 안에서만 마우스를 인식
          }}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => { setIsMenuOpen(false); setHoveredLayer(null); }}
        >
          <img src={images.circle} alt="" style={circleStyle} />

          {menuLabels.map((label) => (
            <Link
              key={label.id} href={label.href} style={labelStyle(label)}
              onMouseEnter={() => setHoveredLayer(label.id)}
              onMouseLeave={() => setHoveredLayer(null)}
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
            onMouseEnter={() => setHoveredLayer("topBun")} onMouseLeave={() => setHoveredLayer(null)} onClick={() => setActiveOverlay("top-bun")} />
          <img src={images.cheese} alt="" style={layerStyle("cheese")}
            onMouseEnter={() => setHoveredLayer("cheese")} onMouseLeave={() => setHoveredLayer(null)} onClick={() => setActiveOverlay("cheese")} />
          <img src={images.lettuce} alt="" style={layerStyle("lettuce")}
            onMouseEnter={() => setHoveredLayer("lettuce")} onMouseLeave={() => setHoveredLayer(null)} onClick={() => setActiveOverlay("lettuce")} />
          <img src={images.patty} alt="" style={layerStyle("patty")}
            onMouseEnter={() => setHoveredLayer("patty")} onMouseLeave={() => setHoveredLayer(null)} onClick={() => setActiveOverlay("patty")} />
          <img src={images.tomato} alt="" style={layerStyle("tomato")}
            onMouseEnter={() => setHoveredLayer("tomato")} onMouseLeave={() => setHoveredLayer(null)} onClick={() => setActiveOverlay("tomato")} />
          <img src={images.botBun} alt="" style={layerStyle("botBun")}
            onMouseEnter={() => setHoveredLayer("botBun")} onMouseLeave={() => setHoveredLayer(null)} onClick={() => setActiveOverlay("bot-bun")} />
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