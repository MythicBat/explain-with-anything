import { NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { buildPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { concept, theme, level, style } = body;

    if (!concept || !theme || !level) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const genAI = getGeminiClient();
    const prompt = buildPrompt({ concept, theme, level, style });

    // IMPORTANT: use structured contents (works reliably)
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return NextResponse.json({ text: response.text, style});
  } catch (err: unknown) {
    console.error("EXPLAIN API ERROR:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}