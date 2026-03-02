// lib/safeJson.ts
export function stripCodeFences(raw: string) {
  const s = raw.trim();

  // Remove ```json ... ``` or ``` ... ```
  if (s.startsWith("```")) {
    return s
      .replace(/^```[a-zA-Z]*\n?/, "")
      .replace(/```$/, "")
      .trim();
  }
  return s;
}

export function safeParseJson<T>(
  raw: string
): { ok: true; value: T } | { ok: false; error: string } {
  try {
    const cleaned = stripCodeFences(raw);

    // Extract first JSON object
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      return { ok: false, error: "No JSON object found." };
    }

    const jsonText = cleaned.slice(firstBrace, lastBrace + 1);
    const parsed = JSON.parse(jsonText) as T;

    return { ok: true, value: parsed };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}