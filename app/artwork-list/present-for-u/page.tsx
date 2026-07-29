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
    top: "120px",
    left: "379px",
    width: "715px",
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
    id: "17",
    type: "image",
    src: "/images/present for u/17.png",
    top: "200px",
    left: "527px",
    width: "156px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/present for u/image.png",
    top: "129px",
    left: "692px",
    width: "309px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "rose",
    type: "image",
    src: "/images/present for u/rose.png",
    top: "133px",
    left: "416px",
    width: "42px",
    rotate: "15deg",
    zIndex: 4,
  },
  {
    id: "ring",
    type: "image",
    src: "/images/present for u/ring.png",
    top: "183px",
    left: "444px",
    width: "36px",
    rotate: "19deg",
    zIndex: 4,
  },
  {
    id: "gift",
    type: "image",
    src: "/images/present for u/gift.png",
    top: "231px",
    left: "441px",
    width: "43px",
    rotate: "7deg",
    zIndex: 4,
  },
  {
    id: "flower",
    type: "image",
    src: "/images/present for u/flower.png",
    top: "88px",
    left: "967px",
    width: "89px",
    rotate: "-14deg",
    zIndex: 4,
  },
  {
    id: "kissing_heart",
    type: "image",
    src: "/images/present for u/kissing_heart.png",
    top: "190px",
    left: "1056px",
    width: "58px",
    rotate: "11deg",
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
    id: "real_present for u",
    type: "image",
    src: "/images/present for u/real_present for u.png",
    top: "76px",
    left: "210px",
    width: "345px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "present for u doodle",
    type: "image",
    src: "/images/present for u/present for u doodle.png",
    top: "326px",
    left: "565px",
    width: "190px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/present for u/whole box.png",
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
    id: "propose",
    type: "image",
    src: "/images/present for u/propose.png",
    top: "394px",
    left: "114px",
    width: "119px",
    rotate: "-5deg",
    zIndex: 5,
  },
  {
    id: "hibiscus",
    type: "image",
    src: "/images/present for u/hibiscus.png",
    top: "391px",
    left: "149px",
    width: "22px",
    rotate: "-14deg",
    zIndex: 3,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/present for u/detail.png",
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
    id: "present for u render",
    type: "image",
    src: "/images/present for u/present for u render.png",
    top: "503px",
    left: "470px",
    width: "500px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "surprise",
    type: "image",
    src: "/images/present for u/surprise.png",
    top: "415px",
    left: "1158px",
    width: "173px",
    rotate: "6deg",
    zIndex: 5,
  },
  {
    id: "lazigigas",
    type: "image",
    src: "/images/present for u/lazigigas.png",
    top: "746px",
    left: "118px",
    width: "109px",
    rotate: "0deg",
    zIndex: 6,
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
    id: "360 view",
    type: "video",
    src: "/images/present for u/360 view.mp4",
    top: "631px",
    left: "1151px",
    width: "239px",
    height: "312.5px",
    rotate: "0deg",
    zIndex: 5,
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
    src: "/images/present for u/box bot.png",
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
    src: "/images/present for u/bottom.jpg",
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