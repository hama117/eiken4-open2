import React from 'react';
import { FileText, BookOpen, Settings } from 'lucide-react';

interface QuizTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function QuizTabs({ activeTab, onTabChange }: QuizTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      <button
        onClick={() => onTabChange('questions')}
        className={`flex items-center px-4 py-2 border-b-2 ${
          activeTab === 'questions'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        <FileText className="w-5 h-5 mr-2" />
        問題一覧
      </button>
      <button
        onClick={() => onTabChange('study')}
        className={`flex items-center px-4 py-2 border-b-2 ${
          activeTab === 'study'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        <BookOpen className="w-5 h-5 mr-2" />
        学習モード
      </button>
      <button
        onClick={() => onTabChange('settings')}
        className={`flex items-center px-4 py-2 border-b-2 ${
          activeTab === 'settings'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        <Settings className="w-5 h-5 mr-2" />
        設定
      </button>
    </div>
  );
}