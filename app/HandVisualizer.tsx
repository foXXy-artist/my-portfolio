"use client";

import { useRef, useEffect, useState } from "react";
import type { HandLandmark } from "./useHandTracking";

// ==========================================================
// ⚙️ [설정 영역] 전체 배율 조절 (1.2배 유지)
// ==========================================================
const BASE_SCALE = 1.08; 
// 카메라 실제 크기: 가로 264px, 세로 198px
const W = 220 * BASE_SCALE;
const H = 165 * BASE_SCALE;

const MASK_SCALE = 1.7 * BASE_SCALE;    // 마스크 크기 배율
const MASK_OFFSET_Y = -1 * BASE_SCALE;   // 마스크 위치 보정
const CHROMA_THRESH = 80;               // 블루스크린 제거 강도
// ==========================================================

const CONNECTIONS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],
  [0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],
  [0,17],[17,18],[18,19],[19,20],[5,9],[9,13],[13,17],
];

export default function HandVisualizer({ videoRef, landmarks, detected, fistLevel }: any) {
  const handCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskVideoRef = useRef<HTMLVideoElement>(null);
  
  // 💡 [추가됨] 카메라가 켜져 있는지(활성화 상태인지) 실시간으로 감지하는 상태
  const [isCameraActive, setIsCameraActive] = useState(false);

  // 💡 [추가됨] 0.5초마다 비디오 스트림 상태를 확인하여 이미지를 전환합니다.
  useEffect(() => {
    const checkCamera = () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream && stream.getVideoTracks) {
        const tracks = stream.getVideoTracks();
        // 트랙이 존재하고 라이브 상태이면 카메라 켜짐으로 간주
        setIsCameraActive(tracks.length > 0 && tracks[0].readyState === "live");
      } else {
        // 권한 거부, 혹은 스트림이 아예 없으면 꺼짐으로 간주
        setIsCameraActive(false);
      }
    };
    
    // 계속해서 카메라 연결/해제 상태를 주기적으로 확인
    const intervalId = setInterval(checkCamera, 500);
    return () => clearInterval(intervalId);
  }, [videoRef]);

  // 1. 손 뼈대 렌더링
  useEffect(() => {
    const cvs = handCanvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    if (!detected || !landmarks.length) return;

    const hue = 120 - fistLevel * 120;
    ctx.strokeStyle = `hsla(${hue},80%,65%,0.75)`;
    ctx.lineWidth = 1.8 * BASE_SCALE;
    
    for (const [a, b] of CONNECTIONS) {
      if (!landmarks[a] || !landmarks[b]) continue;
      ctx.beginPath();
      ctx.moveTo((1 - landmarks[a].x) * W, landmarks[a].y * H);
      ctx.lineTo((1 - landmarks[b].x) * W, landmarks[b].y * H);
      ctx.stroke();
    }
  });

  // 2. 얼굴 인식 및 마스크 영상 합성
  useEffect(() => {
    let active = true;
    let faceDetection: any = null;
    let animationId = 0;
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js";
    document.body.appendChild(script);

    script.onload = () => {
      faceDetection = new (window as any).FaceDetection({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
      });
      faceDetection.setOptions({ model: 'short', minDetectionConfidence: 0.5 });

      let lastDetection: any = null;
      faceDetection.onResults((results: any) => {
        lastDetection = (results.detections && results.detections.length > 0) ? results.detections[0] : null;
      });

      const loop = async () => {
        if (!active) return;
        if (videoRef.current && videoRef.current.readyState >= 2) {
          await faceDetection.send({ image: videoRef.current });
        }

        const maskVideo = maskVideoRef.current;
        const maskCanvas = maskCanvasRef.current;
        if (maskVideo && maskCanvas && offCtx) {
          const ctx = maskCanvas.getContext("2d");
          if (ctx && maskVideo.readyState >= 2) {
            ctx.clearRect(0, 0, W, H);
            offscreen.width = maskVideo.videoWidth;
            offscreen.height = maskVideo.videoHeight;
            offCtx.drawImage(maskVideo, 0, 0);

            const frame = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
            for (let i = 0; i < frame.data.length; i += 4) {
              if (frame.data[i+2] > 150 && frame.data[i] < CHROMA_THRESH) frame.data[i+3] = 0;
            }
            offCtx.putImageData(frame, 0, 0);

            if (lastDetection) {
              const bbox = lastDetection.boundingBox;
              const targetW = bbox.width * W * MASK_SCALE;
              const targetH = bbox.height * H * MASK_SCALE;
              const targetX = ((1 - bbox.xCenter) * W) - (targetW / 2);
              const targetY = (bbox.yCenter * H) - (targetH / 2) + MASK_OFFSET_Y;
              ctx.drawImage(offscreen, targetX, targetY, targetW, targetH);
            }
          }
        }
        animationId = requestAnimationFrame(loop);
      };
      loop();
    };

    return () => { active = false; cancelAnimationFrame(animationId); };
  }, []);

  return (
    // 🌟 [최상위 래퍼: 전체 화면(Viewport) 기준 Fixed] 
    // 브라우저 우측 하단 20px, 80px 위치에 264x198 크기로 고정됩니다.
    // 이 HandVisualizer 컴포넌트가 렌더링될 때만 존재하므로 카메라와 수명을 같이 합니다.
    <div style={{ position: "fixed", bottom: 80, right: 20, zIndex: 17000, width: W, height: H, pointerEvents: "none" }}>
      
      {/* ══════════════════════════════════════════════════════════════════════
          🎨 [카메라 테두리(프레임) 이미지] 
          최상위 래퍼와 똑같이 absolute로 움직이므로 완벽하게 겹칩니다!
          ══════════════════════════════════════════════════════════════════════ */}
      <img 
        src="/images/camera box tex.png" 
        alt="image" 
        style={{
          position: "fixed",
          right: -20,
          bottom: 64,
          width: "346px",
          height: "200px",
          zIndex: 10,
          pointerEvents: "none", 
        }} 
      />

      {/* 💡 [핵심 수정] 카메라 상태(isCameraActive)에 따라 이미지가 동적으로 교체됩니다. */}
      <img 
        src={isCameraActive ? "/images/u r on camera.jpg" : "/images/u r not on camera.png"} 
        alt="camera status" 
        style={{
          position: "fixed",
          bottom: 26,    
          right: 6,     
          width: "120px",
          height: "auto",
          zIndex: 11,    
        }} 
      />

      <img 
        src="/images/camcoder.png" 
        alt="image" 
        style={{
          position: "fixed",
          bottom: 125,    
          right: 224,     
          width: "63px",
          rotate: "-10deg",
          height: "auto",
          zIndex: 11,    
        }} 
      />
      <img 
        src="/images/camera with melting.png" 
        alt="image" 
        style={{
          position: "fixed",
          bottom: 162,    
          right: -6,     
          width: "118px",
          height: "auto",
          zIndex: 11,    
        }} 
      />

      {/* 🎥 [실제 카메라 화면 영역] */}
      {/* 프레임 밑에 깔리면서, 모서리는 둥글게 잘리고(overflow:hidden) 영상이 나옵니다. */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * BASE_SCALE, overflow: "hidden", boxShadow: "0 0 14px rgba(0,0,0,0.6)", pointerEvents: "auto" }}>
        
        {/* 마스크 영상 원본 (숨김) */}
        <video ref={maskVideoRef} src="/images/mask.mp4" loop autoPlay muted playsInline style={{ display: "none" }} />
        
        {/* 1층. 웹캠 화면 */}
        <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
        
        {/* 2층. 얼굴 마스크 */}
        <canvas ref={maskCanvasRef} width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 1 }} />

        {/* 🌟 3층. 필터 (soft-light) */}
        <img 
          src="/images/filter 5.png" 
          alt="camera filter" 
          style={{ 
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
            objectFit: "fill", opacity: 1.0, pointerEvents: "none", zIndex: 2, 
            mixBlendMode: "soft-light" 
          }} 
        />
        
        {/* 4층. 손 뼈대 */}
        <canvas ref={handCanvasRef} width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 3 }} />
        
        {/* 5층. 주먹 게이지 바 */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4 * BASE_SCALE, background: "rgba(0,0,0,0.4)", zIndex: 4 }}>
          <div style={{ height: "100%", width: `${fistLevel * 100}%`, background: `hsl(${120 - fistLevel * 120},80%,55%)` }} />
        </div>
      </div>

    </div>
  );
}