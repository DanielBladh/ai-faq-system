import React, { useState } from 'react';
import styles from '../styles/QuestionForm.module.css';

const QuestionForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default QuestionForm;