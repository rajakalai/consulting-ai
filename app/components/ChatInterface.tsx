import ChatInput from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatInterfaceProps {
  currentChat: Chat | null;
  sendMessage: (message: string) => void;
}

export default function ChatInterface({ currentChat, sendMessage }: ChatInterfaceProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        {currentChat?.messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-[70%] ${
              message.role === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-900'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}