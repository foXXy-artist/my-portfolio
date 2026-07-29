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
    id: "green box",
    type: "image",
    src: "/images/green box.png",
    top: "125px",
    left: "320px",
    width: "784px",
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
    id: "15",
    type: "image",
    src: "/images/fxxk/15.png",
    top: "230px",
    left: "497px",
    width: "163px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/fxxk/image.png",
    top: "124px",
    left: "673px",
    width: "339px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "bottles",
    type: "image",
    src: "/images/fxxk/bottles.png",
    top: "96px",
    left: "949px",
    width: "91px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "ciggartte",
    type: "image",
    src: "/images/fxxk/ciggartte.png",
    top: "86px",
    left: "1025px",
    width: "60px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "exploding_head",
    type: "image",
    src: "/images/fxxk/exploding_head.png",
    top: "189px",
    left: "1068px",
    width: "66px",
    rotate: "9deg",
    zIndex: 3,
  },
  {
    id: "green Debut edition doodle",
    type: "image",
    src: "/images/green Debut edition doodle.png",
    top: "83px",
    left: "505px",
    width: "414px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "hubo box",
    type: "image",
    src: "/images/orange box.png",
    top: "113px",
    left: "273px",
    width: "213px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "real_fxxk",
    type: "image",
    src: "/images/fxxk/real_fxxk.png",
    top: "52px",
    left: "194px",
    width: "354px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "smoking",
    type: "image",
    src: "/images/fxxk/smoking.png",
    top: "216px",
    left: "288px",
    width: "44px",
    rotate: "12deg",
    zIndex: 4,
  },
  {
    id: "champagne",
    type: "image",
    src: "/images/fxxk/champagne.png",
    top: "152px",
    left: "435px",
    width: "50px",
    rotate: "45deg",
    zIndex: 4,
  },
  {
    id: "fxxk doodle",
    type: "image",
    src: "/images/fxxk/fxxk doodle.png",
    top: "338px",
    left: "567px",
    width: "183px",
    rotate: "-7deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/fxxk/whole box.png",
    top: "247px",
    left: "1179px",
    width: "220px",
    rotate: "6deg",
    zIndex: 4,
  },
  {
    id: "green collect me now",
    type: "image",
    src: "/images/green collect me now.png",
    top: "346px",
    left: "254px",
    width: "274px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "video",
    type: "video",
    src: "/images/fxxk/video.mp4",
    top: "504px",
    left: "224px",
    width: "226px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "tv_filter",
    type: "image",
    src: "/images/tv_filter.png",
    top: "413px",
    left: "194px",
    width: "357px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "stare",
    type: "image",
    src: "/images/fxxk/stare.png",
    top: "425px",
    left: "116px",
    width: "83px",
    rotate: "-10deg",
    zIndex: 2,
  },
  {
    id: "gen z stare",
    type: "image",
    src: "/images/fxxk/gen z stare.png",
    top: "398px",
    left: "170px",
    width: "74px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/fxxk/detail.png",
    top: "834px",
    left: "208px",
    width: "986px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "green detail view",
    type: "image",
    src: "/images/green detail view.png",
    top: "801px",
    left: "186px",
    width: "349px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "fxxk render",
    type: "image",
    src: "/images/fxxk/fxxk render.png",
    top: "514px",
    left: "515px",
    width: "439px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "alchol",
    type: "image",
    src: "/images/fxxk/alchol.png",
    top: "443px",
    left: "1216px",
    width: "77px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "tooth tex",
    type: "image",
    src: "/images/tooth tex.png",
    top: "754px",
    left: "149px",
    width: "60px",
    rotate: "-11deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/fxxk/360 view.mp4",
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
    id: "red foxxy",
    type: "image",
    src: "/images/red foxxy.png",
    top: "2065px",
    left: "144px",
    width: "298px",
    rotate: "5deg",
    zIndex: 5,
  },
  {
    id: "box bot",
    type: "image",
    src: "/images/fxxk/box bot.png",
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
    src: "/images/fxxk/bottom.jpg",
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
          backgroundImage: "url('/images/green error copy.jpg')", // 👈 준비하신 배경 이미지 파일명으로 바꿔주세요!
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