export type ThemeKey = 
    | "minecraft"
    | "football"
    | "cooking"
    | "anime"
    | "space"
    | "detective"

export const THEMES: {key: ThemeKey, label: string; emoji: string; vibe: string}[] = [
    {key: "minecraft", label: "Minecraft", emoji: "🧱", vibe: "blocky, crafting, survival"},
    {key: "football", label: "Football", emoji: "⚽", vibe: "teamwork, tactics, training"},
    {key: "cooking", label: "Cooking", emoji: "🍳", vibe: "recipes, steps, taste"},
    {key: "anime", label: "Anime", emoji: "🎌", vibe: "power-ups, arcs, rivals"},
    {key: "space", label: "Space", emoji: "🚀", vibe: "planets, gravity, adventurous"},
    {key: "detective", label: "Detective", emoji: "🕵️", vibe: "mysterious, investigative, puzzle-solving"}
];