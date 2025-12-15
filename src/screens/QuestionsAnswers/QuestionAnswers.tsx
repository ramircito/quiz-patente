import { useEffect, useRef } from 'react';
import { Screens } from '../../App';
import styles from './QuestionsAnswers.module.css';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '../../states/userAtom';
import { currentQuizIndexAtom } from '../../states/quizAtoms';

type QuestionsAnswersProps = {
    setCurrentScreen: (screen: Screens) => void;
}

function QuestionsAnswers({ setCurrentScreen }: QuestionsAnswersProps) {
    const questionsListRef = useRef<HTMLDivElement>(null);
    const currentUser = useAtomValue(currentUserAtom);
    const currentQuizIndex = useAtomValue(currentQuizIndexAtom);

    const quizId = currentQuizIndex.toString();

    const currentQuiz = currentUser?.quizList.find(
        (quiz) => quiz.id === quizId
    );

    const randomQuestions = currentQuiz?.questions ?? [];
    const answers = currentQuiz?.questions.map(q => q.user_answer) ?? [];

    // Scroll all'inizio quando le domande sono caricate
    useEffect(() => {
        if (questionsListRef.current) {
            questionsListRef.current.scrollTop = 0;
        }
    }, []);

    if (!randomQuestions.length) return <h1>Loading questions...</h1>;

    return (
        <div className={styles.container}>
            <h1>Review Questions & Answers</h1>
            <div className={styles.question_list_container}>
                <div ref={questionsListRef} className={styles.questions_list}>
                    {randomQuestions.map((q, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.correct_answer;
                        
                        return (
                            <div
                            key={index}
                            className={`${styles.question_card} ${isCorrect ? styles.correct : styles.incorrect}`}
                            >
                                <h3>Question {index + 1}</h3>
                                <p className={styles.question_text}>{q.question}</p>

                                {q.imageUrl && (
                                    <img
                                    src={q.imageUrl}
                                    alt={`Question ${index + 1}`}
                                    className={styles.question_image}
                                    />
                                )}

                                <p>
                                    <strong>Your Answer:</strong> {userAnswer !== null ? userAnswer.toString().toUpperCase() : 'No answer'}
                                </p>
                                <p>
                                    <strong>Correct Answer:</strong> {q.correct_answer.toString().toUpperCase()}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                className={styles.previous__button}
                onClick={() => setCurrentScreen(Screens.QuizResults)}
            >
                &larr; Back to Results
            </button>
        </div>
    );
}

export default QuestionsAnswers;





























// import { Screens } from "../../App";
// import styles from "./QuestionsAnswers.module.css";
// import { useAtom } from "jotai";
// import { currentUserAtom } from "../../states/userAtom";
// import { useQuiz } from "../../Providers/QuizProvider";

// type Props = {
//   setCurrentScreen: (screen: any) => void;
//   screen: any;
// };

// function QuestionsAnswers({ setCurrentScreen, screen }: Props) {
//   const [user] = useAtom(currentUserAtom);
//   const { randomQuestions, answers } = useQuiz();

//   if (screen.quizId) {
//     const quiz = user?.listOfQuiz.find(q => q.id === screen.quizId);
//     if (!quiz) return <h1>Quiz not found</h1>;

//     return (
//       <div className={styles.container}>
//         <h1>Review Questions</h1>

//         {quiz.questions.map((q, i) => (
//           <div key={i} className={styles.question_card}>
//             <h3>Question {i + 1}</h3>
//             <p>{q.question}</p>
//             {q.imageUrl && (
//               <img
//                 src={"src/assets" + q.imageUrl}
//                 className={styles.question_image}
//               />
//             )}

//             <p><b>Your Answer:</b> {String(q.user_answer).toUpperCase()}</p>
//             <p><b>Correct Answer:</b> {String(q.correct_answer).toUpperCase()}</p>
//           </div>
//         ))}

//         <button
//           className={styles.previous__button}
//           onClick={() =>
//             setCurrentScreen({ name: Screens.QuizResults, quizId: quiz.id })
//           }
//         >
//           ← Back to Results
//         </button>
//       </div>
//     );
//   }

//   // Per quiz appena finito (vecchio comportamento)
//   return (
//     <div className={styles.container}>
//       <h1>Review Questions</h1>

//       {randomQuestions.map((q, i) => (
//         <div key={i} className={styles.question_card}>
//           <h3>Question {i + 1}</h3>
//           <p>{q.q}</p>

//           {q.img && (
//             <img src={"src/assets" + q.img} className={styles.question_image} />
//           )}

//           <p><b>Your Answer:</b> {String(answers[i]).toUpperCase()}</p>
//           <p><b>Correct Answer:</b> {String(q.a).toUpperCase()}</p>
//         </div>
//       ))}

//       <button
//         className={styles.previous__button}
//         onClick={() => setCurrentScreen({ name: Screens.QuizResults })}
//       >
//         ← Back to Results
//       </button>
//     </div>
//   );
// }

// export default QuestionsAnswers;
