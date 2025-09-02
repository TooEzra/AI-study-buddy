import { Flashcard, GenerationOptions } from '../types/flashcard';

// This is a demo implementation. In production, you'd want to:
// 1. Use environment variables for API keys
// 2. Implement proper error handling
// 3. Use edge functions for secure API calls

export const generateFlashcards = async (
  text: string, 
  options: GenerationOptions
): Promise<Flashcard[]> => {
  // For demo purposes, we'll generate flashcards using a simple algorithm
  // In production, you'd integrate with Hugging Face API or similar AI service
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Split text into sentences and create questions
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const flashcards: Flashcard[] = [];

  for (let i = 0; i < Math.min(options.cardCount, sentences.length); i++) {
    const sentence = sentences[i].trim();
    if (!sentence) continue;

    // Simple question generation logic (in production, use AI)
    const flashcard: Flashcard = {
      id: generateId(),
      question: generateQuestion(sentence, options.difficulty),
      answer: sentence,
      difficulty: options.difficulty,
      createdAt: new Date(),
      correctCount: 0,
      totalAttempts: 0
    };

    flashcards.push(flashcard);
  }

  return flashcards;
};

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const generateQuestion = (sentence: string, difficulty: string): string => {
  // Simple question generation based on difficulty
  const words = sentence.split(' ');
  
  switch (difficulty) {
    case 'easy':
      return `What does this statement describe: "${sentence.substring(0, 50)}..."?`;
    case 'medium':
      // Remove key terms and ask to fill in
      const keyWord = words.find(w => w.length > 6) || words[Math.floor(words.length / 2)];
      return `Complete this statement: "${sentence.replace(keyWord, '_____')}"`;
    case 'hard':
      return `Analyze and explain the significance of: "${sentence}"`;
    default:
      return `What is described in this statement?`;
  }
};

// Future integration with Hugging Face API
export const generateWithHuggingFace = async (text: string): Promise<Flashcard[]> => {
  // Example implementation for Hugging Face integration
  // You would need to set up environment variables for API keys
  
  const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const API_KEY = "your-hugging-face-api-key"; // Store in environment variables
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          max_length: 100,
          min_length: 30,
          do_sample: false
        }
      }),
    });

    const result = await response.json();
    
    // Process the AI result into flashcards
    // This would require additional logic to parse and format the response
    
    return [];
  } catch (error) {
    console.error('Hugging Face API error:', error);
    throw error;
  }
};