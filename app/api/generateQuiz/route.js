import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { difficulty = "medium", numQuestions = 10 } = await req.json();

    const payload = {
      model: "accounts/sentientfoundation/models/dobby-unhinged-llama-3-3-70b-new",
      messages: [
        {
          role: "system",
          content: `
You are a **professional quiz generator** specializing in Sentient AGI and its GRID.

Your task:
- Generate ONLY multiple-choice questions (MCQs) about **Sentient AGI** and **its GRID system**.
- Each question must be factual, educational, and related to Sentient AGI concepts.
- Each question must have **exactly 4 options**.
- Only **1 option** can be correct.
- Difficulty: based on user input ('easy', 'medium', or 'hard').

Output rules:
- You MUST output a **pure JSON array**, nothing else.
- No markdown, explanations, or comments.
- Follow this exact schema:
[
  {
    "question": "What does the GRID in Sentient AGI stand for?",
    "options": ["Global Reasoning and Intelligence Domain", "General Research and Innovation Drive", "Grid-based Reactive Intelligence Design", "Generalized Reasoning Integration Device"],
    "answer": "Global Reasoning and Intelligence Domain"
  }
]
`
        },
        {
          role: "user",
          content: `Generate ${numQuestions} unique '${difficulty}'-level MCQs in strict JSON format only.`
        }
      ],
      max_tokens: 2500,
      temperature: 0.7
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer fw_3ZkAVhFZ32af1diTnRrtu3z9`
    };

    const response = await axios.post(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      payload,
      { headers }
    );

    const raw = response.data?.choices?.[0]?.message?.content?.trim() || "";
    let questions = [];

    try {
      // Extract JSON array safely
      const jsonMatch = raw.match(/\[\s*{[\s\S]*}\s*\]/);
      if (!jsonMatch) throw new Error("No valid JSON array found in response.");

      questions = JSON.parse(jsonMatch[0]);

      // Normalize + clean data
      const seen = new Set();
      questions = questions
        .map((q) => ({
          question: (q.question || "").trim(),
          options: Array.isArray(q.options) && q.options.length === 4
            ? q.options.map((o) => o.trim())
            : ["Option A", "Option B", "Option C", "Option D"],
          answer:
            typeof q.answer === "string" && q.answer.trim()
              ? q.answer.trim()
              : Array.isArray(q.options)
              ? q.options[0]
              : "Option A"
        }))
        .filter((q) => q.question && !seen.has(q.question) && seen.add(q.question));

      // Fill missing questions
      while (questions.length < numQuestions) {
        questions.push({
          question: "Placeholder question (AI generation incomplete)",
          options: ["A", "B", "C", "D"],
          answer: "A"
        });
      }

    } catch (err) {
      console.error("Failed to parse AI output:", err.message, "\nRaw:", raw);
      questions = Array(numQuestions).fill({
        question: "Placeholder question (AI output error)",
        options: ["A", "B", "C", "D"],
        answer: "A"
      });
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("API error:", err.message);
    return NextResponse.json(
      {
        error: err.message || "Server error",
        questions: Array(10).fill({
          question: "Placeholder question (Server/API error)",
          options: ["A", "B", "C", "D"],
          answer: "A"
        })
      },
      { status: 500 }
    );
  }
}
