"use client";

// ══════════════════════════════════════════════════════════════════════
// OverlayModal — 범용 이미지 오버레이 (다중 모달 최적화 ver)
// ══════════════════════════════════════════════════════════════════════

interface OverlayModalProps {
  imageSrc: string;   
  imageW:   number;   
  imageH?:  number;   
  top?:     string;   
  left?:    string;   
  onClose:  () => void;
}

export default function OverlayModal({
  imageSrc,
  imageW,
  imageH,
  top,
  left,
  onClose,
}: OverlayModalProps) {
  const isCustomPosition = top !== undefined || left !== undefined;

  return (
    <div
      onClick={onClose}
      style={{
        position:       "fixed",
        inset:          0,
        display:        isCustomPosition ? "block" : "flex",
        alignItems:     "center",
        justifyContent: "center",
        zIndex:         10000,
        cursor:         "pointer",
      }}
    >
      {/* 어두운 반투명 배경 (여러 개 켜져도 덜 까맣도록 알파값 조절) */}
      <div
        style={{
          position:        "absolute",
          inset:           0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      />

      {/* 이미지 컨테이너 */}
      <div
        style={{ 
          position: isCustomPosition ? "absolute" : "relative", 
          top:      top,
          left:     left,
          cursor:   "default" 
        }}

      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            style={{
              width:     imageW,   
              height:    imageH ?? "auto",   
              objectFit: "contain",
              display:   "block",
            }}
          />
        ) : (
          <div
            style={{
              width:           imageW,
              height:          imageH ?? 300,
              backgroundColor: "#1a1a1a",
              border:          "2px dashed #444",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
            }}
          >
            <p style={{ color: "#555", fontFamily: "monospace", fontSize: 12, textAlign: "center" }}>
              TODO: 이미지 없음
            </p>
          </div>
        )}
      </div>
    </div>
  );
}