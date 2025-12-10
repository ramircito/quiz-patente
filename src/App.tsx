import { useState } from 'react';
import styles from './App.module.css';
import Homepage from './screens/Homepage/Homepage';
import Menu from './screens/Menu/Menu';
import QuizScreen from './screens/QuizScreen/QuizScreen';
import QuizFinished from './screens/QuizFinished/QuizFinished';
import { QuizProvider } from "./Providers/QuizProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";
import QuizResults from './screens/QuizResults/QuizResults';
import QuestionsAnswers from './screens/QuestionsAnswers/QuestionAnswers';


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
      <QuizProvider>
        <div className={styles.container}>
          {currentScreen === Screens.Homepage && <Homepage setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.Menu && <Menu setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.Quizscreen && <QuizScreen setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.QuizFinished && <QuizFinished setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.QuizResults && <QuizResults setCurrentScreen={setCurrentScreen} />}
          {currentScreen === Screens.QuestionsAnswers && <QuestionsAnswers setCurrentScreen={setCurrentScreen} />}
        </div>
      </QuizProvider>
    </ThemeProvider>
  )
}
export default App


// import { useState } from 'react';
// import styles from './App.module.css';

// import Homepage from './screens/Homepage/Homepage';
// import Menu from './screens/Menu/Menu';
// import QuizScreen from './screens/QuizScreen/QuizScreen';
// import QuizFinished from './screens/QuizFinished/QuizFinished';
// import QuizResults from './screens/QuizResults/QuizResults';
// import QuestionsAnswers from './screens/QuestionsAnswers/QuestionAnswers';

// import { QuizProvider } from "./Providers/QuizProvider";
// import { ThemeProvider } from "./Providers/ThemeProvider";

// export enum Screens {
//   Homepage = "Homepage",
//   Menu = "Menu",
//   Quizscreen = "Quizscreen",
//   QuizFinished = "QuizFinished",
//   QuizResults = "QuizResults",
//   QuestionsAnswers = "QuestionsAnswers"
// }

// export type ScreenState =
//   | { name: Screens.Homepage }
//   | { name: Screens.Menu }
//   | { name: Screens.Quizscreen }
//   | { name: Screens.QuizFinished }
//   | { name: Screens.QuizResults, quizId?: string }
//   | { name: Screens.QuestionsAnswers, quizId?: string };

// function App() {
//   const [currentScreen, setCurrentScreen] = useState<ScreenState>({
//     name: Screens.Homepage
//   });

//   return (
//     <ThemeProvider>
//       <QuizProvider>
//         <div className={styles.container}>

//           {currentScreen.name === Screens.Homepage && (
//             <Homepage setCurrentScreen={setCurrentScreen} />
//           )}

//           {currentScreen.name === Screens.Menu && (
//             <Menu setCurrentScreen={setCurrentScreen} />
//           )}

//           {currentScreen.name === Screens.Quizscreen && (
//             <QuizScreen setCurrentScreen={setCurrentScreen} />
//           )}

//           {currentScreen.name === Screens.QuizFinished && (
//             <QuizFinished setCurrentScreen={setCurrentScreen} />
//           )}

//           {currentScreen.name === Screens.QuizResults && (
//             <QuizResults
//               setCurrentScreen={setCurrentScreen}
//               quizId={currentScreen.quizId} 
//             />
//           )}

//           {currentScreen.name === Screens.QuestionsAnswers && (
//             <QuestionsAnswers
//               setCurrentScreen={setCurrentScreen}
//               quizId={currentScreen.quizId} 
//             />
//           )}
//         </div>
//       </QuizProvider>
//     </ThemeProvider>
//   );
// }

// export default App;
