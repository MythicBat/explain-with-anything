"use client";

import { motion } from "framer-motion";
import type { Style } from "@/lib/types";

type Props = {
  setConcept: (value: string) => void;
  setStyle: (value: Style) => void;
};

const examples = [
  { concept: "Recursion", theme: "Minecraft", emoji: "🧱" },
  { concept: "Binary Search", theme: "Detective", emoji: "🕵️" },
  { concept: "Neural Networks", theme: "Cooking", emoji: "🍳" },
  { concept: "APIs", theme: "Football", emoji: "⚽" },
];

const modes: { label: string; style: Style; emoji: string; desc: string }[] = [
  {
    label: "Quick Explain",
    style: "fun",
    emoji: "⚡",
    desc: "Fast analogy-based explanation",
  },
  {
    label: "Comic Mode",
    style: "comic",
    emoji: "🎭",
    desc: "Turns concepts into panels",
  },
  {
    label: "Quiz Me",
    style: "clear",
    emoji: "🧠",
    desc: "Generate questions to test yourself",
  },
  {
    label: "Story Mode",
    style: "story",
    emoji: "📖",
    desc: "Learn through a mini story",
  },
];

export default function DashboardPanel({ setConcept, setStyle }: Props) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <p className="text-sm text-cyan-200">Learning Modes</p>
        <h2 className="mt-1 text-xl font-bold">Choose your style</h2>

        <div className="mt-4 grid grid-cols-1 gap-3">
          {modes.map((m, index) => (
            <motion.button
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStyle(m.style)}
              className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left transition hover:bg-white/15"
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{m.emoji}</span>
                <div>
                  <p className="font-semibold">{m.label}</p>
                  <p className="text-xs text-slate-300">{m.desc}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <p className="text-sm text-fuchsia-200">Try these</p>
        <h2 className="mt-1 text-xl font-bold">Example prompts</h2>

        <div className="mt-4 space-y-3">
          {examples.map((ex) => (
            <button
              key={ex.concept}
              onClick={() => setConcept(ex.concept)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left transition hover:bg-white/15"
              type="button"
            >
              <span>
                <span className="mr-2">{ex.emoji}</span>
                {ex.concept}
              </span>
              <span className="text-xs text-slate-300">{ex.theme}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-400/10 p-5 text-white backdrop-blur-xl">
        <p className="text-sm text-cyan-100">Study Buddy Tip</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          Generate an answer first, then click the 3D Study Buddy avatar to ask
          follow-up doubts by voice.
        </p>
      </div>
    </motion.aside>
  );
}