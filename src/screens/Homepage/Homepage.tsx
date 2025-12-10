import { useState } from 'react';
import styles from './Homepage.module.css';
import { Screens } from '../../App';
import { useAtom } from 'jotai';
import { usersAtom, currentUser } from '../../states/userAtom';
import { User } from '../../models/user';

type HomepageProps = {
  setCurrentScreen: (screen: Screens) => void;
};

function Homepage({ setCurrentScreen }: HomepageProps) {
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');
  const [users, setUsers] = useAtom(usersAtom);
  const [current, setCurrent] = useAtom(currentUser);

  const goToDashboard = () => {
    if (!name.trim()) {
      setWarning('Please insert your name');
      return;
    }


    setWarning('');

    // Controllo se l'utente esiste già
    let existingUser = users.find(user => user.name === name.trim());

    if (!existingUser) {
      // Crea nuovo utente
      existingUser = new User(name.trim());
      setUsers([...users, existingUser]);
      console.log("Nuovo utente creato:", existingUser);
    } else {
      console.log("Utente esistente trovato:", existingUser);
    }

    // Imposta utente corrente
    setCurrent(existingUser);

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

  return (<div className={styles.container}> <h1>Welcome to Salamanca's license lab!!</h1> <p>Test your knowledge and prepare for your Italian driving license exam!</p> <span>Click the button below to get started:</span> <p>What's your name?</p> <input
    type="text"
    value={name}
    onChange={handleChange}
    className={styles.input}
    placeholder="Insert your name..."
  />
    {warning && <p className={styles.warning}>{warning}</p>} <button
      className={styles.bottom__button}
      onClick={goToDashboard}
    >
      Go to Dashboard → </button> </div>
  );
}

export default Homepage;
