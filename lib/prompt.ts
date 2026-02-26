import { ExplainInput } from "./types";

export function buildPrompt({ concept, theme, level, style} : ExplainInput) {
    return `
    You are an expert teacher who explains complex ideas using vivid analogies.
    
    Explain: "${concept}"
    Theme: "${theme}"
    Audience Level: "${level}"
    Style: "${style ?? "clear and fun"}"
    
    Return in this exact format:
    
    1) One-liner (tweet-length)
    2) Main analogy explanation (6-10 sentences)
    3) Tiny example (3-6 lines)
    4) 3 quick quiz questions
    5) Common misconceptions + corrections (2-4 sentences)
    
    Rules:
    - Be accurate (no made-up facts).
    - Use the theme heavily but keep it understandable.
    - Avoid fluff
    `;
}