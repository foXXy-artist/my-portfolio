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
    left: "355px",
    width: "714px",
    height: "235px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "red window",
    type: "image",
    src: "/images/red window.jpg",
    top: "496px",
    left: "688px",
    width: "449px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    id: "hand mirror",
    type: "image",
    src: "/images/hand mirror.png",
    top: "428px",
    left: "886px",
    width: "260px",
    rotate: "9deg",
    zIndex: 4,
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
    id: "pointing",
    type: "image",
    src: "/images/Is this okay/pointing.png",
    top: "405px",
    left: "106px",
    width: "118px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "mice",
    type: "image",
    src: "/images/Is this okay/mice.png",
    top: "415px",
    left: "197px",
    width: "72px",
    rotate: "11deg",
    zIndex: 6,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/Is this okay/detail copy.jpg",
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
    top: "298px",
    left: "559px",
    width: "533px",
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