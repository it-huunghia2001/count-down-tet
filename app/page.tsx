/* eslint-disable react-hooks/purity */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Calendar, Share2, Music, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function LuxuryTetCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mùng 1 Tết Bính Ngọ: 17/02/2026
  const targetDate = new Date("2026-02-17T00:00:00").getTime();

  // Fix Hydration
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

  // Hiệu ứng pháo hoa khi nhấn vào bất kỳ đâu
  const handleScreenClick = (e: React.MouseEvent) => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#fbbf24", "#ef4444", "#ffffff"],
      ticks: 200,
    });
  };

  if (!isMounted) return <div className="min-h-screen bg-[#0f0202]" />;

  return (
    <div
      onClick={handleScreenClick}
      className="min-h-[100vh] bg-[#0f0202] text-slate-200 selection:bg-yellow-500/30 overflow-x-hidden cursor-crosshair"
    >
      {/* 1. Background Layering */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4a0404_0%,#0f0202_100%)] opacity-70" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
      </div>

      <main className="relative z-20 w-full mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm shadow-xl">
            <Sparkles size={16} className="text-yellow-500 animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium text-yellow-500/80 font-sans">
              Lunar New Year 2026
            </span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-serif font-bold leading-none tracking-tighter">
            BÍNH{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-500 to-yellow-800 italic">
              NGỌ
            </span>
          </h1>
          <p className="mt-6 text-sm md:text-xl text-slate-400 font-light tracking-[0.3em] font-sans uppercase">
            Kỷ nguyên phồn vinh & thịnh vượng
          </p>
        </motion.div>

        {/* 3. Luxury Countdown Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
          <CountdownCard value={timeLeft.d} label="NGÀY" />
          <CountdownCard value={timeLeft.h} label="GIỜ" />
          <CountdownCard value={timeLeft.m} label="PHÚT" />
          <CountdownCard value={timeLeft.s} label="GIÂY" isLast />
        </div>

        {/* 4. Interactive Music Visualizer */}
        <motion.div
          whileHover={{ y: -5 }}
          className="mt-20 w-full max-w-2xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div
            className="relative group cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn nổ confetti khi bấm nút nhạc
              if (audioRef.current) {
                isPlaying ? audioRef.current.pause() : audioRef.current.play();
                setIsPlaying(!isPlaying);
              }
            }}
          >
            <div
              className={`w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-600/30 transition-all duration-1000 ${
                isPlaying ? "rotate-[360deg] scale-105" : ""
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1464306208223-e0b4495a5553?q=80&w=200&auto=format&fit=crop"
                alt="Cover"
                className="object-cover w-full h-full opacity-60"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl group-hover:bg-black/20 transition-colors">
              {isPlaying ? (
                <Pause className="text-white" />
              ) : (
                <Play className="text-white fill-white ml-1" />
              )}
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full z-10">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-serif font-bold text-white text-xl tracking-wide uppercase">
                  Khúc Giao Thừa
                </h3>
                <p className="text-xs text-slate-500 font-sans tracking-widest uppercase mt-1">
                  Lofi Chill Version
                </p>
              </div>
              <Music
                className={`text-yellow-600 ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
                size={20}
              />
            </div>
            <div className="flex items-center gap-1.5 h-10">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [4, Math.random() * 32 + 4, 4] : 4,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.03,
                  }}
                  className="flex-1 bg-gradient-to-t from-yellow-800 via-yellow-500 to-yellow-200 rounded-full opacity-60"
                />
              ))}
            </div>
          </div>
          <audio
            ref={audioRef}
            loop
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
          />
        </motion.div>

        {/* Footer */}
        <div className="mt-20 flex gap-10 text-[10px] tracking-[0.4em] text-slate-500 font-bold uppercase">
          <div className="flex items-center gap-2 hover:text-yellow-500 transition-colors cursor-pointer">
            <Calendar size={14} /> <span>17.02.2026</span>
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-500 transition-colors cursor-pointer">
            <Share2 size={14} /> <span>Chia sẻ</span>
          </div>
        </div>
      </main>

      <CustomCursor />
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
      {/* Shine Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-yellow-500/20 to-transparent rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />

      <div className="relative aspect-[4/5] bg-[#1a0505]/40 border border-white/5 rounded-[2rem] flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl transition-all duration-500 group-hover:border-yellow-600/30 group-hover:bg-white/[0.05]">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
            transition={{ type: "spring", stiffness: 100 }}
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
  const [pos, setPos] = useState({ x: 0, y: 0 });
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
        className="fixed top-0 left-0 w-1 h-1 bg-yellow-500 rounded-full pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
}
