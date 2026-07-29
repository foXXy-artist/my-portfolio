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
    id: "blue box",
    type: "image",
    src: "/images/blue box.png",
    top: "120px",
    left: "379px",
    width: "715px",
    height: "235px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "circle foXXy_yellow",
    type: "image",
    src: "/images/circle foXXy_yellow.png",
    top: "263px",
    left: "1015px",
    width: "110px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "20",
    type: "image",
    src: "/images/simpsxxs/20.png",
    top: "201px",
    left: "523px",
    width: "170px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/simpsxxs/image.png",
    top: "154px",
    left: "693px",
    width: "377px",
    height: "246px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "face lisa",
    type: "image",
    src: "/images/simpsxxs/face lisa.png",
    top: "83px",
    left: "966px",
    width: "82px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "no hear",
    type: "image",
    src: "/images/simpsxxs/no hear.png",
    top: "180px",
    left: "1071px",
    width: "65px",
    rotate: "13deg",
    zIndex: 3,
  },
  {
    id: "blue Debut edition doodle",
    type: "image",
    src: "/images/blue Debut edition doodle.png",
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
    zIndex: 3,
  },
  {
    id: "real_simpsxxs",
    type: "image",
    src: "/images/simpsxxs/real_simpsxxs.png",
    top: "105px",
    left: "208px",
    width: "296px",
    rotate: "-5deg",
    zIndex: 4,
  },
  {
    id: "icon",
    type: "image",
    src: "/images/simpsxxs/icon.png",
    top: "370px",
    left: "49px",
    width: "276px",
    rotate: "-4deg",
    zIndex: 4,
  },
  {
    id: "emojis",
    type: "image",
    src: "/images/simpsxxs/emojis.png",
    top: "130px",
    left: "384px",
    width: "116px",
    rotate: "5deg",
    zIndex: 4,
  },
  {
    id: "simpsxxs doodle",
    type: "image",
    src: "/images/simpsxxs/simpsxxs doodle.png",
    top: "328px",
    left: "570px",
    width: "192px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/simpsxxs/whole box.png",
    top: "247px",
    left: "1179px",
    width: "220px",
    rotate: "6deg",
    zIndex: 4,
  },
  {
    id: "blue collect me now",
    type: "image",
    src: "/images/blue collect me now.png",
    top: "346px",
    left: "254px",
    width: "274px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "video",
    type: "video",
    src: "/images/simpsxxs/video.mp4",
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
    id: "face",
    type: "image",
    src: "/images/simpsxxs/face.png",
    top: "462px",
    left: "1221px",
    width: "88px",
    rotate: "18deg",
    zIndex: 5,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/simpsxxs/detail.png",
    top: "834px",
    left: "208px",
    width: "986px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "blue detail view",
    type: "image",
    src: "/images/blue detail view.png",
    top: "801px",
    left: "186px",
    width: "349px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "simpsxxs render",
    type: "image",
    src: "/images/simpsxxs/simpsxxs render.png",
    top: "501px",
    left: "439px",
    width: "529px",
    rotate: "-4deg",
    zIndex: 5,
  },
  {
    id: "xx",
    type: "image",
    src: "/images/simpsxxs/xx.png",
    top: "765px",
    left: "151px",
    width: "26px",
    rotate: "7deg",
    zIndex: 6,
  },
  {
    id: "marge",
    type: "image",
    src: "/images/simpsxxs/marge.png",
    top: "727px",
    left: "116px",
    width: "108px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/simpsxxs/360 view.mp4",
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
    src: "/images/simpsxxs/box bot.png",
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
    src: "/images/simpsxxs/bottom.jpg",
    top: "2394px",
    left: "225px",
    width: "424px",
    rotate: "-180deg",
    zIndex: 6,
  },
  {
    id: "psd",
    type: "video",
    src: "/images/baby/psd.mp4",
    top: "2215px",
    left: "389px",
    width: "285.5px",
    height: "241px",
    rotate: "0deg",
    zIndex: 7,
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
          backgroundImage: "url('/images/blue error.jpg')", // 👈 준비하신 배경 이미지 파일명으로 바꿔주세요!
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