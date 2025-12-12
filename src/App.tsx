import { useState } from 'react';
import styles from './App.module.css';
import Homepage from './screens/Homepage/Homepage';
import Menu from './screens/Menu/Menu';
import QuizScreen from './screens/QuizScreen/QuizScreen';
import QuizFinished from './screens/QuizFinished/QuizFinished';
// import { QuizProvider } from "./Providers/QuizProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";
import QuizResults from './screens/QuizResults/QuizResults';
import QuestionsAnswers from './screens/QuestionsAnswers/QuestionAnswers';

// eslint-disable-next-line react-refresh/only-export-components
export enum Screens {
  Homepage,
  Menu,
  Quizscreen,
  QuizFinished,
  QuizResults,
  QuestionsAnswers
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.Homepage);

  return (
    <ThemeProvider>
        <div className={styles.container}>
          {currentScreen === Screens.Homepage && <Homepage setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.Menu && <Menu setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.Quizscreen && <QuizScreen setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.QuizFinished && <QuizFinished setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.QuizResults && <QuizResults setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.QuestionsAnswers && <QuestionsAnswers setCurrentScreen={setCurrentScreen} />}
        </div>
    </ThemeProvider>
  )
}
export default App


