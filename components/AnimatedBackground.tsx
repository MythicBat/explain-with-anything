"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(135deg,_#060816,_#0b1023_45%,_#111827)]" />

      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 35, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 25, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
    </div>
  );
}