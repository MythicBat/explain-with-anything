"use client";

import { useRef, useState } from "react";
import type { ChatMessage, Level } from "@/lib/types";
import VoiceInput from "./VoiceInput";

export default function TutorChat() {
  const [theme, setTheme] = useState("Minecraft");
  const [level, setLevel] = useState<Level>("high-school");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! I’m your tutor. Ask me anything, and I’ll explain it in a fun way.",
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
    setError("");
    setLoading(true);

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
        throw new Error(data?.error || "Tutor request failed");
      }

      setMessages([
        ...nextMessages,
        { role: "assistant", text: data.reply },
      ]);

      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function quickPrompt(text: string) {
    sendMessage(text);
  }

  function speakText(text: string) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    window.speechSynthesis.speak(utterance);
  }

  function resetChat() {
    setMessages([
        {
            role: "assistant",
            text: "Hi! I’m your tutor. Ask me anything, and I’ll explain it in a fun way.",
        },
    ]);
    setInput("");
    setError("");
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold">Conversational Tutor Mode 🎓</h2>
          <p className="text-sm text-gray-600 mt-1">
            Ask follow-up questions naturally and keep learning by conversation.
          </p>
        </div>

        <div className="px-5 py-4 border-b border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Theme</label>
            <input
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-white"
            >
              <option value="kid">Kid</option>
              <option value="high-school">High school</option>
              <option value="uni">University</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => quickPrompt("Explain recursion in a simple way.")}
            className="px-3 py-2 rounded-full border text-sm hover:bg-gray-50"
          >
            Explain simply
          </button>
          <button
            type="button"
            onClick={() => quickPrompt("Give me a real example.")}
            className="px-3 py-2 rounded-full border text-sm hover:bg-gray-50"
          >
            Real example
          </button>
          <button
            type="button"
            onClick={() => quickPrompt("Make it easier.")}
            className="px-3 py-2 rounded-full border text-sm hover:bg-gray-50"
          >
            Make it easier
          </button>
          <button
            type="button"
            onClick={() => quickPrompt("Quiz me on this.")}
            className="px-3 py-2 rounded-full border text-sm hover:bg-gray-50"
          >
            Quiz me
          </button>
          <button
            type="button"
            onClick={resetChat}
            className="mt-3 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm">
                New Chat
           </button>
        </div>

        <div className="h-105 overflow-y-auto px-5 py-5 bg-gray-50 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                m.role === "user"
                  ? "ml-auto bg-black text-white"
                  : "bg-white border border-gray-200 text-gray-900"
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
            <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white border border-gray-200 text-gray-600 animate-pulse">
              Tutor is thinking…
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="px-5 py-4 border-t border-gray-100">
          <div className="flex gap-3">
            <VoiceInput
                onTranscript={(text) => {
                    setInput(text);
                    setTimeout(() => {
                        sendMessage(text);
                    }, 100);
                }}
            />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask a follow-up question..."
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-black text-white disabled:opacity-50"
            >
              Send
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}