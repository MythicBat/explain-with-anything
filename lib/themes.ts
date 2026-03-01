// lib/themes.ts
export type ThemeKey =
  | "minecraft"
  | "football"
  | "cooking"
  | "anime"
  | "space"
  | "detective";

export const THEMES: {
  key: ThemeKey;
  label: string;
  emoji: string;
  vibe: string;
  bg: string;     // tailwind gradient
  accent: string; // tailwind ring / border color
}[] = [
  { key: "minecraft", label: "Minecraft", emoji: "🧱", vibe: "blocky, crafting, survival", bg: "from-emerald-50 to-lime-50", accent: "ring-emerald-200" },
  { key: "football", label: "Football", emoji: "⚽", vibe: "teamwork, tactics, training", bg: "from-sky-50 to-blue-50", accent: "ring-sky-200" },
  { key: "cooking", label: "Cooking", emoji: "🍳", vibe: "recipes, steps, taste", bg: "from-orange-50 to-amber-50", accent: "ring-orange-200" },
  { key: "anime", label: "Anime", emoji: "🎴", vibe: "power-ups, arcs, rivals", bg: "from-fuchsia-50 to-pink-50", accent: "ring-fuchsia-200" },
  { key: "space", label: "Space", emoji: "🪐", vibe: "planets, gravity, missions", bg: "from-indigo-50 to-violet-50", accent: "ring-indigo-200" },
  { key: "detective", label: "Detective", emoji: "🕵️", vibe: "clues, mystery, reasoning", bg: "from-slate-50 to-gray-50", accent: "ring-slate-200" },
];

export function getThemeMeta(key: ThemeKey) {
  return THEMES.find((t) => t.key === key) ?? THEMES[0];
}