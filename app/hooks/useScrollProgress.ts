// app/hooks/useScrollProgress.ts
"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0); // 0 ~ 1 사이 값

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(percent, 0), 1)); // 0~1 범위로 클램프
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기값 세팅
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress; // 0.0(최상단) ~ 1.0(최하단)
}
