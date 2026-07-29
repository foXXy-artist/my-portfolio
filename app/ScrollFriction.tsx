"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation"; // 💡 오직 메인에서만 작동하도록 경로 감지 훅 추가

const CONFIG = {
  TRIGGER_POINTS: [3850],
  LOCK_DURATION:  3500,
  MAX_TRIGGERS:   1,

  // 고무줄 설정
  RUBBER_MAX:    95,
  RETURN_SPEED:  0.7,

  // ══════════════════════════════════════════════════════════════════════
  // 💡 [커스텀 설정 영역] 오디오 경로와 에러 이미지 경로
  // ══════════════════════════════════════════════════════════════════════
  ERROR_SOUND_SRC: "/sounds/error sound.mp3", 
  ERROR_IMAGE_SRC: "/images/error popup.png", 
};

export default function ScrollFriction() {
  const pathname = usePathname(); // 💡 현재 주소 경로를 실시간 추적합니다.

  const triggeredCount = useRef(0);
  const isLocked       = useRef(false);
  const lockedAtY      = useRef(0);
  const firedPoints    = useRef<Set<number>>(new Set());

  const rubberOffset = useRef(0);
  const rafId        = useRef<number | null>(null);

  const [errors, setErrors] = useState<{id: number, top: string, left: string}[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CONFIG.ERROR_SOUND_SRC);
  }, []);

  useEffect(() => {
    // 💡 [핵심 차단 장치] 메인 주소('/')가 아닐 경우 에러를 전부 지우고 스크롤 이벤트를 원천 봉쇄합니다.
    if (pathname !== "/") {
      setErrors([]);
      return;
    }

    const { TRIGGER_POINTS, LOCK_DURATION, MAX_TRIGGERS,
            RUBBER_MAX, RETURN_SPEED } = CONFIG;

    let errorCounter = 0;
    let lastErrorTimestamp = 0;
    function triggerErrorAlert() {
      const now = Date.now();
      if (now - lastErrorTimestamp > 150) {
        lastErrorTimestamp = now;
        errorCounter++;

        // 1. 에러창들이 흩어질 수 있는 '전체 최대 범위' (화면을 꽉 채우게 1200x800 지정)
        const MAX_SPREAD_X = 1200; 
        const MAX_SPREAD_Y = 500;  

        // 2. 화면 중앙을 가리지 않기 위한 '안전 구역 (비워둘 공간)'
        const SAFE_ZONE_X = 200; 
        const SAFE_ZONE_Y = 200; 

        let randomOffsetX = Math.floor(Math.random() * MAX_SPREAD_X) - (MAX_SPREAD_X / 2); 
        let randomOffsetY = Math.floor(Math.random() * MAX_SPREAD_Y) - (MAX_SPREAD_Y / 2); 

        if (Math.abs(randomOffsetX) < SAFE_ZONE_X && Math.abs(randomOffsetY) < SAFE_ZONE_Y) {
          if (Math.random() < 0.5) {
            randomOffsetX = randomOffsetX >= 0 ? randomOffsetX + SAFE_ZONE_X : randomOffsetX - SAFE_ZONE_X;
          } else {
            randomOffsetY = randomOffsetY >= 0 ? randomOffsetY + SAFE_ZONE_Y : randomOffsetY - SAFE_ZONE_Y;
          }
        }

        const baseTop = isLocked.current ? lockedAtY.current : window.scrollY;

        setErrors(prev => [...prev, {
          id: errorCounter,
          top: `calc(${baseTop}px + 50vh + ${randomOffsetY}px)`,
          left: `calc(50vw + ${randomOffsetX}px)`
        }]);

        if (audioRef.current) {
          const audioClone = audioRef.current.cloneNode() as HTMLAudioElement;
          audioClone.play().catch(e => console.log("오디오 재생 실패:", e));
        }
      }
    }

    // ── 💡 원본 복구: 실제 스크롤을 찰지게 흔들며 복귀하는 고무줄 루프 ───────────────
    function startRubberLoop() {
      if (rafId.current !== null) return;
      const loop = () => {
        if (Math.abs(rubberOffset.current) < 0.1) {
          rubberOffset.current = 0;
          rafId.current = null;
          window.scrollTo({ top: lockedAtY.current, behavior: "instant" });
          return;
        }
        rubberOffset.current *= RETURN_SPEED;
        
        window.scrollTo({ top: lockedAtY.current - rubberOffset.current, behavior: "instant" });
        rafId.current = requestAnimationFrame(loop);
      };
      rafId.current = requestAnimationFrame(loop);
    }

    function stopRubberLoop() {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      rubberOffset.current = 0;
      window.scrollTo({ top: lockedAtY.current, behavior: "instant" });
    }

    // ── 원본 복구: 스크롤 잠금/해제 ──────────────────────────────────────────────
    function lockScroll(y: number) {
      isLocked.current = true;
      lockedAtY.current = y;
      window.scrollTo({ top: y, behavior: "instant" });
      startRubberLoop();
    }

    function unlockScroll() {
      isLocked.current = false;
      stopRubberLoop();
    }

    // ── 원본 복구: 잠금 상태일 때 고무줄 offset 누적 및 에러 트리거 ──────────
    function handleWheel(e: WheelEvent) {
      if (!isLocked.current) return;
      e.preventDefault(); 
      const delta = -e.deltaY * 0.4; 
      const next  = rubberOffset.current + delta;
      rubberOffset.current = Math.max(-RUBBER_MAX, Math.min(RUBBER_MAX, next));
      if (rafId.current === null) startRubberLoop();

      if (e.deltaY > 0) {
        triggerErrorAlert();
      }
    }

    let lastTouchY = 0;
    function handleTouchStart(e: TouchEvent) {
      if (!isLocked.current) return;
      lastTouchY = e.touches[0].clientY;
    }
    function handleTouchMove(e: TouchEvent) {
      if (!isLocked.current) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const delta = (currentY - lastTouchY) * 1.2;
      lastTouchY = currentY;
      const next  = rubberOffset.current + delta;
      rubberOffset.current = Math.max(-RUBBER_MAX, Math.min(RUBBER_MAX, next));
      if (rafId.current === null) startRubberLoop();

      if (delta < 0) {
        triggerErrorAlert();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (!isLocked.current) return;
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) {
        e.preventDefault();
        if (["ArrowDown", "PageDown", "End", " "].includes(e.key)) {
          triggerErrorAlert();
        }
      }
    }

    function handleScroll() {
      if (triggeredCount.current >= MAX_TRIGGERS) return;
      if (isLocked.current) return;

      const scrollY = window.scrollY;
      for (const point of TRIGGER_POINTS) {
        if (firedPoints.current.has(point)) continue;
        if (scrollY >= point) {
          firedPoints.current.add(point);
          triggeredCount.current += 1;
          
          triggerErrorAlert();

          lockScroll(point);
          setTimeout(() => unlockScroll(), LOCK_DURATION);
          break;
        }
      }
    }

    window.addEventListener("scroll",     handleScroll);
    window.addEventListener("wheel",      handleWheel,      { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true  });
    window.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    window.addEventListener("keydown",    handleKeyDown);

    return () => {
      window.removeEventListener("scroll",     handleScroll);
      window.removeEventListener("wheel",      handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove",  handleTouchMove);
      window.removeEventListener("keydown",    handleKeyDown);
      stopRubberLoop();
      setErrors([]); // 💡 다른 주소로 넘어가 이벤트가 해제될 때 팝업 초기화
    };
  }, [pathname]); // 💡 주소가 바뀔 때마다 완벽하게 감지하고 청소하도록 의존성 주입

  // 💡 메인 페이지가 아니거나 띄울 에러가 없다면 화면에 아무것도 렌더링하지 않음
  if (pathname !== "/" || errors.length === 0) return null;

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 900, pointerEvents: "none" }}>
      {errors.map((error) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          key={error.id}
          src={CONFIG.ERROR_IMAGE_SRC} 
          alt="Error Warning"
          style={{
            position: "absolute",
            top: error.top,
            left: error.left,
            transform: "translate(-50%, -50%)", 
            width: "250px", 
            height: "auto",
            cursor: "pointer", 
            pointerEvents: "auto"
          }}
          onClick={() => setErrors(prev => prev.filter(e => e.id !== error.id))} 
        />
      ))}
    </div>
  );
}