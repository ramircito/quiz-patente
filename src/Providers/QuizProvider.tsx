// import { createContext, useContext, useState, type ReactNode } from "react";
// import JsonFile from "../assets/quizPatenteB2023.json"; // importa il JSON
// const NUMBER_OF_QUESTIONS = 30;

// type QuizContextType = {
//   answers: (boolean | null)[];
//   setAnswers: React.Dispatch<React.SetStateAction<(boolean | null)[]>>;
//   randomQuestions: any[];
//   setRandomQuestions: React.Dispatch<React.SetStateAction<any[]>>;
//   currentQuestionIndex: number;
//   setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
//   resetQuiz: () => void; // nuova funzione
// };

// const QuizContext = createContext<QuizContextType | undefined>(undefined);

// // === FUNZIONI PER GENERARE DOMANDE ===
// function getAllQuestions(obj: any): any[] {
//   const questions: any[] = [];
//   for (const value of Object.values(obj)) {
//     if (Array.isArray(value)) {
//       questions.push(...value);
//     } else if (typeof value === "object") {
//       questions.push(...getAllQuestions(value));
//     }
//   }
//   return questions;
// }

// function getRandomQuestions(jsonFile: any): any[] {
//   const allQuestions = getAllQuestions(jsonFile);
//   const shuffled = allQuestions.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, NUMBER_OF_QUESTIONS);
// }

// export function QuizProvider({ children }: { children: ReactNode }) {
//   const [answers, setAnswers] = useState<(boolean | null)[]>([]);
//   const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // === NUOVA FUNZIONE RESET ===
//   function resetQuiz() {
//     setRandomQuestions(getRandomQuestions(JsonFile));
//     setAnswers(Array(NUMBER_OF_QUESTIONS).fill(null));
//     setCurrentQuestionIndex(0);
//   }

//   return (
//     <QuizContext.Provider
//       value={{
//         answers,
//         setAnswers,
//         randomQuestions,
//         setRandomQuestions,
//         currentQuestionIndex,
//         setCurrentQuestionIndex,
//         resetQuiz, // aggiunta
//       }}
//     >
//       {children}
//     </QuizContext.Provider>
//   );
// }

// export function useQuiz() {
//   const context = useContext(QuizContext);
//   if (!context) throw new Error("useQuiz must be used within QuizProvider");
//   return context;
// }


import { createContext, useContext, useState, type ReactNode } from "react";
import JsonFile from "../assets/quizPatenteB2023.json";

export const NUMBER_OF_QUESTIONS = 30;

type QuizContextType = {
  answers: (boolean | null)[];
  setAnswers: React.Dispatch<React.SetStateAction<(boolean | null)[]>>;
  randomQuestions: any[];
  setRandomQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

function getAllQuestions(obj: any): any[] {
  const questions: any[] = [];
  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      questions.push(...value);
    } else if (typeof value === "object") {
      questions.push(...getAllQuestions(value));
    }
  }
  return questions;
}

function getRandomQuestions(jsonFile: any): any[] {
  const allQuestions = getAllQuestions(jsonFile);
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, NUMBER_OF_QUESTIONS);
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function resetQuiz() {
    setRandomQuestions(getRandomQuestions(JsonFile));
    setAnswers(Array(NUMBER_OF_QUESTIONS).fill(null));
    setCurrentQuestionIndex(0);
  }

// ciaoooooooo


  return (
    <QuizContext.Provider
      value={{
        answers,
        setAnswers,
        randomQuestions,
        setRandomQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
}
