export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Function to query FAQ
export const queryFAQ = async (question) => {
  try {
    const response = await fetch(`${API_URL}/faq/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get answer');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Function to get all FAQs
export const getAllFAQs = async () => {
  try {
    const response = await fetch(`${API_URL}/faq`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get FAQs');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Function to add new FAQ
export const addFAQ = async (faqData) => {
  try {
    const response = await fetch(`${API_URL}/faq/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faqData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add FAQ');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Function to delete FAQ
export const deleteFAQ = async (id) => {
  try {
    const response = await fetch(`${API_URL}/faq/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete FAQ');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};