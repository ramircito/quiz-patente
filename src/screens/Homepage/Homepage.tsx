import { useEffect, useState } from 'react';
import styles from './Homepage.module.css';
import { Screens } from '../../App';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../states/userAtom';
import { User } from '../../models/user';

import logoImage from '../../assets/logo_quizApp.png';


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

    // Controllo se l'utente esiste già
    const existingUser = currentUser;

    if (!existingUser) {
      // Crea nuovo utente
      const newUser = new User(name.trim());
      setCurrentUserAtom(newUser);
      console.log("Nuovo utente creato:", newUser.name);
    } else {
      console.log("Utente esistente trovato:", existingUser.name);
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

  useEffect(() => {
    // Se l'utente è già loggato, vai direttamente al menu
    if (currentUser) {
      setCurrentScreen(Screens.Menu);
    }
  }, [currentUser, setCurrentScreen]);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logoImage} alt="logo_quizApp" className={styles.logo} />
      </div>
      <h1>Welcome to RamiRace's license lab!!</h1> 
      <p>Test your knowledge and prepare for your Italian driving license exam!</p> 
      <span>Click the button on top to get started</span> 
      <p>What's your name?</p> 
      <input
        type="text"
        value={name}
        onChange={handleChange}
        className={styles.input}
        placeholder="Insert your name..."
      />
      {warning && <p className={styles.warning}>{warning}</p>} 
      <button
        className={styles.bottom__button}
        onClick={goToDashboard}
      >
        Go to Dashboard →
      </button>
    </div>
  );
}

export default Homepage;