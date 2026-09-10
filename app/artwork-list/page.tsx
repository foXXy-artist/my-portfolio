"use client";

import { useState } from "react";
import Link from "next/link";

const HOVER_SCALE = 1.05; 

// 💡 캔버스 기준 원본 크기
const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 3834;

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
  href?: string;
}

const CANVAS_ITEMS: CanvasItem[] = [
  {
    id: "artwork grid",
    type: "image",
    src: "/images/artwork grid.png",
    top: "465px",
    left: "277px",
    width: "886px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    id: "foXXy red",
    type: "image",
    src: "/images/foXXy red.png",
    top: "151px",
    left: "535px",
    width: "369px",
    rotate: "-3deg",
    zIndex: 1,
  },
  {
    id: "Debut edition doodle",
    type: "image",
    src: "/images/Debut edition doodle.png",
    top: "365px",
    left: "44px",
    width: "361px",
    rotate: "-23deg",
    zIndex: 2,
  },
  {
    id: "under bar",
    type: "image",
    src: "/images/under bar.png",
    top: "391px",
    left: "346px",
    width: "747px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    id: "artwork list letter",
    type: "image",
    src: "/images/artwork list letter.png",
    top: "325px",
    left: "427px",
    width: "585px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    id: "artwork heartbreak",
    type: "image",
    src: "/images/artwork heartbreak.png",
    top: "470px",
    left: "297px",
    width: "279px",
    rotate: "0deg",
    href: "/artwork-list/heartbreak/",
    zIndex: 2,
  },
  {
    id: "artwork broke",
    type: "image",
    src: "/images/artwork broke.png",
    top: "485px",
    left: "568px",
    width: "281px",
    rotate: "0deg",
    href: "/artwork-list/broke/",
    zIndex: 2,
  },
  {
    id: "artwork gloomy day",
    type: "image",
    src: "/images/artwork gloomy day.png",
    top: "480px",
    left: "880px",
    width: "266px",
    rotate: "0deg",
    href: "/artwork-list/gloomy-day/",
    zIndex: 2,
  },
  {
    id: "artwork nirvXXa",
    type: "image",
    src: "/images/artwork nirvXXa.png",
    top: "767px",
    left: "296px",
    width: "279px",
    rotate: "0deg",
    href: "/artwork-list/nirvXXa/",
    zIndex: 2,
  },
  {
    id: "artwork baby",
    type: "image",
    src: "/images/artwork baby.png",
    top: "756px",
    left: "571px",
    width: "289px",
    rotate: "0deg",
    href: "/artwork-list/baby/",
    zIndex: 2,
  },
  {
    id: "artwork half",
    type: "image",
    src: "/images/artwork half.png",
    top: "762px",
    left: "888px",
    width: "263px",
    rotate: "0deg",
    href: "/artwork-list/half/",
    zIndex: 2,
  },
  {
    id: "artwork let me out",
    type: "image",
    src: "/images/artwork let me out.png",
    top: "1027px",
    left: "290px",
    width: "266px",
    rotate: "0deg",
    href: "/artwork-list/let-me-out/",
    zIndex: 2,
  },
  {
    id: "artwork zzzzz",
    type: "image",
    src: "/images/artwork zzzzz.png",
    top: "1026px",
    left: "588px",
    width: "268px",
    rotate: "0deg",
    href: "/artwork-list/zzzzz/",
    zIndex: 2,
  },
  {
    id: "artwork boxbox",
    type: "image",
    src: "/images/artwork boxbox.png",
    top: "1024px",
    left: "890px",
    width: "250px",
    rotate: "0deg",
    href: "/artwork-list/boxbox/",
    zIndex: 2,
  },
  {
    id: "artwork hey",
    type: "image",
    src: "/images/artwork hey.png",
    top: "1296px",
    left: "293px",
    width: "267px",
    rotate: "0deg",
    href: "/artwork-list/hey.../",
    zIndex: 2,
  },
  {
    id: "artwork Is this okay",
    type: "image",
    src: "/images/artwork Is this okay.png",
    top: "1292px",
    left: "586px",
    width: "265px",
    rotate: "0deg",
    href: "/artwork-list/Is-this-okay/",
    zIndex: 2,
  },
  {
    id: "artwork running",
    type: "image",
    src: "/images/artwork running.png",
    top: "1292px",
    left: "880px",
    width: "275px",
    rotate: "0deg",
    href: "/artwork-list/running/",
    zIndex: 2,
  },
  {
    id: "artwork paint",
    type: "image",
    src: "/images/artwork paint.png",
    top: "1563px",
    left: "291px",
    width: "270px",
    rotate: "0deg",
    href: "/artwork-list/paint/",
    zIndex: 2,
  },
  {
    id: "artwork It's hot",
    type: "image",
    src: "/images/artwork It's hot.png",
    top: "1560px",
    left: "583px",
    width: "282px",
    rotate: "0deg",
    href: "/artwork-list/Its-hot/",
    zIndex: 2,
  },
  {
    id: "artwork fxxk",
    type: "image",
    src: "/images/artwork fxxk.png",
    top: "1558px",
    left: "882px",
    width: "267px",
    rotate: "0deg",
    href: "/artwork-list/fxxk/",
    zIndex: 2,
  },
  {
    id: "artwork shh",
    type: "image",
    src: "/images/artwork shh.png",
    top: "1825px",
    left: "292px",
    width: "274px",
    rotate: "0deg",
    href: "/artwork-list/shh.../",
    zIndex: 2,
  },
  {
    id: "artwork present for u",
    type: "image",
    src: "/images/artwork present for u.png",
    top: "1827px",
    left: "589px",
    width: "265px",
    rotate: "0deg",
    href: "/artwork-list/present-for-u/",
    zIndex: 2,
  },
  {
    id: "artwork I'm not kaws",
    type: "image",
    src: "/images/artwork I'm not kaws.png",
    top: "1825px",
    left: "881px",
    width: "270px",
    rotate: "0deg",
    href: "/artwork-list/Im-not-kaws/",
    zIndex: 2,
  },
  {
    id: "artwork bup",
    type: "image",
    src: "/images/artwork bup.png",
    top: "2077px",
    left: "278px",
    width: "285px",
    rotate: "0deg",
    href: "/artwork-list/bup/",
    zIndex: 2,
  },
  {
    id: "artwork simpsxxs",
    type: "image",
    src: "/images/artwork simpsxxs.png",
    top: "2094px",
    left: "588px",
    width: "270px",
    rotate: "0deg",
    href: "/artwork-list/simpsxxs/",
    zIndex: 2,
  },
  {
    id: "artwork I hate burger",
    type: "image",
    src: "/images/artwork I hate burger.png",
    top: "2098px",
    left: "884px",
    width: "271px",
    rotate: "0deg",
    href: "/artwork-list/I-hate-burger/",
    zIndex: 2,
  },
  {
    id: "artwork idle",
    type: "image",
    src: "/images/artwork idle.png",
    top: "2360px",
    left: "294px",
    width: "264px",
    rotate: "0deg",
    href: "/artwork-list/idle/",
    zIndex: 2,
  },
  {
    id: "artwork loafing",
    type: "image",
    src: "/images/artwork loafing.png",
    top: "2360px",
    left: "583px",
    width: "274px",
    rotate: "0deg",
    href: "/artwork-list/loafing/",
    zIndex: 2,
  },
  {
    id: "artwork foxxydian",
    type: "image",
    src: "/images/artwork foxxydian.png",
    top: "2359px",
    left: "883px",
    width: "276px",
    rotate: "0deg",
    href: "/artwork-list/foxxydian/",
    zIndex: 2,
  },
  {
    id: "artwork melting",
    type: "image",
    src: "/images/artwork melting.png",
    top: "2630px",
    left: "293px",
    width: "270px",
    rotate: "0deg",
    href: "/artwork-list/melting/",
    zIndex: 2,
  },
];

export default function ArtworkListPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <main
      style={{
        backgroundColor: "#ffffff",
        width:           "100%",
        minHeight:       "100vh",
        display:         "flex",
        justifyContent:  "center",
        alignItems:      "flex-start",
        position:        "relative",
      }}
    >
      <div
        style={{
          position:        "relative",
          width:           "100%",
          maxWidth:        `${CANVAS_WIDTH}px`,
          aspectRatio:     `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
          backgroundColor: "#ffffff",
          overflow:        "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${(110 / CANVAS_HEIGHT) * 100}%`,
            left: `${(212 / CANVAS_WIDTH) * 100}%`,
            width: `${(1016 / CANVAS_WIDTH) * 100}%`,
            height: `${(3589 / CANVAS_HEIGHT) * 100}%`,
            backgroundColor: "#FFFFFF",
            // 💡 FIX 1: 테두리를 화면 너비에 비례해 유연하게 축소되도록 변경 (최소 1px ~ 최대 4px)
            border: "clamp(1px, 0.3vw, 4px) solid #000000",
            zIndex: 1,
            boxSizing: "border-box",
          }}
        />

        {CANVAS_ITEMS.map((item) => {
          const topNum = parseFloat(item.top);
          const leftNum = parseFloat(item.left);
          const widthNum = parseFloat(item.width);
          const heightNum = item.height ? parseFloat(item.height) : undefined;

          const topPercent = `${(topNum / CANVAS_HEIGHT) * 100}%`;
          const leftPercent = `${(leftNum / CANVAS_WIDTH) * 100}%`;
          const widthPercent = `${(widthNum / CANVAS_WIDTH) * 100}%`;
          const heightPercent = heightNum ? `${(heightNum / CANVAS_HEIGHT) * 100}%` : "auto";

          const isArtwork = 
            item.id !== "artwork grid" && 
            item.id !== "foXXy red" && 
            item.id !== "artwork list letter" &&
            item.id !== "Debut edition doodle" &&
            item.id !== "under bar";

          // 💡 FIX 2: 페이지 상단에 위치한 핵심 구조 이미지들은 우선 로딩(Eager)하여 렌더링 속도 대폭 개선
          const isTopElement = topNum < 1500;
          const isEager = item.id === "artwork grid" || isTopElement;

          const isHovered = hoveredId === item.id;

          const currentTransform = item.rotate ? `rotate(${item.rotate})` : "";
          const transformStyle = isArtwork && isHovered 
            ? `${currentTransform} scale(${HOVER_SCALE})` 
            : currentTransform;

          const zIndexStyle = isArtwork && isHovered ? 50 : (item.zIndex ?? 0);

          const elementStyle: React.CSSProperties = {
            position: "absolute",
            top: topPercent,
            left: leftPercent,
            width: widthPercent,
            height: heightPercent,
            transform: transformStyle || undefined,
            zIndex: zIndexStyle,
            display: "block",
            transition: isArtwork ? "transform 0.2s ease-out" : "none",
            cursor: isArtwork ? "pointer" : "default",
            willChange: isArtwork ? "transform" : "auto",
          };

          if (isArtwork) {
            const finalHref = item.href || `/artwork-list/${item.id.replace("artwork ", "")}`;

            return (
              <Link
                key={item.id}
                href={finalHref}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={elementStyle}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt=""
                    loading={isEager ? "eager" : "lazy"} // 💡 최적화
                    fetchPriority={isEager ? "high" : "auto"} // 💡 브라우저에 최우선 로딩 지시
                    decoding="async"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                )}
              </Link>
            );
          } else {
            return item.type === "video" ? (
              <video
                key={item.id}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                style={elementStyle}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                src={item.src}
                alt=""
                loading={isEager ? "eager" : "lazy"} // 💡 최적화
                fetchPriority={isEager ? "high" : "auto"} // 💡 최적화
                decoding="async"
                style={elementStyle}
              />
            );
          }
        })}
      </div>
    </main>
  );
}