import { useEffect, useState } from "react";
import { Screens } from "../../App";
import styles from "./Quizscreen.module.css";
import JsonFile from "../../assets/quizPatenteB2023.json";
import { useAtom, useAtomValue } from "jotai";
import { currentQuizAtom, currentQuizIndexAtom } from "../../states/quizAtoms";
import { getRandomQuestions, NUMBER_OF_QUESTIONS } from "../../utils/quizUtils";
import { currentUserAtom } from "../../states/userAtom";
import { Quiz, QuizQuestion } from "../../models/quiz";

type QuizScreenProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function QuizScreen({ setCurrentScreen }: QuizScreenProps) {
  const TOTAL_TIME = 30 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [holdTimeout, setHoldTimeout] = useState<number | null>(null);
  const [holdInterval, setHoldInterval] = useState<number | null>(null);
  const [, setIsHolding] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useAtom(currentQuizAtom);
  const currentUser = useAtomValue(currentUserAtom);
  const [, setCurrentQuizIndex] = useAtom(currentQuizIndexAtom);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const randomQuestions = getRandomQuestions(JsonFile);
    const userQuizNumber = currentUser?.quizList.length ?? -1;
    const newQuizId = (userQuizNumber >= 0 ? userQuizNumber + 1 : 1).toString();
    const newQuizQuestions: Array<QuizQuestion> = [];

    randomQuestions.forEach((q: any) => {
      console.log('q.img: ', q.img);
      newQuizQuestions.push(
        new QuizQuestion(
          q.q,                 // question text
          q.a,                 // correct answer (boolean)
          q.img ? "src/assets" + q.img : null // image url
        )
      );
    });
    const newQuiz = new Quiz(newQuizId, newQuizQuestions);
    
    setCurrentQuiz(newQuiz);
    setCurrentQuizIndex(parseInt(newQuizId));
  }, []);

  // === TIMER ===
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCurrentScreen(Screens.QuizResults);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // === SCROLL AUTOMATICO DEL CHECKPOINT CORRENTE ===
  useEffect(() => {
    const el = document.getElementById("current-checkpoint");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentQuestionIndex]);

  // === FUNZIONI DI CONTROLLO ===
  function handleAnswer(userAnswer: boolean) {
    if (!currentQuiz) return;

    const updatedQuiz = new Quiz(
      currentQuiz.id,
      currentQuiz.questions.map((q) => ({ ...q }))
    );
    updatedQuiz.questions[currentQuestionIndex].user_answer = userAnswer;
    setCurrentQuiz(updatedQuiz);
  }

  function handleChangeQuestion(isNext: boolean) {
    setCurrentQuestionIndex((prev) =>
      isNext
        ? (prev + 1) % NUMBER_OF_QUESTIONS
        : (prev - 1 + NUMBER_OF_QUESTIONS) % NUMBER_OF_QUESTIONS
    );
  }

  // === PRESS & HOLD CON RITARDO 1 SECONDO ===
  function startHoldDelayed(isNext: boolean) {
    setIsHolding(false);

    const timeoutId = window.setTimeout(() => {
      setIsHolding(true); // ora è hold
      const intervalId = window.setInterval(() => {
        handleChangeQuestion(isNext);
      }, 325);
      setHoldInterval(intervalId);
    }, 175);

    setHoldTimeout(timeoutId);
  }

  function stopHold() {
    if (holdTimeout !== null) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
    if (holdInterval !== null) {
      clearInterval(holdInterval);
      setHoldInterval(null);
    }
  }

  function getImageForQuestion(index: number): string {
    if (!currentQuiz?.questions.length) return "";

    const question = currentQuiz?.questions[index];

    return question.imageUrl || "";
  }

  if (!currentQuiz?.questions.length) return <h1>Loading quiz...</h1>;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className={styles.container}>
      <h1>QUIZ STARTED</h1>

      <h2 style={{ color: "#FFF600" }}>
        TIME LEFT: {minutes}:{seconds}
      </h2>

      <p>Once you’re done click on FINISH TEST button and see the results.</p>

      <button
        className={styles.finishButton}
        onClick={() => setCurrentScreen(Screens.QuizFinished)}
      >
        FINISH TEST
      </button>

      <div className={styles.elementsBox}>
        <div className={styles.checkpointBox}>
          {Array.from({ length: NUMBER_OF_QUESTIONS }, (_, i) => (
            <div
              key={i}
              id={i === currentQuestionIndex ? "current-checkpoint" : undefined}
              className={styles.checkpoint}
              onClick={() => setCurrentQuestionIndex(i)}
              style={{
                backgroundColor:
                  i === currentQuestionIndex
                    ? "#00cfff" // current question
                    : currentQuiz?.questions[i].user_answer === true || false
                    ? "#00F" // answered
                    : "#edfaff3a", // unanswered
              }}
            >
              <p>{i + 1}</p>
            </div>
          ))}
        </div>

        <div className={styles.question__container}>
            {(() => {
                const imageSrc = getImageForQuestion(currentQuestionIndex);
                return imageSrc ? (
                  <div className={styles.question__side__container}>
                    <span></span>
                    <img
                      src={imageSrc}
                      alt="Quiz question"
                    />
                    <span></span>
                  </div>
                ) : null;
              })()}

          <div className={styles.question__side__container}>
            <div className={styles.question_count_text}>
              <h3>
                QUESTION {currentQuestionIndex + 1} of {NUMBER_OF_QUESTIONS}
              </h3>
            </div>

            <div className={styles.question_description_text}>
              {currentQuiz?.questions[currentQuestionIndex].question}
            </div>

            <div className={styles.response__container}>
              <button
                onClick={() => handleAnswer(true)}
                style={{
                  backgroundColor:
                    currentQuiz?.questions[currentQuestionIndex].user_answer === true ? "green" : "grey",
                }}
                className={styles.response__button__true}
              >
                <h4>TRUE</h4>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                style={{
                  backgroundColor:
                    currentQuiz?.questions[currentQuestionIndex].user_answer === false ? "red" : "grey",
                }}
                className={styles.response__button__false}
              >
                <h4>FALSE</h4>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.optionBox}>
        <button
          className={styles.controller__button_directions}
          onClick={() => handleChangeQuestion(false)} // click singolo
          onMouseDown={() => startHoldDelayed(false)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHoldDelayed(false)}
          onTouchEnd={stopHold}
        >
          <p>&larr;</p>
        </button>

        <button
          className={styles.controller__button_directions}
          onClick={() => handleChangeQuestion(true)} // click singolo
          onMouseDown={() => startHoldDelayed(true)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHoldDelayed(true)}
          onTouchEnd={stopHold}
        >
          <p>&rarr;</p>
        </button>
      </div>
    </div>
  );
}

export default QuizScreen;
