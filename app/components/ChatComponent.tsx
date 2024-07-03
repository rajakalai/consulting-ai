import React from 'react'

interface Message {
  text: string
  isUser: boolean
}

interface ChatWindowProps {
  messages: Message[]
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="bg-white shadow-md rounded-lg max-w-lg w-full mx-auto">
      <div className="p-4 h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.isUser ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatWindow