export const NUMBER_OF_QUESTIONS = 30;

export function getAllQuestions(obj: any): any[] {
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

export function getRandomQuestions(jsonFile: any): any[] {
  const allQuestions = getAllQuestions(jsonFile);
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, NUMBER_OF_QUESTIONS);
}