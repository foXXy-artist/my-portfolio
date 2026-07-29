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
    // 💡 비디오 플레이어 기준 최소 0.1초 이상 확실히 굴러가기 시작할 때 1차 신호 생성
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
            // 순수 블루(0,0,1)에 가까운 색상을 투명화 (크로마키 셰이더)
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

// ── 비디오 컨트롤 및 Canvas 래퍼 컴포넌트 ──────────────────────────────────
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
      position: "absolute", 
      top: 0, 
      left: "50%", 
      transform: "translateX(-50%)",
      width: "1440px", 
      height: "963px", 
      pointerEvents: "none",
      zIndex: 16000 // 💡 가짜 종이(14000)보다 무조건 위에 배치하여 완벽 덮음
    }}>
      <video
        ref={videoRef}
        src="/images/10 4k.mp4"
        playsInline
        onEnded={onEnded}
        style={{ display: "none" }}
      />
      {videoElement && (
        <Canvas style={{ width: "1440px", height: "963px", display: "block" }}>
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
    
    // 손을 살짝 쥐기 시작하면(0.18 이상) 구기기 단계 진입
    if (phase === "idle" && fistLevel >= 0.18) {
      setPhase("crumpling");
    }
    
    if (phase === "crumpling") {
      // 손을 다시 완전히 펴면(초록색) 구기기 취소
      if (fistLevel < 0.15) {
        setPhase("idle");
        return;
      }

      const currentSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      
      // 🔥 [핵심 수정] 
      // 1. fistLevel >= 1.0 은 현실에서 불가능한 수치였습니다. 주황/빨강 상태인 0.65로 완화!
      // 2. 던지는 속도(currentSpeed) 조건도 1.2에서 0.8로 완화하여 쉽게 던져지게 조정!
      if (fistLevel >= 0.65 && currentSpeed > 0.8) {
        setPhase("thrown");
        const maxSpeed = 3.5; // 날아가는 초기 속도 벡터값 설정
        const dirX = (velocityX / currentSpeed) * maxSpeed;
        const dirY = (velocityY / currentSpeed) * maxSpeed;
        
        setThrowVel({ x: dirX, y: -dirY }); // 화면 좌표계 보정 (Y축 반전)
        
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 1200);
      }
    }
  }, [handState, phase, isSkipping, onDone]);

  // 초록색 상태 클릭 스킵
  const handleManualSkip = () => {
    if (isSkipping) return;
    if (phase === "crumpling" || phase === "thrown") return;
    
    setIsSkipping(true);

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // 💡 [핵심 해결 로직: 절대 방어막]
  // 비디오가 켜졌다고 신호를 보내도, 고화질 4K 비디오 텍스처가 
  // GPU 메모리에 완전히 올라가 첫 프레임들이 '실제로 화면에 출력될 때까지'
  // 넉넉하게 400ms(0.4초) 동안 하단에서 PaperMesh가 방패 역할을 계속 하도록 강제 유예합니다.
  const handleSibaReady = () => {
    setTimeout(() => {
      setSibaReady(true);
    }, 400); // 컴퓨터가 엄청 버벅여도 0.4초 레이어 겹침이면 완벽히 커버됩니다.
  };

  if (!visible) return null;

  return (
    <div 
      onClick={handleManualSkip}
      style={{ 
        position: "fixed", 
        inset: 0, 
        width: "100%", 
        height: "100%", 
        cursor: (isSkipping || phase === "crumpling" || phase === "thrown") ? "default" : "pointer",
        zIndex: 15000,
        background: "transparent"
      }}
    >
      {/* 1. 가짜 페이지 노출 (인트로 영상이 완벽하게 자리를 잡을 때까지 절대 한 발짝도 안 움직임) */}
      {(!isSkipping || !sibaReady) && (
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "1440px", height: "963px", pointerEvents: "none",
          zIndex: 14000 // zIndex 레이어 하단 배치
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

      {/* 3. 스킵 시: 4K 트랜지션 영상 (위에서 재생이 시작되며, 0.4초 후 아래의 PaperMesh를 안전하게 교체) */}
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