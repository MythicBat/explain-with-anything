export interface ExplainInput {
    concept: string;
    theme: string;
    level: string;
    style?: string;
}

export type Level = "kid" | "high-school" | "uni" | "expert";
export type Style = 
    | "clear"
    | "fun"
    | "meme"
    | "story"
    | "rap"
    | "poem"
    | "comic";

export interface ExplainResponse {
    text: string;
}

export interface ExplanationDoc {
    concept: string;
    theme: string;
    themeKey: string;
    level: string;
    style?: string;
    text: string;
    createdAt: string;
}

export interface ComicPanel {
    caption: string;
    dialogue: string;
}

export interface ComicPayload {
    title: string;
    panels: ComicPanel[];   // expecting 6
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
    role: ChatRole;
    text: string;
}

export interface TutorRequest {
    messages: ChatMessage[];
    theme: string;
    level: string;
}

export interface TutorResponse {
    reply: string;
}