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
    top: "287px",
    left: "1000px",
    width: "118px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "11",
    type: "image",
    src: "/images/Is this okay/11.png",
    top: "206px",
    left: "528px",
    width: "143px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/Is this okay/image.png",
    top: "147px",
    left: "661px",
    width: "345px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "black mice",
    type: "image",
    src: "/images/Is this okay/black mice.png",
    top: "139px",
    left: "333px",
    width: "47px",
    rotate: "-21deg",
    zIndex: 4,
  },
  {
    id: "question",
    type: "image",
    src: "/images/Is this okay/question.png",
    top: "118px",
    left: "369px",
    width: "38px",
    rotate: "7deg",
    zIndex: 4,
  },
  {
    id: "judge",
    type: "image",
    src: "/images/Is this okay/judge.png",
    top: "172px",
    left: "1018px",
    width: "80px",
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
    left: "302px",
    width: "203px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "real_Is this okay",
    type: "image",
    src: "/images/Is this okay/real_Is this okay.png",
    top: "102px",
    left: "284px",
    width: "282px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "mickey",
    type: "image",
    src: "/images/Is this okay/mickey.png",
    top: "80px",
    left: "950px",
    width: "84px",
    rotate: "11deg",
    zIndex: 4,
  },
  {
    id: "Is this okay doodle",
    type: "image",
    src: "/images/Is this okay/Is this okay doodle.png",
    top: "339px",
    left: "551px",
    width: "242px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/Is this okay/whole box.png",
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
    src: "/images/hey/video.mp4",
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
    id: "pointing",
    type: "image",
    src: "/images/Is this okay/pointing.png",
    top: "413px",
    left: "106px",
    width: "118px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "mice",
    type: "image",
    src: "/images/Is this okay/mice.png",
    top: "423px",
    left: "197px",
    width: "72px",
    rotate: "11deg",
    zIndex: 4,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/Is this okay/detail.png",
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
    id: "Is this okay render",
    type: "image",
    src: "/images/Is this okay/Is this okay render.png",
    top: "489px",
    left: "468px",
    width: "499px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "hammer",
    type: "image",
    src: "/images/Is this okay/hammer.png",
    top: "419px",
    left: "1259px",
    width: "99px",
    rotate: "13deg",
    zIndex: 6,
  },{
    id: "disney",
    type: "image",
    src: "/images/Is this okay/disney.png",
    top: "378px",
    left: "1147px",
    width: "189px",
    rotate: "6deg",
    zIndex: 5,
  },
  {
    id: "mickey pixel",
    type: "image",
    src: "/images/Is this okay/mickey pixel.png",
    top: "720px",
    left: "40px",
    width: "295px",
    rotate: "10deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/Is this okay/360 view.mp4",
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
    src: "/images/Is this okay/box bot.png",
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
    src: "/images/Is this okay/bottom.jpg",
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