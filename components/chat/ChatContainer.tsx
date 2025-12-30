'use client';

import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatContainer({ messages, isLoading }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
          <div className="text-8xl mb-6 animate-bounce">🐧</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Welcome to Pengu's TFT Chat!
          </h2>
          <p className="text-gray-700 max-w-md text-lg leading-relaxed">
            Squawk! I'm Pengu, your TFT companion! Ask me anything about strategies,
            team compositions, or the current meta. Let's climb the ranks together! 🏆
          </p>
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <span className="px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
              💡 Strategy Tips
            </span>
            <span className="px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
              🎯 Meta Comps
            </span>
            <span className="px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
              ⚔️ Item Builds
            </span>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4 animate-fade-in">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg px-4 py-3 shadow-md border border-purple-200">
                <div className="font-bold text-sm mb-2 text-purple-600 flex items-center gap-1">
                  <span className="text-lg">🐧</span>
                  <span>Pengu</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
