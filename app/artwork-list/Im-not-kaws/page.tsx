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
    id: "18",
    type: "image",
    src: "/images/Im not kaws/18.png",
    top: "200px",
    left: "526px",
    width: "158px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/Im not kaws/image.png",
    top: "132px",
    left: "701px",
    width: "288px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "X",
    type: "image",
    src: "/images/Im not kaws/X.png",
    top: "127px",
    left: "441px",
    width: "40px",
    rotate: "14deg",
    zIndex: 5,
  },
  {
    id: "kaws face",
    type: "image",
    src: "/images/Im not kaws/kaws face.png",
    top: "98px",
    left: "958px",
    width: "99px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "dizzy_face",
    type: "image",
    src: "/images/Im not kaws/dizzy_face.png",
    top: "185px",
    left: "1058px",
    width: "64px",
    rotate: "12deg",
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
    id: "real_I'm not kaws",
    type: "image",
    src: "/images/Im not kaws/real_I'm not kaws.png",
    top: "88px",
    left: "232px",
    width: "315px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "I'm not kaws doodle",
    type: "image",
    src: "/images/Im not kaws/I'm not kaws doodle.png",
    top: "335px",
    left: "565px",
    width: "205px",
    rotate: "5deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/Im not kaws/whole box.png",
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
    id: "kaws black",
    type: "image",
    src: "/images/Im not kaws/kaws black.png",
    top: "399px",
    left: "127px",
    width: "93px",
    rotate: "-7deg",
    zIndex: 5,
  },
  {
    id: "anger",
    type: "image",
    src: "/images/Im not kaws/anger.png",
    top: "382px",
    left: "171px",
    width: "33px",
    rotate: "15deg",
    zIndex: 3,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/Im not kaws/detail.png",
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
    id: "render Im not kaws",
    type: "image",
    src: "/images/Im not kaws/render Im not kaws.png",
    top: "533px",
    left: "482px",
    width: "477px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "kaws fold",
    type: "image",
    src: "/images/Im not kaws/kaws fold.png",
    top: "437px",
    left: "1144px",
    width: "137px",
    rotate: "-9deg",
    zIndex: 5,
  },
  {
    id: "kaws leg",
    type: "image",
    src: "/images/Im not kaws/kaws leg.png",
    top: "470px",
    left: "1240px",
    width: "109px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "kaws gray",
    type: "image",
    src: "/images/Im not kaws/kaws gray.png",
    top: "729px",
    left: "101px",
    width: "154px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "xx",
    type: "image",
    src: "/images/Im not kaws/xx.png",
    top: "756px",
    left: "164px",
    width: "31px",
    rotate: "13deg",
    zIndex: 7,
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
    src: "/images/Im not kaws/360 view.mp4",
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
    src: "/images/Im not kaws/box bot.png",
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
    src: "/images/Im not kaws/bottom.jpg",
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