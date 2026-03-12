import { NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { buildTutorMessages } from "@/lib/tutorPrompt";
import type { TutorRequest } from "@/lib/types";

export async function POST(req: Request) {
    try {
        const body: TutorRequest = await req.json();
        const { messages, theme, level } = body;

        if (!messages || messages.length === 0) {
            return NextResponse.json({ error: "Messages are required." }, { status: 400 });
        }

        const genAI = getGeminiClient();
        const { systemInstruction, conversation } = buildTutorMessages({
            messages,
            theme,
            level,
        });

        const response = await genAI.models.generateContent({
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",
            contents: conversation,
            config: {
                systemInstruction,
            },
        });

        const reply = response.text?.trim() || "Sorry, I couldn't generate a response.";

        return NextResponse.json({ reply });
    } catch (err: unknown) {
        console.error("Error in tutor route:", err);

        const message = err instanceof Error ? err.message : "An unknown error occurred.";

        if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
            return NextResponse.json(
                {
                    error: "Please wait a moment and try again.",
                },
                {status: 429 }
            );
        }

        return NextResponse.json({ error: message }, { status: 500 });
    }
}