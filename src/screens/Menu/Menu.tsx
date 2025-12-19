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

  function resetQuiz() {
    setCurrentQuiz(null);
  }

  return (
    <div className={styles.container}>
      <div className={styles.initialbox}>
        <div className={styles.greeting}>
          <h2>Hello, <span>{user?.name}</span>!</h2>
        </div>
        <button
          className={styles.buttonLogout}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <div className={styles.quizContainer}>
        <p className={styles.warning}>
          🔔 REMEMBER THAT ONCE YOU BEGIN THE QUIZ, YOU CANNOT LEAVE IT PENDING UNTIL THE TIME RUNS OUT. 🔔
        </p>
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

        </div>
        <button
          className={styles.quizNew}
          onClick={() => {
            resetQuiz();
            setCurrentScreen(Screens.Quizscreen);
          }}
        >
          NEW QUIZ +
        </button>
      </div>
      {/* <div className={styles.settings__container}>
        <h3>Settings</h3>
        <div className={styles.settings__option}>
          <label>
            <input 
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => {
                setSettings(new Settings(
                  e.target.checked,
                  settings.language,
                ));
              }}
            />
            Dark Mode
          </label>
        </div>
        <div className={styles.settings__option}>
            <label>
            <input 
              type="radio"
              name="language"
              value="it"
              checked={settings.language === 'it'}
              onChange={() => {
              setSettings(new Settings(
                settings.darkMode,
                'it',
              ));
              }}
            />
            Italian
            </label>
            <label>
            <input 
              type="radio"
              name="language"
              value="en"
              checked={settings.language === 'en'}
              onChange={() => {
              setSettings(new Settings(
                settings.darkMode,
                'en',
              ));
              }}
            />
            English
            </label>
        </div>
      </div> */}
    </div>
  );
}

export default Menu;