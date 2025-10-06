"use client";
import { useState } from "react";
import Quiz from "@/components/quiz";
import Score from "@/components/score";

import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });

export default function Page() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setFinished(true);
  };

  const handleRestart = () => {
    setScore(0);
    setFinished(false);
    setStarted(true);
    setQuizKey((prev) => prev + 1);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start relative overflow-auto px-4 py-8"
      style={{
        backgroundImage: "url('/agi.png')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-indigo-100/30 to-indigo-400/40 backdrop-blur-md" />

      <div className="relative z-10 flex flex-col items-center justify-start w-full max-w-3xl gap-6 md:gap-10">
        <header className="flex items-center justify-center text-center mt-6 mb-8">
          <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-indigo-300/80">
            <img
              src="https://pbs.twimg.com/profile_images/1859727094789660672/h7RM1LNu_400x400.jpg"
              alt="Sentient AGI Logo"
              className="w-10 h-10 md:w-14 md:h-14 rounded-full shadow-md animate-pulse-blink"
            />
            <h1
              className={`${poppins.className} text-2xl md:text-4xl lg:text-5xl font-extrabold`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-teal-500">
                Sentient
              </span>
              <span className="text-indigo-900"> </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-700">
                Quiz
              </span>
            </h1>
          </div>
        </header>

        <div className="w-full flex flex-col items-center justify-center">
          {!started ? (
            <div className="bg-white/60 backdrop-blur-xl border border-indigo-100/40 shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col items-center text-center transition-all hover:shadow-indigo-200/60">
              <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4">
                Welcome to the Sentient AGI Quiz!
              </h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Explore your understanding of Sentient AGI and its GRID.
                <br />
                You’ll face 10 thought-provoking questions.
                <br />
                Ready to challenge your intelligence?
              </p>
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3 text-white text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-800 rounded-full shadow-lg hover:scale-105 hover:shadow-indigo-400/50 transition-transform"
              >
                🚀 Start Quiz
              </button>
            </div>
          ) : !finished ? (
            <Quiz key={quizKey} numQuestions={10} onFinish={handleFinish} />
          ) : (
            <Score score={score} onRestart={handleRestart} />
          )}
        </div>

        <footer className="mt-8 text-xs text-gray-700 text-center">
          &copy; {new Date().getFullYear()} Sentient AGI Quiz — Built by Maharshi
        </footer>
      </div>
    </div>
  );
}