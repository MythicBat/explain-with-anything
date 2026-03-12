"use client";

import { useRef, useState } from "react";
import type { ChatMessage, Level } from "@/lib/types";
import { Chat } from "@google/genai";

export default function TutorChat() {
    const [theme, setTheme] = useState("Minecraft");
    const [level, setLevel] = useState<Level>("high-school");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            text: "Hi! I'm your tutor. Ask me anything, and I'll explain it in a fun way.",
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const endRef = useRef<HTMLDivElement | null>(null);

    async function sendMessage(customText?: string) {
        const text = (customText ?? input).trim();
        if (!text || loading) return;

        const nextMessages: ChatMessage[] = [
            ...messages,
            { role: "user", text },
        ];

        setMessages(nextMessages);
        setInput("");
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/tutor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: nextMessages,
                    theme,
                    level,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setMessages([
                ...nextMessages,
                { role: "assistant", text: data.reply },
            ]);

            setTimeout(() => {
                endRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }

    function quickPrompt(text: string) {
        sendMessage(text);
    }
}