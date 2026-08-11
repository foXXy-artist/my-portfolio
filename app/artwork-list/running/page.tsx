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
    top: "268px",
    left: "1015px",
    width: "102px",
    rotate: "3deg",
    zIndex: 3,
  },
  {
    id: "12",
    type: "image",
    src: "/images/running/12.png",
    top: "204px",
    left: "528px",
    width: "146px",
    rotate: "0deg",
    zIndex: 3,
  },
  {
    id: "image",
    type: "image",
    src: "/images/running/image.png",
    top: "154px",
    left: "680px",
    width: "387px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "dash",
    type: "image",
    src: "/images/running/dash.png",
    top: "149px",
    left: "447px",
    width: "41px",
    rotate: "-20deg",
    zIndex: 4,
  },
  {
    id: "sunglasses",
    type: "image",
    src: "/images/running/sunglasses.png",
    top: "174px",
    left: "1072px",
    width: "58px",
    rotate: "13deg",
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
    zIndex: 3,
  },
  {
    id: "real_running",
    type: "image",
    src: "/images/running/real_running.png",
    top: "113px",
    left: "249px",
    width: "268px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "run effect",
    type: "image",
    src: "/images/running/run effect.png",
    top: "97px",
    left: "948px",
    width: "119px",
    rotate: "-15deg",
    zIndex: 4,
  },
  {
    id: "running doodle",
    type: "image",
    src: "/images/running/running doodle.png",
    top: "330px",
    left: "561px",
    width: "210px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    id: "whole box",
    type: "image",
    src: "/images/running/whole box.png",
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
    src: "/images/running/video.mp4",
    top: "503px",
    left: "224px",
    width: "224px",
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
    id: "fast as boy",
    type: "image",
    src: "/images/running/fast as boy.jpeg",
    top: "389px",
    left: "119px",
    width: "84px",
    rotate: "-4deg",
    zIndex: 3,
  },
  {
    id: "jeniz",
    type: "image",
    src: "/images/running/jeniz.png",
    top: "412px",
    left: "182px",
    width: "84px",
    rotate: "6deg",
    zIndex: 4,
  },
  {
    id: "detail",
    type: "image",
    src: "/images/running/detail.png",
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
    id: "running render",
    type: "image",
    src: "/images/running/running render.png",
    top: "491px",
    left: "470px",
    width: "499px",
    rotate: "0deg",
    zIndex: 5,
  },
  {
    id: "run effect 2",
    type: "image",
    src: "/images/running/run effect 2.png",
    top: "485px",
    left: "1207px",
    width: "162px",
    rotate: "-8deg",
    zIndex: 6,
  },{
    id: "udada",
    type: "image",
    src: "/images/running/udada.png",
    top: "452px",
    left: "1156px",
    width: "153px",
    rotate: "-15deg",
    zIndex: 5,
  },
  {
    id: "thunder",
    type: "image",
    src: "/images/running/thunder.png",
    top: "754px",
    left: "141px",
    width: "100px",
    rotate: "-8deg",
    zIndex: 6,
  },
  {
    id: "360 view",
    type: "video",
    src: "/images/running/360 view.mp4",
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
    src: "/images/running/box bot.png",
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
    src: "/images/running/bottom.jpg",
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