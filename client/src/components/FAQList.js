import React, { useState } from "react";
import styles from "../styles/FAQList.module.css";

const FAQList = ({ faqs, onDelete }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation(); // Förhindra att FAQ öppnas vid radering
    if (window.confirm("Är du säker på att du vill radera denna FAQ?")) {
      onDelete(id);
    }
  };

  if (!faqs.length) {
    return <p className={styles.empty}>Inga FAQs tillgängliga än.</p>;
  }

  return (
    <div className={styles.list}>
      {faqs.map((faq) => (
        <div key={faq.id} className={styles.item}>
          <div className={styles.header} onClick={() => toggleFAQ(faq.id)}>
            <span className={styles.icon}>{openFAQ === faq.id ? "▼" : "▶"}</span>
            <h3 className={styles.question}>{faq.question}</h3>
            <button
              className={styles.deleteBtn}
              onClick={(e) => handleDelete(e, faq.id)}
            >
              ❌
            </button>
          </div>
          <div className={`${styles.answer} ${openFAQ === faq.id ? styles.open : ""}`}>
            {openFAQ === faq.id && <p>{faq.answer}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQList;
