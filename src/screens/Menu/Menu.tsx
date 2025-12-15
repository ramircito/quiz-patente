import { useAtom } from "jotai";
import { currentUserAtom } from "../../states/userAtom";
import styles from "./Menu.module.css";
import { Screens } from "../../App";
import { currentQuizAtom, currentQuizIndexAtom } from "../../states/quizAtoms";

type MenuProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function Menu({ setCurrentScreen }: MenuProps) {
  const [user, setUser] = useAtom(currentUserAtom);
  const [, setCurrentQuiz] = useAtom(currentQuizAtom);
  const [, setCurrentQuizIndex] = useAtom(currentQuizIndexAtom);

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen(Screens.Homepage);
  };

  function resetQuiz () {
    setCurrentQuiz(null);
  }

  return (
    <div className={styles.container}>
      <div className={styles.initialbox}> 
        <div className={styles.greeting}>
          <h2>Hello, <span>{user?.name}</span>!</h2>  
        </div>
        <p className={styles.warning}>
          🔔 REMEMBER THAT ONCE YOU BEGIN THE QUIZ, YOU CANNOT LEAVE IT PENDING UNTIL THE TIME RUNS OUT. 🔔
        </p>
      </div>
      <div className={styles.quizBox}>
        {user?.quizList.map((quiz) => (
          <button
            key={quiz.id}
            className={styles.quizHistory}
            onClick={() => {
              setCurrentQuiz(quiz);
              setCurrentQuizIndex(parseInt(quiz.id));
              setCurrentScreen(Screens.QuizResults);
            }}
          >
            Quiz #{quiz.id}
          </button>
        ))}
        <button 
          className={styles.quizNew}
          onClick={() => {
            resetQuiz();
            setCurrentScreen(Screens.Quizscreen);
          }}
        >
          START NEW QUIZ +
        </button>
      </div>
      <button 
        className={styles.buttonLogout}
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default Menu;