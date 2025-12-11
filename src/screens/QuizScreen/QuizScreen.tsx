import { useEffect, useState } from "react";
import { Screens } from "../../App";
import styles from "./Quizscreen.module.css";
import JsonFile from "../../assets/quizPatenteB2023.json";

import { useQuiz } from "../../Providers/QuizProvider";

type QuizScreenProps = {
  setCurrentScreen: (screen: Screens) => void;
};

type Question = {
  q: string;
  img: string;
  a: boolean;
};

const NUMBER_OF_QUESTIONS = 30;

function QuizScreen({ setCurrentScreen }: QuizScreenProps) {
  const TOTAL_TIME = 30 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [holdTimeout, setHoldTimeout] = useState<number | null>(null);
  const [holdInterval, setHoldInterval] = useState<number | null>(null);
  const [, setIsHolding] = useState(false);

  const {
    answers,
    setAnswers,
    randomQuestions,
    setRandomQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useQuiz();

  function getAllQuestions(obj: any): Question[] {
    const questions: Question[] = [];

    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) {
        questions.push(...value);
      } else if (typeof value === "object") {
        questions.push(...getAllQuestions(value));
      }
    }
    return questions;
  }

  function getRandomQuestions(jsonFile: any): Question[] {
    const allQuestions = getAllQuestions(jsonFile);
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, NUMBER_OF_QUESTIONS);
  }

  useEffect(() => {
    if (randomQuestions.length === 0) {
      setRandomQuestions(getRandomQuestions(JsonFile));
      setAnswers(Array(NUMBER_OF_QUESTIONS).fill(null));
    }
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
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = userAnswer;
      return updated;
    });
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
    if (!randomQuestions.length) return "";
    const question = randomQuestions[index];
    return question.img ? "src/assets" + question.img : "";
  }

  if (!randomQuestions.length) return <h1>Loading quiz...</h1>;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className={styles.container}>
      <h1>QUIZ N.1</h1>

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
                    ? "#00cfff"
                    : answers[i] !== null
                    ? "#6FBF73"
                    : "#edfaff3a",
              }}
            >
              <p>{i + 1}</p>
            </div>
          ))}
        </div>

        <div className={styles.question__container}>
          <div className={styles.question__side__container}>
            <span></span>
            {getImageForQuestion(currentQuestionIndex) && (
              <img
                src={getImageForQuestion(currentQuestionIndex)}
                alt="Quiz question"
              />
            )}
            <span></span>
          </div>

          <div className={styles.question__side__container}>
            <div className={styles.question_count_text}>
              <h3>
                QUESTION {currentQuestionIndex + 1} of {NUMBER_OF_QUESTIONS}
              </h3>
            </div>

            <div className={styles.question_description_text}>
              {randomQuestions[currentQuestionIndex].q}
            </div>

            <div className={styles.response__container}>
              <button
                onClick={() => handleAnswer(true)}
                style={{
                  backgroundColor:
                    answers[currentQuestionIndex] === true ? "green" : "grey",
                }}
                className={styles.response__button__true}
              >
                <h4>TRUE</h4>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                style={{
                  backgroundColor:
                    answers[currentQuestionIndex] === false ? "red" : "grey",
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
