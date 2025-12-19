import type { Quiz } from "./quiz";
    
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

