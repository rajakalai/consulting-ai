import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'

export default function Home() {
  return (
    <main className="bg-white h-[calc(100vh-80px)]">
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />
        <ChatArea />
      </div>
    </main>
  )
}