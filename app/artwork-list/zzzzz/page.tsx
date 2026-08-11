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
    width: "784px",
    height: "240px",
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
    id: "8",
    type: "image",
    src: "/images/zzzzz/8.png",
    top: "216px",
    left: "505px",
    width: "144px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/zzzzz/image.png",
    top: "167px",
    left: "624px",
    width: "415px",
    height: "234.5px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "zzzzz",
    type: "image",
    src: "/images/zzzzz/zzzzz.png",
    top: "89px",
    left: "961px",
    width: "99px",
    rotate: "26deg",
    zIndex: 3,
  },
  {
    id: "joy",
    type: "image",
    src: "/images/zzzzz/joy.png",
    top: "202px",
    left: "1052px",
    width: "71px",
    rotate: "-10deg",
    zIndex: 3,
  },
  {
    id: "Debut edition doodle",
    type: "image",
    src: "/images/Debut edition doodle.png",
    top: "84px",
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
    id: "real_zzzzz",
    type: "image",
    src: "/images/zzzzz/real_zzzzz.png",
    top: "89px",
    left: "210px",
    width: "333px",
    rotate: "-2deg",
    zIndex: 4,
  },
  {
    id: "pink shoe",
    type: "image",
    src: "/images/zzzzz/pink shoe.png",
    top: "133px",
    left: "296px",
    width: "49px",
    rotate: "26deg",
    zIndex: 4,
  },
  {
    id: "star-struck",
    type: "image",
    src: "/images/zzzzz/star-struck.png",
    top: "132px",
    left: "423px",
    width: "39px",
    rotate: "-29deg",
    zIndex: 4,
  },
  {
    id: "zzzzz doodle",
    type: "image",
    src: "/images/zzzzz/zzzzz doodle.png",
    top: "346px",
    left: "561px",
    width: "210px",
    rotate: "-2deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/zzzzz/whole box.png",
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
    src: "/images/baby/video.mp4",
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
    id: "laugh men",
    type: "image",
    src: "/images/zzzzz/laugh men.png",
    top: "376px",
    left: "81px",
    width: "167px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "kiki cat",
    type: "image",
    src: "/images/zzzzz/kiki cat.jpeg",
    top: "680px",
    left: "514px",
    width: "82px",
    rotate: "11deg",
    zIndex: 5,
  },
  {
    id: "sweat drop",
    type: "image",
    src: "/images/zzzzz/sweat drop.png",
    top: "383px",
    left: "77px",
    width: "53px",
    rotate: "37deg",
    zIndex: 5,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/zzzzz/detail.png",
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
    id: "zzzzz render",
    type: "image",
    src: "/images/zzzzz/zzzzz render.png",
    top: "501px",
    left: "439px",
    width: "529px",
    rotate: "-4deg",
    zIndex: 5,
  },
  {
    id: "effect",
    type: "image",
    src: "/images/zzzzz/effect.png",
    top: "429px",
    left: "1156px",
    width: "162px",
    rotate: "22deg",
    zIndex: 5,
  },
  {
    id: "yadon",
    type: "image",
    src: "/images/zzzzz/yadon.png",
    top: "747px",
    left: "118px",
    width: "97px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/zzzzz/360 view.mp4",
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
    src: "/images/zzzzz/box bot.png",
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
    src: "/images/zzzzz/bottom.png",
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