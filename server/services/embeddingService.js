// Cache the pipeline instance
let embeddingPipeline;

// Initialize the embedding model pipeline
async function initializeEmbeddingPipeline() {
  if (!embeddingPipeline) {
    console.log("Initializing embedding model...");
    // Dynamisk import av pipeline
    const { pipeline } = await import("@xenova/transformers");
    // Använd Xenova's implementation av bge-large-en
    embeddingPipeline = await pipeline(
      "feature-extraction",
      "Xenova/bge-large-en"
    );
    console.log("Embedding model initialized");
  }
  return embeddingPipeline;
}

// Function to generate embeddings for a text
async function generateEmbedding(text) {
  try {
    const pipeline = await initializeEmbeddingPipeline();

    // Generate embedding
    const result = await pipeline(text, {
      pooling: "mean",
      normalize: true,
    });

    // Convert to Array
    const embedding = Array.from(result.data);
    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
}

module.exports = {
  generateEmbedding,
};
