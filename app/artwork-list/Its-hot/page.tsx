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
    id: "red window",
    type: "image",
    src: "/images/red window.jpg",
    top: "455px",
    left: "748px",
    width: "449px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "top box",
    type: "image",
    src: "/images/top box.png",
    top: "115px",
    left: "371px",
    width: "730px",
    height: "240px",
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
    id: "14",
    type: "image",
    src: "/images/Its hot/14.png",
    top: "206px",
    left: "528px",
    width: "143px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/Its hot/image.png",
    top: "126px",
    left: "650px",
    width: "459px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "hot chat box",
    type: "image",
    src: "/images/Its hot/hot chat box.png",
    top: "86px",
    left: "955px",
    width: "127px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "sunny",
    type: "image",
    src: "/images/Its hot/sunny.png",
    top: "126px",
    left: "431px",
    width: "56px",
    rotate: "5deg",
    zIndex: 3,
  },
  {
    id: "dark_sunglasses",
    type: "image",
    src: "/images/Its hot/dark_sunglasses.png",
    top: "129px",
    left: "433px",
    width: "51px",
    rotate: "7deg",
    zIndex: 4,
  },
  {
    id: "sun",
    type: "image",
    src: "/images/Its hot/sun.png",
    top: "402px",
    left: "1196px",
    width: "75px",
    rotate: "17deg",
    zIndex: 3,
  },
  {
    id: "melting_face",
    type: "image",
    src: "/images/Its hot/melting_face.png",
    top: "188px",
    left: "1069px",
    width: "67px",
    rotate: "10deg",
    zIndex: 3,
  },
  {
    id: "Debut edition doodle",
    type: "image",
    src: "/images/Debut edition doodle.png",
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
    zIndex: 2,
  },
  {
    id: "real_It's hot",
    type: "image",
    src: "/images/Its hot/real_It's hot.png",
    top: "113px",
    left: "260px",
    width: "263px",
    rotate: "-2deg",
    zIndex: 4,
  },
  {
    id: "It's hot doodle",
    type: "image",
    src: "/images/Its hot/It's hot doodle.png",
    top: "331px",
    left: "551px",
    width: "213px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/Its hot/whole box.png",
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
    src: "/images/Its hot/video.mp4",
    top: "495px",
    left: "226px",
    width: "252.5px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "tv_filter",
    type: "image",
    src: "/images/tv_filter.png",
    top: "393px",
    left: "192px",
    width: "399px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "hot",
    type: "image",
    src: "/images/Its hot/hot.jpg",
    top: "413px",
    left: "75px",
    width: "142px",
    rotate: "6deg",
    zIndex: 5,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/Its hot/detail.png",
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
    id: "render",
    type: "image",
    src: "/images/Its hot/render.png",
    top: "346px",
    left: "576px",
    width: "525px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "soap",
    type: "image",
    src: "/images/soap.png",
    top: "540px",
    left: "980px",
    width: "283px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "ggamggami",
    type: "image",
    src: "/images/Its hot/ggamggami.png",
    top: "709px",
    left: "98px",
    width: "156px",
    rotate: "-2deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/Its hot/360 view.mp4",
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
    src: "/images/Its hot/box bot.png",
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
    src: "/images/broke/bottom.jpg",
    top: "2294px",
    left: "225px",
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