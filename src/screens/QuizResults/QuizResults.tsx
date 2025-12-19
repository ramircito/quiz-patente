import { Screens } from "../../App";
import styles from "./QuizResults.module.css";
import resultSentences from "../../assets/resultSentences.json";
import { currentUserAtom } from "../../states/userAtom";
import { useAtomValue } from "jotai";
import { currentQuizIndexAtom } from "../../states/quizAtoms";

type QuizResultsProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function QuizResults({ setCurrentScreen }: QuizResultsProps) {
  const currentUser = useAtomValue(currentUserAtom);
  const currentQuizIndex = useAtomValue(currentQuizIndexAtom);


  if (!currentUser?.quizList.length) {
    return <h1>Loading results...</h1>;
  }

  console.log('currentQuizIndex:', currentQuizIndex);
  console.log('currentUser.quizList: ', currentUser.quizList);
  console.log('currentUser: ', currentUser);
  const quiz =
    currentUser.quizList[currentQuizIndex] ?? currentUser.quizList.at(-1);

  if (!quiz) {
    return <h1>Loading results...</h1>;
  }

  const totalQuestions = quiz.questions.length;

  // Count a question as correct only if the user actually answered it (true/false).
  const correctCount = quiz.questions.reduce((acc, q) => {
    if (q.user_answer === null) return acc;
    return q.user_answer === q.correct_answer ? acc + 1 : acc;
  }, 0);

  // Treat unanswered as wrong for the final error count.
  const errors = totalQuestions - correctCount;

  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const getRandomSentence = (quizErrors: number) => {
    const sentences = resultSentences.filter(sentence => {
      return quizErrors >= sentence.min && quizErrors <= sentence.max;
    })

    if (sentences.length === 0) {
      return "Better next time, loser XD";
    }

    // eslint-disable-next-line react-hooks/purity
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex].sentence;
  }

  const message = getRandomSentence(errors);
  const isFailed = errors > 3;

  return (
    <div className={styles.container}>
      <h1>Quiz Results</h1>

      <div className={styles.container_congrat}>
        <h2>{message}</h2>

        <div className={styles.container_score}>
          <p>Your Score:</p>
          <div
            className={styles.score}
            style={{ color: isFailed ? "red" : "limegreen" }}
          >
            <p>{percentage}%</p>
          </div>
        </div>
      </div>

      <div className={styles.correct_answers_container}>
        <h2>CORRECT ANSWERS:</h2>
        <div
          className={styles.correct_answers_count}
          style={{ color: isFailed ? "red" : "limegreen" }}
        >
          <span className={styles.counter}>{correctCount}/{totalQuestions}</span>
        </div>

      </div>

      <div className={styles.container_buttons}>
        <button
          onClick={() => setCurrentScreen(Screens.Menu)}
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
