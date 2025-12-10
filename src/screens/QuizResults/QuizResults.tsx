import { Screens } from "../../App";
import styles from "./QuizResults.module.css";
import { useQuiz } from "../../Providers/QuizProvider";
import resultSentences from "../../assets/resultSentences.json";
import { useAtom } from "jotai";
import { currentUser } from "../../states/userAtom";
import { User } from "../../models/user";
import { Quiz, QuizQuestion } from "../../models/quiz";
import { v4 as uuidv4 } from "uuid";

type QuizResultsProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function QuizResults({ setCurrentScreen }: QuizResultsProps) {
  const { answers, randomQuestions } = useQuiz();
  const [user, setUser] = useAtom(currentUser);

  if (!randomQuestions.length) {
    return <h1>Loading results...</h1>;
  }

  const correctCount = answers.reduce((acc, ans, i) => {
    if (ans === randomQuestions[i].a) return acc + 1;
    return acc;
  }, 0);

  const errors = answers.length - correctCount;
  const percentage = Math.round((correctCount / answers.length) * 100);

  const getRandomSentence = (quizErrors: number) => {
    const sentences = resultSentences.filter(sentence => {
      return quizErrors >= sentence.min && quizErrors <= sentence.max;
    })

    if (sentences.length === 0) {
      return "Better next time, loser XD";
    }
    
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex].sentence;
  }

  const message = getRandomSentence(errors);

  const handleReturnToMenu = () => {

    if(user){
      const questions = randomQuestions.map(randomQuestion => {
        const question = new QuizQuestion(
          randomQuestion.q,
          randomQuestion.a,
          randomQuestion.i
        );
  
        return question;
      });
  
      const newQuiz = new Quiz(
        uuidv4(),
        questions
      );
  
      setUser({
        ...user,
        listOfQuiz: [...user.listOfQuiz, newQuiz]
      });
  
      setCurrentScreen(Screens.Menu);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Quiz Results</h1>

      <div className={styles.container_congrat}>
        <h2>{message}</h2>

        <div className={styles.container_score}>
          <p>Your Score:</p>
          <div className={styles.score}>
            <p>{percentage}%</p>
          </div>
        </div>
      </div>

      <div className={styles.correct_answers_container}>
        <h2>CORRECT ANSWERS:</h2>
        <div className={styles.correct_answers_count}>
          <h2>{correctCount}/{answers.length}</h2>
        </div>
      </div>

      <div className={styles.container_buttons}>
        <button
          onClick={handleReturnToMenu}
          className={styles.buttons}
        >
          Return to Menu
        </button>

        <button
          onClick={() => setCurrentScreen(Screens.QuestionsAnswers)}
          className={styles.buttons}
        >
          Review Answers
        </button>
      </div>
    </div>
  );
}

export default QuizResults;


// import { Screens } from "../../App";
// import styles from "./QuizResults.module.css";
// import { NUMBER_OF_QUESTIONS, useQuiz } from "../../Providers/QuizProvider";
// import { useAtom } from "jotai";
// import { currentUser } from "../../states/userAtom";
// import { v4 as uuidv4 } from "uuid";
// import { Quiz, QuizQuestion } from "../../models/quiz";

// type QuizResultsProps = {
//   setCurrentScreen: (screen: any) => void;
//   screen: any;
// };

// function QuizResults({ setCurrentScreen, screen }: QuizResultsProps) {
//   const { answers, randomQuestions } = useQuiz();
//   const [user, setUser] = useAtom(currentUser);

//   // SE APRO QUIZ DA MENU
//   if (screen.quizId) {
//     const quiz = user?.listOfQuiz.find(q => q.id === screen.quizId);
//     if (!quiz) return <h1>Quiz not found</h1>;

//     return (
//       <div className={styles.container}>
//         <h1>Quiz Results</h1>

//         <h2>{quiz.getScore()}%</h2>
//         <h3>{quiz.getCorrectAnswerCount()}/{NUMBER_OF_QUESTIONS} correct</h3>

//         <button
//           className={styles.buttons}
//           onClick={() =>
//             setCurrentScreen({
//               name: Screens.QuestionsAnswers,
//               quizId: quiz.id,
//             })
//           }
//         >
//           Review Answers
//         </button>

//         <button
//           className={styles.buttons}
//           onClick={() => setCurrentScreen({ name: Screens.Menu })}
//         >
//           Return to Menu
//         </button>
//       </div>
//     );
//   }

//   // SE È UN QUIZ APPENA FINITO
//   const correctCount = answers.reduce(
//     (acc, ans, i) => (ans === randomQuestions[i].a ? acc + 1 : acc),
//     0
//   );


//   const saveQuiz = () => {
//     if (!user) return;

//     const questions = randomQuestions.map(randomQuestion => {
//       const question = new QuizQuestion(
//         randomQuestion.q,
//         randomQuestion.a,
//         randomQuestion.i
//       );

//       return question;
//     });

//     const newQuiz = new Quiz(
//       uuidv4(),
//       questions
//     );

//     setUser({
//       ...user,
//       listOfQuiz: [...user.listOfQuiz, newQuiz]
//     });

//     setCurrentScreen({ name: Screens.Menu });
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Quiz Results</h1>
//       <button className={styles.buttons} onClick={saveQuiz}>
//         Return to Menu
//       </button>

//       <button
//         className={styles.buttons}
//         onClick={() =>
//           setCurrentScreen({
//             name: Screens.QuestionsAnswers,
//           })
//         }
//       >
//         Review Answers
//       </button>
//     </div>
//   );
// }

// export default QuizResults;

