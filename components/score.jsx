"use client";
export default function Score({ score }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center animate-fadeIn w-full max-w-xl">
        {/* Fix: Use responsive text sizes, not just md:! */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-indigo-700 mb-6 text-center">
          Your Score
        </h1>
        <div className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold text-purple-600 mb-4 text-center">
          {score} / 15
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 text-center items-center mb-4">
          {score >= 12
            ? "You’re AGI ready! 🎉"
            : "Keep learning about Sentient AGI! 🚀"}
        </p>
        <div className="w-full mt-4 flex justify-center">
          <a
            href="/"
            className="px-6 py-3 text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all font-semibold"
          >
            Try Again
          </a>
        </div>
      </div>
    </div>
  );
}