"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

// ────────────────────────────────────────────────────────────
// 1. [Supabase 세팅] 환경변수 연결
// ────────────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ────────────────────────────────────────────────────────────
// 2. [쿠지판 설정] 80장 스펙 & 라스트원상 추가
// ────────────────────────────────────────────────────────────
interface KujiBoard {
  id: string;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  bannerUrl: string;
  prizes: Record<string, { name: string; img: string }>;
}

const KUJI_BOARDS: KujiBoard[] = [
  {
    id: "board_1",
    title: "foXXy-Debut Edition",
    subtitle: "Type.A",
    thumbnailUrl: "/images/zzzzz/real_zzzzz.png",
    bannerUrl: "/images/artwork baby.png",
    prizes: {
      "A상": { name: "foXXy L 피규어", img: "/images/minion tex.png" },
      "B상": { name: "덴지로 피규어", img: "" },
      "C상": { name: "네코마무시 피규어", img: "" },
      "D상": { name: "이조 피규어", img: "" },
      "E상": { name: "빅 사이즈 타월", img: "" },
      "F상": { name: "아크릴 스탠드", img: "" },
      "G상": { name: "클리어 파일 세트", img: "" },
      "H상": { name: "러버 스트랩", img: "" },
      "라스트원상": { name: "골드 로저 스페셜 피규어", img: "" },
    },
  },
  {
    id: "board_2",
    title: "foXXy-Debut Edition",
    subtitle: "Type.B",
    thumbnailUrl: "https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?q=80&w=600&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1614583225154-5fc18bf45e48?q=80&w=800&auto=format&fit=crop",
    prizes: {
      "A상": { name: "나루토 질풍전 피규어", img: "" },
      "B상": { name: "사스케 피규어", img: "" },
      "C상": { name: "카카시 피규어", img: "" },
      "D상": { name: "이타치 피규어", img: "" },
      "E상": { name: "일러스트 보드", img: "" },
      "F상": { name: "글라스 컵", img: "" },
      "G상": { name: "색지 컬렉션", img: "" },
      "H상": { name: "러버 코스터", img: "" },
      "라스트원상": { name: "미나토 화카게 피규어", img: "" },
    },
  },
];

interface KujiTicket {
  id: string;
  board_id: string;
  ticket_number: number;
  reward_grade: string;
  reward_name: string;
  is_opened: boolean;
}

type ScreenState = "SELECT_BOARD" | "HOME" | "BOARD" | "CODE_INPUT" | "REVEAL" | "RESULT";

export default function KujiKiosk() {
  const [screen, setScreen] = useState<ScreenState>("SELECT_BOARD");
  const [activeBoardId, setActiveBoardId] = useState<string>("board_1");
  
  const [tickets, setTickets] = useState<KujiTicket[]>([]);
  const [isDBLoading, setIsDBLoading] = useState(true);

  const [selectedTickets, setSelectedTickets] = useState<KujiTicket[]>([]);
  const [codeInput, setCodeInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [revealResults, setRevealResults] = useState<{ ticket_number: number | string; reward_grade: string; reward_name: string }[]>([]);
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
  const [isPeeled, setIsPeeled] = useState(false);

  // ────────────────────────────────────────────────────────────
  // 3. [초기 데이터 로드] DB에서 티켓 가져오기
  // ────────────────────────────────────────────────────────────
  const fetchTicketsFromDB = async () => {
    setIsDBLoading(true);
    const { data, error } = await supabase
      .from("kuji_tickets")
      .select("*")
      .order("ticket_number", { ascending: true });

    if (!error && data) {
      setTickets(data);
    }
    setIsDBLoading(false);
  };

  useEffect(() => {
    fetchTicketsFromDB();
  }, []);

  const initializeDBTickets = async () => {
    setIsDBLoading(true);
    const mockTickets: KujiTicket[] = [];

    KUJI_BOARDS.forEach((board) => {
      const grades: string[] = [
        ...Array(2).fill("A상"),
        ...Array(2).fill("B상"),
        ...Array(2).fill("C상"),
        ...Array(2).fill("D상"),
        ...Array(10).fill("E상"),
        ...Array(22).fill("F상"),
        ...Array(20).fill("G상"),
        ...Array(20).fill("H상"),
      ];
      
      grades.sort(() => Math.random() - 0.5);

      for (let i = 1; i <= 80; i++) {
        const grade = grades[i - 1];
        mockTickets.push({
          id: `${board.id}_ticket_${i}`,
          board_id: board.id,
          ticket_number: i,
          reward_grade: grade,
          reward_name: board.prizes[grade]?.name || `${grade} 상품`,
          is_opened: false,
        });
      }
    });

    const { error } = await supabase.from("kuji_tickets").insert(mockTickets);
    if (!error) {
      await fetchTicketsFromDB();
    } else {
      alert("티켓 생성 실패: " + error.message);
      setIsDBLoading(false);
    }
  };

  const currentBoard = KUJI_BOARDS.find((b) => b.id === activeBoardId);
  const currentTickets = useMemo(() => tickets.filter((t) => t.board_id === activeBoardId), [tickets, activeBoardId]);

  const prizeStats = useMemo(() => {
    if (!currentBoard) return [];
    const stats: Record<string, { total: number; remaining: number }> = {};
    
    Object.keys(currentBoard.prizes).forEach((grade) => {
      stats[grade] = { total: 0, remaining: 0 };
    });

    currentTickets.forEach((ticket) => {
      const grade = ticket.reward_grade;
      if (stats[grade]) {
        stats[grade].total += 1;
        if (!ticket.is_opened) stats[grade].remaining += 1;
      }
    });

    if (stats["라스트원상"]) {
      const remainingUnopened = currentTickets.filter(t => !t.is_opened).length;
      const isSoldOut = currentTickets.length > 0 && remainingUnopened === 0;
      stats["라스트원상"] = { 
        total: 1, 
        remaining: isSoldOut ? 0 : 1 
      };
    }

    return Object.entries(stats);
  }, [currentTickets, currentBoard]);

  const handleSelectBoard = (boardId: string) => {
    setActiveBoardId(boardId);
    setSelectedTickets([]);
    setScreen("HOME");
  };

  const toggleTicketSelection = (ticket: KujiTicket) => {
    if (ticket.is_opened) return;
    setSelectedTickets((prev) =>
      prev.some((t) => t.id === ticket.id)
        ? prev.filter((t) => t.id !== ticket.id)
        : [...prev, ticket]
    );
  };

  const handleOpenCodeModal = () => {
    if (selectedTickets.length === 0) return;
    setCodeInput("");
    setErrorMsg("");
    setScreen("CODE_INPUT");
  };

  // ────────────────────────────────────────────────────────────
  // 4. [Supabase 연동]
  // ────────────────────────────────────────────────────────────
  const handleSubmitCode = async () => {
    const cleanCode = codeInput.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMsg("코드를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const { data: codeData, error: codeError } = await supabase
      .from("kuji_codes")
      .select("*")
      .eq("code", cleanCode)
      .single();

    if (codeError || !codeData) {
      setErrorMsg("유효하지 않은 코드입니다.");
      setIsSubmitting(false);
      return;
    }

    if (codeData.remaining_uses <= 0) {
      setErrorMsg("이미 결제하신 횟수를 모두 사용한 코드입니다.");
      setIsSubmitting(false);
      return;
    }

    const allowedCount = Math.min(codeData.remaining_uses, selectedTickets.length);
    const ticketsToProcess = selectedTickets.slice(0, allowedCount);

    if (selectedTickets.length > allowedCount) {
      alert(`보유하신 코드의 남은 횟수는 ${codeData.remaining_uses}회입니다.\n선택하신 ${selectedTickets.length}장의 티켓 중 앞의 ${allowedCount}장만 오픈됩니다.`);
    }

    const ticketUpdates = ticketsToProcess.map((ticket) =>
      supabase
        .from("kuji_tickets")
        .update({ is_opened: true, used_code: cleanCode })
        .eq("id", ticket.id)
    );

    await Promise.all(ticketUpdates);
    await supabase
      .from("kuji_codes")
      .update({ remaining_uses: codeData.remaining_uses - allowedCount })
      .eq("code", cleanCode);

    const openedResults: { ticket_number: number | string; reward_grade: string; reward_name: string }[] = ticketsToProcess.map((t) => ({
      ticket_number: t.ticket_number,
      reward_grade: t.reward_grade,
      reward_name: t.reward_name,
    }));

    const remainingUnopened = currentTickets.filter(t => !t.is_opened).length;
    
    if (remainingUnopened - allowedCount <= 0 && currentBoard) {
      openedResults.push({
        ticket_number: "LAST",
        reward_grade: "라스트원상",
        reward_name: currentBoard.prizes["라스트원상"]?.name || "스페셜 상품",
      });
    }

    setTickets((prev) =>
      prev.map((t) =>
        ticketsToProcess.some((tp) => tp.id === t.id) ? { ...t, is_opened: true } : t
      )
    );

    setIsSubmitting(false);

    if (openedResults.length > 0) {
      setRevealResults(openedResults);
      setCurrentRevealIndex(0);
      setIsPeeled(false);
      setScreen("REVEAL");
    }
  };

  const handlePeel = () => {
    if (isPeeled) return;
    setIsPeeled(true);
    setTimeout(() => {
      setScreen("RESULT");
    }, 1300);
  };

  const handleNextReveal = () => {
    if (currentRevealIndex < revealResults.length - 1) {
      setCurrentRevealIndex((prev) => prev + 1);
      setIsPeeled(false);
      setScreen("REVEAL");
    } else {
      setSelectedTickets([]);
      setRevealResults([]);
      setScreen("HOME");
    }
  };

  if (isDBLoading) {
    return (
      <div className="fixed inset-0 bg-[#050510] flex items-center justify-center text-cyan-400 font-bold z-0">
        데이터베이스 연결 중...
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="fixed inset-0 bg-[#050510] flex flex-col items-center justify-center text-white p-6 text-center z-0">
        <p className="mb-4 text-blue-300 font-bold">데이터베이스에 티켓 정보가 없습니다.</p>
        <button
          onClick={initializeDBTickets}
          className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-600 rounded-xl font-black shadow-lg active:scale-95 transition-transform"
        >
          DB에 80장 세팅하기
        </button>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 w-full h-[100dvh] bg-[#050510] flex flex-col items-center justify-center pt-14 sm:pt-16 pb-4 overflow-hidden z-0">
      <style>{`
        .kuji-perspective { perspective: 1200px; }
        .kuji-flap {
          transform-origin: left center;
          transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .is-peeled { transform: rotateY(-160deg); }
        .star-bg { background: radial-gradient(circle at center, #0b4528 0%, #031c10 100%); }
        .last-one-bg { background: radial-gradient(circle at center, #450b1a 0%, #1c0308 100%); }
      `}</style>

      {/* 키오스크 메인 프레임 */}
      <div className="w-full max-w-md h-full sm:h-[84dvh] bg-[#0a0f1a] relative flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.6)] sm:border-2 border-blue-900/40 sm:rounded-[32px] overflow-hidden">
        
        {/* ── [화면 0] 쿠지판 선택 화면 ── */}
        {screen === "SELECT_BOARD" && (
          <div className="flex flex-col h-full p-6 bg-gradient-to-b from-[#1a1c2c] to-[#0a0f1a]">
            <h1 className="text-3xl font-black text-white mb-1 mt-2">시크릿 쿠지</h1>
            <p className="text-blue-300 text-sm mb-6">원하시는 쿠지판을 선택해 주세요.</p>
            <div className="flex-1 overflow-y-auto space-y-4 pb-6">
              {KUJI_BOARDS.map((board) => (
                <div
                  key={board.id}
                  onClick={() => handleSelectBoard(board.id)}
                  className="relative h-44 rounded-2xl overflow-hidden cursor-pointer shadow-lg border-2 border-blue-800/50 hover:border-cyan-400 transition-all active:scale-[0.98]"
                >
                  {/* 💡 [수정] 여백 없이 빈틈없이 채우기 위해 object-fill 적용 */}
                  <img src={board.thumbnailUrl} alt={board.title} className="w-full h-full object-fill opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-4">
                    <span className="text-cyan-400 font-bold text-xs">{board.subtitle}</span>
                    <span className="text-white font-black text-xl">{board.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── [화면 1] 현황판 (HOME) ── */}
        {screen === "HOME" && currentBoard && (
          <div className="flex flex-col h-full relative">
            <div className="p-4 bg-[#0a0f1a] flex items-center justify-between border-b border-blue-900/50 shrink-0 z-20">
              <button onClick={() => setScreen("SELECT_BOARD")} className="text-blue-300 font-bold text-sm bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-800/50">
                ◀ 테마 목록
              </button>
              <h2 className="text-white font-bold text-sm">상품 현황판</h2>
              <div className="w-[84px]"></div>
            </div>

            <div className="relative w-full h-36 flex flex-col justify-end p-4 border-b border-blue-500/30 shrink-0">
              {/* 💡 [수정] 현황판 배너 역시 빈틈없이 채우기 위해 object-fill 적용 */}
              <img src={currentBoard.bannerUrl} alt="배너" className="absolute inset-0 w-full h-full object-fill opacity-40 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent"></div>
              
              <div className="relative z-10">
                <p className="text-cyan-300 text-xs mb-0.5 tracking-wider">{currentBoard.subtitle}</p>
                <h1 className="text-2xl font-black text-white leading-tight">{currentBoard.title}</h1>
              </div>
            </div>

            <div className="flex-1 relative w-full bg-[#050810]">
              <div className="absolute inset-0 overflow-y-auto p-4 space-y-3 pb-28">
                {prizeStats.map(([grade, stat]) => (
                  <div key={grade} className="rounded-xl p-3 flex items-center justify-between shadow border bg-[#121829] border-blue-900/60 min-h-[100px]">
                    
                    {/* 왼쪽: 상 뱃지 + 이름 */}
                    <div className="flex items-center gap-3 flex-1 overflow-hidden pr-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border bg-gradient-to-br from-yellow-300 to-amber-500 border-yellow-200 shrink-0 shadow-sm">
                        <span className="font-black text-black text-sm text-center px-0.5">
                          {grade}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-base text-white truncate">{currentBoard.prizes[grade]?.name || grade}</span>
                        <span className="text-blue-400/80 text-[11px] mt-0.5">잔여수량</span>
                      </div>
                    </div>
                    
                    {/* 오른쪽: 상품 이미지 + 숫자 영역 */}
                    <div className="flex items-center gap-4 shrink-0">
                      
                      {/* 🖼️ [수정] 상품 이미지를 더 크게 키웠습니다 (w-20 h-20) */}
                      {currentBoard.prizes[grade]?.img ? (
                        <div className="w-20 h-20 bg-black/40 rounded-lg overflow-hidden border border-blue-800/50 flex items-center justify-center shrink-0">
                          <img 
                            src={currentBoard.prizes[grade].img} 
                            alt={`${grade} 상품 이미지`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        /* 이미지가 설정되어 있지 않다면 자리만 차지하는 빈 박스 표시 */
                        <div className="w-20 h-20 bg-blue-900/10 rounded-lg border border-blue-900/30 border-dashed shrink-0 flex items-center justify-center">
                          <span className="text-xs text-blue-500/50 font-bold">NO IMG</span>
                        </div>
                      )}

                      <div className="text-right min-w-[50px]">
                        <span className="text-3xl font-black text-cyan-400">{stat.remaining}</span>
                        <span className="text-gray-500 font-bold text-sm"> / {stat.total}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/90 to-transparent pointer-events-none z-20">
              <button 
                onClick={() => setScreen("BOARD")}
                className="pointer-events-auto w-full py-4 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full text-white font-black text-xl shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95 transition-transform"
              >
                시작하기
              </button>
            </div>
          </div>
        )}

        {/* ── [화면 2] 쿠지판 (80개 렌더링) ── */}
        {screen === "BOARD" && currentBoard && (
          <div className="flex flex-col h-full bg-[#0d1424] relative">
            <div className="p-4 bg-[#0a0f1a] flex items-center justify-between z-20 shadow-md shrink-0">
              <button onClick={() => setScreen("HOME")} className="text-emerald-400 font-bold text-sm bg-emerald-900/30 px-3 py-1.5 rounded-lg border border-emerald-800/50 transition-colors hover:bg-emerald-800/50">
                ◀ 쿠지 홈으로
              </button>
              <h2 className="text-white font-bold text-base">원하는 쿠지를 고르세요</h2>
              <div className="w-[102px]"></div>
            </div>

            <div className="flex-1 relative w-full">
              <div className="absolute inset-0 overflow-y-auto p-3 pb-24">
                <div className="grid grid-cols-5 gap-1.5">
                  {currentTickets.map((ticket) => {
                    const isSelected = selectedTickets.some((t) => t.id === ticket.id);
                    
                    return (
                      <button
                        key={ticket.id}
                        onClick={() => toggleTicketSelection(ticket)}
                        disabled={ticket.is_opened}
                        className={`relative aspect-square rounded overflow-hidden transition-all flex flex-col items-center justify-center border p-0.5
                          ${ticket.is_opened 
                            ? "bg-[#1c2438] border-[#313f5c] cursor-not-allowed shadow-inner"
                            : isSelected
                              ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-100 scale-105 shadow-[0_0_12px_rgba(250,204,21,0.5)] z-10"
                              : "bg-gradient-to-br from-red-600 to-orange-700 border-red-400 active:scale-95 shadow-md"
                          }`}
                      >
                        <span className={`font-black text-center break-all leading-none
                          ${ticket.is_opened 
                            ? "text-[11px] text-cyan-300 tracking-tighter" 
                            : isSelected ? "text-sm text-black" : "text-sm text-white"
                          }`}>
                          {ticket.is_opened ? ticket.reward_grade : ticket.ticket_number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-[#0a0f1a] border-t border-blue-900/60 p-4 flex items-center justify-between z-20">
              <div className="text-white">
                <span className="text-cyan-400 font-black text-2xl">{selectedTickets.length}</span>
                <span className="text-xs text-gray-400 ml-1">개 선택됨</span>
              </div>
              <button 
                onClick={handleOpenCodeModal}
                disabled={selectedTickets.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full font-black text-white text-sm disabled:opacity-40 disabled:grayscale transition-all active:scale-95"
              >
                선택 완료
              </button>
            </div>
          </div>
        )}

        {/* ── [모달] 시크릿 코드 입력 ── */}
        {screen === "CODE_INPUT" && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121c2e] border border-blue-500/50 rounded-2xl w-full p-6 shadow-2xl">
              <h3 className="text-white text-center font-bold text-lg mb-1">시크릿 코드 인증</h3>
              <p className="text-blue-300/80 text-xs text-center mb-6">
                현재 <span className="text-cyan-400 font-bold">{selectedTickets.length}개</span>를 선택하셨습니다.<br/>
                결제하신 횟수만큼만 오픈됩니다.
              </p>
              
              <input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="예: ABCD-1234"
                className="w-full bg-black/60 border-2 border-blue-800 rounded-xl px-4 py-3 text-center text-white text-lg tracking-widest focus:outline-none focus:border-cyan-400 uppercase mb-2"
              />
              {errorMsg && <p className="text-red-400 text-xs text-center font-bold mb-3">{errorMsg}</p>}
              
              <div className="flex gap-3 mt-4">
                <button onClick={() => setScreen("BOARD")} className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-bold text-sm active:scale-95 transition-transform">취소</button>
                <button 
                  onClick={handleSubmitCode} 
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-black text-sm disabled:opacity-50 active:scale-95 transition-transform"
                >
                  {isSubmitting ? "확인 중..." : "쿠지 뜯기!"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── [화면 3] 리얼 3D 뜯기 연출 (Peel) ── */}
        {screen === "REVEAL" && revealResults.length > 0 && (
          <div className="flex flex-col h-full bg-[#0a0f1a] items-center justify-center p-6 pt-16">
            <div className="text-center mb-6">
              <h2 className="text-white text-xl font-bold mb-1">뽑기를 오픈합니다</h2>
              <p className="text-blue-300 text-xs">종이를 터치하여 뜯어보세요!</p>
              <p className="text-gray-500 text-xs mt-2">({currentRevealIndex + 1} / {revealResults.length})</p>
            </div>

            <div className="relative w-64 h-40 cursor-pointer shadow-2xl kuji-perspective mt-4" onClick={handlePeel}>
              <div className={`absolute inset-0 border-4 rounded-xl flex items-center justify-center
                ${revealResults[currentRevealIndex].reward_grade === "라스트원상" 
                  ? "bg-gradient-to-br from-[#2a0f18] to-[#381a22] border-pink-700" 
                  : "bg-gradient-to-br from-[#0f1423] to-[#1a2238] border-blue-900"}`}>
                <span className={`font-black drop-shadow-md text-center px-2
                  ${revealResults[currentRevealIndex].reward_grade === "라스트원상" ? "text-pink-400 text-3xl" : "text-white text-5xl"}`}>
                  {revealResults[currentRevealIndex].reward_grade}
                </span>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 border-4 border-white rounded-xl flex flex-col items-center justify-center kuji-flap z-10 ${isPeeled ? "is-peeled" : ""}`}>
                <div className="absolute left-3 top-0 bottom-0 w-1 bg-black/10 border-l border-dashed border-white/50"></div>
                <span className="text-white font-black text-2xl tracking-widest pl-4">
                  {revealResults[currentRevealIndex].ticket_number === "LAST" ? "LAST TICKET" : `${revealResults[currentRevealIndex].ticket_number}번 티켓`}
                </span>
                <span className="text-white/90 text-[10px] mt-2 font-bold pl-4">터치하여 뜯기 ➔</span>
              </div>
            </div>
          </div>
        )}

        {/* ── [화면 4] 최종 결과창 ── */}
        {screen === "RESULT" && revealResults.length > 0 && (
          <div className={`flex flex-col h-full items-center justify-center p-6 relative
            ${revealResults[currentRevealIndex].reward_grade === "라스트원상" ? "last-one-bg" : "star-bg"}`}>
            
            <div className="z-10 flex flex-col items-center text-center">
              <h2 className={`font-bold text-sm mb-4 tracking-widest 
                ${revealResults[currentRevealIndex].reward_grade === "라스트원상" ? "text-pink-300" : "text-green-300"}`}>
                {revealResults[currentRevealIndex].reward_grade === "라스트원상" ? "마지막 티켓을 구매하셨습니다!" : "축하합니다! 당첨되었습니다"}
              </h2>
              <div className="text-white font-black text-6xl mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                {revealResults[currentRevealIndex].reward_grade}
              </div>
              <div className={`text-white text-xl font-bold px-6 py-2 rounded-full border 
                ${revealResults[currentRevealIndex].reward_grade === "라스트원상" ? "bg-pink-900/60 border-pink-400" : "bg-black/40 border-white/20"}`}>
                {revealResults[currentRevealIndex].reward_name}
              </div>
            </div>

            <div className="absolute bottom-8 w-full px-6 z-10">
              <button 
                onClick={handleNextReveal}
                className={`w-full py-4 rounded-full text-white font-black text-lg active:scale-95 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.5)]
                  ${revealResults[currentRevealIndex].reward_grade === "라스트원상" 
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.5)]" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"}`}
              >
                {currentRevealIndex < revealResults.length - 1 ? "다음 결과 확인" : "현황판으로 돌아가기"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}