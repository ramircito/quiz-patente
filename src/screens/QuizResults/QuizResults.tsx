import { Screens } from "../../App";
import styles from "./QuizResults.module.css";
import { useQuiz } from "../../Providers/QuizProvider";
import resultSentences from "../../assets/resultSentences.json";

type QuizResultsProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function QuizResults({ setCurrentScreen }: QuizResultsProps) {
  const { answers, randomQuestions } = useQuiz();

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
    
    // eslint-disable-next-line react-hooks/purity
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex].sentence;
  }

  const message = getRandomSentence(errors);

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
