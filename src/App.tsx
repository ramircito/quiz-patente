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
import { useAtomValue } from 'jotai';
import { currentUserAtom } from './states/userAtom';
import { Screens } from './models/screen';

function App() {
  const currentUser = useAtomValue(currentUserAtom);
  const [currentScreen, setCurrentScreen] = useState<Screens>(
    currentUser === null ? Screens.Homepage : Screens.Menu
  );

  // Avoid setState-in-effect: derive the screen from auth state at render time.
  // If there's no user, always show Homepage (and prevent access to other screens).
  // If a user appears while we're on Homepage, show Menu.
  const effectiveScreen = !currentUser
    ? Screens.Homepage
    : currentScreen === Screens.Homepage
      ? Screens.Menu
      : currentScreen;

  return (
    <ThemeProvider>
        <div className={styles.container}>
          {effectiveScreen === Screens.Homepage && <Homepage setCurrentScreen={setCurrentScreen} />}
          {effectiveScreen === Screens.Menu && <Menu setCurrentScreen={setCurrentScreen} />}
          {effectiveScreen === Screens.Quizscreen && <QuizScreen setCurrentScreen={setCurrentScreen} />}
          {effectiveScreen === Screens.QuizFinished && <QuizFinished setCurrentScreen={setCurrentScreen} />}
          {effectiveScreen === Screens.QuizResults && <QuizResults setCurrentScreen={setCurrentScreen} />}
          {effectiveScreen === Screens.QuestionsAnswers && <QuestionsAnswers setCurrentScreen={setCurrentScreen} />}
        </div>
    </ThemeProvider>
  )
}
export default App
