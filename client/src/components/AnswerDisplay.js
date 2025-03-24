import React from 'react';
import styles from '../styles/AnswerDisplay.module.css';

const AnswerDisplay = ({ answer }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{answer.question}</h3>
      <div className={styles.answer}>{answer.answer}</div>
      <div className={styles.meta}>
        <span className={styles.similarity}>
          Match confidence: {Math.round(answer.similarity * 100)}%
        </span>
      </div>
    </div>
  );
};

export default AnswerDisplay;