import { getFirestoreAdmin } from "@/lib/firebaseAdmin";
import type { ExplanationDoc } from "@/lib/types";
import { getThemeMeta } from "@/lib/themes";
import type { ThemeKey } from "@/lib/themes";

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // unwrap params

  const db = getFirestoreAdmin();
  const snap = await db.collection("explanations").doc(id).get();

  if (!snap.exists) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-2xl mx-auto rounded-2xl border bg-white p-6">
          <h1 className="text-xl font-bold">Not found</h1>
          <p className="text-gray-600 mt-2">This share link doesn’t exist.</p>
        </div>
      </main>
    );
  }

  const data = snap.data() as ExplanationDoc;
  const t = getThemeMeta(data.themeKey as ThemeKey);

  return (
    <main className={`min-h-screen bg-gradient-to-br ${t.bg} px-4 py-10`}>
      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs border border-gray-200">
        <span>{t.emoji}</span>
        <span className="font-medium">{t.label}</span>
        <span className="text-gray-500">{t.vibe}</span>
      </div>
      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">Shared explanation</p>
          <h1 className="text-2xl font-bold">Explain It With Anything ✨</h1>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Concept:</span> {data.concept} •{" "}
            <span className="font-medium">Theme:</span> {data.theme} •{" "}
            <span className="font-medium">Level:</span> {data.level}
          </p>
        </div>

        <div className="px-5 py-5 whitespace-pre-wrap leading-relaxed text-gray-900">
          {data.text}
        </div>
      </div>
    </main>
  );
}