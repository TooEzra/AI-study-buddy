import React, { useState, useEffect } from 'react';
import { Brain, Plus, RotateCcw, BookOpen, TrendingUp } from 'lucide-react';
import StudyInput from './components/StudyInput';
import FlashcardDeck from './components/FlashcardDeck';
import StudyStats from './components/StudyStats';
import { Flashcard, StudySession } from './types/flashcard';
import { generateFlashcards } from './services/aiService';
import { saveFlashcards, getFlashcards, updateStudyStats } from './utils/storage';

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentMode, setCurrentMode] = useState<'input' | 'study'>('input');
  const [studyStats, setStudyStats] = useState({
    totalCards: 0,
    studiedToday: 0,
    correctAnswers: 0,
    streakDays: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadSavedFlashcards();
    loadStudyStats();
  }, []);

  const loadSavedFlashcards = async () => {
    const saved = await getFlashcards();
    setFlashcards(saved);
  };

  const loadStudyStats = () => {
    const stats = updateStudyStats();
    setStudyStats(stats);
  };

  const handleGenerateFlashcards = async (text: string, options: any) => {
    setIsGenerating(true);
    try {
      const newCards = await generateFlashcards(text, options);
      const updatedCards = [...flashcards, ...newCards];
      setFlashcards(updatedCards);
      await saveFlashcards(updatedCards);
      setCurrentMode('study');
      loadStudyStats();
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Failed to generate flashcards. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStudyComplete = (session: StudySession) => {
    setStudyStats(prev => ({
      ...prev,
      studiedToday: prev.studiedToday + session.cardsStudied,
      correctAnswers: prev.correctAnswers + session.correctAnswers
    }));
  };

  const resetFlashcards = async () => {
    setFlashcards([]);
    await saveFlashcards([]);
    setCurrentMode('input');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Study Buddy</h1>
                <p className="text-xs text-gray-500">Smart Flashcard Generator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentMode(currentMode === 'input' ? 'study' : 'input')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentMode === 'input' ? (
                  <>
                    <BookOpen className="h-4 w-4" />
                    <span>Study</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Create</span>
                  </>
                )}
              </button>
              
              {flashcards.length > 0 && (
                <button
                  onClick={resetFlashcards}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <StudyStats stats={studyStats} />

        {/* Content Area */}
        <div className="mt-8">
          {currentMode === 'input' ? (
            <StudyInput 
              onGenerate={handleGenerateFlashcards}
              isGenerating={isGenerating}
              hasExistingCards={flashcards.length > 0}
            />
          ) : (
            <FlashcardDeck 
              flashcards={flashcards}
              onStudyComplete={handleStudyComplete}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">SDG 4: Quality Education</span>
            </div>
            <p className="text-gray-600 text-sm">
              Empowering learners worldwide with AI-assisted study tools for inclusive, equitable education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;