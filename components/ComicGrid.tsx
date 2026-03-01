"use client";

import type { ComicPayload } from "@/lib/types";

export default function ComicGrid({ comic }: { comic: ComicPayload }) {
  const panels = (comic.panels || []).slice(0, 6);

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-sm text-gray-500">Comic Mode</p>
        <h2 className="text-lg font-semibold">{comic.title || "Mini Comic"}</h2>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {panels.map((p, idx) => (
          <div key={idx} className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2 text-xs font-medium bg-gray-50 border-b border-gray-100">
              Panel {idx + 1}
            </div>

            <div className="p-4 space-y-3">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">🎬 </span>
                {p.caption}
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm text-gray-900">
                <span className="font-semibold">💬 </span>
                {p.dialogue}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 pb-5 text-xs text-gray-500">
        Tip: try Remix 🎲 for a new comic arc.
      </div>
    </div>
  );
}