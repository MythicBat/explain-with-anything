"use client";

import { THEMES, ThemeKey } from "@/lib/themes";

export default function ThemeChips({
  value,
  onChange,
}: {
  value: ThemeKey;
  onChange: (v: ThemeKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={[
              "px-3 py-2 rounded-full border text-sm transition",
              active
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-50 border-gray-200",
            ].join(" ")}
            type="button"
            title={t.vibe}
          >
            <span className="mr-2">{t.emoji}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}