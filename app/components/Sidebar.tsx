export default function Sidebar() {
    const previousChats = [
      "Analyze transcript: draw me a value chain of the LMS market based on the calls",
      "Analyze quant: who is the decision-maker for buying software at your school?",
      // ... add more chats
    ]
  
    return (
      <aside className="w-1/4 bg-[#252538] p-4 text-white">
        <h2 className="font-bold mb-4">Previous chats</h2>
        <button className="w-full bg-purple-600 text-white py-2 rounded mb-4">+ New chat</button>
        {/* <ul className="bg-white rounded-lg shadow-md p-2">
          {previousChats.map((chat, index) => (
            <li key={index} className="mb-2 truncate text-sm hover:bg-gray-100 p-2 rounded text-black">
              {chat}
            </li>
          ))}
        </ul> */}
      </aside>
    )
  }