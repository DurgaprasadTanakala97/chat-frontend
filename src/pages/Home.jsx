import { useSelector } from 'react-redux'
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer"
import "./Home.css"

const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat)

  return (
    <div className="home-content">
      <div className="home-card">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  )
}

export default Home