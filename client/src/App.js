import React, { useState, useEffect } from "react";
import "./styles/App.css";
import QuestionForm from "./components/QuestionForm";
import AnswerDisplay from "./components/AnswerDisplay";
import FAQList from "./components/FAQList";
import FAQForm from "./components/FAQForm";
import FileUploader from "./components/fileUpload";
import { queryFAQ, getAllFAQs, addFAQ, deleteFAQ } from "./services/api";

function App() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [error, setError] = useState("");

  // Load all FAQs on component mount
  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const faqData = await getAllFAQs();
      setFaqs(faqData);
    } catch (error) {
      console.error("Failed to load FAQs:", error);
      setError("Failed to load FAQs. Please try again later.");
    }
  };

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setError("");
    setAnswer(null);

    try {
      const data = await queryFAQ(question);
      setAnswer(data);
    } catch (error) {
      console.error("Error querying FAQ:", error);
      setError(
        "Failed to get an answer. Please try again or browse our FAQ list."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async (faqData) => {
    try {
      await addFAQ(faqData);
      setShowAddFAQ(false);
      await loadFAQs();
    } catch (error) {
      console.error("Error adding FAQ:", error);
      setError("Failed to add FAQ. Please try again.");
    }
  };

  const handleDeleteFAQ = async (id) => {
    try {
      await deleteFAQ(id);
      await loadFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setError("Failed to delete FAQ. Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>AI FAQ System</h1>
        <p>Ställ en fråga och få svar från vår kunskapsbas</p>
      </header>

      <main className="main">
        <QuestionForm onSubmit={handleQuestionSubmit} />

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Söker efter svar...</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {answer && <AnswerDisplay answer={answer} />}

        <div className="faq-section">
          <div className="faq-header">
            <h2>Vanliga frågor och svar</h2>
            <button
              className="add-faq-btn"
              onClick={() => setShowAddFAQ(!showAddFAQ)}
            >
              {showAddFAQ ? "Avbryt" : "Lägg till FAQ"}
            </button>
          </div>

          {showAddFAQ && <FAQForm onSubmit={handleAddFAQ} />}

          <FAQList faqs={faqs} onDelete={handleDeleteFAQ} />
          <FileUploader userId="temporary-user-id" />
        </div>
      </main>
    </div>
  );
}

export default App;
