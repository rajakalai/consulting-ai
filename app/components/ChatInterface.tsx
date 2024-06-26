import { useState, useEffect, useRef } from 'react';

interface Message {
  role: string;
  content: string;
}

interface ChatInterfaceProps {
  currentChat: { id: number; title: string; messages: Message[] } | null;
  sendMessage: (message: string) => void;
}

export default function ChatInterface({ currentChat, sendMessage }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages);
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { role: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock response
      const mockResponses = [
        "That's an interesting question. Based on the information available, I would say...",
        "According to recent data, the answer to your query might be...",
        "This is a complex topic. Let me break it down for you...",
        "From what I understand about this subject, I can tell you that...",
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const assistantMessage = { role: 'assistant', content: randomResponse };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-[70%] ${
              message.role === 'user' ? 'bg-purple-200 text-purple-900' : 'bg-gray-200 text-gray-900'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-900">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
        <form onSubmit={handleSubmit} className="flex shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any follow up..."
            className="flex-1 p-3 border-2 border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-black"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition duration-200 font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}