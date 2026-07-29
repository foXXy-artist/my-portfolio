// ════════════════════════════════════════════════
// types/index.ts — 전체 공통 타입 정의
// ════════════════════════════════════════════════

export interface Product {
  id: number;
  name: string;
  price: number;       // 기본 가격 (옵션 미선택 시)
  image: string;       
  description?: string;
  sizes?: string[];    
  sizePrices?: { size: string; price: number }[]; // ✨ 사이즈별 개별 가격 추가
}

export interface CartItem {
  cartItemId: string;  
  product: Product;
  quantity: number;
  size: string;        
}

export type OrderStatus = "입금대기" | "입금완료" | "배송중" | "배송완료" | "취소";

export interface OrderItem {
  productId: number;
  productName: string;
  price: number;       // ✨ 결제 당시 적용된 사이즈 가격 저장용
  quantity: number;
  size?: string;       
}

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  delivery_memo: string;
  order_password: string; 
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
}