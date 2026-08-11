"use client";

import React from "react";
import Image from "next/image";

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
    id: "elevator copy",
    type: "image",
    src: "/images/elevator copy.jpg",
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

// 💡 픽셀(px)을 기준 해상도(1440x2857) 대비 퍼센트(%)로 변환하는 헬퍼 함수
const getPercentX = (pxValue: string) => `${(parseFloat(pxValue) / 1440) * 100}%`;
const getPercentY = (pxValue: string) => `${(parseFloat(pxValue) / 2857) * 100}%`;

export default function Page() {
  return (
    <main
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 화면이 줄어들 때 상단 기준으로 스크롤 되도록 설정
        position: "relative",
      }}
    >
      {/* 🎨 반응형으로 크기가 변하는 배경 캔버스 */}
      <div
        style={{
          position: "relative",
          width: "100%",           // 부모 요소에 맞춰 꽉 차게 설정
          maxWidth: "1440px",      // 1440px 이상으로는 커지지 않게 제한 (원치 않으면 삭제 가능)
          aspectRatio: "1440 / 2857", // ⭐️ 원본 비율 유지! 이 속성이 반응형의 핵심입니다.
          backgroundImage: "url('/images/red error copy2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        {CANVAS_ITEMS.map((item) => {
          // 💡 각각의 아이템 위치와 크기를 %로 동적 변환
          const responsiveStyle: React.CSSProperties = {
            position: "absolute",
            top: getPercentY(item.top),
            left: getPercentX(item.left),
            width: getPercentX(item.width),
            height: item.height ? getPercentY(item.height) : "auto", // height가 지정 안된 경우 auto로 비율 유지
            transform: item.rotate ? `rotate(${item.rotate})` : undefined,
            zIndex: item.zIndex ?? 0,
            display: "block",
            objectFit: "cover",
          };

          return item.type === "video" ? (
            <video
              key={item.id}
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              style={responsiveStyle}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.src}
              alt=""
              style={responsiveStyle}
            />
          );
        })}
      </div>
    </main>
  );
}