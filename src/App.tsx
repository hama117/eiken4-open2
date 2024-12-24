import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { APIKeySetup } from './components/APIKeySetup';
import { QuizTabs } from './components/QuizTabs';
import { Question } from './types';
import { useQuizState } from './hooks/useQuizState';
import { QUESTIONS_PER_SET } from './config/constants';

export function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [activeTab, setActiveTab] = useState('questions');
  const {
    state,
    handleQuestionsLoaded,
    handleAnswer,
    handleNextQuestion,
    handleContinue,
    handleReset
  } = useQuizState(apiKey);

  const handleApiKeySubmit = useCallback((key: string) => {
    setApiKey(key);
  }, []);

  if (!apiKey) {
    return <APIKeySetup onKeySubmit={handleApiKeySubmit} />;
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <FileUpload onQuestionsLoaded={handleQuestionsLoaded} />
      </div>
    );
  }

  if (state.quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <QuizResults
          score={state.score % QUESTIONS_PER_SET}
          totalQuestions={QUESTIONS_PER_SET}
          onContinue={handleContinue}
          onReset={() => {
            setApiKey('');
            handleReset();
          }}
        />
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">英検4級 空所補充問題</h1>
        
        <QuizTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'questions' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">
                  問題 {(state.currentQuestionIndex % QUESTIONS_PER_SET) + 1}/{QUESTIONS_PER_SET}
                </span>
                <span className="text-lg">
                  スコア: {state.score % QUESTIONS_PER_SET}/{QUESTIONS_PER_SET}
                </span>
              </div>

              <QuizQuestion
                question={currentQuestion}
                userAnswer={state.userAnswer}
                onAnswer={handleAnswer}
                showExplanation={state.showExplanation}
                explanation={state.explanation}
              />

              {state.showExplanation && (
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  次の問題へ
                </button>
              )}
            </>
          )}

          {activeTab === 'study' && (
            <div className="text-gray-600">
              <h2 className="text-xl font-semibold mb-4">学習モード</h2>
              <p>このモードでは、問題をじっくり学習できます。</p>
              <p>準備中...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-gray-600">
              <h2 className="text-xl font-semibold mb-4">設定</h2>
              <button
                onClick={() => {
                  setApiKey('');
                  handleReset();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                APIキーを再設定
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}