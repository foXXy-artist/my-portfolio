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
    top: "115px",
    left: "371px",
    width: "730px",
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
    id: "16",
    type: "image",
    src: "/images/shh/16.png",
    top: "202px",
    left: "528px",
    width: "151px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/shh/image.png",
    top: "106px",
    left: "662px",
    width: "388px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "camera",
    type: "image",
    src: "/images/shh/camera.png",
    top: "133px",
    left: "325px",
    width: "47px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "r.mutt",
    type: "image",
    src: "/images/shh/r.mutt.png",
    top: "79px",
    left: "946px",
    width: "122px",
    rotate: "3deg",
    zIndex: 4,
  },
  {
    id: "flushed",
    type: "image",
    src: "/images/shh/flushed.png",
    top: "183px",
    left: "1064px",
    width: "57px",
    rotate: "14deg",
    zIndex: 3,
  },
  {
    id: "green Debut edition doodle",
    type: "image",
    src: "/images/green Debut edition doodle.png",
    top: "71px",
    left: "532px",
    width: "397px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "hubo box",
    type: "image",
    src: "/images/orange box.png",
    top: "113px",
    left: "302px",
    width: "203px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "real_shh",
    type: "image",
    src: "/images/shh/real_shh.png",
    top: "71px",
    left: "265px",
    width: "356px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "shh doodle",
    type: "image",
    src: "/images/shh/shh doodle.png",
    top: "331px",
    left: "573px",
    width: "178px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/shh/whole box.png",
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
    src: "/images/shh/video.mp4",
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
    id: "drake",
    type: "image",
    src: "/images/shh/drake.png",
    top: "400px",
    left: "112px",
    width: "117px",
    rotate: "-8deg",
    zIndex: 2,
  },
  {
    id: "pointing guy left",
    type: "image",
    src: "/images/shh/pointing guy left.png",
    top: "451px",
    left: "92px",
    width: "48px",
    rotate: "-7deg",
    zIndex: 3,
  },
  {
    id: "pointing guy right",
    type: "image",
    src: "/images/shh/pointing guy right.png",
    top: "396px",
    left: "183px",
    width: "68px",
    rotate: "-7deg",
    zIndex: 3,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/shh/detail.png",
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
    id: "shh render",
    type: "image",
    src: "/images/shh/shh render.png",
    top: "461px",
    left: "427px",
    width: "553px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "shh",
    type: "image",
    src: "/images/shh/shh.png",
    top: "420px",
    left: "1207px",
    width: "96px",
    rotate: "9deg",
    zIndex: 5,
  },
  {
    id: "pokemon",
    type: "image",
    src: "/images/shh/pokemon.png",
    top: "750px",
    left: "111px",
    width: "108px",
    rotate: "-5deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/shh/360 view.mp4",
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
    top: "2394px",
    left: "225px",
    width: "424px",
    rotate: "-180deg",
    zIndex: 6,
  },
  {
    id: "psd",
    type: "video",
    src: "/images/heartbreak/psd.mp4",
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