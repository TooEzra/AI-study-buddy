import React from 'react';
import { RotateCcw, Star } from 'lucide-react';
import { Flashcard } from '../types/flashcard';

interface FlashcardComponentProps {
  flashcard: Flashcard;
  showAnswer: boolean;
  onFlip: () => void;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ 
  flashcard, 
  showAnswer, 
  onFlip 
}) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const accuracy = flashcard.totalAttempts > 0 
    ? Math.round((flashcard.correctCount / flashcard.totalAttempts) * 100) 
    : 0;

  return (
    <div className="relative w-full h-80 perspective-1000">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          showAnswer ? 'rotate-y-180' : ''
        }`}
        onClick={onFlip}
      >
        {/* Front Side - Question */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                {flashcard.difficulty && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(flashcard.difficulty)}`}>
                    {flashcard.difficulty}
                  </span>
                )}
                {accuracy > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Star className="h-3 w-3" />
                    <span>{accuracy}%</span>
                  </div>
                )}
              </div>
              <RotateCcw className="h-5 w-5 text-gray-400" />
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Question</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {flashcard.question}
                </p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              Click to reveal answer
            </div>
          </div>
        </div>

        {/* Back Side - Answer */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                {flashcard.difficulty && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(flashcard.difficulty)}`}>
                    {flashcard.difficulty}
                  </span>
                )}
                {accuracy > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Star className="h-3 w-3" />
                    <span>{accuracy}%</span>
                  </div>
                )}
              </div>
              <RotateCcw className="h-5 w-5 text-gray-400" />
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-green-800 mb-2">Answer</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {flashcard.answer}
                </p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              How did you do?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;