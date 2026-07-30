// ════════════════════════════════════════════════
// lib/products.ts — 상품 데이터
// ════════════════════════════════════════════════
import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  { 
    id: 1,  
    name: "HeartBreak",  
    price: 38000, 
    image: "/images/heartbreak/real heartbreak.png",  
    description: "#1",
    // ✨ 1. 화면에 보여질 사이즈 옵션들
    sizes: ["S", "M", "L"], 
    // ✨ 2. 옵션별 실제 가격 설정 (여기에 없는 사이즈는 기본 price 적용)
    sizePrices: [
      { size: "S", price: 38000 },
      { size: "M", price: 129000 },
      { size: "L", price: 390000 }
    ]
  },
  { id: 2,  name: "Broke",  price: 38000, image: "/images/broke/Broke.png",  description: "#2", sizes: ["S", "M", "L"], 
     sizePrices: [
      { size: "S", price: 38000 },
      { size: "M", price: 129000 },
      { size: "L", price: 390000 }
    ]
   },
  { id: 3,  name: "Gloomy day",  price: 38000, image: "/images/gloomy day/gloomy day.png",  description: "#3", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 38000 },
     { size: "M", price: 129000 },
     { size: "L", price: 390000 }
   ] },
  { id: 4,  name: "NirvXXa",  price: 35000, image: "/images/nirvxxa/real_nirvxxa.png",  description: "#4", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 35000 },
     { size: "M", price: 126000 },
     { size: "L", price: 350000 }
   ] },
  { id: 5,  name: "Baby",  price: 38000, image: "/images/baby/real_baby.png",  description: "#5", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 38000 },
     { size: "M", price: 129000 },
     { size: "L", price: 390000 }
   ] },
   { id: 6,  name: "Half",  price: 38000, image: "/images/half/real_half.png",  description: "#6", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 38000 },
     { size: "M", price: 132000 },
     { size: "L", price: 420000 }
   ] },
   { id: 7,  name: "Let me out!",  price: 35000, image: "/images/let me out/real_let me out.png",  description: "#7", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 35000 },
     { size: "M", price: 126000 },
     { size: "L", price: 350000 }
   ] },
   { id: 8,  name: "zzzzz",  price: 35000, image: "/images/zzzzz/real_zzzzz.png",  description: "#8", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 35000 },
     { size: "M", price: 126000 },
     { size: "L", price: 350000 }
   ] },
   { id: 9,  name: "Boxbox",  price: 25000, image: "/images/boxbox/real_boxbox.png",  description: "#9", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 25000 },
     { size: "M", price: 115000 },
     { size: "L", price: 260000 }
   ] },
   { id: 10,  name: "Hey...",  price: 35000, image: "/images/hey/real_hey.png",  description: "#10", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 35000 },
     { size: "M", price: 126000 },
     { size: "L", price: 350000 }
   ] },
   { id: 11,  name: "Is this okay...?",  price: 38000, image: "/images/Is this okay/real_Is this okay.png",  description: "#11", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 38000 },
     { size: "M", price: 129000 },
     { size: "L", price: 390000 }
   ] },
   { id: 12,  name: "Running",  price: 35000, image: "/images/running/real_running.png",  description: "#12", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 35000 },
     { size: "M", price: 126000 },
     { size: "L", price: 350000 }
   ] },
   { id: 13,  name: "Paint!",  price: 74000, image: "/images/paint/real_paint.png",  description: "#13", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 76000 },
     { size: "M", price: 270000 },
     { size: "L", price: 900000 }
   ] },
   { id: 14,  name: "It's hot...",  price: 38000, image: "/images/Its hot/real_It's hot.png",  description: "#14", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 38000 },
     { size: "M", price: 129000 },
     { size: "L", price: 390000 }
   ] },
   { id: 15,  name: "FXXk",  price: 129000, image: "/images/fxxk/real_fxxk.png",  description: "#15", sizes: ["M", "L"], 
    sizePrices: [
     { size: "M", price: 129000 },
     { size: "L", price: 390000 }
   ] },
   { id: 16,  name: "Shh...",  price: 132000, image: "/images/shh/real_shh.png",  description: "#16", sizes: ["M", "L"], 
    sizePrices: [
     { size: "M", price: 132000 },
     { size: "L", price: 420000 }
   ] },
   { id: 17,  name: "Present for u",  price: 140000, image: "/images/present for u/real_present for u.png",  description: "#17", sizes: ["M", "L"], 
    sizePrices: [
     { size: "M", price: 140000 },
     { size: "L", price: 500000 }
   ] },
   { id: 18,  name: "I'm not Kaws!",  price: 129000, image: "/images/Im not kaws/real_I'm not kaws.png",  description: "#18", sizes: ["M", "L"], 
    sizePrices: [
     { size: "M", price: 129000 },
     { size: "L", price: 390000 }
   ] },
   { id: 19,  name: "Bup!",  price: 200000, image: "/images/bup/real_bup.png",  description: "#19", sizes: ["M", "L"], 
    sizePrices: [
     { size: "M", price: 200000 },
     { size: "L", price: 600000 }
   ] },
   { id: 20,  name: "SimpsXXs",  price: 129000, image: "/images/simpsxxs/real_simpsxxs.png",  description: "#20", sizes: ["M", "L"], 
    sizePrices: [
     { size: "M", price: 129000 },
     { size: "L", price: 390000 }
   ] },
   { id: 21,  name: "I hate burger",  price: 200000, image: "/images/I hate burger/real_I hate burger.png",  description: "#21", sizes: ["M", "L"], 
    sizePrices: [
     { size: "M", price: 200000 },
     { size: "L", price: 600000 }
   ] },
   { id: 22,  name: "Idle",  price: 350000, image: "/images/idle/real_idle.png",  description: "#22", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 35000 },
     { size: "M", price: 129000 },
     { size: "L", price: 350000 }
   ] },
   { id: 23,  name: "Loafing",  price: 350000, image: "/images/loafing/real_loafing.png",  description: "#23", sizes: ["S", "M", "L"], 
    sizePrices: [
     { size: "S", price: 35000 },
     { size: "M", price: 129000 },
     { size: "L", price: 350000 }
   ] },
   { id: 24,  name: "foXXydian",  price: 240000, image: "/images/foxxydian/real_foxxydian.png",  description: "#24", sizes: ["one size"], 
    sizePrices: [
     { size: "one size", price: 240000 },
   ] },
   { id: 25,  name: "melting",  price: 99000, image: "/images/melting/real_melting.png",  description: "#25", sizes: ["one size"], 
    sizePrices: [
     { size: "one size", price: 99000 },
   ] },
];

// ✨ [수정됨] 상품이 몇 개가 되든 4개씩 쪼개서 자동으로 줄(Row)을 만들어냅니다.
export const SLIDE_ROWS: Product[][] = [];
const CHUNK_SIZE = 4;

for (let i = 0; i < PRODUCTS.length; i += CHUNK_SIZE) {
  SLIDE_ROWS.push(PRODUCTS.slice(i, i + CHUNK_SIZE));
}