import { useState, useEffect, useRef } from "react";
import ChatInput from "./components/ChatInput";
import RobotProfileImage from "./assets/robot.webp"
import UserProfileImage from "./assets/user.avif"
import "./App.css";



function App() {
  const [chatMessages, setChatMessages] = useState([]);
  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}
export default App;
