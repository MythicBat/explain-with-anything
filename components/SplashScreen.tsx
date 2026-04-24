"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import FloatingEmojis from "./FloatingEmojis";
import InteractiveParticles from "./InteractiveParticles";
import HumanStudyBuddy from "./HumanStudyBuddy";

export default function SplashScreen({
  onStart,
}: {
  onStart: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden text-white"
    >
      <AnimatedBackground />
      <InteractiveParticles />
      <FloatingEmojis />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-cyan-300/30 bg-white/10 text-5xl shadow-[0_0_35px_rgba(34,211,238,0.22)]"
            >
              <HumanStudyBuddy />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-100">
                <Sparkles className="h-4 w-4" />
                Your futuristic study companion
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
                Hi! I’m your
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Study Buddy
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-lg">
                Explain anything through themes, stories, comics, voice, and
                follow-up chat — all in one smooth AI learning experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <button
                onClick={onStart}
                className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-slate-900 transition hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                type="button"
              >
                Start Learning
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-slate-200">
                Voice-first • Comic mode • Save & share
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}