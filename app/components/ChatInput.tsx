import { useState } from 'react';

export default function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage({role: 'user', content: input});
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask any follow up..."
        className="w-full p-2 rounded border"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-purple-600 text-white rounded">
        Submit
      </button>
    </form>
  );
}