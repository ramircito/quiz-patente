import { useAtom, useAtomValue } from 'jotai';
import { Screens } from '../../App';
import { currentUserAtom } from '../../states/userAtom';
import styles from './QuizFinished.module.css';
import { currentQuizAtom } from '../../states/quizAtoms';

type QuizFinishedProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function QuizFinished({ setCurrentScreen }: QuizFinishedProps) {
  const [ , setCurrentUser] = useAtom(currentUserAtom);
  const currentQuiz = useAtomValue(currentQuizAtom);

  function handleFinishQuiz() {
    setCurrentUser((user) => {
      if(!user || !currentQuiz) return null;

      // Salva il quiz corrente nella lista dei quiz dell'utente
      if (user) user.quizList.push(currentQuiz);
      
      return user;
    });

    setCurrentScreen(Screens.QuizResults);
  }

  return (
    <div className={styles.container}>
      <h1>WARNING</h1>
      <h2>
        You are about to finish the quiz, you will no longer be able to open this folder, and all your progress will be automatically saved.
      </h2>
      <h2>This action is irreversible.</h2>
      <button 
        onClick={() => handleFinishQuiz()}
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
