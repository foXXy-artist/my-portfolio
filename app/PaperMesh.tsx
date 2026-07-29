"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HandState } from "./useHandTracking";

interface Props {
  handState: HandState;
  phase: string;
  throwVel: { x: number; y: number };
}

// ══════════════════════════════════════════════════════════════════════
// 💡 [설정 공간] 날아가는 속도 및 크로마키 설정
// ══════════════════════════════════════════════════════════════════════
// 🚀 날아가는 속도 조절 (숫자가 클수록 더 빠르게 휙 날아갑니다!)
const FLY_SPEED_X = 15.0;     // 가로 방향 날아가는 속도 (기존 4.0 -> 15.0)
const FLY_SPEED_Y = 15.0;     // 세로 방향 날아가는 속도 (기존 4.0 -> 15.0)
const ROTATION_SPEED = 0.08;   // 날아갈 때 회전하는 속도 (기존 0.2 -> 0.8)

const VIDEO_PATH = "/images/fake page menu 4k.mp4"; 
const KEY_COLOR = new THREE.Color(0x0000ff);
const SIMILARITY = 0.55;  
const SMOOTHNESS = 0.15;  
// ══════════════════════════════════════════════════════════════════════

export default function PaperMesh({ handState, phase, throwVel }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree(); 
  
  const smoothFistRef = useRef(0);

  const [video] = useState(() => {
    const v = document.createElement("video");
    v.src = VIDEO_PATH;
    v.crossOrigin = "Anonymous";
    v.loop = false;
    v.muted = true;
    v.playsInline = true;
    v.load();
    return v;
  });

  const videoTexture = useMemo(() => {
    const tex = new THREE.VideoTexture(video);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.format = THREE.RGBAFormat;
    return tex;
  }, [video]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (phase === "thrown") {
      // 💡 [수정됨] 위에서 설정한 FLY_SPEED와 ROTATION_SPEED가 적용되어 매우 빠르게 날아갑니다.
      meshRef.current.position.x += throwVel.x * delta * FLY_SPEED_X;
      meshRef.current.position.y += throwVel.y * delta * FLY_SPEED_Y;
      meshRef.current.rotation.z -= throwVel.x * delta * ROTATION_SPEED; 
      return;
    }

    if (!video.duration || Number.isNaN(video.duration)) return;

    const mappedFist = Math.max(0, Math.min(1, (handState.fistLevel - 0.1) / 0.8));
    const target = handState.detected ? mappedFist : 0;
    
    smoothFistRef.current = THREE.MathUtils.lerp(smoothFistRef.current, target, delta * 8.0);

    const targetTime = Math.min(smoothFistRef.current * video.duration, video.duration - 0.01);
    
    if (Math.abs(video.currentTime - targetTime) > 0.01) {
      video.currentTime = targetTime;
    }
  });

  const uniforms = useMemo(() => ({
    map: { value: videoTexture },
    keyColor: { value: KEY_COLOR },
    similarity: { value: SIMILARITY },
    smoothness: { value: SMOOTHNESS },
  }), [videoTexture]);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D map;
    uniform vec3 keyColor;
    uniform float similarity;
    uniform float smoothness;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(map, vUv);
      float chromaDist = distance(texColor.rgb, keyColor);
      float alpha = smoothstep(similarity, similarity + smoothness, chromaDist);
      
      float maxRG = max(texColor.r, texColor.g);
      float spillVal = clamp((texColor.b - maxRG) * 2.0, 0.0, 1.0);
      texColor.b -= spillVal; 
      
      gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}