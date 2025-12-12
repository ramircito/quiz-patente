import { Screens } from '../../App';
import styles from './QuizFinished.module.css';

type QuizFinishedProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function QuizFinished({ setCurrentScreen }: QuizFinishedProps) {
  return (
    <div className={styles.container}>
      <h1>WARNING</h1>
      <h2>
        You are about to finish the quiz, you will no longer be able to open this folder, and all your progress will be automatically saved.
      </h2>
      <h2>This action is irreversible.</h2>
      <button 
        onClick={() => setCurrentScreen(Screens.QuizResults)}
        className={styles.buttonFinish}
      >
        FINISH QUIZ
      </button>
      <button 
        onClick={() => setCurrentScreen(Screens.Quizscreen)}
        className={styles.buttonBackToQuiz}
      >
        GO BACK TO QUIZ
      </button>
      
    </div>
  );
}

export default QuizFinished;
