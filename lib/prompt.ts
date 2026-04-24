import { ExplainInput } from "./types";

export function buildPrompt({ concept, theme, level, style} : ExplainInput) {
    if (style === "comic") {
        return `
            You are a creative teacher. Make a 6-panel comic script to explain a concept using this theme.

            Concept: "${concept}"
            Theme: "${theme}"
            Audience: "${level}"

            Return ONLY valid JSON. No markdown. No commentary. No backticks.

            Schema:
            {
                "title": "string (short, catchy)",
                "panels": [
                    {"captions": "scene description", "dialogue": "what characters say" }
                ]
            }
            
            Rules:
            - Exactly 6 panels.
            - Keep captions short (max 12 words).
            - Keep dialogue short (max 18 words).
            - Must be accurate to the concept.
        `;
    }
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
    4) Common misconceptions + corrections (2-4 sentences)
    
    Rules:
    - Be accurate (no made-up facts).
    - Use the theme heavily but keep it understandable.
    - Avoid fluff
    `;
}