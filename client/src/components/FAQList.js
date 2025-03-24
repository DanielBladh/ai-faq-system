import React from 'react';
import styles from '../styles/FAQList.module.css';

const FAQList = ({ faqs, onDelete }) => {
  if (!faqs.length) {
    return <p className={styles.empty}>No FAQs available yet.</p>;
  }

  return (
    <div className={styles.list}>
      {faqs.map((faq) => (
        <div key={faq.id} className={styles.item}>
          <h3 className={styles.question}>{faq.question}</h3>
          <p className={styles.answer}>{faq.answer}</p>
          <button 
            className={styles.deleteBtn}
            onClick={() => onDelete(faq.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FAQList;