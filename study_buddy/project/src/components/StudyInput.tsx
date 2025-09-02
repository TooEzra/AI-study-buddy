import React, { useState } from 'react';
import { Upload, Wand2, Settings, FileText, Lightbulb } from 'lucide-react';
import { GenerationOptions } from '../types/flashcard';

interface StudyInputProps {
  onGenerate: (text: string, options: GenerationOptions) => void;
  isGenerating: boolean;
  hasExistingCards: boolean;
}

const StudyInput: React.FC<StudyInputProps> = ({ onGenerate, isGenerating, hasExistingCards }) => {
  const [inputText, setInputText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<GenerationOptions>({
    cardCount: 10,
    difficulty: 'medium',
    focusAreas: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onGenerate(inputText, options);
    }
  };

  const exampleTexts = [
    {
      title: "Biology - Cell Structure",
      text: "The cell membrane is a flexible barrier that surrounds the cell and controls what enters and exits. It's made of a phospholipid bilayer with embedded proteins. The nucleus contains the cell's genetic material (DNA) and controls cell activities. Mitochondria are the powerhouses of the cell, producing ATP through cellular respiration."
    },
    {
      title: "History - World War II",
      text: "World War II began in 1939 when Germany invaded Poland. The war involved most of the world's nations and lasted until 1945. Key events included the attack on Pearl Harbor in 1941, which brought the United States into the war, and D-Day in 1944, when Allied forces invaded Nazi-occupied France."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Transform Your Notes into Smart Flashcards
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Paste your study materials below and let AI create personalized flashcards 
          to help you learn more effectively and retain information longer.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <label className="text-lg font-medium text-gray-900">
                Study Material
              </label>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your lecture notes, textbook excerpts, or any study material here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            
            <div className="mt-4 text-sm text-gray-500">
              <span className="font-medium">{inputText.length}</span> characters
              {inputText.length > 0 && (
                <span className="ml-2">
                  • Estimated {Math.max(1, Math.floor(inputText.length / 100))} flashcards
                </span>
              )}
            </div>
          </div>

          {/* Options Panel */}
          <div className="border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Generation Options</span>
              </div>
              <div className="text-xs text-gray-500">
                {showOptions ? 'Hide' : 'Show'} advanced settings
              </div>
            </button>

            {showOptions && (
              <div className="px-6 pb-6 space-y-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Cards
                    </label>
                    <select
                      value={options.cardCount}
                      onChange={(e) => setOptions({...options, cardCount: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={5}>5 cards</option>
                      <option value={10}>10 cards</option>
                      <option value={15}>15 cards</option>
                      <option value={20}>20 cards</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={options.difficulty}
                      onChange={(e) => setOptions({...options, difficulty: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="easy">Easy - Basic recall</option>
                      <option value="medium">Medium - Understanding</option>
                      <option value="hard">Hard - Analysis & synthesis</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Generating Flashcards...</span>
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                <span>Generate AI Flashcards</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Example Content */}
      {!hasExistingCards && (
        <div className="mt-12">
          <div className="text-center mb-6">
            <Lightbulb className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Try These Examples
            </h3>
            <p className="text-gray-600">
              Click an example below to see how AI generates flashcards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleTexts.map((example, index) => (
              <div
                key={index}
                onClick={() => setInputText(example.text)}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <h4 className="font-medium text-gray-900 mb-2">{example.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{example.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyInput;