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
    id: "19",
    type: "image",
    src: "/images/bup/19.png",
    top: "199px",
    left: "525px",
    width: "166px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/bup/image.png",
    top: "93px",
    left: "632px",
    width: "427px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "chat",
    type: "image",
    src: "/images/bup/chat.png",
    top: "158px",
    left: "315px",
    width: "62px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "skull",
    type: "image",
    src: "/images/bup/skull.png",
    top: "164px",
    left: "325px",
    width: "41px",
    rotate: "-6deg",
    zIndex: 5,
  },
  {
    id: "labubu face",
    type: "image",
    src: "/images/bup/labubu face.png",
    top: "105px",
    left: "953px",
    width: "105px",
    rotate: "3deg",
    zIndex: 4,
  },
  {
    id: "mask",
    type: "image",
    src: "/images/bup/mask.png",
    top: "183px",
    left: "1055px",
    width: "69px",
    rotate: "8deg",
    zIndex: 3,
  },
  {
    id: "wow face",
    type: "image",
    src: "/images/bup/wow face.png",
    top: "468px",
    left: "1255px",
    width: "87px",
    rotate: "0deg",
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
    id: "bup render",
    type: "image",
    src: "/images/bup/bup render.png",
    top: "497px",
    left: "480px",
    width: "492px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "real_bup",
    type: "image",
    src: "/images/bup/real_bup.png",
    top: "53px",
    left: "236px",
    width: "355px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "bup doodle",
    type: "image",
    src: "/images/bup/bup doodle.png",
    top: "323px",
    left: "577px",
    width: "158px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/bup/whole box.png",
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
    id: "johny",
    type: "image",
    src: "/images/bup/johny.jpeg",
    top: "440px",
    left: "74px",
    width: "142px",
    rotate: "-12deg",
    zIndex: 4,
  },
  {
    id: "labubu",
    type: "image",
    src: "/images/bup/labubu.png",
    top: "387px",
    left: "140px",
    width: "112px",
    rotate: "5deg",
    zIndex: 5,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/bup/detail.png",
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
    id: "axe",
    type: "image",
    src: "/images/bup/axe.png",
    top: "404px",
    left: "222px",
    width: "44px",
    rotate: "-14deg",
    zIndex: 5,
  },
  {
    id: "axe doodle",
    type: "image",
    src: "/images/bup/axe doodle.png",
    top: "405px",
    left: "1183px",
    width: "92px",
    rotate: "-10deg",
    zIndex: 5,
  },
  {
    id: "xx",
    type: "image",
    src: "/images/bup/xx.png",
    top: "426px",
    left: "169px",
    width: "42px",
    rotate: "18deg",
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
    src: "/images/bup/360 view.mp4",
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
    src: "/images/bup/box bot.png",
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
    src: "/images/bup/bottom.jpg",
    top: "2285px",
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