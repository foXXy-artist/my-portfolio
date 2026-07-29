"use client";

import React from "react";

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
    id: "elevator",
    type: "image",
    src: "/images/elevator.jpg",
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
    top: "125px",
    left: "355px",
    width: "714px",
    height: "235px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "circle foXXy red",
    type: "image",
    src: "/images/circle foXXy red.png",
    top: "269px",
    left: "981px",
    width: "107px",
    rotate: "3deg",
    zIndex: 3,
  },
  {
    id: "9",
    type: "image",
    src: "/images/boxbox/9.png",
    top: "217px",
    left: "528px",
    width: "135px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/boxbox/image.png",
    top: "167px",
    left: "664px",
    width: "375px",
    height: "212px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "square",
    type: "image",
    src: "/images/boxbox/square.png",
    top: "89px",
    left: "960px",
    width: "73px",
    rotate: "10deg",
    zIndex: 3,
  },
  {
    id: "dotted_line_face",
    type: "image",
    src: "/images/boxbox/dotted_line_face.png",
    top: "200px",
    left: "1039px",
    width: "60px",
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
    top: "113px",
    left: "308px",
    width: "203px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "real_boxbox",
    type: "image",
    src: "/images/boxbox/real_boxbox.png",
    top: "112px",
    left: "247px",
    width: "287px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "sqare man",
    type: "image",
    src: "/images/boxbox/sqare man.png",
    top: "126px",
    left: "441px",
    width: "56px",
    rotate: "-18deg",
    zIndex: 4,
  },
  {
    id: "boxbox doodle",
    type: "image",
    src: "/images/boxbox/boxbox doodle.png",
    top: "330px",
    left: "557px",
    width: "209px",
    rotate: "0deg",
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
    src: "/images/boxbox/video.mp4",
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
    id: "nemo cat",
    type: "image",
    src: "/images/boxbox/nemo cat.jpeg",
    top: "433px",
    left: "108px",
    width: "88px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "square dog",
    type: "image",
    src: "/images/boxbox/square dog.png",
    top: "389px",
    left: "157px",
    width: "74px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "large_red_square",
    type: "image",
    src: "/images/boxbox/large_red_square.png",
    top: "420px",
    left: "144px",
    width: "26px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/boxbox/detail.png",
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
    id: "boxbox render",
    type: "image",
    src: "/images/boxbox/boxbox render.png",
    top: "656px",
    left: "602px",
    width: "237px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "circle X",
    type: "image",
    src: "/images/boxbox/circle X.png",
    top: "434px",
    left: "1190px",
    width: "135px",
    rotate: "21deg",
    zIndex: 5,
  },
  {
    id: "poligon",
    type: "image",
    src: "/images/boxbox/poligon.png",
    top: "739px",
    left: "144px",
    width: "71px",
    rotate: "-5deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/boxbox/360 view.mp4",
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
    src: "/images/zzzzz/bottom.png",
    top: "2287px",
    left: "232px",
    width: "424px",
    rotate: "-180deg",
    zIndex: 6,
  },
];

export default function Page() {
  return (
    <main
      style={{
        // 💡 모니터 전체 배경 (1440px 바깥 영역)도 통일하고 싶다면 아래 색상을 배경 이미지 주조색과 맞추거나 똑같이 backgroundImage를 주셔도 됩니다.
        backgroundColor: "#FFFFFF", 
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* 🎨 1440 × 2857 고정 배경 캔버스 */}
      <div
        style={{
          position: "relative",
          width: "1440px",
          height: "2857px",
          
          // 💡 [배경 이미지 설정 추가!]
          backgroundImage: "url('/images/red error copy2.jpg')", // 👈 준비하신 배경 이미지 파일명으로 바꿔주세요!
          backgroundSize: "cover",       // 이미지가 1440x989 영역에 꽉 차도록 비율을 맞춰 늘립니다.
          backgroundPosition: "center",  // 이미지가 캔버스 정중앙에 오도록 맞춥니다.
          backgroundRepeat: "no-repeat", // 이미지가 모자라도 바둑판처럼 반복되지 않게 합니다.

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
              alt=""
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height ?? "auto",
                transform: item.rotate ? `rotate(${item.rotate})` : undefined,
                zIndex: item.zIndex ?? 0,
                display: "block",
              }}
            />
          )
        )}
      </div>
    </main>
  );
}