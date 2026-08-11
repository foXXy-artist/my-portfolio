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
    top: "2250px",
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