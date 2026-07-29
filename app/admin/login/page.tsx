"use client";
// ════════════════════════════════════════════════
// app/admin/login/page.tsx — 관리자 로그인
// ════════════════════════════════════════════════
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router   = useRouter();
  const [pw, setPw]     = useState("");
  const [error, setErr] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const res = await fetch("/api/auth/admin", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ password: pw }),
    });

    if (res.ok) {
      router.push("/admin/orders");
    } else {
      setErr("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <main style={{
      backgroundColor: "#ffffff",
      minHeight:       "100vh",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
    }}>
      <div style={{ width: 360, padding: 40, border: "1px solid #e0e0e0", borderRadius: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111111", marginBottom: 32, textAlign: "center" }}>
          관리자 로그인
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="관리자 비밀번호"
            style={{
              width:        "100%",
              padding:      "13px 16px",
              border:       "1px solid #cccccc",
              borderRadius: 8,
              fontSize:     15,
              color:        "#111111",
              backgroundColor: "#ffffff",
              outline:      "none",
              marginBottom: 16,
            }}
          />
          {error && <p style={{ color: "#cc0000", fontSize: 14, marginBottom: 12 }}>{error}</p>}
          <button
            type="submit"
            style={{
              width:           "100%",
              padding:         "14px 0",
              backgroundColor: "#111111",
              color:           "#ffffff",
              border:          "none",
              borderRadius:    8,
              fontSize:        15,
              fontWeight:      700,
              cursor:          "pointer",
            }}
          >
            로그인
          </button>
        </form>
      </div>
    </main>
  );
}
