"use client";
// ════════════════════════════════════════════════
// contexts/CartContext.tsx — 전역 장바구니 상태
// ════════════════════════════════════════════════
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  items:        CartItem[];
  isOpen:       boolean;
  addItem:      (product: Product) => void;
  removeItem:   (cartItemId: string) => void;
  updateQty:    (cartItemId: string, qty: number) => void;
  updateSize:   (cartItemId: string, size: string) => void; 
  clearCart:    () => void;
  openCart:     () => void;
  closeCart:    () => void;
  totalAmount:  number;
  totalCount:   number;
  getItemPrice: (product: Product, size: string) => number; // ✨ 가격 계산 함수 노출
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items,  setItems]  = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // ✨ 선택된 사이즈를 기준으로 최종 가격을 가져오는 함수
  const getItemPrice = useCallback((product: Product, size: string) => {
    if (product.sizePrices && size) {
      const found = product.sizePrices.find(sp => sp.size === size);
      if (found) return found.price;
    }
    return product.price; // 사이즈별 가격이 없으면 기본 가격 반환
  }, []);

  const addItem = useCallback((product: Product) => {
    setItems(prev => [
      ...prev,
      {
        cartItemId: Date.now().toString(), 
        product,
        quantity: 1,
        size: "", 
      }
    ]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  }, []);

  const updateQty = useCallback((cartItemId: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
    } else {
      setItems(prev =>
        prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: qty } : i)
      );
    }
  }, []);

  const updateSize = useCallback((cartItemId: string, size: string) => {
    setItems(prev =>
      prev.map(i => i.cartItemId === cartItemId ? { ...i, size } : i)
    );
  }, []);

  const clearCart   = useCallback(() => setItems([]), []);
  const openCart    = useCallback(() => setIsOpen(true), []);
  const closeCart   = useCallback(() => setIsOpen(false), []);

  // ✨ 총액 계산 시에도 옵션 가격 반영
  const totalAmount = items.reduce((s, i) => s + (i.size ? getItemPrice(i.product, i.size) * i.quantity : 0), 0);
  const totalCount  = items.reduce((s, i) => s + (i.size ? i.quantity : 0), 0);

  return (
    <CartContext.Provider value={{
      items, isOpen, addItem, removeItem, updateQty, updateSize,
      clearCart, openCart, closeCart, totalAmount, totalCount,
      getItemPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider 안에서 사용해야 합니다.");
  return ctx;
}