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