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
    id: "green window copy",
    type: "image",
    src: "/images/green window copy.jpg",
    top: "438px",
    left: "762px",
    width: "479px",
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
    src: "/images/Im not kaws/detail copy.jpg",
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
    top: "369px",
    left: "620px",
    width: "465px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "pan",
    type: "image",
    src: "/images/pan.png",
    top: "341px",
    left: "915px",
    width: "442px",
    rotate: "110deg",
    zIndex: 5,
  },
  {
    id: "kaws fold",
    type: "image",
    src: "/images/Im not kaws/kaws fold.png",
    top: "160px",
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
    left: "1280px",
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
    top: "664px",
    left: "1119px",
    width: "271px",
    rotate: "0deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/Im not kaws/360 view.mp4",
    top: "670px",
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
    top: "2290px",
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