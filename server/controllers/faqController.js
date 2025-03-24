const embeddingService = require('../services/embeddingService');

// Query FAQ based on user question
exports.queryFAQ = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Generate embedding for the question
    const embedding = await embeddingService.generateEmbedding(question);
    
    // Search for similar questions in the database
    const { data, error } = await req.supabase.rpc('match_faqs', {
      query_embedding: embedding,
      match_threshold: 0.7,  // Similarity threshold
      match_count: 1         // Number of matches to return
    });

    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ error: 'Failed to search for answers' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ 
        message: 'No matching answer found',
        suggestion: 'Try rephrasing your question or browse our FAQ list'
      });
    }

    // Return the best match
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Add new FAQ
exports.addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }

    // Generate embedding for the question
    const embedding = await embeddingService.generateEmbedding(question);
    
    // Insert into database
    const { data, error } = await req.supabase
      .from('faqs')
      .insert([
        { 
          question, 
          answer, 
          embedding 
        }
      ])
      .select();

    if (error) {
      console.error('Error adding to database:', error);
      return res.status(500).json({ error: 'Failed to add FAQ' });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from('faqs')
      .select('id, question, answer, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching FAQs:', error);
      return res.status(500).json({ error: 'Failed to fetch FAQs' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await req.supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
      return res.status(500).json({ error: 'Failed to delete FAQ' });
    }

    return res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};