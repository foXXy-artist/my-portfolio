"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import OverlayModal from "./OverlayModal";

// CoverPage는 WebGL/카메라를 사용하므로 SSR 비활성화
const CoverPage = dynamic(() => import("./CoverPage"), { ssr: false });

// ── 화면 크기에 맞춰 캔버스 비율을 계산하는 커스텀 훅 (✨반응형 핵심) ──
function useCanvasScale(defaultWidth = 1440) {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // 화면 너비가 1440px보다 작으면 그 비율만큼 스케일 다운
      if (currentWidth < defaultWidth) {
        setScale(currentWidth / defaultWidth);
      } else {
        setScale(1); // PC 화면에서는 원래 크기(1) 유지
      }
    };
    
    handleResize(); // 처음 렌더링 시 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [defaultWidth]);
  
  return scale;
}

// ── 타입 정의 ─────────────────────────────────────────────────────────
interface HoverConfig {
  scale?:      number;
  translateX?: number;
  translateY?: number;
  rotate?:     number;
}

interface OverlayConfig {
  id:      string;
  src:     string;
  width:   number;
  height?: number;
  top?:    string;
  left?:   string;
}

interface InlineCheckConfig {
  src:     string;
  width:   number;
  top:     string;
  left:    string;
}

interface CanvasItem {
  id:                string;
  type:              "image" | "video";
  src:               string;
  top:               string;
  left:              string;
  width:             string;
  height?:           string;
  rotate?:           string;
  zIndex?:           number;
  hover?:            HoverConfig;
  clickSound?:       string;
  clickOverlay?:     OverlayConfig;
  isCheckbox?:       boolean;
  checkedOverlays?:  OverlayConfig[];
  uncheckedOverlays?: OverlayConfig[];
  inlineCheck?:      InlineCheckConfig;
  chromaKey?:        boolean; 
}

// ══════════════════════════════════════════════════════════════════════
// 💡 Mac 앱 아이콘 배열
// ══════════════════════════════════════════════════════════════════════
const APP_ICONS = [
  "/images/weather icon.png",
  "/images/calculator icon.png",
  "/images/facetime icon.png",
  "/images/finder icon.png",
  "/images/music icon.png",
  "/images/note icon.png",
  "/images/safari icon.png",
  "/images/siri icon.png",
  "/images/system app.png",
  "/images/wallet icon.png",
  "/images/watch icon.png",
];

// ══════════════════════════════════════════════════════════════════════
// CANVAS_ITEMS
// ══════════════════════════════════════════════════════════════════════
const CANVAS_ITEMS: CanvasItem[] = [
  {
    id: "mint bg",
    type: "image", src: "/images/mint bg.jpg",
    top: "262px", left: "99px", width: "1439px",
    rotate: "-10deg", zIndex: 1,
  },
  {
    id: "foxxy popout",
    type: "video", src: "/images/foxxy popout.mp4",
    top: "1016px", left: "22px", width: "245px",
    rotate: "-6deg", zIndex: 19,
  },
  {
    id: "back bg",
    type: "image", src: "/images/back bg.jpg",
    top: "77px", left: "-804px", width: "1588px",
    rotate: "197deg", zIndex: 2,
  },
  {
    id: "back bg2",
    type: "image", src: "/images/back bg2.jpg",
    top: "1808px", left: "0px", width: "1929px",
    rotate: "0deg", zIndex: 1,
  },
  {
    id: "back bg3",
    type: "image", src: "/images/back bg3.jpg",
    top: "3359px", left: "-114px", width: "1929px",
    rotate: "232deg", zIndex: 4,
  },
  {
    id: "bg2",
    type: "image", src: "/images/bg2.png",
    top: "1269px", left: "-155px", width: "704px",
    rotate: "-20deg", zIndex: 3,
  },
  {
    id: "purple bg",
    type: "image", src: "/images/purple bg.png",
    top: "1866px", left: "75px", width: "494px",
    rotate: "-118deg", zIndex: 3,
  },
  {
    id: "uno",
    type: "image", src: "/images/uno.png",
    top: "1109px", left: "658px", width: "91px",
    rotate: "-14deg", zIndex: 20,  hover: { scale: 1.1, translateX: 4, translateY: -4, rotate: -4 },
  },
  {
    id: "sqare man tex",
    type: "image", src: "/images/sqare man tex.png",
    top: "1330px", left: "644px", width: "161px",
    rotate: "11deg", zIndex: 20,
  },
  {
    id: "yellow tex",
    type: "image", src: "/images/yellow tex.jpg",
    top: "1131px", left: "303px", width: "445px",
    rotate: "-617deg", zIndex: 3,
  },
  {
    id: "greenhole",
    type: "image", src: "/images/greenhole.jpg",
    top: "1501px", left: "1052px", width: "439px",
    rotate: "-6deg", zIndex: 3,
  },
  {
    id: "error window tex",
    type: "image", src: "/images/error window tex.png",
    top: "1164px", left: "224px", width: "374px",
    rotate: "-8deg", zIndex: 20,
  },
  {
    id: "x window",
    type: "image", src: "/images/x window.jpg",
    top: "1304px", left: "911px", width: "235px",
    rotate: "-11deg", zIndex: 21,
  },
  {
    id: "clip",
    type: "image", src: "/images/clip.gif",
    top: "1247px", left: "930px", width: "153px",
    rotate: "-10deg", zIndex: 22,
  },
  {
    id: "popup",
    type: "image", src: "/images/popup.png",
    top: "1148px", left: "1218px", width: "128px",
    rotate: "0deg", zIndex: 22,
  },
  {
    id: "file",
    type: "image", src: "/images/file.png",
    top: "1023px", left: "1369px", width: "143px",
    rotate: "11deg", zIndex: 22, hover: { scale: 1.1, translateX: -10, translateY: -12, rotate: 3 },
  },
  {
    id: "fish tex",
    type: "image", src: "/images/fish tex.png",
    top: "1674px", left: "866px", width: "161px",
    rotate: "0deg", zIndex: 40,
  },
  {
    id: "bubble",
    type: "image", src: "/images/nirvxxa/bubble.png",
    top: "1637px", left: "811px", width: "101px",
    rotate: "-12deg", zIndex: 43,
  },
  {
    id: "bubble 2",
    type: "image", src: "/images/nirvxxa/bubble 2.png",
    top: "1761px", left: "991px", width: "81px",
    rotate: "-12deg", zIndex: 43,
  },
  {
    id: "ice cream tex",
    type: "image", src: "/images/ice cream tex.png",
    top: "1634px", left: "746px", width: "65px",
    rotate: "-24deg", zIndex: 32,
  },
  {
    id: "watermelon cat",
    type: "image", src: "/images/watermelon cat.png",
    top: "1442px", left: "15px", width: "116px",
    rotate: "-11deg", zIndex: 23,
  },
  {
    id: "rabbit cat",
    type: "image", src: "/images/rabbit cat.png",
    top: "1211px", left: "547px", width: "129px",
    rotate: "10deg", zIndex: 24,
  },
  {
    id: "monkey surprise tex",
    type: "image", src: "/images/monkey surprise tex.png",
    top: "1696px", left: "219px", width: "111px",
    rotate: "17deg", zIndex: 23,
  },
  {
    id: "drag",
    type: "image", src: "/images/drag.png",
    top: "1553px", left: "351px", width: "177px",
    rotate: "-1deg", zIndex: 23,
  },
  {
    id: "wall",
    type: "image", src: "/images/wall.jpg",
    top: "1099px", left: "731px", width: "692px",
    rotate: "-10deg", zIndex: 4,
  },
  {
    id: "toon eye",
    type: "image", src: "/images/toon eye.png",
    top: "1102px", left: "927px", width: "156px",
    rotate: "2deg", zIndex: 30,  hover: { scale: 1.25, translateY: -10 },
  },
  {
    id: "sweet mice",
    type: "image", src: "/images/sweet mice.png",
    top: "1192px", left: "750px", width: "160px",
    rotate: "-23deg", zIndex: 30,
  },
  {
    id: "octopus tex",
    type: "image", src: "/images/octopus tex.png",
    top: "1466px", left: "853px", width: "242px",
    rotate: "-20deg", zIndex: 36,
  },
  {
    id: "troll tex",
    type: "image", src: "/images/troll tex.png",
    top: "1895px", left: "222px", width: "228px",
    rotate: "-8deg", zIndex: 36,
  },
  {
    id: "troll2 tex",
    type: "image", src: "/images/troll2 tex.png",
    top: "1827px", left: "43px", width: "298px",
    rotate: "-11deg", zIndex: 36,
  },
  {
    id: "sharp shark tex",
    type: "image", src: "/images/sharp shark tex.png",
    top: "1996px", left: "-61px", width: "368px",
    rotate: "20deg", zIndex: 36,
  },
  {
    id: "water",
    type: "image", src: "/images/water.png",
    top: "2050px", left: "-56px", width: "469px",
    rotate: "-168deg", zIndex: 25,
  },
  {
    id: "underwater",
    type: "image", src: "/images/underwater.png",
    top: "2062px", left: "110px", width: "301px",
    rotate: "0deg", zIndex: 24,
  },
  {
    id: "0-3 icon",
    type: "image", src: "/images/0-3 icon.png",
    top: "2250px", left: "30px", width: "153px",
    rotate: "-11deg", zIndex: 36,
  },
  {
    id: "nimo",
    type: "image", src: "/images/nimo.png",
    top: "2441px", left: "4px", width: "98px",
    rotate: "0deg", zIndex: 36,
  },
  {
    id: "eye robot tex",
    type: "image", src: "/images/eye robot tex.png",
    top: "2419px", left: "113px", width: "200px",
    rotate: "-12deg", zIndex: 36,
  },
  {
    id: "smile fish tex",
    type: "image", src: "/images/smile fish tex.png",
    top: "2199px", left: "268px", width: "216px",
    rotate: "-9deg", zIndex: 36,
  },
  {
    id: "suzo tex",
    type: "image", src: "/images/suzo tex.png",
    top: "1831px", left: "856px", width: "607px",
    rotate: "0deg", zIndex: 40,
  },
  {
    id: "sup shark tex",
    type: "image", src: "/images/sup shark tex.png",
    top: "1818px", left: "986px", width: "278px",
    rotate: "-7deg", zIndex: 41,
  },
  {
    id: "monkey sleep",
    type: "image", src: "/images/monkey sleep.png",
    top: "2071px", left: "1214px", width: "252px",
    rotate: "-17deg", zIndex: 41,
  },
  {
    id: "kinopio tex",
    type: "image", src: "/images/kinopio tex.png",
    top: "2226px", left: "1027px", width: "154px",
    rotate: "0deg", zIndex: 41, hover: { scale: 1.1, translateX: 0, translateY: -10, rotate: 1.5 },
  },
  {
    id: "pigeon tex",
    type: "image", src: "/images/pigeon tex.png",
    top: "2333px", left: "1248px", width: "210px",
    rotate: "8deg", zIndex: 41,
  },
  {
    id: "gom tex",
    type: "image", src: "/images/gom tex.png",
    top: "2020px", left: "523px", width: "247px",
    rotate: "-6deg", zIndex: 41,  hover: { scale: 1.1, translateX: -4, translateY: 4, rotate: -4 },
    clickSound: "/sounds/barking.mp3",
  },
  {
    id: "mouse cursor",
    type: "image", src: "/images/mouse cursor.jpg",
    top: "2200px", left: "461px", width: "160px",
    rotate: "0deg", zIndex: 41, hover: { scale: 1.2 },
  },
  {
    id: "music bar with green bg",
    type: "image", src: "/images/music bar with green bg.jpg",
    top: "2100px", left: "401px", width: "418px",
    rotate: "0deg", zIndex: 26,
  },
  {
    id: "lego head tex",
    type: "image", src: "/images/lego head tex.png",
    top: "2100px", left: "621px", width: "560px",
    rotate: "0deg", zIndex: 27,
  },
  {
    id: "mac window",
    type: "image", src: "/images/mac window.png",
    top: "2104px", left: "992px", width: "559px",
    rotate: "0deg", zIndex: 26,
  },
  {
    id: "hurt wall",
    type: "image", src: "/images/hurt wall.jpg",
    top: "2329px", left: "1037px", width: "338px",
    rotate: "88deg", zIndex: 25,
  },
  {
    id: "comedian",
    type: "image", src: "/images/comedian.png",
    top: "2256px", left: "1112px", width: "241px",
    rotate: "-7deg", zIndex: 27,
  },
  {
    id: "wizard tex",
    type: "image", src: "/images/wizard tex.png",
    top: "1271px", left: "146px", width: "321px",
    rotate: "4deg", zIndex: 36,
  },
  {
    id: "potan tex",
    type: "image", src: "/images/potan tex.png",
    top: "2702px", left: "841px", width: "159px",
    rotate: "10deg", zIndex: 36,
  },
  {
    id: "alien doodle",
    type: "image", src: "/images/alien doodle.png",
    top: "1549px", left: "557px", width: "142px",
    rotate: "-7deg", zIndex: 36,
  },
  {
    id: "alien doodle tex",
    type: "image", src: "/images/alien doodle tex.png",
    top: "1553px", left: "545px", width: "147px",
    rotate: "-7deg", zIndex: 35,
  },
  {
    id: "sans",
    type: "image", src: "/images/sans.png",
    top: "1712px", left: "18px", width: "110px",
    rotate: "-13deg", zIndex: 36, hover: { scale: 1.1, translateX: 10, translateY: -15, rotate: 4 },
  },
  {
    id: "green lego",
    type: "image", src: "/images/green lego.png",
    top: "1754px", left: "360px", width: "377px",
    rotate: "0deg", zIndex: 22,
  },
  {
    id: "eye side",
    type: "image", src: "/images/eye side.jpg",
    top: "6934px", left: "794px", width: "474px",
    rotate: "-6deg", zIndex: 22,
  },
  {
    id: "eye",
    type: "image", src: "/images/eye.jpg",
    top: "6947px", left: "197px", width: "477px",
    rotate: "5deg", zIndex: 22,
  },
  {
    id: "wizard window tex",
    type: "image", src: "/images/wizard window tex.jpg",
    top: "1701px", left: "344px", width: "397px",
    rotate: "9deg", zIndex: 24,
  },
  {
    id: "foxxy window",
    type: "image", src: "/images/foxxy window.png",
    top: "1671px", left: "381px", width: "389px",
    rotate: "9deg", zIndex: 25,
  },
  {
    id: "backroom",
    type: "image", src: "/images/backroom.jpg",
    top: "1723px", left: "669px", width: "439px",
    rotate: "7deg", zIndex: 2,
  },
  {
    id: "white cat",
    type: "image", src: "/images/white cat.png",
    top: "1562px", left: "122px", width: "131px",
    rotate: "15deg", zIndex: 36,
  },
  {
    id: "alien",
    type: "image", src: "/images/alien.png",
    top: "1763px", left: "1228px", width: "198px",
    rotate: "-12deg", zIndex: 36,
  },
  {
    id: "scary smile tex",
    type: "image", src: "/images/scary smile tex.png",
    top: "1855px", left: "658px", width: "322px",
    rotate: "16deg", zIndex: 50,
  },
  {
    id: "nature bg",
    type: "image", src: "/images/nature bg.jpg",
    top: "1517px", left: "489px", width: "266px",
    rotate: "-163deg", zIndex: 3,
  },
  {
    id: "sky check",
    type: "image", src: "/images/sky check.jpg",
    top: "597px", left: "0px", width: "720px",
    rotate: "360deg", zIndex: 5,
  },
  {
    id: "purple check",
    type: "image", src: "/images/purple check.jpg",
    top: "411px", left: "903px", width: "801px",
    rotate: "3deg", zIndex: 6,
  },
  {
    id: "paper lego bg",
    type: "image", src: "/images/paper lego bg.png",
    top: "784px", left: "351px", width: "643px",
    rotate: "164deg", zIndex: 7,
  },
  {
    id: "paper lego bg3",
    type: "image", src: "/images/paper lego bg3.png",
    top: "1267px", left: "-266px", width: "511px",
    rotate: "-103deg", zIndex: 3,
  },
  {
    id: "blue lego",
    type: "image", src: "/images/blue lego.png",
    top: "1318px", left: "-189px", width: "377px",
    rotate: "64deg", zIndex: 4,
  },
  {
    id: "do not enter",
    type: "image", src: "/images/do not enter.png",
    top: "4624px", left: "199px", width: "1044px", height: "64.5px",
    rotate: "0deg", zIndex: 7,
  },
  {
    id: "orange lego",
    type: "image", src: "/images/orange lego.png",
    top: "779px", left: "414px", width: "517px",
    rotate: "318deg", zIndex: 8,
  },
  {
    id: "test white bg",
    type: "image", src: "/images/test white bg.jpg",
    top: "366px", left: "501px", width: "889px",
    rotate: "-105deg", zIndex: 9,
  },
  {
    id: "paper lego bg2",
    type: "image", src: "/images/paper lego bg.png",
    top: "105px", left: "-205px", width: "810px",
    rotate: "0deg", zIndex: 10,
  },
  {
    id: "lego 1",
    type: "image", src: "/images/lego 1.png",
    top: "131px", left: "0px", width: "568px",
    rotate: "0deg", zIndex: 11,
  },
  {
    id: "lego2",
    type: "image", src: "/images/lego2.png",
    top: "726px", left: "858px", width: "643px",
    rotate: "0deg", zIndex: 12,
  },
  {
    id: "windows-xp",
    type: "image", src: "/images/windows-xp.jpeg",
    top: "603px", left: "696px", width: "353px",
    rotate: "-159deg", zIndex: 13,
  },
  {
    id: "Gemini_Generated_Image_5lp6pn5lp6pn5lp6",
    type: "image", src: "/images/Gemini_Generated_Image_5lp6pn5lp6pn5lp6.png",
    top: "768px", left: "715px", width: "550px",
    rotate: "5deg", zIndex: 14,
  },
  {
    id: "message",
    type: "image", src: "/images/message.png",
    top: "98px", left: "597px", width: "271px",
    rotate: "-3deg", zIndex: 15,
  },
  {
    id: "half",
    type: "image", src: "/images/half.png",
    top: "418px", left: "1245px", width: "186px",
    rotate: "-19deg", zIndex: 16,
  },
  {
    id: "cd",
    type: "image", src: "/images/cd.png",
    top: "176px", left: "1333px", width: "144px",
    rotate: "5deg", zIndex: 17,
  },
  {
    id: "constructing",
    type: "image", src: "/images/constructing.png",
    top: "4199px", left: "973px", width: "413px",
    rotate: "0deg", zIndex: 18,
  },
  {
    id: "cant come in",
    type: "image", src: "/images/cant come in.png",
    top: "3928px", left: "545px", width: "351px",
    rotate: "0deg", zIndex: 18,
  },
  {
    id: "sry pan",
    type: "image", src: "/images/sry pan.png",
    top: "4159px", left: "173px", width: "387px",
    rotate: "-2deg", zIndex: 18,
  },
  {
    id: "const board",
    type: "image", src: "/images/const board.png",
    top: "4015px", left: "125px", width: "229px",
    rotate: "-7deg", zIndex: 19,
  },
  {
    id: "con man",
    type: "image", src: "/images/con man.png",
    top: "4348px", left: "855px", width: "277px",
    rotate: "0deg", zIndex: 20,
  },
  {
    id: "con1",
    type: "image", src: "/images/con1.png",
    top: "4508px", left: "1254px", width: "144px",
    rotate: "0deg", zIndex: 19,
  },
  {
    id: "con2",
    type: "image", src: "/images/con2.png",
    top: "4508px", left: "29px", width: "144px",
    rotate: "0deg", zIndex: 20,
  },
  {
    id: "staff only",
    type: "image", src: "/images/staff only.png",
    top: "8036px", left: "588px", width: "264px",
    rotate: "0deg", zIndex: 20,
  },
  {
    id: "door",
    type: "image", src: "/images/door.jpg",
    top: "8301px", left: "550px", width: "341px",
    rotate: "0deg", zIndex: 20,
  },
  {
    id: "cactus",
    type: "video", src: "/images/cactus.mp4",
    top: "99px", left: "1050px", width: "191px",
    rotate: "-5deg", zIndex: 21,
  },
  {
    id: "panel tex",
    type: "image", src: "/images/panel tex.png",
    top: "79px", left: "922px", width: "168px",
    rotate: "1deg", zIndex: 22,
  },
  {
    id: "money texture",
    type: "image", src: "/images/money texture.png",
    top: "129px", left: "76px", width: "77px",
    rotate: "33deg", zIndex: 23,
  },
  {
    id: "receipt machine",
    type: "image", src: "/images/receipt machine.png",
    top: "719px", left: "23px", width: "255px",
    rotate: "-16deg", zIndex: 17,
  },
  {
    id: "computer",
    type: "image", src: "/images/computer.png",
    top: "544px", left: "41px", width: "208px",
    rotate: "0deg", zIndex: 25,
  },
  {
    id: "hey...error",
    type: "video", src: "/images/hey...error.mp4",
    top: "966px", left: "421px", width: "187px",
    rotate: "-1deg", zIndex: 26,
  },
  {
    id: "condom tex",
    type: "image", src: "/images/condom tex.png",
    top: "300px", left: "690px", width: "168px",
    rotate: "0deg", zIndex: 27,
  },
  {
    id: "evangarion effect",
    type: "image", src: "/images/evangarion effect.png",
    top: "535px", left: "226px", width: "260px",
    rotate: "161deg", zIndex: 28,
  },
  {
    id: "back",
    type: "image", src: "/images/back.png",
    top: "266px", left: "926px", width: "369px",
    rotate: "-5deg", zIndex: 29,
  },
  {
    id: "doodle loafing",
    type: "image", src: "/images/doodle loafing.png",
    top: "381px", left: "1001px", width: "205px",
    rotate: "0deg", zIndex: 30,
  },
  {
    id: "right video error",
    type: "image", src: "/images/right video error.png",
    top: "228px", left: "864px", width: "449px",
    rotate: "2deg", zIndex: 31,
  },
  {
    id: "drawbox",
    type: "image", src: "/images/drawbox.png",
    top: "247px", left: "856px", width: "439px",
    rotate: "-4deg", zIndex: 32,
  },
  {
    id: "error foxxy",
    type: "video", src: "/images/error foxxy.mp4",
    top: "575px", left: "396px", width: "389px",
    rotate: "-11deg", zIndex: 33,
  },
  {
    id: "hammer",
    type: "image", src: "/images/hammer.png",
    top: "160px", left: "1140px", width: "128px",
    rotate: "-12deg", zIndex: 34,
    hover: { scale: 1.1, translateX: 12, translateY: -30, rotate: 16 },
  },
  {
    id: "mice",
    type: "image", src: "/images/mice.png",
    top: "321px", left: "1245px", width: "144px",
    rotate: "19deg", zIndex: 35,
  },
  {
    id: "retro tv tex",
    type: "image", src: "/images/retro tv tex.png",
    top: "1429px", left: "1048px", width: "349px",
    rotate: "13deg", zIndex: 35,
  },
  {
    id: "worst day back",
    type: "image", src: "/images/worst day back.png",
    top: "1453px", left: "1084px", width: "283px",
    rotate: "13deg", zIndex: 34,
  },
  {
    id: "a worst day doodle",
    type: "image", src: "/images/a worst day doodle.png",
    top: "1483px", left: "1154px", width: "168px",
    rotate: "16deg", zIndex: 35,
  },
  {
    id: "smile_tex",
    type: "image", src: "/images/smile_tex.png",
    top: "1291px", left: "39px", width: "102px",
    rotate: "-10deg", zIndex: 36,
  },
  {
    id: "dog",
    type: "image", src: "/images/dog.png",
    top: "568px", left: "1321px", width: "123px",
    rotate: "-16deg", zIndex: 37,
  },
  {
    id: "star tex",
    type: "image", src: "/images/star tex.png",
    top: "291px", left: "554px", width: "136px",
    rotate: "0deg", zIndex: 38,
  },
  {
    id: "heart",
    type: "image", src: "/images/heart.gif",
    top: "338px", left: "720px", width: "106px",
    rotate: "17deg", zIndex: 39,
  },
  {
    id: "tooth tex",
    type: "image", src: "/images/tooth tex.png",
    top: "932px", left: "212px", width: "171px",
    rotate: "-7deg", zIndex: 18,
  },
  {
    id: "box_tex",
    type: "image", src: "/images/box_tex.png",
    top: "650px", left: "792px", width: "134px",
    rotate: "5deg", zIndex: 41,
    hover: { scale: 1.1, translateX: 0, translateY: -22, rotate: 3 },
  },
  {
    id: "video",
    type: "video", src: "/images/video.mp4",
    top: "265px", left: "178px", width: "395px",
    rotate: "4deg", zIndex: 42,
  },
  {
    id: "music box",
    type: "image", src: "/images/music box.png",
    top: "195px", left: "169px", width: "413px",
    rotate: "4deg", zIndex: 43,
  },
  {
    id: "music box filter ver2",
    type: "image", src: "/images/music box filter ver2.png",
    top: "189px", left: "179px", width: "399px",
    rotate: "-7deg", zIndex: 44,
  },
  {
    id: "music box filter",
    type: "image", src: "/images/music box filter.png",
    top: "202px", left: "164px", width: "406px",
    rotate: "9deg", zIndex: 45,
  },
  {
    id: "clock tex",
    type: "image", src: "/images/clock tex.png",
    top: "753px", left: "1355px", width: "107px",
    rotate: "18deg", zIndex: 46,
  },
  {
    id: "I'm not a robot",
    type: "image", 
    src: "/images/I'm not a robot.png",
    top: "290px", 
    left: "32px", 
    width: "171px",
    rotate: "-11deg", 
    zIndex: 47,
    hover: { scale: 1.1 },
    isCheckbox: true,
    
    // 1️⃣ 기존에 작동하던 "배경이 어두워지는 오버레이 모달창" (복구 완료)
    checkedOverlays: [
      { id: "robot-success-1", src: "/images/u r not robot.png", width: 758, height: 246, top: "351px", left: "550px" },
    ],
    uncheckedOverlays: [
      { id: "robot-fail-1", src: "/images/really.png", width: 758, height: 246, top: "351px", left: "550px" },
    ],
    
    // 2️⃣ "캔버스 위 체크박스 네모 칸 안"에만 쏙 들어가는 초록색 체크 마크 (새로 분리)
    inlineCheck: {
      src: "/images/check.png",
      width: 55,       
      top: "304px",    // 👈 네모 칸 안에 안 맞으면 이 수치를 위아래로 조절하세요.
      left: "46px",    // 👈 네모 칸 안에 안 맞으면 이 수치를 좌우로 조절하세요.
    }
  },
  {
    id: "doggy",
    type: "image", src: "/images/doggy.png",
    top: "384px", left: "6px", width: "204px",
    rotate: "-11deg", zIndex: 48,
    hover: { scale: 1.1, translateX: 4, translateY: -4, rotate: 4 },
    clickSound: "/sounds/barking.mp3",
  },
  {
    id: "loading message tex",
    type: "image", src: "/images/loading message tex.png",
    top: "726px", left: "202px", width: "262px",
    rotate: "0deg", zIndex: 49,
  },
  {
    id: "key tex",
    type: "image", src: "/images/key tex.png",
    top: "563px", left: "240px", width: "162px",
    rotate: "22deg", zIndex: 50,
  },
  {
    id: "medicine",
    type: "image", src: "/images/medicine.png",
    top: "1016px", left: "760px", width: "219px",
    rotate: "17deg", zIndex: 51,
  },
  {
    id: "sims",
    type: "image", src: "/images/sims.png",
    top: "495px", left: "1349px", width: "32px",
    rotate: "-3deg", zIndex: 52,
  },
  {
    id: "slica-gle tex",
    type: "image", src: "/images/slica-gle tex.png",
    top: "917px", left: "622px", width: "136px",
    rotate: "15deg", zIndex: 53,
    hover: { scale: 1.08, translateX: 0, translateY: -3, rotate: 5 },
  },
  {
    id: "balloon dog tex",
    type: "image", src: "/images/balloon dog tex.png",
    top: "811px", left: "810px", width: "144px",
    rotate: "15deg", zIndex: 54,
  },
  {
    id: "bucks",
    type: "image", src: "/images/bucks.png",
    top: "585px", left: "1095px", width: "179px",
    rotate: "11deg", zIndex: 55,
  },
  {
    id: "1118 foXXy logo less",
    type: "image", src: "/images/1118 foXXy logo less.png",
    top: "379px", left: "407px", width: "646px",
    rotate: "-7deg", zIndex: 56,
  },
  {
    id: "blender layout",
    type: "video", src: "/images/blender layout.mp4",
    top: "706px", left: "978px", width: "272px",
    rotate: "6deg", zIndex: 57,
  },
  {
    id: "tv_filter",
    type: "image", src: "/images/tv_filter.png",
    top: "613px", left: "960px", width: "372px",
    rotate: "5deg", zIndex: 58,
  },
  {
    id: "banana",
    type: "image", src: "/images/banana.png",
    top: "950px", left: "1083px", width: "223px",
    rotate: "4deg", zIndex: 59,
  },
];




// ══════════════════════════════════════════════════════════════════════
// CanvasItemRenderer 컴포넌트
// ══════════════════════════════════════════════════════════════════════
interface CanvasItemRendererProps {
  item: CanvasItem;
  onOverlays: (overlays: OverlayConfig[]) => void;
  onDoorClick?: () => void;
  onFileClick?: (pos: { x: number; y: number }) => void;
  isChecked: boolean;
  onCheckboxToggle: (id: string) => void;
}

function CanvasItemRenderer({ item, onOverlays, onDoorClick, onFileClick, isChecked, onCheckboxToggle }: CanvasItemRendererProps) {
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const style: React.CSSProperties = {
    position: "absolute",
    top: item.top,
    left: item.left,
    width: item.width,
    height: item.height || "auto",
    zIndex: item.zIndex || 2,
    cursor: (item.clickSound || item.clickOverlay || item.isCheckbox || item.id === "door" || item.id === "file") ? "pointer" : "default",
    transition: "transform 0.2s ease, scale 0.2s ease",
  };

  if (isHovered && item.hover) {
    const { scale, translateX, translateY, rotate } = item.hover;
    let transformStr = item.rotate ? `rotate(${item.rotate})` : "";
    if (translateX || translateY) transformStr += ` translate(${translateX || 0}px, ${translateY || 0}px)`;
    if (rotate) transformStr += ` rotate(${rotate}deg)`;
    
    style.transform = transformStr || undefined;
    if (scale) style.scale = String(scale);
  } else if (item.rotate) {
    style.transform = `rotate(${item.rotate})`;
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (item.clickSound) {
      if (!audioRef.current) audioRef.current = new Audio(item.clickSound);
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    if (item.id === "door" && onDoorClick) {
      onDoorClick();
      return;
    }

    if (item.id === "file" && onFileClick) {
      const rect = e.currentTarget.getBoundingClientRect();
      onFileClick({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }

    if (item.isCheckbox) {
      const nextChecked = !isChecked;
      onCheckboxToggle(item.id);
      if (nextChecked && item.checkedOverlays) onOverlays(item.checkedOverlays);
      if (!nextChecked && item.uncheckedOverlays) onOverlays(item.uncheckedOverlays);
    } else if (item.clickOverlay) {
      onOverlays([item.clickOverlay]);
    }
  };

  return (
    <div
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {item.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt={item.id} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <video src={item.src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 1440px 벽 바운스 앱 아이콘 물리 엔진
// ══════════════════════════════════════════════════════════════════════
interface FallingIconData {
  id: number;
  src: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  el: HTMLImageElement | null;
}

let globalIconId = 0;

// ✨ [수정됨] scale prop을 받아 모바일 화면 크기에 맞게 위치를 계산합니다.
function FallingAppsRenderer({ spawns, scale }: { spawns: { id: number; x: number; y: number }[], scale: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<FallingIconData[]>([]);

  useEffect(() => {
    if (spawns.length === 0) return;
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const latest = spawns[spawns.length - 1];
    const count = Math.floor(Math.random() * 4) + 3; 
    
    const shuffledIcons = [...APP_ICONS].sort(() => 0.5 - Math.random());
    const selectedIcons = shuffledIcons.slice(0, count);
    
    for (let i = 0; i < count; i++) {
      iconsRef.current.push({
        id: globalIconId++,
        src: selectedIcons[i],
        // 스케일된 화면 좌표를 원래 1440px 캔버스 좌표로 역계산합니다.
        x: (latest.x - rect.left) / scale,
        y: (latest.y - rect.top) / scale,
        vx: (Math.random() - 0.5) * 22, 
        vy: -(Math.random() * 16 + 12), 
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 15,
        el: null,
      });
    }
  }, [spawns, scale]);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      const container = containerRef.current;
      if (!container) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const alive: FallingIconData[] = [];
      for (const icon of iconsRef.current) {
        icon.vy += 0.8;
        icon.x += icon.vx;
        icon.y += icon.vy;
        icon.rotation += icon.vRot;

        if (icon.x < 32) {
          icon.x = 32;
          icon.vx *= -0.7; 
        } else if (icon.x > 1440 - 32) {
          icon.x = 1440 - 32;
          icon.vx *= -0.7;
        }

        if (!icon.el) {
          const img = document.createElement("img");
          img.src = icon.src;
          img.style.position = "absolute";
          img.style.width = "64px";  
          img.style.height = "64px";
          img.style.left = "-32px";  
          img.style.top = "-32px";
          img.style.pointerEvents = "none";
          img.style.zIndex = "30000";
          img.style.willChange = "transform";
          container.appendChild(img);
          icon.el = img;
        }

        icon.el.style.transform = `translate(${icon.x}px, ${icon.y}px) rotate(${icon.rotation}deg)`;

        // 스케일을 고려하여 화면 밖으로 나갔는지 판단합니다.
        if (icon.y < (window.innerHeight / scale) + 150) {
          alive.push(icon);
        } else {
          if (icon.el && icon.el.parentNode) {
            icon.el.parentNode.removeChild(icon.el);
          }
        }
      }
      iconsRef.current = alive;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scale]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: "50%", 
        // 물리 엔진 컨테이너도 캔버스와 동일하게 스케일링 적용
        transform: `translateX(-50%) scale(${scale})`, 
        transformOrigin: "top center",
        width: "1440px", 
        height: "100%", 
        pointerEvents: "none", 
        zIndex: 30000, 
        overflow: "hidden" 
      }} 
    />
  );
}

let globalCoverDone = false;

// ══════════════════════════════════════════════════════════════════════
// 메인 Page 컴포넌트
// ══════════════════════════════════════════════════════════════════════
export default function Page() {
  const [activeOverlays, setActiveOverlays] = useState<OverlayConfig[]>([]);
  const [showXpModal, setShowXpModal] = useState(false);
  const [coverDone, setCoverDone] = useState(() => globalCoverDone);
  const [appSpawns, setAppSpawns] = useState<{ id: number; x: number; y: number }[]>([]);
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});

  // ✨ 현재 화면 크기에 따른 스케일 비율 값 불러오기
  const scale = useCanvasScale(1440);
  const CANVAS_HEIGHT = 9048;

  const handleCoverDone = useCallback(() => {
    globalCoverDone = true; 
    setCoverDone(true);
  }, []);

  const handleForcedClose = () => {
    window.open('', '_self', '');
    window.close();
    setTimeout(() => {
      window.location.replace("about:blank");
    }, 100);
  };

  const handleFileClick = useCallback((pos: { x: number; y: number }) => {
    setAppSpawns(prev => [...prev, { id: Date.now(), x: pos.x, y: pos.y }]);
  }, []);

  const handleCheckboxToggle = useCallback((id: string) => {
    setCheckedStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  return (
    <main style={{
      backgroundColor: "#000000", width: "100%", minHeight: "100vh",
      display: "flex", justifyContent: "center", position: "relative",
    }}>
      {/* ── ✨ [반응형 핵심 래퍼] 화면 크기에 맞춰 전체 캔버스 높이/너비를 동적으로 잡아줍니다 ── */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "1440px",
        height: `${CANVAS_HEIGHT * scale}px`, // 스케일 비율만큼 전체 페이지 길이도 자동 축소
        margin: "0 auto",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        
        {/* ── 1440px 원본 사이즈 캔버스를 css scale을 통해 스크린 사이즈에 맞게 통째로 축소 ── */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1440px",
          height: `${CANVAS_HEIGHT}px`,
          transform: `scale(${scale})`, // 계산된 스케일 비율 적용
          transformOrigin: "top left",  // 상단 좌측을 기준으로 줄어듦
        }}>
          {CANVAS_ITEMS.map((item) => (
            <CanvasItemRenderer
              key={item.id}
              item={item}
              onOverlays={setActiveOverlays}
              onDoorClick={() => setShowXpModal(true)}
              onFileClick={handleFileClick} 
              isChecked={!!checkedStates[item.id]}
              onCheckboxToggle={handleCheckboxToggle}
            />
          ))}

          {/* ── 캔버스 위에 독립적으로 그려지는 초록색 체크 마크 ── */}
          {CANVAS_ITEMS.map((item) => {
            if (item.isCheckbox && checkedStates[item.id] && item.inlineCheck) {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`inline-check-${item.id}`}
                  src={item.inlineCheck.src}
                  alt="check"
                  style={{
                    position: "absolute",
                    top: item.inlineCheck.top,
                    left: item.inlineCheck.left,
                    width: `${item.inlineCheck.width}px`,
                    zIndex: (item.zIndex || 47) + 1,
                    pointerEvents: "none"
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* ── 앱 아이콘 쏟아지기 물리 엔진 렌더러 ───────────────────────── */}
      <FallingAppsRenderer spawns={appSpawns} scale={scale} />

      {/* ── 팝업 모달창 (배경 어두워짐) ────────────────────────── */}
      {activeOverlays.map((overlay) => (
        <OverlayModal
          key={overlay.id}
          imageSrc={overlay.src}
          imageW={overlay.width}
          imageH={overlay.height}
          top={overlay.top}
          left={overlay.left}
          onClose={() => setActiveOverlays([])}
        />
      ))}

      {/* ── 구식 Windows XP 스타일의 각진 메세지창 UI ───────────────── */}
      {showXpModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "transparent", zIndex: 20000, display: "flex",
          justifyContent: "center", alignItems: "center",
          fontFamily: "'Tahoma', 'Arial', sans-serif", userSelect: "none"
        }}>
          <div style={{ 
            backgroundColor: "#D4D0C8", 
            border: "2px solid",
            borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
            boxShadow: "1px 1px 0px 0px #000000",
            width: "360px",
            maxWidth: "90vw", // 모바일 대응
            padding: "2px"
          }}>
            <div style={{
              background: "linear-gradient(90deg, #0052E6, #9FBFFF)",
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "13px",
              padding: "3px 4px 4px 6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>Confirm</span>
              <button 
                onClick={() => setShowXpModal(false)}
                style={{
                  width: "16px", height: "14px",
                  backgroundColor: "#D4D0C8",
                  border: "1px solid",
                  borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                  color: "#000000",
                  fontSize: "9px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: 1
                }}
              >
                X
              </button>
            </div>

            <div style={{ 
              padding: "20px 15px", 
              display: "flex", 
              alignItems: "center", 
              gap: "15px" 
            }}>
              <div style={{
                width: "32px", height: "32px",
                borderRadius: "50%",
                backgroundColor: "#0052E6",
                color: "#FFFFFF",
                fontSize: "22px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "inset -1px -1px 2px #000"
              }}>
                ?
              </div>
              
              <p style={{ 
                color: "#000000", 
                fontSize: "12px", 
                margin: 0,
                lineHeight: "1.5",
                fontWeight: "500"
              }}>
                정말 들어가시겠습니까?
              </p>
            </div>

            <div style={{ 
              padding: "0px 10px 12px 10px", 
              display: "flex", 
              justifyContent: "center", 
              gap: "8px" 
            }}>
              <button 
                onClick={handleForcedClose}
                style={{ 
                  width: "75px",
                  height: "23px",
                  cursor: "pointer", 
                  backgroundColor: "#D4D0C8", 
                  color: "#000000", 
                  border: "1px solid",
                  borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                  outline: "1px solid #000000",
                  outlineOffset: "-2px",
                  fontSize: "12px",
                  fontWeight: "normal"
                }}
              >
                예
              </button>
              <button 
                onClick={() => setShowXpModal(false)}
                style={{ 
                  width: "75px",
                  height: "23px",
                  cursor: "pointer", 
                  backgroundColor: "#D4D0C8", 
                  color: "#000000", 
                  border: "1px solid",
                  borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                  fontSize: "12px",
                  fontWeight: "normal"
                }}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 시작 진입부 인트로 WebGL CoverPage ── */}
      {!coverDone && (
        <CoverPage 
          onDone={handleCoverDone} 
        />
      )}
    </main>
  );
}