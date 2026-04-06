"use client";

import { useState } from "react";
import VoiceInput from "./VoiceInput";
import { motion } from "framer-motion";

type ChatMessage = {
    role: "user" | "assistant";
    text: string;
};

type Props = {
    theme: string;
    level: string;
    initialAssistantMessage: string;
};

export default function FollowUpChat({
    theme,
    level,
    initialAssistantMessage,
}: Props) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: "assistant", text: initialAssistantMessage },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function sendMessage(customText?: string) {
        const text = (customText ?? input).trim();
        if (!text || loading) return;

        const nextMessages: ChatMessage[] = [...messages, { role: "user", text }];

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
                throw new Error(data?.error || "An error occurred");
            }

            setMessages([...nextMessages, { role: "assistant", text: data.reply }]);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    function speakText(text: string) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    return (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold">Ask follow-up questions</h3>
                <p className="text-sm text-gray-600 mt-1">
                    Keep asking until it makes sense.
                </p>
            </div>

            <div className="max-h-[420px] overflow-y-auto px-5 py-5 bg-gray-50 space-y-4">
                {messages.map((m, idx) => (
                    <div
                        key={idx}
                        className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                            m.role === "user" ? "ml-auto bg-black text-white" : "bg-white border border-gray-200 text-gray-900"
                        }`}
                    >
                        <div>{m.text}</div>

                        {m.role === "assistant" && (
                            <button
                                type="button"
                                onClick={() => speakText(m.text)}
                                className="mt-3 text-xs px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50">
                                    Speak reply 🔊
                            </button>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white border border-gray-200 text-gray-200 animate-pulse">
                        Tutor is thinking...
                    </div>
                )}
            </div>

            <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") sendMessage();
                        }}
                        placeholder="Ask a follow-up question..."
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-3"
                    />

                    <VoiceInput
                        onTranscript={(text) => {
                            setInput(text);
                            setTimeout(() => sendMessage(text), 100);
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => sendMessage()}
                        disabled={loading}
                        className="px-5 py-3 rounded-xl bg-black text-white disabled:opacity-50">
                        Send
                    </button>
                </div>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
}