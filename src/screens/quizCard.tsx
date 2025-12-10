import styles from './quizCard.module.css';

function QuizCard() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Quiz Patente by Salamanca</h2>
      <p className={styles.description}>Test your knowledge and prepare for your driving license exam!</p>
    </div>
  );
}

export default QuizCard;