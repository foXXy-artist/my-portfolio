"use client";

import React from "react";

// 💡 캔버스 기준 원본 크기
const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 2857;

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
    id: "elevator copy",
    type: "image",
    src: "/images/elevator copy.jpg",
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
    id: "5",
    type: "image",
    src: "/images/baby/5.png",
    top: "228px",
    left: "507px",
    width: "137px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/baby/image.png",
    top: "103px",
    left: "545px",
    width: "573px",
    height: "324px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "bottle",
    type: "image",
    src: "/images/baby/bottle.png",
    top: "102px",
    left: "977px",
    width: "78px",
    rotate: "-17deg",
    zIndex: 3,
  },
  {
    id: "baby emoji",
    type: "image",
    src: "/images/baby/baby emoji.png",
    top: "204px",
    left: "1065px",
    width: "71px",
    rotate: "10deg",
    zIndex: 3,
  },
  {
    id: "Debut edition doodle",
    type: "image",
    src: "/images/Debut edition doodle.png",
    top: "84px",
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
    id: "real_baby",
    type: "image",
    src: "/images/baby/real_baby.png",
    top: "150px",
    left: "248px",
    width: "230px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "chat",
    type: "image",
    src: "/images/baby/chat.png",
    top: "119px",
    left: "415px",
    width: "66px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "baby doodle",
    type: "image",
    src: "/images/baby/baby doodle.png",
    top: "332px",
    left: "578px",
    width: "188px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/baby/whole box.png",
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
    src: "/images/baby/video.mp4",
    top: "500px",
    left: "225px",
    width: "231px",
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
    id: "wondering monkey",
    type: "image",
    src: "/images/baby/wondering monkey.png",
    top: "379px",
    left: "115px",
    width: "103px",
    rotate: "-6deg",
    zIndex: 5,
  },
  {
    id: "question",
    type: "image",
    src: "/images/baby/question.png",
    top: "373px",
    left: "84px",
    width: "60px",
    rotate: "-12deg",
    zIndex: 5,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/baby/detail.png",
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
    id: "broke render",
    type: "image",
    src: "/images/broke/broke render.png",
    top: "551px",
    left: "495px",
    width: "464px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "doodle point",
    type: "image",
    src: "/images/baby/doodle point.png",
    top: "441px",
    left: "1166px",
    width: "135px",
    rotate: "-6deg",
    zIndex: 5,
  },
  {
    id: "gorapaduk",
    type: "image",
    src: "/images/baby/gorapaduk.png",
    top: "723px",
    left: "126px",
    width: "87px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "360view",
    type: "video",
    src: "/images/broke/360view.mp4",
    top: "575px",
    left: "1123px",
    width: "271px",
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
    src: "/images/baby/box bot.png",
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
    top: "1700px",
    left: "0px",
    width: "206px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "bottom",
    type: "image",
    src: "/images/baby/bottom.jpg",
    top: "2287px",
    left: "225px",
    width: "424px",
    rotate: "-180deg",
    zIndex: 6,
  },
];

export default function Page() {
  return (
    <main
      style={{
        backgroundColor: "#FFFFFF", 
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 💡 Header 바로 밑에 여백 없이 밀착
        position: "relative",
      }}
    >
      {/* 🎨 반응형 비율 캔버스 (1440 × 2857) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: `${CANVAS_WIDTH}px`,
          aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
          
          // 💡 배경 이미지 설정 유지
          backgroundImage: "url('/images/red error copy2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          
          overflow: "hidden",
        }}
      >
        {CANVAS_ITEMS.map((item) => {
          // 💡 px 값을 숫자로 추출하여 퍼센트(%) 비율로 계산
          const topNum = parseFloat(item.top);
          const leftNum = parseFloat(item.left);
          const widthNum = parseFloat(item.width);
          const heightNum = item.height ? parseFloat(item.height) : undefined;

          const topPercent = `${(topNum / CANVAS_HEIGHT) * 100}%`;
          const leftPercent = `${(leftNum / CANVAS_WIDTH) * 100}%`;
          const widthPercent = `${(widthNum / CANVAS_WIDTH) * 100}%`;
          const heightPercent = heightNum ? `${(heightNum / CANVAS_HEIGHT) * 100}%` : "auto";

          // 공통 스타일 정의
          const commonStyle: React.CSSProperties = {
            position: "absolute",
            top: topPercent,
            left: leftPercent,
            width: widthPercent,
            height: heightPercent,
            transform: item.rotate ? `rotate(${item.rotate})` : undefined,
            zIndex: item.zIndex ?? 0,
            display: "block",
            willChange: "transform", // 💡 GPU 가속을 통한 렌더링 최적화
          };

          return item.type === "video" ? (
            <video
              key={item.id}
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              preload="none" // 💡 초기 로딩 시 비디오 리소스 렉 방지
              style={{ ...commonStyle, objectFit: "cover" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt=""
              loading="lazy"   // 💡 비동기 지연 로딩
              decoding="async" // 💡 이미지 해독 분산 처리
              style={commonStyle}
            />
          );
        })}
      </div>
    </main>
  );
}