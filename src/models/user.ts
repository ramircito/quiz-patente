export class Quiz {
    question: string;
    correct_answer: boolean;
    imageUrl: string;
    user_answer: boolean;

    constructor(
        question: string,
        correct_answer: boolean,
        imageUrl: string,
        user_answer: boolean,
    ) {
        this.question = question;
        this.correct_answer = correct_answer;
        this.imageUrl = imageUrl;
        this.user_answer = user_answer;
    }

    
    }
    
    export class User {
    name: string;
    quizList: Array<Quiz>;
    

    constructor(
        name: string,
    ) {
        this.name = name;
        this.quizList = new Array<Quiz>();
    }
    
    }