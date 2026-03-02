// lib/comicNormalize.ts
import type { ComicPayload, ComicPanel } from "@/lib/types";

// Accept Gemini variations safely
type RawPanel = Partial<ComicPanel> & { captions?: string };

export function normalizeComic(raw: ComicPayload): ComicPayload {
  const rawPanels = (raw.panels ?? []) as RawPanel[];

  const panels: ComicPanel[] = rawPanels.slice(0, 6).map((p) => ({
    caption: (p.caption ?? p.captions ?? "").toString(),
    dialogue: (p.dialogue ?? "").toString(),
  }));

  // If Gemini returns fewer than 6, pad to 6 so UI always looks consistent
  while (panels.length < 6) {
    panels.push({
      caption: "A new scene appears…",
      dialogue: "…",
    });
  }

  return {
    title: (raw.title ?? "Mini Comic").toString(),
    panels,
  };
}