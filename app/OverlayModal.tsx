"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface OverlayModalProps {
  imageSrc: string;
  imageW: number;
  imageH: number;
  top?: string;
  left?: string;
  onClose: () => void;
}

export default function OverlayModal({
  imageSrc,
  imageW,
  imageH,
  top,
  left,
  onClose,
}: OverlayModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={onClose} // 이미지 포함 어디를 클릭해도 닫힘
    >
      <div
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={imageSrc}
          alt="Overlay Modal"
          style={{
            maxWidth: `${imageW}px`,
            width: "100%",
            height: "auto",
            maxHeight: "85vh",
            objectFit: "contain",
          }}
        />
      </div>
    </div>,
    document.body
  );
}