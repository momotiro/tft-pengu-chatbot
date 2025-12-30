import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
            : 'bg-gradient-to-r from-purple-50 to-pink-50 text-gray-900 border border-purple-200'
        }`}
      >
        {!isUser && (
          <div className="font-bold text-sm mb-1 text-purple-600 flex items-center gap-1">
            <span className="text-lg">🐧</span>
            <span>Pengu</span>
          </div>
        )}
        <div className="whitespace-pre-wrap break-words">{content}</div>
      </div>
    </div>
  );
}
