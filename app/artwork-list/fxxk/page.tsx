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
    id: "elevato copy",
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
    id: "green window copy",
    type: "image",
    src: "/images/green window copy.jpg",
    top: "496px",
    left: "672px",
    width: "463px",
    rotate: "0deg",
    zIndex: 2,
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
    top: "328px",
    left: "540px",
    width: "180px",
    rotate: "-7deg",
    zIndex: 6,
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
    top: "495px",
    left: "226px",
    width: "252.5px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "tv_filter",
    type: "image",
    src: "/images/tv_filter.png",
    top: "393px",
    left: "192px",
    width: "399px",
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
    zIndex: 6,
  },
  {
    id: "gen z stare",
    type: "image",
    src: "/images/fxxk/gen z stare.png",
    top: "398px",
    left: "170px",
    width: "74px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/fxxk/detail copy.jpg",
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
    top: "404px",
    left: "547px",
    width: "448px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "tissue",
    type: "image",
    src: "/images/tissue.png",
    top: "610px",
    left: "868px",
    width: "301px",
    rotate: "0deg",
    zIndex: 3,
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
          backgroundImage: "url('/images/green error copy.jpg')",
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