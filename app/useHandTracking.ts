"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface HandLandmark { x: number; y: number; z: number; }

export interface HandState {
  fistLevel:  number;
  palmX:      number;
  palmY:      number;
  velocityX:  number;
  velocityY:  number;
  detected:   boolean;
  landmarks:  HandLandmark[]; 
}

export type CameraStatus =
  | "idle" | "requesting" | "active"
  | "denied" | "unavailable" | "error";

interface UseHandTrackingReturn {
  handState:    HandState;
  cameraStatus: CameraStatus;
  videoRef:     React.RefObject<HTMLVideoElement>;
  startCamera:  () => Promise<void>;
}

const FINGER_JOINTS = [ [8, 6], [12, 10], [16, 14], [20, 18] ];
const THUMB = [4, 3];
const WRIST = 0;
const MCP_BASES = [5, 9, 13, 17];

function dist(a: HandLandmark, b: HandLandmark) {
  return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2);
}

function getPalmCenter(lm: HandLandmark[]) {
  const pts = [WRIST, ...MCP_BASES].map(i => lm[i]);
  return {
    x: pts.reduce((s,p)=>s+p.x,0)/pts.length,
    y: pts.reduce((s,p)=>s+p.y,0)/pts.length,
    z: pts.reduce((s,p)=>s+p.z,0)/pts.length,
  } as HandLandmark;
}

function calcFistLevel(lm: HandLandmark[]): number {
  const handSize = dist(lm[WRIST], lm[9]) || 0.001;
  let curledCount = 0;

  for (const [tip, pip] of FINGER_JOINTS) {
    const tipDist = dist(lm[tip], lm[WRIST]);
    const pipDist = dist(lm[pip], lm[WRIST]);
    // 💡 [수정됨] 0.85 -> 0.95: 손가락을 살짝만 구부려도 인식되게 예민도 대폭 향상
    if (tipDist < pipDist * 0.95) curledCount += 1;
  }

  const palm = getPalmCenter(lm);
  const thumbTipDist = dist(lm[THUMB[0]], palm) / handSize;
  // 💡 [수정됨] 0.6 -> 0.8: 엄지손가락도 덜 구부려도 인식되게 넓힘
  if (thumbTipDist < 0.8) curledCount += 0.5;

  // 💡 [수정됨] 3.5 -> 3.0: 손가락 3개만 구부려도 주먹(1.0)으로 가득 차게 인식
  return Math.min(1, curledCount / 3.0);
}

export function useHandTracking(): UseHandTrackingReturn {
  const videoRef       = useRef<HTMLVideoElement>(null!);
  const rafRef         = useRef<number>(0);
  const handLandmarker = useRef<unknown>(null);
  
  const lastPalmRef    = useRef({ x: 0, y: 0, t: 0 });
  // 💡 [추가됨] 튀는 노이즈를 막고 정확한 던지기 방향을 잡기 위한 이전 속도 저장소
  const lastVelRef     = useRef({ x: 0, y: 0 }); 

  const [handState, setHandState] = useState<HandState>({
    fistLevel:0, palmX:0, palmY:0,
    velocityX:0, velocityY:0, detected:false, landmarks:[],
  });
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");

  const initMediaPipe = useCallback(async () => {
    try {
      const vision = await import("@mediapipe/tasks-vision");
      const { HandLandmarker, FilesetResolver } = vision;
      const fs = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const opts = (delegate: "GPU"|"CPU") => HandLandmarker.createFromOptions(fs, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate,
        },
        runningMode:"VIDEO", numHands:1,
        minHandDetectionConfidence:0.6,
        minHandPresenceConfidence:0.6,
        minTrackingConfidence:0.5,
      });
      try { handLandmarker.current = await opts("GPU"); }
      catch { console.warn("[Hand] GPU 실패 → CPU"); handLandmarker.current = await opts("CPU"); }
      return true;
    } catch(e) { console.error("[Hand] init 실패",e); return false; }
  }, []);

  const runLoop = useCallback(() => {
    const video = videoRef.current;
    const lmRef = handLandmarker.current as {
      detectForVideo:(v:HTMLVideoElement,t:number)=>{landmarks:HandLandmark[][]};
    }|null;

    if (!video||!lmRef||video.readyState<2) {
      rafRef.current = requestAnimationFrame(runLoop); return;
    }
    const now    = performance.now();
    const result = lmRef.detectForVideo(video, now);

    if (result.landmarks?.length > 0) {
      const lm   = result.landmarks[0];
      const fl   = calcFistLevel(lm);
      const palm = getPalmCenter(lm);
      const palmX =  (1 - palm.x) * 2 - 1;
      const palmY = -(palm.y      * 2 - 1);
      const dt   = (now - lastPalmRef.current.t) / 1000 || 0.016;
      
      const rawVx = (palmX - lastPalmRef.current.x) / dt;
      const rawVy = (palmY - lastPalmRef.current.y) / dt;
      
      // 💡 [수정됨] 직전 속도(60%)와 현재 속도(40%)를 섞어서 손 이동 방향이 갑자기 튀지 않고 스무스하게 날아가게 보정
      const vx = lastVelRef.current.x * 0.6 + rawVx * 0.4;
      const vy = lastVelRef.current.y * 0.6 + rawVy * 0.4;
      lastVelRef.current = { x: vx, y: vy };

      lastPalmRef.current = { x:palmX, y:palmY, t:now };
      setHandState({ fistLevel:fl, palmX, palmY, velocityX:vx, velocityY:vy, detected:true, landmarks:lm });
    } else {
      setHandState(p=>({...p, detected:false, velocityX:0, velocityY:0, landmarks:[]}));
    }
    rafRef.current = requestAnimationFrame(runLoop);
  }, []);

  const startCamera = useCallback(async () => {
    // 기존 카메라 로직 동일...
    setCameraStatus("requesting");
    try {
      if (!navigator.mediaDevices?.getUserMedia) { setCameraStatus("unavailable"); return; }
      const stream = await navigator.mediaDevices.getUserMedia({ video:{width:640,height:480,facingMode:"user"} });
      if (videoRef.current) { videoRef.current.srcObject=stream; await videoRef.current.play(); }
      const ok = await initMediaPipe();
      if (!ok) { setCameraStatus("error"); return; }
      setCameraStatus("active");
      rafRef.current = requestAnimationFrame(runLoop);
    } catch(err:unknown) {
      const e = err as {name?:string};
      if      (e?.name==="NotAllowedError") setCameraStatus("denied");
      else if (e?.name==="NotFoundError")   setCameraStatus("unavailable");
      else                                  setCameraStatus("error");
    }
  }, [initMediaPipe, runLoop]);

  useEffect(()=>()=>{
    cancelAnimationFrame(rafRef.current);
    if(videoRef.current?.srcObject)
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t=>t.stop());
  },[]);

  return { handState, cameraStatus, videoRef, startCamera };
}