"use client";

import React, { useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════
// ① Perlin Noise 순수 구현 (자연스러운 노이즈 생성)
// ══════════════════════════════════════════════════════════════════════
function makePerlin(): (x: number, y: number) => number {
  const raw = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const tmp = raw[i]; raw[i] = raw[j]; raw[j] = tmp;
  }
  const p = new Uint8Array(512);
  raw.forEach((v, i) => { p[i] = v; p[i + 256] = v; });

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  const grad = (h: number, x: number, y: number) =>
    [x + y, -x + y, x - y, -x - y][h & 3];

  return (x: number, y: number): number => {
    const X  = Math.floor(x) & 255;
    const Y  = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u  = fade(xf);
    const v  = fade(yf);
    const A  = p[X]     + Y;
    const B  = p[X + 1] + Y;
    return lerp(
      lerp(grad(p[A],     xf,     yf),     grad(p[B],     xf - 1, yf),     u),
      lerp(grad(p[A + 1], xf,     yf - 1), grad(p[B + 1], xf - 1, yf - 1), u),
      v
    );
  };
}

// ══════════════════════════════════════════════════════════════════════
// ② 전역 상수 및 설정 공간
// ══════════════════════════════════════════════════════════════════════
const CANVAS_W = 1440;
const CANVAS_H = 2857;

// 💡 [핵심 추가 설정] 페인트가 시작되는 X 좌표 (오른쪽 영역 설정)
// 전체 너비가 1440입니다. 720으로 설정하면 화면의 정확히 절반(오른쪽)에만 쏟아집니다.
// 1000으로 설정하면 우측 440px 영역에만 쏟아집니다. 자유롭게 변경하세요!
const PAINT_START_X = 720; 

const NUM_COLS = 150; // 드립 컬럼 수 (영역이 좁아졌으므로 150으로도 충분히 부드럽습니다)
const FILL_MS = 7000; // 바닥까지 닿는 기준 시간(ms)
const BASE_SPD = CANVAS_H / FILL_MS;

// ══════════════════════════════════════════════════════════════════════
// ③ 타입 및 CANVAS_ITEMS 데이터 (기존 코드 100% 유지)
// ══════════════════════════════════════════════════════════════════════
interface CanvasItem {
  id:      string;
  type:    "image" | "video";
  src:     string;
  top:     string;
  left:    string;
  width:   string;
  height?: string;
  rotate?: string;
  zIndex?: number;
}

const CANVAS_ITEMS: CanvasItem[] = [
  { id: "elevator", type: "image", src: "/images/elevator.jpg", top: "0px", left: "136px", width: "1135px", height: "2857px", rotate: "0deg", zIndex: 1 },
  { id: "top box", type: "image", src: "/images/top box.png", top: "115px", left: "371px", width: "730px", height: "240px", rotate: "0deg", zIndex: 2 },
  { id: "circle foXXy red", type: "image", src: "/images/circle foXXy red.png", top: "263px", left: "1015px", width: "110px", rotate: "3deg", zIndex: 3 },
  { id: "13", type: "image", src: "/images/paint/13.png", top: "206px", left: "528px", width: "145px", rotate: "0deg", zIndex: 3 },
  { id: "image", type: "image", src: "/images/paint/image.png", top: "115px", left: "656px", width: "436px", rotate: "0deg", zIndex: 4 },
  { id: "bucket", type: "image", src: "/images/paint/bucket.png", top: "130px", left: "437px", width: "47px", rotate: "-154deg", zIndex: 4 },
  { id: "dizzy_face", type: "image", src: "/images/paint/dizzy_face.png", top: "190px", left: "1061px", width: "61px", rotate: "13deg", zIndex: 3 },
  { id: "Debut edition doodle", type: "image", src: "/images/Debut edition doodle.png", top: "71px", left: "532px", width: "397px", rotate: "0deg", zIndex: 3 },
  { id: "yellow box", type: "image", src: "/images/yellow box.png", top: "113px", left: "302px", width: "203px", rotate: "0deg", zIndex: 3 },
  { id: "real_paint", type: "image", src: "/images/paint/real_paint.png", top: "111px", left: "273px", width: "288px", rotate: "0deg", zIndex: 4 },
  { id: "bucket doodle", type: "image", src: "/images/paint/bucket doodle.png", top: "77px", left: "978px", width: "82px", rotate: "10deg", zIndex: 4 },
  { id: "paint doodle", type: "image", src: "/images/paint/paint doodle.png", top: "316px", left: "556px", width: "268px", rotate: "0deg", zIndex: 4 },
  { id: "whole box", type: "image", src: "/images/paint/whole box.png", top: "247px", left: "1179px", width: "220px", rotate: "6deg", zIndex: 4 },
  { id: "collect me now", type: "image", src: "/images/collect me now.png", top: "346px", left: "254px", width: "274px", rotate: "0deg", zIndex: 3 },
  { id: "video", type: "video", src: "/images/running/video.mp4", top: "503px", left: "224px", width: "224px", rotate: "0deg", zIndex: 3 },
  { id: "tv_filter", type: "image", src: "/images/tv_filter.png", top: "413px", left: "194px", width: "357px", rotate: "0deg", zIndex: 4 },
  { id: "sup man", type: "image", src: "/images/paint/sup man.png", top: "350px", left: "50px", width: "172px", rotate: "-11deg", zIndex: 3 },
  { id: "can pour", type: "image", src: "/images/paint/can pour.png", top: "323px", left: "161px", width: "66px", rotate: "-36deg", zIndex: 4 },
  { id: "wet cat", type: "image", src: "/images/paint/wet cat.jpeg", top: "435px", left: "89px", width: "93px", rotate: "-10deg", zIndex: 4 },
  { id: "wet cat2", type: "image", src: "/images/paint/wet cat2.jpeg", top: "399px", left: "157px", width: "65px", rotate: "-2deg", zIndex: 5 },
  { id: "detail", type: "image", src: "/images/paint/detail.png", top: "834px", left: "208px", width: "986px", rotate: "0deg", zIndex: 4 },
  { id: "detail view", type: "image", src: "/images/detail view.png", top: "801px", left: "186px", width: "349px", rotate: "0deg", zIndex: 5 },
  { id: "paint render", type: "image", src: "/images/paint/paint render.png", top: "482px", left: "425px", width: "519px", rotate: "0deg", zIndex: 5 },
  { id: "eye ddiyong", type: "image", src: "/images/paint/eye ddiyong.png", top: "439px", left: "1196px", width: "116px", rotate: "-3deg", zIndex: 6 },
  { id: "uzdong", type: "image", src: "/images/paint/uzdong.png", top: "731px", left: "167px", width: "97px", rotate: "8deg", zIndex: 5 },
  { id: "muno", type: "image", src: "/images/paint/muno.png", top: "763px", left: "122px", width: "70px", rotate: "-6deg", zIndex: 6 },
  { id: "360 view", type: "video", src: "/images/paint/360 view.mp4", top: "627px", left: "1119px", width: "271px", height: "331px", rotate: "0deg", zIndex: 6 },
  { id: "foXXy box", type: "image", src: "/images/foXXy box.png", top: "2195px", left: "732px", width: "462px", rotate: "0deg", zIndex: 5 },
  { id: "yellow foxxy", type: "image", src: "/images/yellow foxxy.png", top: "2065px", left: "144px", width: "298px", rotate: "5deg", zIndex: 5 },
  { id: "box bot", type: "image", src: "/images/paint/box bot.png", top: "1400px", left: "3px", width: "235px", rotate: "-17deg", zIndex: 6 },
  { id: "drag", type: "image", src: "/images/drag.png", top: "1340px", left: "1151px", width: "206px", rotate: "0deg", zIndex: 6 },
  { id: "bottom", type: "image", src: "/images/paint/bottom.jpg", top: "2287px", left: "232px", width: "424px", rotate: "-180deg", zIndex: 6 },
];

// ══════════════════════════════════════════════════════════════════════
// ⑤ Page 컴포넌트
// ══════════════════════════════════════════════════════════════════════
export default function Page() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const perlinRef  = useRef<((x: number, y: number) => number) | null>(null);

  useEffect(() => {
    if (!perlinRef.current) perlinRef.current = makePerlin();
    const noise = perlinRef.current;

    const drips   = new Float32Array(NUM_COLS);
    const smoothed = new Float32Array(NUM_COLS);
    
    // 💡 변경점: 전체 너비가 아닌 (전체너비 - 시작점) 만큼의 너비를 컬럼 수로 나눕니다.
    const colW    = (CANVAS_W - PAINT_START_X) / (NUM_COLS - 1);

    let startTs  = 0;
    let prevTs   = 0;
    let finished = false;

    function step(ts: number) {
      if (!startTs) { startTs = ts; prevTs = ts; }

      const dt      = Math.min(ts - prevTs, 50);
      const elapsed = ts - startTs;
      prevTs = ts;

      let allDone = true;

      for (let i = 0; i < NUM_COLS; i++) {
        if (drips[i] >= CANVAS_H) { smoothed[i] = CANVAS_H; continue; }
        allDone = false;

        const nx = (i / NUM_COLS) * 3.5;
        const ny = elapsed * 0.00016;

        const n1 = noise(nx,           ny)            * 1.00;
        const n2 = noise(nx * 2.8,     ny * 1.9)      * 0.42;
        const n3 = noise(nx * 7.2,     ny * 4.1)      * 0.15;
        const n4 = noise(nx * 14.5,    ny * 8.5)      * 0.05;

        const nv = n1 + n2 + n3 + n4;

        const normalized  = (nv + 1.62) / 3.24;
        const speedMult   = 0.20 + normalized * 2.20;

        drips[i] = Math.min(CANVAS_H, drips[i] + BASE_SPD * dt * speedMult);
        smoothed[i] = drips[i];
      }

      for (let i = 1; i < NUM_COLS - 1; i++) {
        smoothed[i] =
          drips[i]     * 0.70 +
          drips[i - 1] * 0.15 +
          drips[i + 1] * 0.15;
      }

      // 💡 변경점: 폴리곤 마스크의 왼쪽 끝이 0이 아니라 PAINT_START_X에서 시작하도록 변경
      const pts: string[] = [
        `${PAINT_START_X}px 0px`,     // 설정한 X위치 (예: 720) 상단
        `${CANVAS_W}px 0px`,          // 우측 끝 상단
      ];

      for (let i = NUM_COLS - 1; i >= 0; i--) {
        const x = (PAINT_START_X + i * colW).toFixed(1);
        const y = Math.min(smoothed[i], CANVAS_H).toFixed(1);
        pts.push(`${x}px ${y}px`);
      }

      const cp = `polygon(${pts.join(",")})`;

      if (overlayRef.current) {
        overlayRef.current.style.clipPath = cp;
        (overlayRef.current.style as CSSStyleDeclaration & { webkitClipPath?: string })
          .webkitClipPath = cp;
      }

      if (!allDone) {
        rafRef.current = requestAnimationFrame(step);
      } else if (!finished) {
        finished = true;
        // 최종적으로 우측 영역 전체를 덮도록 고정
        const fullCover = `polygon(${PAINT_START_X}px 0px, ${CANVAS_W}px 0px, ${CANVAS_W}px ${CANVAS_H}px, ${PAINT_START_X}px ${CANVAS_H}px)`;
        if (overlayRef.current) {
          overlayRef.current.style.clipPath = fullCover;
        }
      }
    }

    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
    const vids = Array.from(document.querySelectorAll<HTMLVideoElement>("video"));

    const imgProms = imgs.map((el) =>
      el.complete
        ? Promise.resolve()
        : new Promise<void>((res) => {
            el.addEventListener("load",  () => res(), { once: true });
            el.addEventListener("error", () => res(), { once: true });
          })
    );

    const vidProms = vids.map((el) =>
      el.readyState >= 3
        ? Promise.resolve()
        : new Promise<void>((res) => {
            el.addEventListener("loadeddata", () => res(), { once: true });
            el.addEventListener("error",      () => res(), { once: true });
            setTimeout(() => res(), 3000);
          })
    );

    Promise.all([...imgProms, ...vidProms]).then(() => {
      rafRef.current = requestAnimationFrame(step);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <main
      style={{
        backgroundColor: "#FFFFFF",
        width:           "100%",
        minHeight:       "100vh",
        display:         "flex",
        justifyContent:  "center",
        position:        "relative",
      }}
    >
      <div
        style={{
          position:          "relative",
          width:             `${CANVAS_W}px`,
          height:            `${CANVAS_H}px`,
          backgroundImage:   "url('/images/red error copy2.jpg')",
          backgroundSize:    "cover",
          backgroundPosition:"center",
          backgroundRepeat:  "no-repeat",
          overflow:          "hidden",
          flexShrink:        0,
        }}
      >
        {CANVAS_ITEMS.map((item) =>
          item.type === "video" ? (
            <video
              key={item.id}
              src={item.src}
              autoPlay loop muted playsInline
              style={{
                position:  "absolute",
                top:       item.top,
                left:      item.left,
                width:     item.width,
                height:    item.height ?? "auto",
                transform: item.rotate ? `rotate(${item.rotate})` : undefined,
                zIndex:    item.zIndex ?? 0,
                display:   "block",
                objectFit: "cover",
              }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt=""
              style={{
                position:  "absolute",
                top:       item.top,
                left:      item.left,
                width:     item.width,
                height:    item.height ?? "auto",
                transform: item.rotate ? `rotate(${item.rotate})` : undefined,
                zIndex:    item.zIndex ?? 0,
                display:   "block",
              }}
            />
          )
        )}

        <div
          ref={overlayRef}
          style={{
            position:           "absolute",
            top:                0,
            left:               0,
            width:              "100%",
            height:             "100%",
            backdropFilter:     "grayscale(1) brightness(0.88)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.88)",
            clipPath:           "polygon(0px 0px, 0px 0px)",
            zIndex:             9999,
            pointerEvents:      "none", 
            willChange:         "clip-path",
          }}
        />
      </div>
    </main>
  );
}