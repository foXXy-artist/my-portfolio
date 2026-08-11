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
    id: "blue box",
    type: "image",
    src: "/images/blue box.png",
    top: "120px",
    left: "379px",
    width: "715px",
    height: "235px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "circle foXXy_yellow",
    type: "image",
    src: "/images/circle foXXy_yellow.png",
    top: "263px",
    left: "1015px",
    width: "110px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "21",
    type: "image",
    src: "/images/I hate burger/21.png",
    top: "196px",
    left: "524px",
    width: "172px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/I hate burger/image.png",
    top: "185px",
    left: "660px",
    width: "400px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "burger",
    type: "image",
    src: "/images/I hate burger/burger.png",
    top: "91px",
    left: "973px",
    width: "83px",
    rotate: "27deg",
    zIndex: 3,
  },
  {
    id: "disgusting",
    type: "image",
    src: "/images/I hate burger/disgusting.png",
    top: "191px",
    left: "1059px",
    width: "64px",
    rotate: "10deg",
    zIndex: 3,
  },
  {
    id: "blue Debut edition doodle",
    type: "image",
    src: "/images/blue Debut edition doodle.png",
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
    zIndex: 3,
  },
  {
    id: "real_I hate burger",
    type: "image",
    src: "/images/I hate burger/real_I hate burger.png",
    top: "52px",
    left: "191px",
    width: "400px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "chat",
    type: "image",
    src: "/images/I hate burger/chat.png",
    top: "124px",
    left: "421px",
    width: "72px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "hamburger",
    type: "image",
    src: "/images/I hate burger/hamburger.png",
    top: "130px",
    left: "432px",
    width: "48px",
    rotate: "5deg",
    zIndex: 5,
  },
  {
    id: "X",
    type: "image",
    src: "/images/I hate burger/X.png",
    top: "134px",
    left: "436px",
    width: "42px",
    rotate: "10deg",
    zIndex: 6,
  },
  {
    id: "I hate burger doodle",
    type: "image",
    src: "/images/I hate burger/I hate burger doodle.png",
    top: "337px",
    left: "562px",
    width: "199px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/I hate burger/whole box.png",
    top: "247px",
    left: "1179px",
    width: "220px",
    rotate: "6deg",
    zIndex: 4,
  },
  {
    id: "blue collect me now",
    type: "image",
    src: "/images/blue collect me now.png",
    top: "346px",
    left: "254px",
    width: "274px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "video",
    type: "video",
    src: "/images/I hate burger/video.mp4",
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
    id: "crab",
    type: "image",
    src: "/images/I hate burger/crab.png",
    top: "464px",
    left: "1188px",
    width: "99px",
    rotate: "13deg",
    zIndex: 5,
  },
  {
    id: "spiner",
    type: "image",
    src: "/images/I hate burger/spiner.png",
    top: "422px",
    left: "1256px",
    width: "65px",
    rotate: "-20deg",
    zIndex: 6,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/I hate burger/detail.png",
    top: "834px",
    left: "208px",
    width: "986px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "blue detail view",
    type: "image",
    src: "/images/blue detail view.png",
    top: "801px",
    left: "186px",
    width: "349px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "I hate burger render",
    type: "image",
    src: "/images/I hate render.png",
    top: "501px",
    left: "439px",
    width: "529px",
    rotate: "-4deg",
    zIndex: 5,
  },
  {
    id: "store",
    type: "image",
    src: "/images/I hate burger/store.png",
    top: "401px",
    left: "112px",
    width: "131px",
    rotate: "-4deg",
    zIndex: 2,
  },
  {
    id: "no",
    type: "image",
    src: "/images/I hate burger/no.png",
    top: "382px",
    left: "183px",
    width: "67px",
    rotate: "-8deg",
    zIndex: 3,
  },
  {
    id: "spongebob",
    type: "image",
    src: "/images/I hate burger/spongebob.png",
    top: "723px",
    left: "99px",
    width: "155px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/I hate burger/360 view.mp4",
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
    src: "/images/I hate burger/box bot.png",
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
    src: "/images/I hate burger/bottom.jpg",
    top: "2315px",
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
          backgroundImage: "url('/images/blue error.jpg')",
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