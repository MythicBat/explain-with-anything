"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ExplainForm from "@/components/ExplainForm";
import SplashScreen from "@/components/SplashScreen";

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
            className="min-h-screen bg-[linear-gradient(180deg,#f7fafc,#eef5ff_30%,#f8fafc)] px-4 py-10"
          >
            <ExplainForm />
            <p className="mt-10 text-center text-xs text-slate-500">
              Built for StrathSpace HackDay using Next.js + Gemini + Firebase
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}