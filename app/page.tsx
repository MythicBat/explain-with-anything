"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ExplainForm from "@/components/ExplainForm";
import SplashScreen from "@/components/SplashScreen";
import StudyBuddyOrb from "@/components/StudyBuddyOrb";

export default function Page() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {!started ? (
          <SplashScreen key="splash" onStart={() => setStarted(true)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative min-h-screen bg-[linear-gradient(180deg,#f7fafc,#eef5ff_30%,#f8fafc)] px-4 py-10 overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl"/>
              <div className="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl"/>
            </div>
            <div className="relative z-10">
              <ExplainForm />
            </div>
            
            <StudyBuddyOrb />
            <p className="mt-10 text-center text-xs text-slate-500">
              Built for StrathSpace HackDay using Next.js + Gemini + Firebase
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}