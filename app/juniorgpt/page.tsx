'use client'

import { useState } from 'react';
import ChatHistory from '../components/ChatHistory';
import ChatInterface from '../components/ChatInterface';


const mockChats = [
  { id: 1, title: "LMS market value chain", messages: [
    { role: 'user', content: "Draw me a value chain of the LMS market based on the calls" },
    { role: 'assistant', content: "Based on the information from the calls, the value chain of the Learning Management System (LMS) market, specifically for PowerSchool, can be broken down into the following stages: 1. Investigation and Evaluation, 2. Decision Making, 3. Implementation, 4. Usage, 5. Support and Community." }
  ]},
  { id: 2, title: "Software decision-maker", messages: [
    { role: 'user', content: "Who is the decision-maker for buying software at your school?" },
    { role: 'assistant', content: "The decision-maker for buying software at schools typically varies, but often includes the IT Director, Curriculum Director, and sometimes the Superintendent or School Board." }
  ]},
  // Add more mock chats as needed
];

export default function JuniorGPT() {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState(mockChats);

  const startNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
  };

  const sendMessage = (message: string) => {
    if (currentChat) {
      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, { role: 'user', content: message }]
      };
      setCurrentChat(updatedChat);
      setChats(chats.map(chat => chat.id === currentChat.id ? updatedChat : chat));
    }
  };

  const removeChat = (id: number) => {
    setChats(chats.filter(chat => chat.id !== id));
    if (currentChat && currentChat.id === id) {
      setCurrentChat(null);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-1/4 bg-purple-100 p-4 overflow-auto">
        <ChatHistory 
          chats={chats} 
          setCurrentChat={setCurrentChat} 
          startNewChat={startNewChat} 
          removeChat={removeChat}
        />
      </div>
      <div className="w-3/4 flex flex-col bg-white">
        <ChatInterface currentChat={currentChat} sendMessage={sendMessage} />
      </div>
    </div>
  );
}