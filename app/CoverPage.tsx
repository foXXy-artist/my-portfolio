"use client";

import { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PaperMesh from "./PaperMesh";
import HandVisualizer from "./HandVisualizer";
import { useHandTracking } from "./useHandTracking";

// ── 🌟 [초고속 GPU 가속] 블루스크린 제거 트랜지션 메쉬 컴포넌트 ────────────────
const SibaShaderMesh = ({ video, onReady }: { video: HTMLVideoElement; onReady: () => void }) => {
  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [video]);

  const hasFiredReady = useRef(false);

  useFrame(() => {
    if (video.readyState >= 3 && video.currentTime > 0.1 && !hasFiredReady.current) {
      hasFiredReady.current = true;
      onReady();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D map;
          varying vec2 vUv;
          void main() {
            vec4 texColor = texture2D(map, vUv);
            float chromaDist = distance(texColor.rgb, vec3(0.0, 0.0, 1.0));
            float alpha = smoothstep(0.45, 0.55, chromaDist);
            gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
          }
        `}
        uniforms={{
          map: { value: texture }
        }}
      />
    </mesh>
  );
};

// ── 비디오 컨트롤 및 Canvas 래퍼 컴포넌트 (🌟 최대 크기 제한 & 반응형) ──────────────
const SibaTransition = ({ onEnded, onReady }: { onEnded: () => void; onReady: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false; 
    video.play().catch((err) => {
      console.log("사운드 재생 실패 시 음소거로 우회 재생", err);
      video.muted = true;
      video.play().catch(console.error);
    });
    setVideoElement(video);
  }, []);

  return (
    <div style={{ 
      position: "fixed", 
      top: "50%", 
      left: "50%", 
      transform: "translate(-50%, -50%)", // 화면 정중앙에 배치
      width: "100vw", 
      height: "100vh", 
      maxWidth: "1440px",  // 🌟 최대 가로 크기 제한
      maxHeight: "963px",  // 🌟 최대 세로 크기 제한
      pointerEvents: "none",
      zIndex: 16000 
    }}>
      <video
        ref={videoRef}
        src="/images/10 4k.mp4"
        playsInline
        onEnded={onEnded}
        style={{ display: "none" }}
      />
      {videoElement && (
        <Canvas style={{ width: "100%", height: "100%", display: "block" }}>
          <Suspense fallback={null}>
            <SibaShaderMesh video={videoElement} onReady={onReady} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

// ── 메인 CoverPage 컴포넌트 ──────────────────────────────────────────
type Phase = "idle" | "crumpling" | "thrown";

export default function CoverPage({ onDone }: { onDone: () => void }) {
  const { handState, videoRef, startCamera } = useHandTracking();
  const [phase, setPhase] = useState<Phase>("idle");
  const [throwVel, setThrowVel] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  
  const [isSkipping, setIsSkipping] = useState(false);
  const [sibaReady, setSibaReady] = useState(false); 

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "thrown" || isSkipping) return;

    if (!handState.detected) {
      if (phase === "crumpling") {
        setPhase("idle");
      }
      return;
    }
    
    const { fistLevel, velocityX, velocityY } = handState;
    
    if (phase === "idle" && fistLevel >= 0.18) {
      setPhase("crumpling");
    }
    
    if (phase === "crumpling") {
      if (fistLevel < 0.15) {
        setPhase("idle");
        return;
      }

      const currentSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      
      if (fistLevel >= 0.65 && currentSpeed > 0.8) {
        setPhase("thrown");
        const maxSpeed = 3.5; 
        const dirX = (velocityX / currentSpeed) * maxSpeed;
        const dirY = (velocityY / currentSpeed) * maxSpeed;
        
        setThrowVel({ x: dirX, y: -dirY }); 
        
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 1200);
      }
    }
  }, [handState, phase, isSkipping, onDone]);

  const handleManualSkip = () => {
    if (isSkipping) return;
    if (phase === "crumpling" || phase === "thrown") return;
    
    setIsSkipping(true);

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleSibaReady = () => {
    setTimeout(() => {
      setSibaReady(true);
    }, 400); 
  };

  if (!visible) return null;

  return (
    <div 
      onClick={handleManualSkip}
      style={{ 
        position: "fixed", 
        inset: 0, 
        width: "100vw", 
        height: "100vh", 
        cursor: (isSkipping || phase === "crumpling" || phase === "thrown") ? "default" : "pointer",
        zIndex: 15000,
        background: "transparent"
      }}
    >
      {/* 1. 가짜 페이지 노출 (🌟 최대 크기 제한 & 반응형) */}
      {(!isSkipping || !sibaReady) && (
        <div style={{
          position: "fixed", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", // 화면 정중앙 배치
          width: "100vw", 
          height: "100vh", 
          maxWidth: "1440px", // 🌟 최대 크기 제한
          maxHeight: "963px", // 🌟 최대 크기 제한
          pointerEvents: "none",
          zIndex: 14000
        }}>
          <Canvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "transparent" }}>
            <Suspense fallback={null}>
              <PaperMesh handState={handState} phase={phase} throwVel={throwVel} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* 2. 카메라 피드 */}
      {(!isSkipping || !sibaReady) && (
        <HandVisualizer 
          videoRef={videoRef} 
          landmarks={handState.landmarks} 
          detected={handState.detected} 
          fistLevel={handState.fistLevel} 
        />
      )}

      {/* 3. 스킵 시: 4K 트랜지션 영상 */}
      {isSkipping && (
        <SibaTransition 
          onReady={handleSibaReady} 
          onEnded={() => {
            setVisible(false);
            onDone();
          }} 
        />
      )}
    </div>
  );
}