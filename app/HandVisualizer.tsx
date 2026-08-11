"use client";

import { useRef, useEffect, useState } from "react";
import type { HandLandmark } from "./useHandTracking";

// ==========================================================
// ⚙️ [설정 영역] 전체 배율 조절 (1.08배 유지)
// ==========================================================
const BASE_SCALE = 1.08; 
// 카메라 실제 캔버스 내부 해상도: 가로 237.6px, 세로 178.2px
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
  
  // 카메라가 켜져 있는지(활성화 상태인지) 실시간으로 감지하는 상태
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    const checkCamera = () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream && stream.getVideoTracks) {
        const tracks = stream.getVideoTracks();
        setIsCameraActive(tracks.length > 0 && tracks[0].readyState === "live");
      } else {
        setIsCameraActive(false);
      }
    };
    
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
    // 🌟 [반응형 최상위 래퍼]
    <div 
      style={{ 
        position: "fixed", 
        bottom: "clamp(30px, 5vh, 80px)", 
        right: "clamp(12px, 2vw, 20px)", 
        zIndex: 17000, 
        width: "clamp(140px, 16.5vw, 237.6px)", 
        aspectRatio: "237.6 / 178.2", 
        pointerEvents: "none" 
      }}
    >
      {/* 1. 카메라 테두리(프레임) 이미지 */}
      {/* 💡 maxWidth: "none", maxHeight: "none"을 추가하여 전역 스타일의 방해를 무시합니다 */}
      <img 
        src="/images/camera box tex.png" 
        alt="frame" 
        style={{
          position: "absolute",
          right: "-16.84%",
          bottom: "-8.98%",
          width: "145.62%",
          height: "112.23%", 
          maxWidth: "none", 
          maxHeight: "none",
          zIndex: 10,
          pointerEvents: "none", 
        }} 
      />

      {/* 2. 카메라 상태 배지 이미지 */}
      <img 
        src={isCameraActive ? "/images/u r on camera.jpg" : "/images/u r not on camera.png"} 
        alt="camera status" 
        style={{
          position: "absolute",
          bottom: "-30.3%",    
          right: "-5.9%",     
          width: "50.5%",
          height: "auto",
          maxWidth: "none",
          zIndex: 11,    
        }} 
      />

      {/* 3. 캠코더 아이콘 */}
      <img 
        src="/images/camcoder.png" 
        alt="camcorder" 
        style={{
          position: "absolute",
          bottom: "25.2%",    
          right: "85.8%",     
          width: "26.5%",
          rotate: "-10deg",
          height: "auto",
          maxWidth: "none",
          zIndex: 11,    
        }} 
      />

      {/* 4. 흘러내리는 카메라 이미지 */}
      <img 
        src="/images/camera with melting.png" 
        alt="melting camera" 
        style={{
          position: "absolute",
          bottom: "46%",    
          right: "-10.9%",     
          width: "49.6%",
          height: "auto",
          maxWidth: "none",
          zIndex: 11,    
        }} 
      />

      {/* 🎥 [실제 카메라 화면 영역] */}
      <div 
        style={{ 
          position: "absolute", 
          inset: 0, 
          borderRadius: "6px", 
          overflow: "hidden", 
          boxShadow: "0 0 14px rgba(0,0,0,0.6)", 
          pointerEvents: "auto" 
        }}
      >
        {/* 마스크 영상 원본 (숨김) */}
        <video ref={maskVideoRef} src="/images/mask.mp4" loop autoPlay muted playsInline style={{ display: "none" }} />
        
        {/* 1층. 웹캠 화면 */}
        <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
        
        {/* 2층. 얼굴 마스크 */}
        <canvas ref={maskCanvasRef} width={W} height={H} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />

        {/* 3층. 필터 (soft-light) */}
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
        <canvas ref={handCanvasRef} width={W} height={H} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }} />
        
        {/* 5층. 주먹 게이지 바 */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5%", background: "rgba(0,0,0,0.4)", zIndex: 4 }}>
          <div style={{ height: "100%", width: `${fistLevel * 100}%`, background: `hsl(${120 - fistLevel * 120},80%,55%)` }} />
        </div>
      </div>
    </div>
  );
}