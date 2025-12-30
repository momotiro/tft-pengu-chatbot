'use client';

import React, { useState, FormEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-purple-200 p-4 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="ペングーにTFT戦略について聞いてみよう... 🐧"
          disabled={isLoading}
          className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-gray-900 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              送信中...
            </span>
          ) : (
            '送信 🚀'
          )}
        </button>
      </div>
    </form>
  );
}
