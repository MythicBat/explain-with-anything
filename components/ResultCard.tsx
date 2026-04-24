"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ResultCard({
  text,
  onCopy,
}: {
  text: string;
  onCopy: () => void;
}) {
  return (
    <div className="mt-6 rounded-[28px] border border-white/70 bg-white/90 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/80">
        <div>
          <p className="text-sm text-slate-500">Your explanation</p>
          <h2 className="text-xl font-bold text-slate-900">
            Explain It With Anything ✨
          </h2>
        </div>

        <button
          onClick={onCopy}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm text-slate-700"
          type="button"
        >
          Copy
        </button>
      </div>

      <div className="px-6 py-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="mb-4 leading-7 text-slate-800">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-slate-950">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-800">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 ml-6 list-decimal space-y-2 text-slate-800">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-7">{children}</li>
            ),
            h1: ({ children }) => (
              <h1 className="mb-4 mt-6 text-2xl font-bold text-slate-950">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 mt-6 text-xl font-bold text-slate-950">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-2 mt-5 text-lg font-semibold text-slate-950">
                {children}
              </h3>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}