interface Chat {
  id: string;
  title: string;
  messages: { role: string; content: string }[];
}

interface ChatHistoryProps {
  chats: Chat[];
  setCurrentChat: (chat: Chat) => void;
  startNewChat: () => void;
}

export default function ChatHistory({ chats, setCurrentChat, startNewChat }: ChatHistoryProps) {
  return (
    <div className="space-y-4">
      <button 
        onClick={startNewChat}
        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-200"
      >
        + New Chat
      </button>
      {/* <h2 className="font-bold text-lg text-gray-800">Previous Chats</h2>
      {chats?.map((chat) => (
        <button
          key={chat.id}
          onClick={() => setCurrentChat(chat)}
          className="w-full text-left p-2 hover:bg-gray-300 rounded transition duration-200 text-gray-700"
        >
          {chat.title}
        </button>
      ))} */}
    </div>
  );
}