"use client";

import { useMemo, useState } from "react";
import ThemeChips from "./ThemeChips";
import ResultCard from "./ResultCard";
import { ThemeKey } from "@/lib/themes";
import { getThemeMeta } from "@/lib/themes";
import type { ExplainInput, Level, Style } from "@/lib/types";
import ComicGrid from "./ComicGrid";
import { safeParseJson } from "@/lib/safeJson";
import type { ComicPayload } from "@/lib/types";

const LEVELS: { key: Level; label: string }[] = [
  { key: "kid", label: "Kid" },
  { key: "high-school", label: "High school" },
  { key: "uni", label: "University" },
  { key: "expert", label: "Expert" },
];

const STYLES: { key: Style; label: string }[] = [
  { key: "clear", label: "Clear" },
  { key: "fun", label: "Fun" },
  { key: "meme", label: "Meme" },
  { key: "story", label: "Story" },
  { key: "rap", label: "Rap" },
  { key: "poem", label: "Poem" },
  { key: "comic", label: "Comic Script" },
];

export default function ExplainForm() {
  const [concept, setConcept] = useState("");
  const [theme, setTheme] = useState<ThemeKey>("minecraft");
  const [level, setLevel] = useState<Level>("high-school");
  const [style, setStyle] = useState<Style>("fun");
  const [shareURL, setShareURL] = useState<string>("");
  const [responseStyle, setResponseStyle] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const themeMeta = useMemo(
    () => getThemeMeta(theme),
    [theme]
  );

  async function saveShare() {
    if (!output) return;

    setError("");
    setShareURL("");
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept,
          theme: themeMeta?.label ?? theme,
          themeKey: theme,
          level,
          style,
          text: output,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");

      const url = `${window.location.origin}/share/${data.id}`;
      setShareURL(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  } 

  async function generate() {
    setError("");
    setOutput("");

    const trimmed = concept.trim();
    if (!trimmed) {
      setError("Type a concept first (e.g., recursion, blockchain, DP, inflation).");
      return;
    }

    const payload: ExplainInput = {
      concept: trimmed,
      theme: themeMeta?.label ?? theme,
      level,
      style,
    };

    setLoading(true);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setResponseStyle(data.style || "");
      setOutput(data.text);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={`rounded-2xl border border-gray-200 bg-gradient-to-br ${themeMeta.bg} shadow-sm p-5`}>
        <h1 className="text-2xl font-bold">Explain It With Anything ✨</h1>
        <p className="text-gray-600 mt-1">
          Turn any concept into a fun analogy with one click.
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs border border-gray-200">
          <span>{themeMeta.emoji}</span>
          <span className="font-medium">{themeMeta.label}</span>
          <span className="text-gray-500">{themeMeta.vibe}</span>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">
            Concept to explain
          </label>
          <input
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder='e.g., "Recursion", "Quickselect", "Neural Networks"'
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Theme</label>
          <div className="mt-2">
            <ThemeChips value={theme} onChange={setTheme} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-white"
            >
              {LEVELS.map((l) => (
                <option key={l.key} value={l.key}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as Style)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-white"
            >
              {STYLES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-5 flex gap-3">
          <button
            onClick={generate}
            disabled={loading}
            className={[
              "px-5 py-3 rounded-xl font-medium transition",
              loading
                ? "bg-gray-200 text-gray-700"
                : "bg-black text-white hover:opacity-90",
            ].join(" ")}
            type="button"
          >
            {loading ? "Generating..." : "Generate explanation"}
          </button>

          <button
            type="button"
            onClick={() => {
              setConcept("");
              setOutput("");
              setError("");
            }}
            className="px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            Reset
          </button>

          <button
          type="button"
          onClick={saveShare}
          disabled={!output}
          className={[
            "px-5 py-3 rounded-xl border transition",
            output ? "border-gray-200 hover:bg-gray-50" : "border-gray-100 text-gray-400",
          ].join(" ")}>
            Save & Share
          </button>
        </div>

        {loading && (
          <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-600">
            <div className="animate-pulse">
              Gemini is cooking your analogy… 🍳✨
            </div>
          </div>
        )}

        {shareURL && (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white/70 p-4">
            <p className="text-xs text-gray-600">Share Link:</p>
            <div className="mt-2 flex gap-2 items-center">
              <input
                value={shareURL}
                readOnly
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"/>
              <button
                onClick={() => navigator.clipboard.writeText(shareURL)}
                className="px-4 py-2 rounded-xl bg-black text-white text-sm"
                type="button">
                Copy
                </button>
            </div>
          </div>
        )}
      </div>

      {output && responseStyle === "comic" ? (
        (() => {
          const parsed = safeParseJson<ComicPayload>(output);
          if(!parsed.ok) {
            return (
              <div className="mt-6 rounded-2xl border border-red-200 bg-white p-5">
                <p className="text-sm text-red-600 font-medium">Comic Parsing failed</p>
                <p className="text-sm text-gray-600 mt-2">
                  Gemini returned something that was not a valid JSON. Try again.
                </p>
                <pre className="mt-3 text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto">
                  {output}
                </pre>
              </div>
            );
          }
          return <ComicGrid comic={parsed.value} />;
        })()
      ) : (
        <ResultCard text={output} onCopy={copy} />
      )}
    </div>
  );
}