import { atom } from "jotai";
import type { Quiz } from "../models/quiz";

export const currentQuizAtom = atom<Quiz | null>(
  null
);

export const currentQuizIndexAtom = atom<number>(
  0
);