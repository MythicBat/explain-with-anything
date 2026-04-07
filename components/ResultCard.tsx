"use client";

export default function ResultCard({
  text,
  onCopy,
}: {
  text: string;
  onCopy: () => void;
}) {
  return (
    <div className="mt-6 rounded-[28px] border border-white/70 bg-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80">
        <div>
          <p className="text-sm text-gray-500">Your explanation</p>
          <h2 className="text-lg font-semibold">Explain It With Anything ✨</h2>
        </div>
        <button
          onClick={onCopy}
          className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
          type="button"
        >
          Copy
        </button>
      </div>

      <div className="px-5 py-5 whitespace-pre-wrap leading-relaxed text-gray-900">
        {text}
      </div>
    </div>
  );
}