export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  lastReviewed?: Date;
  correctCount: number;
  totalAttempts: number;
}

export interface StudySession {
  cardsStudied: number;
  correctAnswers: number;
  timeSpent: number;
  date: Date;
}

export interface GenerationOptions {
  cardCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  focusAreas: string[];
}