import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Target } from 'lucide-react';
import { Flashcard, StudySession } from '../types/flashcard';
import FlashcardComponent from './FlashcardComponent';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  onStudyComplete: (session: StudySession) => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ flashcards, onStudyComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studySession, setStudySession] = useState<StudySession>({
    cardsStudied: 0,
    correctAnswers: 0,
    timeSpent: 0,
    date: new Date()
  });
  const [startTime] = useState(Date.now());

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleAnswer = (correct: boolean) => {
    setStudySession(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: prev.correctAnswers + (correct ? 1 : 0)
    }));

    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        handleNext();
      } else {
        // Study session complete
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        onStudyComplete({
          ...studySession,
          cardsStudied: studySession.cardsStudied + 1,
          correctAnswers: studySession.correctAnswers + (correct ? 1 : 0),
          timeSpent
        });
      }
    }, 1000);
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setStudySession({
      cardsStudied: 0,
      correctAnswers: 0,
      timeSpent: 0,
      date: new Date()
    });
  };

  if (!currentCard) {
    return (
      <div className="text-center py-12">
        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No flashcards available</h3>
        <p className="text-gray-600">Create some flashcards first to start studying!</p>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  const accuracy = studySession.cardsStudied > 0 
    ? Math.round((studySession.correctAnswers / studySession.cardsStudied) * 100) 
    : 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <span className="text-sm text-gray-500">
            {accuracy}% accuracy
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <FlashcardComponent
        flashcard={currentCard}
        showAnswer={showAnswer}
        onFlip={() => setShowAnswer(!showAnswer)}
      />

      {/* Action Buttons */}
      <div className="mt-6 space-y-4">
        {showAnswer ? (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center space-x-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <XCircle className="h-5 w-5" />
              <span>Incorrect</span>
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Correct</span>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={() => setShowAnswer(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              Show Answer
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={resetDeck}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Study Session Stats */}
      <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Session</h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{studySession.cardsStudied}</div>
            <div className="text-xs text-gray-500">Cards Studied</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{studySession.correctAnswers}</div>
            <div className="text-xs text-gray-500">Correct Answers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;