import ExplainForm from "@/components/ExplainForm";
import TutorChat from "@/components/TutorChat";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <ExplainForm />
      <p className="text-center text-xs text-gray-500 mt-10">
        Built for StrathSpace HackDay using Next.js + Gemini + Firebase
      </p>
      <TutorChat />
    </main>
  );
}