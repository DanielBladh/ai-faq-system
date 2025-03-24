import React, { useState } from 'react';
import styles from '../styles/FAQForm.module.css';

const FAQForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.question.trim() && formData.answer.trim()) {
      onSubmit(formData);
      setFormData({ question: '', answer: '' });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="question" className={styles.label}>Question:</label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="answer" className={styles.label}>Answer:</label>
        <textarea
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          className={styles.textarea}
          rows="4"
          required
        />
      </div>
      
      <button type="submit" className={styles.button}>
        Add FAQ
      </button>
    </form>
  );
};

export default FAQForm;