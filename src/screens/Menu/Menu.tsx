// import { useAtom } from "jotai";
// import { currentUser } from "../../states/userAtom";
// import styles from "./Menu.module.css";
// import { Screens } from "../../App";
// import { useQuiz } from "../../Providers/QuizProvider";

// type MenuProps = {
//   setCurrentScreen: (screen: Screens) => void;
// };

// function Menu({ setCurrentScreen }: MenuProps) {
//   const [user, setUser] = useAtom(currentUser);  
//   const { resetQuiz } = useQuiz();

//   const handleLogout = () => {
//     // Cancella utente corrente
//     setUser(null);
//     setCurrentScreen(Screens.Homepage);
//   };

//   return (
//     <div className={styles.container}>
      
//       {/* Greeting */}
//       <div className={styles.greeting}>
//         <h2>Hello, <span>{user?.name}</span>!</h2>
//       </div>

//       {/* BOX QUIZ */}
//       <div className={styles.quizBox}>
//         <button className={styles.quizItem}>QUIZ N.1</button>
//         <button className={styles.quizItem}>QUIZ N.2</button>
//         <button className={styles.quizItem}>QUIZ N.3</button>
//         <button className={styles.quizItem}>QUIZ N.4</button>
        
//         <button 
//           className={styles.quizNew}
//           onClick={() => {
//             resetQuiz();
//             setCurrentScreen(Screens.Quizscreen);
//           }}
//         >
//           START NEW QUIZ +
//         </button>
//       </div>

//       {/* WARNING */}
//       <p className={styles.warning}>
//         *REMEMBER THAT ONCE YOU BEGIN THE QUIZ, YOU CANNOT LEAVE IT PENDING UNTIL THE TIME RUNS OUT.*
//       </p>

//       <button 
//         className={styles.buttonLogout}
//         onClick={handleLogout}
//       >
//         Log out
//       </button>
//     </div>
//   );
// }

// export default Menu;


import { useAtom } from "jotai";
import { currentUser } from "../../states/userAtom";
import styles from "./Menu.module.css";
import { Screens } from "../../App";
import { useQuiz } from "../../Providers/QuizProvider";

type MenuProps = {
  setCurrentScreen: (screen: any) => void;
};

function Menu({ setCurrentScreen }: MenuProps) {
  const [user, setUser] = useAtom(currentUser);
  const { resetQuiz } = useQuiz();

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen({ name: Screens.Homepage });
  };

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        <h2>Hello, <span>{user?.name}</span>!</h2>
      </div>

      <div className={styles.quizBox}>
        {user?.listOfQuiz?.map((quiz, index) => (
          <button
            key={quiz.id}
            className={styles.quizItem}
            onClick={() =>
              setCurrentScreen({
                name: Screens.QuizResults,
                quizId: quiz.id
              })
            }
          >
            QUIZ {index + 1} — {quiz.getScore()}%
          </button>
        ))}

        <button
          className={styles.quizNew}
          onClick={() => {
            resetQuiz();
            setCurrentScreen({ name: Screens.Quizscreen });
          }}
        >
          START NEW QUIZ +
        </button>
      </div>

      <p className={styles.warning}>
        *REMEMBER THAT ONCE YOU BEGIN THE QUIZ, YOU CANNOT LEAVE IT PENDING UNTIL THE TIME RUNS OUT.*
      </p>

      <button className={styles.buttonLogout} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default Menu;
