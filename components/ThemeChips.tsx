"use client";

import { THEMES, ThemeKey } from "@/lib/themes";
import { motion } from "framer-motion";

export default function ThemeChips({
  value,
  onChange,
}: {
  value: ThemeKey;
  onChange: (v: ThemeKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map((t, index) => {
        const active = t.key === value;
        return (
          <motion.button
            key={t.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * index, duration: 0.25 }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(t.key)}
            className={[
              "px-3 py-2 rounded-full border text-sm transition shadow-sm",
              active
                ? "bg-black text-white border-black shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                : "bg-white/80 backdrop-blur-sm hover:bg-white border-gray-200",
            ].join(" ")}
            type="button"
            title={t.vibe}
          >
            <span className="mr-2">{t.emoji}</span>
            {t.label}
          </motion.button>
        );
      })}
    </div>
  );
}