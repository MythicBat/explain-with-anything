"use client";

import { useRef, useState } from "react";

type Props = {
    onTranscript: (text: string) => void;
    autoSend?: boolean;
};

type SpeechRecognitionEventLike = {
    results: {
        0: {
            0: {
                transcript: string;
            };
        };
    };
};

type SpeechRecognitionLike = {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onstart: (() => void) | null;
    onresult: ((event: SpeechRecognitionEventLike) => void) | null;
    onerror: (() => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }
}

export default function VoiceInput({ onTranscript }: Props) {
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

    function startListening() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onTranscript(transcript);
        };

        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    }

    function stopListening() {
        recognitionRef.current?.stop();
        setListening(false);
    }

    return (
        <button
            type="button"
            onClick={listening ? stopListening : startListening}
            className={`h-[50px] w-[50px] rounded-xl border flex items-center justify-center text-lg transition duration-200 shadow-sm ${
                listening ? "bg-red-500 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.45)]" : "bg-white border-gray-200 hover:bg-gray-50 hover-scale-[1.03] hover:shadow-[0_0_18px_rgba(59,130,246,0.18)]"}`}
                title={listening ? "Stop recording" : "Start recording"}
            >
            {listening ? "🔴" : "🎤"}
        </button>
    );
}