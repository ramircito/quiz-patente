import { atom } from "jotai";
import type { Quiz } from "../models/quiz";

export const currentQuizAtom = atom<Quiz | null>(
  null
);

export const currentQuizIndexAtom = atom<number>(
  0
);

export const currentQuestionIndexAtom = atom<number>(0);


export const quizTimerAtom = atom<number>(30 * 60); // 30 minutes in seconds

export const resetQuizAtom = atom(null, (get, set) => {
  set(currentQuizAtom, null);
  set(currentQuizIndexAtom, 0);
  set(quizTimerAtom, 30 * 60);
});