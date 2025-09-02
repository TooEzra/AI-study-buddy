import React from 'react';
import { BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';

interface StudyStatsProps {
  stats: {
    totalCards: number;
    studiedToday: number;
    correctAnswers: number;
    streakDays: number;
  };
}

const StudyStats: React.FC<StudyStatsProps> = ({ stats }) => {
  const statItems = [
    {
      icon: BookOpen,
      label: 'Total Cards',
      value: stats.totalCards,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: Target,
      label: 'Studied Today',
      value: stats.studiedToday,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: TrendingUp,
      label: 'Correct Answers',
      value: stats.correctAnswers,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    {
      icon: Calendar,
      label: 'Streak Days',
      value: stats.streakDays,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${item.bg}`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudyStats;