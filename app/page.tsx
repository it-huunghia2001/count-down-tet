/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/purity */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Calendar,
  Share2,
  Music,
  Sparkles,
  SkipForward,
  SkipBack,
} from "lucide-react";
import confetti from "canvas-confetti";

// Danh sách phát nhạc
const PLAYLIST = [
  { id: 0, title: "Tết Đong Đầy", artist: "KHOA", src: "/bai1.mp3" },
  { id: 1, title: "Tết Đến Thật Rồi", artist: "UNI5", src: "/bai2.mp3" },
  {
    id: 2,
    title: "Tết Về Sớm Nhé",
    artist: "Phan Mạnh Quỳnh",
    src: "/bai3.mp3",
  },
  {
    id: 3,
    title: "Em Chào Tết",
    artist: "Bích Phương",
    src: "/bai4.mp3",
  },
  {
    id: 4,
    title: "Tết Đong Đầy 2",
    artist: "KHOA & Lăng LD",
    src: "/bai5.mp3",
  },
  {
    id: 5,
    title: "Tết Tết Tết",
    artist: "Đồ Phú Quí",
    src: "/bai6.mp3",
  },
];

export default function LuxuryTetCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const targetDate = new Date("2026-02-17T00:00:00").getTime();

  // Chuyển bài
  const nextTrack = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handleTrackEnded = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
  };

  const prevTrack = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  // Logic đếm ngược
  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Tự động phát khi đổi track (nếu đang bật)
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  const handleScreenClick = (e: React.MouseEvent) => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#fbbf24", "#ef4444", "#ffffff"],
      ticks: 200,
      gravity: 1.2,
    });
  };

  if (!isMounted) return <div className="min-h-screen bg-[#0f0202]" />;

  return (
    <div
      onClick={handleScreenClick}
      className="min-h-screen bg-[#0f0202] text-slate-200 selection:bg-yellow-500/30 overflow-x-hidden cursor-crosshair relative font-sans py-10!"
    >
      <style jsx global>{`
        @font-face {
          font-family: "MorningCalm";
          src: url("/fonts/NVN-Morning-Calm.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
        }
        @keyframes rotate-360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotate-360 {
          animation: rotate-360 15s linear infinite;
        }
      `}</style>
      {/* 1. Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4a0404_0%,#0f0202_100%)] opacity-70" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Trong_dong_Ngoc_Lu.svg/1024px-Trong_dong_Ngoc_Lu.svg.png"
            className="w-[80vh] invert"
            alt="bg"
          />
        </div>
      </div>

      <main className="relative z-20 w-full mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12!"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8! backdrop-blur-md shadow-2xl">
            <Sparkles size={16} className="text-yellow-500 animate-pulse" />
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-yellow-500/80">
              Lunar New Year 2026
            </span>
          </div>

          <h1 className="relative mb-6!">
            <span
              style={{ fontFamily: "'MorningCalm' , serif" }}
              className="block text-6xl md:text-[10rem]  font-bold leading-none tracking-tighter bg-gradient-to-b from-yellow-100 via-yellow-500 to-yellow-800 bg-clip-text text-transparent italic"
            >
              BÍNH NGỌ
            </span>
          </h1>
          <p className="text-sm md:text-xl text-slate-400 font-light tracking-[0.3em] uppercase">
            Kỷ nguyên phồn vinh & thịnh vượng
          </p>
        </motion.div>

        {/* 2. Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
          <CountdownCard value={timeLeft.d} label="NGÀY" />
          <CountdownCard value={timeLeft.h} label="GIỜ" />
          <CountdownCard value={timeLeft.m} label="PHÚT" />
          <CountdownCard value={timeLeft.s} label="GIÂY" isLast />
        </div>

        {/* 3. Playlist & Music Controller */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16!  w-full max-w-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[3rem] p-6 shadow-2xl group relative overflow-hidden md:pl-0! md:py-0! py-4! px-10!"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Vinyl Record */}
            <div
              className="relative cursor-pointer shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                if (audioRef.current) {
                  isPlaying
                    ? audioRef.current.pause()
                    : audioRef.current.play();
                  setIsPlaying(!isPlaying);
                }
              }}
            >
              <div
                className={`w-24 h-24 rounded-full border-2 border-yellow-600/40 overflow-hidden transition-transform duration-[6000ms] ease-linear shadow-2xl ${isPlaying ? "rotate-360" : ""}`}
              >
                <img
                  src="https://images.unsplash.com/photo-1464306208223-e0b4495a5553?q=80&w=200"
                  className="w-full h-full object-cover"
                  alt="Cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full group-hover:bg-black/20 transition-colors">
                {isPlaying ? (
                  <Pause className="text-white" />
                ) : (
                  <Play className="text-white fill-white ml-1" />
                )}
              </div>
            </div>

            {/* Info & Sub-Controls */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif font-bold text-white text-xl tracking-wide uppercase truncate max-w-[250px]">
                    {PLAYLIST[currentTrack].title}
                  </h3>
                  <p className="text-[10px] text-yellow-600 font-bold tracking-[0.2em] uppercase mt-1!">
                    {PLAYLIST[currentTrack].artist} — {currentTrack + 1}/6
                  </p>
                </div>
                <div className="flex gap-4 text-slate-400 pr-10!">
                  <SkipBack
                    size={20}
                    className="cursor-pointer hover:text-yellow-500 transition-colors"
                    onClick={prevTrack}
                  />
                  <SkipForward
                    size={20}
                    className="cursor-pointer hover:text-yellow-500 transition-colors"
                    onClick={nextTrack}
                  />
                </div>
              </div>

              {/* Visualizer */}
              <div className="flex items-end gap-1.5 h-8">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlaying ? [5, Math.random() * 24 + 10, 4] : 4,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.03,
                    }}
                    className="flex-1 bg-gradient-to-t from-yellow-800 via-yellow-500 to-yellow-200 rounded-full opacity-60"
                  />
                ))}
              </div>
            </div>
          </div>
          <audio
            ref={audioRef}
            src={PLAYLIST[currentTrack].src}
            onEnded={handleTrackEnded}
            loop={false}
          />
        </motion.div>

        {/* Footer */}
        <div className="mt-16! flex gap-10 text-[10px] tracking-[0.4em] text-slate-500 font-bold uppercase">
          <div className="flex items-center gap-2 hover:text-yellow-500 transition-colors cursor-pointer">
            <Calendar size={14} /> <span>17.02.2026</span>
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-500 transition-colors cursor-pointer">
            <Share2 size={14} /> <span>Chia sẻ</span>
          </div>
        </div>
      </main>

      <CustomCursor />

      <style jsx global>{`
        @keyframes rotate-360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotate-360 {
          animation: rotate-360 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

function CountdownCard({ value, label, isLast = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-b from-yellow-500/20 to-transparent rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />
      <div className="relative aspect-[4/5] bg-[#1a0505]/40 border border-white/5 rounded-[2rem] flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl transition-all duration-500 group-hover:border-yellow-600/30 group-hover:bg-white/[0.05]">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
            className="text-5xl md:text-8xl font-sans font-black tracking-tighter text-white"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <div className="absolute bottom-8 text-[9px] md:text-[11px] tracking-[0.5em] font-black text-yellow-600 uppercase opacity-80">
          {label}
        </div>
      </div>
      {!isLast && (
        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-white/5 text-5xl font-thin select-none">
          /
        </div>
      )}
    </motion.div>
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const handle = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <>
      <motion.div
        animate={{ x: pos.x - 16, y: pos.y - 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 border border-yellow-500/40 rounded-full pointer-events-none z-[9999] hidden md:block"
      />
      <motion.div
        animate={{ x: pos.x - 2, y: pos.y - 2 }}
        className="fixed top-0 left-0 w-1 h-1 bg-yellow-500 rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_#fbbf24]"
      />
    </>
  );
}
