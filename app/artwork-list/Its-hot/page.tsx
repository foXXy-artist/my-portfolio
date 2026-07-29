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
    top: "115px",
    left: "371px",
    width: "730px",
    height: "240px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "circle foXXy red",
    type: "image",
    src: "/images/circle foXXy red.png",
    top: "263px",
    left: "1015px",
    width: "110px",
    rotate: "3deg",
    zIndex: 3,
  },
  {
    id: "14",
    type: "image",
    src: "/images/Its hot/14.png",
    top: "206px",
    left: "528px",
    width: "143px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/Its hot/image.png",
    top: "126px",
    left: "650px",
    width: "459px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "hot chat box",
    type: "image",
    src: "/images/Its hot/hot chat box.png",
    top: "86px",
    left: "955px",
    width: "127px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "sunny",
    type: "image",
    src: "/images/Its hot/sunny.png",
    top: "126px",
    left: "431px",
    width: "56px",
    rotate: "5deg",
    zIndex: 3,
  },
  {
    id: "dark_sunglasses",
    type: "image",
    src: "/images/Its hot/dark_sunglasses.png",
    top: "129px",
    left: "433px",
    width: "51px",
    rotate: "7deg",
    zIndex: 4,
  },
  {
    id: "sun",
    type: "image",
    src: "/images/Its hot/sun.png",
    top: "402px",
    left: "1196px",
    width: "75px",
    rotate: "17deg",
    zIndex: 3,
  },
  {
    id: "melting_face",
    type: "image",
    src: "/images/Its hot/melting_face.png",
    top: "188px",
    left: "1069px",
    width: "67px",
    rotate: "10deg",
    zIndex: 3,
  },
  {
    id: "Debut edition doodle",
    type: "image",
    src: "/images/Debut edition doodle.png",
    top: "71px",
    left: "532px",
    width: "397px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "yellow box",
    type: "image",
    src: "/images/yellow box.png",
    top: "113px",
    left: "302px",
    width: "203px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "real_It's hot",
    type: "image",
    src: "/images/Its hot/real_It's hot.png",
    top: "113px",
    left: "260px",
    width: "263px",
    rotate: "-2deg",
    zIndex: 4,
  },
  {
    id: "It's hot doodle",
    type: "image",
    src: "/images/Its hot/It's hot doodle.png",
    top: "331px",
    left: "551px",
    width: "213px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/Its hot/whole box.png",
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
    src: "/images/Its hot/video.mp4",
    top: "502px",
    left: "224px",
    width: "230px",
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
    id: "hot",
    type: "image",
    src: "/images/Its hot/hot.jpg",
    top: "413px",
    left: "75px",
    width: "142px",
    rotate: "6deg",
    zIndex: 3,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/Its hot/detail.png",
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
    id: "Its hot render",
    type: "image",
    src: "/images/Its hot/Its hot render.png",
    top: "489px",
    left: "468px",
    width: "499px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "ggamggami",
    type: "image",
    src: "/images/Its hot/ggamggami.png",
    top: "709px",
    left: "98px",
    width: "156px",
    rotate: "-2deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/Its hot/360 view.mp4",
    top: "627px",
    left: "1119px",
    width: "271px",
    height: "331px",
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
    src: "/images/Its hot/box bot.png",
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
    top: "1340px",
    left: "1151px",
    width: "206px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "bottom",
    type: "image",
    src: "/images/Its hot/bottom.jpg",
    top: "2294px",
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