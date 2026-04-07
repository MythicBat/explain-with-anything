"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { X, Sparkles, Minimize2 } from "lucide-react";

const DEFAULT_HINTS = [
    "Try voice mode 🎤",
    "Ask a follow-up doubt 💬",
    "Switch to comic mode 🎭",
    "Save and share your explanation 🔗",
];

export default function StudyBuddyOrb({
    hints = DEFAULT_HINTS,
}: {
    hints?: string[];
}) {
    const safeHints = useMemo(
        () => (hints.length ? hints : DEFAULT_HINTS),
        [hints]
    );

    const [open, setOpen] = useState(true);
    const [hintIndex, setHintIndex] = useState(0);

    useEffect(() => {
        if (!open) return;

        const interval = setInterval(() => {
            setHintIndex((prev) => (prev + 1) % safeHints.length);
        }, 3200);

        return () => clearInterval(interval);
    }, [open, safeHints.length]);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
            <AnimatePresence mode="wait">
                {open && (
                    <motion.div
                        key={hintIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className="max-w-[220px] rounded-2xl border border-white/20 bg-slate-950/80 px-4 py-3 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-cyan-400/10 px-2 py-1 text-[11px] text-cyan-200">
                                    <Sparkles className="h-3 w-3" />
                                    Study Buddy
                                </div>
                                <p className="leading-5 text-slate-100">{safeHints[hintIndex]}</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-md p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                title="Hide tips"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                animate={{
                    y: [0, -6, 0],
                    boxShadow: [
                        "0 0 0 rgba(34,211,238,0.25)",
                        "0 0 24px rgba(34,211,238,0.35)",
                        "0 0 0 rgba(34,211,238,0.25)",
                    ],
                }}
                transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-slate-950/85 text-3xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                title={open ? "Minimize Study Buddy" : "Open Study Buddy"}
            >
                <motion.span
                    animate={{ rotate: [0, 6, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    🤖
                </motion.span>

                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-400/20 text-white">
                    {open ? <Minimize2 className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                </span>
            </motion.button>
        </div>
    );
}