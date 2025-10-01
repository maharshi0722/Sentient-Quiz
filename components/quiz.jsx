"use client";
import { useState, useEffect } from "react";
import { question as originalQuestions } from "./data";

function shuffleArray(array) {
  return array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

export default function Quiz({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(originalQuestions).map(q => {
      const optionsShuffled = shuffleArray(
        q.options.map((opt, idx) => ({
          text: opt,
          isAnswer: idx === q.answer,
        }))
      );
      return { ...q, options: optionsShuffled };
    });
    setQuestions(shuffledQuestions);
  }, []);

  function handleOptionClick(idx) {
    const isCorrect = questions[current].options[idx].isAnswer;
    setSelected(idx);
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) setCurrent(current + 1);
      else onFinish(score + (isCorrect ? 1 : 0));
    }, 700);
  }

  if (questions.length === 0) return null;
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="w-full bg-white border border-indigo-100 shadow-2xl rounded-3xl p-4 md:p-8  mx-auto">
  
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="text-indigo-700 font-bold text-lg md:text-xl mb-2">
        Question {current + 1} / {questions.length}
      </h2>
      <p className="text-gray-900 font-semibold text-xl md:text-2xl mb-6">
        {questions[current].question}
      </p>

      <ul className="space-y-4">
        {questions[current].options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = opt.isAnswer;
          return (
            <li key={i}>
              <button
                onClick={() => handleOptionClick(i)}
                disabled={selected !== null}
                className={`w-full flex items-center p-5 border rounded-2xl shadow-inner transition-all duration-300
                  ${isSelected ? "bg-indigo-100 border-indigo-400" : "bg-gray-50 border-gray-200"}
                  ${selected !== null && isCorrect ? "bg-green-100 border-green-400" : ""}
                  hover:bg-indigo-50
                  focus:outline-none focus:ring-2 focus:ring-indigo-300
                `}
              >
                <span
                  className={`flex-shrink-0 w-7 h-7 mr-4 border-2 rounded-full flex items-center justify-center
                    ${isSelected ? "border-indigo-500 bg-indigo-500" : "border-gray-400"}
                  `}
                >
                  {isSelected && <span className="w-3 h-3 rounded-full bg-white"></span>}
                </span>
                <span className="text-gray-800 text-base md:text-lg">{opt.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}