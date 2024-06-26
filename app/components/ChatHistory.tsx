interface Chat {
  id: number;
  title: string;
  messages: { role: string; content: string }[];
}

interface ChatHistoryProps {
  chats: Chat[];
  setCurrentChat: (chat: Chat) => void;
  startNewChat: () => void;
  removeChat: (id: number) => void;
}

export default function ChatHistory({ chats, setCurrentChat, startNewChat, removeChat }: ChatHistoryProps) {
  return (
    <div className="space-y-4">
      <button 
        onClick={startNewChat}
        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-200"
      >
        + New Chat
      </button>
      <h2 className="font-bold text-lg text-purple-800">Previous Chats</h2>
      {chats.map((chat) => (
        <div key={chat.id} className="flex items-center justify-between">
          <button
            onClick={() => setCurrentChat(chat)}
            className="flex-grow text-left p-2 hover:bg-purple-200 rounded transition duration-200 text-purple-700"
          >
            {chat.title}
          </button>
          <button
            onClick={() => removeChat(chat.id)}
            className="ml-2 p-1 text-red-500 hover:text-red-700 transition duration-200"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}