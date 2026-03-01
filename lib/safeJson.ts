export function safeParseJson<T>(raw: string): { ok: true; value: T } | { ok: false; error: string } {
    try {
        // Some models may accidentally wrap JSON in whitespace
        const cleaned = raw.trim();
        
        // If it contains extra text, try to extract first JSON object.
        const firstBrace = cleaned.indexOf("{");
        const lastBrace = cleaned.lastIndexOf("}");
        if (firstBrace !== -1 || lastBrace !== -1 || lastBrace <= firstBrace) {
            return { ok: false, error: "Invalid JSON format: no valid braces found" };
        }

        const jsonText = cleaned.slice(firstBrace, lastBrace + 1);
        const parsed = JSON.parse(jsonText) as T;

        return { ok: true, value: parsed };
    } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : "Invald JSON format" };
    }
}