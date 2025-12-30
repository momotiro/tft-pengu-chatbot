'use client';

import { useState, useEffect } from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import MessageInput from '@/components/chat/MessageInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create or retrieve session on mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('pengu_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      loadChatHistory(storedSessionId);
    }
  }, []);

  const loadChatHistory = async (sid: string) => {
    try {
      const response = await fetch(`/api/chat?sessionId=${sid}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.messages) {
          setMessages(data.data.messages);
        }
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const handleSendMessage = async (message: string) => {
    setError(null);
    setIsLoading(true);

    // Add user message to UI immediately
    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      if (data.success) {
        // Add assistant response to UI
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.data.message,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Save session ID
        if (!sessionId && data.data.sessionId) {
          setSessionId(data.data.sessionId);
          localStorage.setItem('pengu_session_id', data.data.sessionId);
        }
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      // Remove the user message if request failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    localStorage.removeItem('pengu_session_id');
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐧</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ペングー TFT チャット</h1>
              <p className="text-sm text-gray-600">あなたのTFT相棒</p>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="px-4 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            新規チャット
          </button>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-4 mt-4 rounded">
          <p className="font-bold">エラー</p>
          <p>{error}</p>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 max-w-6xl w-full mx-auto flex flex-col shadow-xl bg-white my-4 rounded-lg overflow-hidden">
        <ChatContainer messages={messages} isLoading={isLoading} />
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </main>
  );
}
