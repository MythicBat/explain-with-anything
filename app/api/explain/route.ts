import { NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { buildPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const { concept, theme, level, style } = await req.json();

    if (!concept || !theme || !level) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const genAI = getGeminiClient();
    const prompt = buildPrompt({ concept, theme, level, style });

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;

    return NextResponse.json({ text });

  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}