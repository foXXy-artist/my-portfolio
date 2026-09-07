"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminKujiPage() {
  const [donations, setDonations] = useState<any[]>([]);

  // 폼 제출된 후원 내역들 불러오기
  const fetchDonations = async () => {
    const { data } = await supabase.from("donations").select("*").order("created_at", { ascending: false });
    if (data) setDonations(data);
  };

  useEffect(() => { fetchDonations(); }, []);

  // 입금 확인 후 승인 버튼 눌렀을 때 작동
  const handleApprove = async (id: string) => {
    // 💡 [수정 불필요] 상태를 승인(approved)으로 바꿔줌
    const { error } = await supabase.from("donations").update({ status: "approved" }).eq("id", id);
    if (!error) {
      alert("승인되었습니다!");
      fetchDonations();
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>관리자 대시보드</h1>
      <table style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>입금자명</th>
            <th>연락처</th>
            <th>금액</th>
            <th>배송지</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{item.bank_sender}</td>
              <td>{item.phone}</td>
              <td>{item.amount}원</td>
              <td>{item.address}</td>
              <td>{item.status}</td>
              <td>
                {item.status === "pending" && (
                  // 💡 [디자인 수정 포인트] 버튼 색상 변경
                  <button onClick={() => handleApprove(item.id)} style={{ background: "blue", color: "white", padding: "5px" }}>
                    입금 확인(승인)
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}