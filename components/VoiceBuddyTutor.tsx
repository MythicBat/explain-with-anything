"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VoiceInput from "./VoiceInput";
import HumanStudyBuddy from "./HumanStudyBuddy";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function VoiceBuddyTutor({
  enabled,
  theme,
  level,
  initialContext,
}: {
  enabled: boolean;
  theme: string;
  level: string;
  initialContext: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function ask(text: string) {
    if (!text.trim() || loading) return;

    const nextMessages: ChatMessage[] = [
      { role: "assistant", text: initialContext },
      ...messages,
      { role: "user", text },
    ];

    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          theme,
          level,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Tutor failed");

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      speak(data.reply);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-4 w-[340px] overflow-hidden rounded-3xl border border-white/15 bg-slate-950/85 text-white shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <h3 className="font-semibold">Ask me your doubts 🎤</h3>
              <p className="text-xs text-slate-300">
                Speak naturally. I’ll answer out loud.
              </p>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200">
                  Tap the mic and ask: “Can you explain this simpler?”
                </p>
              )}

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-cyan-400 text-slate-950"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {loading && (
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-300">
                  Thinking...
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
              <VoiceInput
                onTranscript={(text) => {
                  ask(text);
                }}
              />
              <button
                type="button"
                onClick={() => speak("Ask me your doubts. I am listening.")}
                className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm hover:bg-white/15"
              >
                Talk to Study Buddy
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        disabled={!enabled}
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open && enabled) {
            speak("Ask me your doubts. I am listening.");
          }
        }}
        whileHover={{ scale: enabled ? 1.06 : 1 }}
        whileTap={{ scale: enabled ? 0.96 : 1 }}
        className={`h-24 w-24 rounded-full border border-cyan-300/30 bg-slate-950/80 shadow-[0_0_35px_rgba(34,211,238,0.25)] backdrop-blur-xl ${
          enabled ? "cursor-pointer" : "cursor-not-allowed opacity-40"
        }`}
      >
        <HumanStudyBuddy />
      </motion.button>
    </div>
  );
}