// ════════════════════════════════════════════════
// lib/config.ts — 사이트 설정값
// ✅ 계좌번호, 관리자 비밀번호 등 여기서 수정하세요
// ════════════════════════════════════════════════

// 무통장 입금 계좌 정보
export const BANK_INFO = {
  bank:    "카카오뱅크",      // ✅ 은행명
  account: "3333-01-1234567", // ✅ 계좌번호
  holder:  "홍길동",           // ✅ 예금주
};

// 관리자 로그인 비밀번호 (환경변수 우선, 없으면 이 값 사용)
export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? "admin1234"; // ✅ 반드시 변경하세요

// 배송비 (0이면 무료)
export const SHIPPING_FEE = 0;

// 사이트 이름
export const SITE_NAME = "foXXy Shop";
