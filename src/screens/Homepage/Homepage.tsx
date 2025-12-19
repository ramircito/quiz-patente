import { useState } from 'react';
import styles from './Homepage.module.css';
import { Screens } from '../../App';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../states/userAtom';
import { User } from '../../models/user';

import logoImage from '../../assets/logo_quizApp3.png';


type HomepageProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function Homepage({ setCurrentScreen }: HomepageProps) {
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');
  const [currentUser, setCurrentUserAtom] = useAtom(currentUserAtom);

  const goToDashboard = () => {
    if (!name.trim()) {
      setWarning('Please insert your name');
      return;
    }

    setWarning('');

    // se l'utente esiste già, usalo, altrimenti creane uno nuovo
    if (!currentUser) {
      // Crea nuovo utente
      const newUser = new User(name.trim());
      setCurrentUserAtom(newUser);
      console.log("Nuovo utente creato:", newUser.name);
    } else {
      console.log("Utente esistente trovato:", currentUser.name);
    }

    // Vai al menu/dashboard
    setCurrentScreen(Screens.Menu);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setName(value);
      setWarning('');
    } else {
      setWarning('Maximum length is 40 characters');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logoImage} alt="logo_quizApp3" className={styles.logo} />
      </div>
      <h1>Welcome to <span className={styles.race}>Race</span><span className={styles.go}>&GO</span> license lab!!</h1> 
      <h2>Test your knowledge and prepare for your Italian driving license exam!</h2> 
      <h2>Click the button on top to get started</h2> 
      <h3>What's your name?</h3> 
      <input
        type="text"
        value={name}
        onChange={handleChange}
        className={styles.input}
        placeholder="Insert your name..."
      />
      {warning && <span className={styles.warning}>{warning}</span>} 
      <button
        className={styles.button}
        onClick={goToDashboard}
      >
        Go to Dashboard →
      </button>
    </div>
  );
}

export default Homepage;