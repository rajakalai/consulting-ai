'use client'
import { useState } from 'react';

interface ChatMessage {
  type: 'question' | 'answer';
  content: string;
}

export default function ChatArea() {
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newQuestion: ChatMessage = { type: 'question', content: input };
    setChatMessages(prev => [...prev, newQuestion]);
    setIsLoading(true);

    try {
      const response = await fetch('https://fj7isl6mih.execute-api.ap-south-1.amazonaws.com/prod/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: "54d062c0-2946-4026-a12a-619bd805f2e9",
          question: input,
          history: []
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const newAnswer: ChatMessage = { type: 'answer', content: data.answer };
      setChatMessages(prev => [...prev, newAnswer]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = { type: 'answer', content: 'An error occurred while fetching the response.' };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {chatMessages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'question' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded ${message.type === 'question' ? 'bg-purple-100' : 'bg-gray-100'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any follow up..."
            className="w-full bg-gray-100 rounded p-2 pr-20"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded disabled:bg-purple-400"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}