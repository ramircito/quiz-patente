import { useAtom } from "jotai";
import { currentUserAtom } from "../../states/userAtom";
import styles from "./Menu.module.css";
import { Screens } from "../../App";
import { useQuiz } from "../../Providers/QuizProvider";

type MenuProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function Menu({ setCurrentScreen }: MenuProps) {
  const [user, setUser] = useAtom(currentUserAtom);  
  const { resetQuiz } = useQuiz();

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen(Screens.Homepage);
  };

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
        {/* 
          Qui dovremmo aggiungere tanti Quiz buttons quanti sono i quiz disponibili. 
          Per ora ne mettiamo uno solo che porta alla schermata del quiz.
          Quando aggiungeremo la funzione di salvataggio questa arte sarà dinamica.
        */}
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