"use client";

import { useState, useMemo } from "react";
import { questions as originalQuestions } from "@/components/data";
import { motion } from "framer-motion";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] });

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Quiz({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const [shuffledQuestions] = useState(() => shuffleArray(originalQuestions));

  const q = shuffledQuestions[current];

  const shuffledOptions = useMemo(() => {
    const optionsWithIndex = q.options.map((option, index) => ({
      option,
      originalIndex: index,
    }));
    
    return shuffleArray(optionsWithIndex);
  }, [current, q.options]);

  const handleAnswer = (shuffledIndex) => {
    if (showAnswer) return;
    setSelected(shuffledIndex);
    setShowAnswer(true);

    const originalAnswerIndex = shuffledOptions[shuffledIndex].originalIndex;

    const isCorrect = originalAnswerIndex === q.answer;

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (current + 1 < shuffledQuestions.length) { 
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setShowAnswer(false);
      } else {
        onFinish(score + (isCorrect ? 1 : 0));
      }
    }, 800);
  };

  const progress = ((current + 1) / shuffledQuestions.length) * 100;

  return (
    <motion.div
      key={q.question} 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/60 backdrop-blur-xl border border-indigo-100 shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-2xl relative overflow-hidden ${inter.className}`}
    >
      <div className="w-full bg-gray-200/70 h-3 rounded-full mb-4 sm:mb-6 overflow-hidden">
        <motion.div
          className="h-3 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <h2 className={`text-xl md:text-2xl font-bold text-indigo-700 mb-2 ${poppins.className}`}>
        Question {current + 1} of {shuffledQuestions.length}
      </h2>
      
      <p className="text-gray-800 text-lg md:text-xl mb-4 sm:mb-6">{q.question}</p>

      <div className="grid gap-4">
        {shuffledOptions.map((item, i) => {
          const isCorrect = item.originalIndex === q.answer;
          const isSelected = i === selected;

          let base =
            "w-full px-5 py-3 md:py-4 text-lg font-semibold rounded-2xl border transition-all duration-300 shadow-sm";
          let color = "bg-white/70 hover:bg-indigo-50 border-gray-200 text-gray-800";

          if (showAnswer) {
            if (isCorrect) 
              color = "bg-green-500 text-white border-green-500 scale-[1.02]";
            else if (isSelected) 
              color = "bg-red-500 text-white border-red-500 scale-[1.02]";
            else 
              color = "bg-gray-100 text-gray-600 border-gray-200";
          }

          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAnswer(i)}
              className={`${base} ${color}`}
            >
              {item.option}
            </motion.button>
          );
        })}
      </div>

      <div className="absolute right-4 md:bottom-3 text-sm text-gray-500">
        Score: {score}
      </div>
    </motion.div>
  );
}