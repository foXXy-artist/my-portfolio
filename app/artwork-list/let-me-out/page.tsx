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
    left: "320px",
    width: "784px",
    height: "258px",
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
    id: "7",
    type: "image",
    src: "/images/let me out/7.png",
    top: "219px",
    left: "505px",
    width: "151px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/let me out/image.png",
    top: "148px",
    left: "632px",
    width: "375px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "925",
    type: "image",
    src: "/images/let me out/925.png",
    top: "105px",
    left: "948px",
    width: "101px",
    rotate: "-8deg",
    zIndex: 3,
  },
  {
    id: "shaking_face",
    type: "image",
    src: "/images/let me out/shaking_face.png",
    top: "204px",
    left: "1053px",
    width: "69px",
    rotate: "10deg",
    zIndex: 3,
  },
  {
    id: "Debut edition doodle",
    type: "image",
    src: "/images/Debut edition doodle.png",
    top: "83px",
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
    left: "273px",
    width: "203px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "real_let me out",
    type: "image",
    src: "/images/let me out/real_let me out.png",
    top: "69px",
    left: "220px",
    width: "308px",
    rotate: "-4deg",
    zIndex: 4,
  },
  {
    id: "jail",
    type: "image",
    src: "/images/let me out/jail.png",
    top: "122px",
    left: "295px",
    width: "158px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "let me out doodle",
    type: "image",
    src: "/images/let me out/let me out doodle.png",
    top: "346px",
    left: "550px",
    width: "206px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/half/whole box.png",
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
    src: "/images/gloomy day/video.mp4",
    top: "505px",
    left: "228px",
    width: "228px",
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
    id: "tired cat meme",
    type: "image",
    src: "/images/let me out/tired cat meme.png",
    top: "398px",
    left: "93px",
    width: "111px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "jail 2",
    type: "image",
    src: "/images/let me out/jail 2.png",
    top: "393px",
    left: "150px",
    width: "72px",
    rotate: "-20deg",
    zIndex: 6,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/let me out/detail.png",
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
    id: "let me out render",
    type: "image",
    src: "/images/let me out/let me out render.png",
    top: "504px",
    left: "493px",
    width: "459px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "prison",
    type: "image",
    src: "/images/let me out/prison.png",
    top: "432px",
    left: "1151px",
    width: "153px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "potan",
    type: "image",
    src: "/images/let me out/potan.png",
    top: "752px",
    left: "136px",
    width: "80px",
    rotate: "-3deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/let me out/360 view.mp4",
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
    src: "/images/gloomy day/box bot.png",
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
    src: "/images/half/bottom.jpg",
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