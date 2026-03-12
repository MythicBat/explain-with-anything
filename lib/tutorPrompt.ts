import type { ChatMessage } from "./types";

export function buildTutorMessages(params: {
    messages: ChatMessage[];
    theme: string;
    level: string;
}) {
    const { messages, theme, level } = params;

    const systemInstruction = `
    You are Explain It With Anything Tutor, a friendly AI teacher.
    
    Your job:
    - teach clearly
    - answer follow-up doubts naturally
    - keep the conversation going
    - explain using the theme: ${theme}
    - adapt to a "${level}" learner
    - never be condescending
    - keep answers concise and to the point
    - if the student says "simpler", simplify
    - if the student asks for an example, give one
    - if the student asks for a quiz, give 3 short quiz questions
    - if the student is confused, reassure them and explain differently
    
    Rules:
    - use the theme naturally
    - prioritize clarity over cleverness
    - no markdown tables
    - no unnecessary long paragraphs
    `;

    const conversation = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }],
    }));

    return {
        systemInstruction,
        conversation,
    };
}