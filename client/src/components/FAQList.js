import React, { useState } from "react";
import styles from "../styles/FAQList.module.css";

const FAQList = ({ faqs, onDelete }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  if (!faqs.length) {
    return <p className={styles.empty}>No FAQs available yet.</p>;
  }

  return (
    <div className={styles.list}>
      {faqs.map((faq) => (
        <div key={faq.id} className={styles.item}>
          <div className={styles.header} onClick={() => toggleFAQ(faq.id)}>
            <span className={styles.icon}>
              {openFAQ === faq.id ? "▼" : "▶"}
            </span>
            <h3 className={styles.question}>{faq.question}</h3>
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation(); // Förhindra att FAQ öppnas vid radering
                onDelete(faq.id);
              }}
            >
              ❌
            </button>
          </div>
          {openFAQ === faq.id && <p className={styles.answer}>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQList;
