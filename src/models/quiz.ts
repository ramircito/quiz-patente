export class QuizQuestion { 
    question: string;
    correct_answer: boolean;
    imageUrl: string;
    user_answer: boolean | null;

    constructor (
        question: string,
        correct_answer: boolean,
        imageUrl: string,
    ) {
        this.question = question;
        this.correct_answer = correct_answer;
        this.imageUrl = imageUrl;
        this.user_answer = null; // ancora non risposto
    }
}

export class Quiz {
    id: string;
    date: number;
    questions: Array<QuizQuestion>;

    constructor(
        id: string,
        questions: Array<QuizQuestion>,
    ) {
        this.id = id;
        this.questions = questions;
        this.date = Date.now();
    }

    public getCorrectAnswerCount(): number {
        return this.questions.reduce(
            (correctAnswers, question) => (
                question.correct_answer === question.user_answer ? 
                correctAnswers + 1 : correctAnswers
            ), 0
        );
    }

    public getScore(): number {
        return Math.round((this.getCorrectAnswerCount() / this.questions.length) * 100);
    }
}
