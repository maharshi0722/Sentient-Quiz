"use client";
import { useState } from "react";
import Quiz from "@/components/quiz";
import Score from "@/components/score";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen  flex flex-col gap-16 md:gap-15 items-center justify-start bg-gradient-to-br from-[#f5f3ff] via-[#e0e7ff] to-[#dbeafe] p-4">
      <h1 className="text-3xl md:text-6xl font-extrabold text-indigo-700 mt-8 mb-8 drop-shadow-lg text-center">
        Sentient AGI Quiz
      </h1>
      <div className="w-full max-w-2xl flex flex-col items-center justify-center">
        {!started ? (
          // Start Quiz Card
          <div className="bg-white/90 border border-indigo-100 shadow-2xl rounded-3xl p-6 md:p-10 my-8 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-4 text-center">
              Welcome to the Sentient AGI Quiz!
            </h2>
            <p className="text-gray-700 mb-6 text-center ">
              Test your knowledge about Sentient and AGI. <br />
              You’ll get 15 multiple-choice questions.<br />
              Good luck!
            </p>
            <button
              onClick={() => setStarted(true)}
              className="px-6 py-3 text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all font-semibold text-lg"
            >
              Start Quiz
            </button>
          </div>
        ) : !finished ? (
          <Quiz
            onFinish={(finalScore) => {
              setScore(finalScore);
              setFinished(true);
            }}
          />
        ) : (
          <Score score={score} />
        )}
      </div>
      <footer className="mt-10 text-xs text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Sentient AGI Quiz. All rights reserved.
      </footer>
    </div>
  );
}