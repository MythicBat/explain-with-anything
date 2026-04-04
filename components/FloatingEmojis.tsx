"use client";

import { motion } from "framer-motion";

const items = [
  { emoji: "🤖", top: "12%", left: "10%", delay: 0 },
  { emoji: "📚", top: "20%", right: "12%", delay: 0.4 },
  { emoji: "✨", top: "68%", left: "15%", delay: 0.7 },
  { emoji: "🧠", top: "72%", right: "16%", delay: 1.1 },
  { emoji: "💬", top: "40%", left: "6%", delay: 1.4 },
  { emoji: "🎓", top: "48%", right: "8%", delay: 1.8 },
];

export default function FloatingEmojis() {
    return (
        <>
            {items.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity : 0, y : 10 }}
                    animate={{
                        opacity : 1,
                        y : [0,-12,0],
                        rotate: [0, 4, -4, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute text-3xl sm:text-4xl drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                    }}
                    >
                        {item.emoji}
                </motion.div>
            ))}
        </>
    );
}