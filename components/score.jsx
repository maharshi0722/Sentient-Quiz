"use client";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "800"] });

export default function Score({ score, onRestart }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
      <div className="bg-white/90 backdrop-blur-xl border border-indigo-200 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center animate-fadeIn w-full max-w-xl transition-all hover:shadow-indigo-300/50">
        
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow-md ${poppins.className}`}>
          Quiz Completed! ✨
        </h1>

        <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 text-center ${poppins.className}`}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            You scored <span className="whitespace-nowrap">{score} out of 10</span>
          </span>
        </div>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 text-center mb-6 leading-relaxed">
          Keep learning about <span className="font-semibold text-indigo-700">Sentient AGI</span>! 🚀
        </p>

        <button
          onClick={onRestart}
          className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-indigo-400/50 transition-transform text-base sm:text-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}