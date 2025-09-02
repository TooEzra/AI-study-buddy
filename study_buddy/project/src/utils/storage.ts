import { Flashcard } from '../types/flashcard';

const STORAGE_KEY = 'ai-study-buddy-flashcards';
const STATS_KEY = 'ai-study-buddy-stats';

export const saveFlashcards = async (flashcards: Flashcard[]): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  } catch (error) {
    console.error('Error saving flashcards:', error);
  }
};

export const getFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const flashcards = JSON.parse(saved);
      return flashcards.map((card: any) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading flashcards:', error);
    return [];
  }
};

export const updateStudyStats = () => {
  const today = new Date().toDateString();
  const saved = localStorage.getItem(STATS_KEY);
  
  let stats = {
    totalCards: 0,
    studiedToday: 0,
    correctAnswers: 0,
    streakDays: 1,
    lastStudyDate: today
  };

  if (saved) {
    const parsed = JSON.parse(saved);
    stats = { ...stats, ...parsed };
    
    // Reset daily stats if it's a new day
    if (parsed.lastStudyDate !== today) {
      stats.studiedToday = 0;
      stats.lastStudyDate = today;
    }
  }

  // Update total cards count
  getFlashcards().then(cards => {
    stats.totalCards = cards.length;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  });

  return stats;
};

export const saveStudyStats = (stats: any) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};