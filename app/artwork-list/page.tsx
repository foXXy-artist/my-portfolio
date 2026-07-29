"use client";

import { useState } from "react";
import Link from "next/link"; // 💡 페이지 이동을 위한 Link 컴포넌트 추가

// ╔══════════════════════════════════════════════════════════════════════╗
// ║ ⚙️ 내 마음대로 조절하는 디자인 설정                                    ║
// ╚══════════════════════════════════════════════════════════════════════╝
// 💡 마우스를 올렸을 때 커지는 크기입니다. (원하는 대로 직접 조절하세요!)
// 예시) 1.05 = 5% 확대, 1.1 = 10% 확대, 1.02 = 2% 확대
const HOVER_SCALE = 1.05; 


// ══════════════════════════════════════════════════════════════════════
// Artwork List 페이지
// 캔버스 크기: 1440 × 3834 px / 배경: 흰색(#FFFFFF)
// ══════════════════════════════════════════════════════════════════════

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
  href?: string; // 💡 여기에 href 속성을 추가합니다!
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
      }}
    >
      {/* 1440 × 3834 고정 캔버스 */}
      <div
        style={{
          position:        "relative",
          width:           "1440px",
          height:          "3834px",
          backgroundColor: "#ffffff",
          flexShrink:      0,
          overflow:        "visible",
        }}
      >
        {/* ⬜ Artwork List 메인 컨테이너 박스 */}
        <div
          style={{
            position: "absolute",
            top: "110px",
            left: "212px",
            width: "1016px",
            height: "3589px",
            backgroundColor: "#FFFFFF",
            border: "4px solid #000000",
            zIndex: 1,
            boxSizing: "border-box",
          }}
        >
        </div>

        {CANVAS_ITEMS.map((item) => {
          // 💡 [수정 부분] 배경, 로고 외에도 두 요소를 제외하여 순수 아트워크 목록에서 빠지게 만듭니다.
          const isArtwork = 
            item.id !== "artwork grid" && 
            item.id !== "foXXy red" && 
            item.id !== "artwork list letter" &&
            item.id !== "Debut edition doodle" &&
            item.id !== "under bar";

          const isHovered = hoveredId === item.id;

          // 호버 시 설정된 HOVER_SCALE 상수를 반영하여 크기를 조절합니다 (그림자 필터 완전 제거)
          const currentTransform = item.rotate ? `rotate(${item.rotate})` : "";
          const transformStyle = isArtwork && isHovered 
            ? `${currentTransform} scale(${HOVER_SCALE})` 
            : currentTransform;

          // 호버된 아이템이 가장 앞으로 튀어나오도록 zIndex 변경
          const zIndexStyle = isArtwork && isHovered ? 50 : (item.zIndex ?? 0);

          // 공통 스타일 정의
          const elementStyle: React.CSSProperties = {
            position: "absolute",
            top: item.top,
            left: item.left,
            width: item.width,
            height: item.height ?? "auto",
            transform: transformStyle || undefined,
            zIndex: zIndexStyle,
            display: "block",
            transition: isArtwork ? "transform 0.2s ease-out" : "none",
            cursor: isArtwork ? "pointer" : "default",
          };

          if (isArtwork) {
            // 배열에 내가 직접 적어둔 item.href가 있다면 그걸 최우선으로 사용합니다!
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
                    style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt=""
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                )}
              </Link>
            );
          } else {
            // 배경이나 제목 텍스트, 장식용 요소들은 링크 및 호버 없이 원래대로 렌더링
            return item.type === "video" ? (
              <video
                key={item.id}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                style={elementStyle}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                src={item.src}
                alt=""
                style={elementStyle}
              />
            );
          }
        })}
      </div>
    </main>
  );
}