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
    width: "790px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "circle foXXy red",
    type: "image",
    src: "/images/circle foXXy red.png",
    top: "277px",
    left: "994px",
    width: "130px",
    rotate: "3deg",
    zIndex: 3,
  },
  {
    id: "1Heartbreak",
    type: "image",
    src: "/images/heartbreak/1Heartbreak.png",
    top: "217px",
    left: "499px",
    width: "444px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "broken heart",
    type: "image",
    src: "/images/heartbreak/broken heart.png",
    top: "102px",
    left: "953px",
    width: "98px",
    rotate: "15deg",
    zIndex: 3,
  },
  {
    id: "cry",
    type: "image",
    src: "/images/cry.png",
    top: "206px",
    left: "1056px",
    width: "65px",
    rotate: "13deg",
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
    top: "97px",
    left: "238px",
    width: "236px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "real heartbreak",
    type: "image",
    src: "/images/heartbreak/real heartbreak.png",
    top: "65px",
    left: "205px",
    width: "372px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "Sweat drops",
    type: "image",
    src: "/images/Sweat drops.png",
    top: "171px",
    left: "260px",
    width: "49px",
    rotate: "-254deg",
    zIndex: 4,
  },
  {
    id: "heartbreak",
    type: "image",
    src: "/images/heartbreak/heartbreak.png",
    top: "349px",
    left: "551px",
    width: "178px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/heartbreak/whole box.png",
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
    src: "/images/heartbreak/video.mp4",
    top: "504px",
    left: "224px",
    width: "226px",
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
    id: "heart knife",
    type: "image",
    src: "/images/heartbreak/heart knife.png",
    top: "387px",
    left: "55px",
    width: "241px",
    rotate: "-5deg",
    zIndex: 5,
  },
  {
    id: "band",
    type: "image",
    src: "/images/band.png",
    top: "458px",
    left: "107px",
    width: "76px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "detail heartbreak",
    type: "image",
    src: "/images/heartbreak/detail heartbreak.png",
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
    id: "heartbreak render",
    type: "image",
    src: "/images/heartbreak/heartbreak render.png",
    top: "528px",
    left: "484px",
    width: "438px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "heart",
    type: "image",
    src: "/images/heartbreak/heart.png",
    top: "682px",
    left: "484px",
    width: "103px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "band doodle",
    type: "image",
    src: "/images/heartbreak/band doodle.png",
    top: "493px",
    left: "1180px",
    width: "83px",
    rotate: "33deg",
    zIndex: 5,
  },
  {
    id: "fishking",
    type: "image",
    src: "/images/heartbreak/fishking.png",
    top: "710px",
    left: "63px",
    width: "197px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/heartbreak/360 view.mp4",
    top: "631px",
    left: "1151px",
    width: "239px",
    height: "312.5px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "long window",
    type: "image",
    src: "/images/long window.png",
    top: "627px",
    left: "1119px",
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
    src: "/images/heartbreak/box bot.png",
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
    top: "1592px",
    left: "1226px",
    width: "206px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "bottom",
    type: "image",
    src: "/images/heartbreak/bottom.jpg",
    top: "2287px",
    left: "232px",
    width: "424px",
    rotate: "-180deg",
    zIndex: 6,
  },
  {
    id: "letter",
    type: "image",
    src: "/images/heartbreak/letter.png",
    top: "444px",
    left: "727px",
    width: "384px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "size",
    type: "image",
    src: "/images/heartbreak/size.png",
    top: "527px",
    left: "771px",
    width: "410px",
    rotate: "0deg",
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