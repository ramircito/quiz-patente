import { Quiz } from "./quiz";
    
export class User {
    name: string;
    listOfQuiz: Array<Quiz>;
    
    constructor(
        name: string,
    ) {
        this.name = name;
        this.listOfQuiz = new Array<Quiz>();
    }   
}
    