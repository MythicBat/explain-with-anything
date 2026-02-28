import { NextResponse } from "next/server";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
    try {
        const { concept, theme, level, style, text } = await req.json();

        if (!concept || !theme || !level || !text) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const db = getFirebaseAdmin().firestore();
        const docRef = await db.collection("explanations").add({
            concept,
            theme,
            level,
            style: style ?? "fun",
            text,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({ id: docRef.id });
    } catch (err: unknown) {
        console.error("Error saving explanation:", err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 }
        );
    }
}