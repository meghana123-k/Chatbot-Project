import { useState, useEffect, useRef } from "react";
import ChatInput from "./components/ChatInput";
import RobotProfileImage from "./assets/robot.webp"
import UserProfileImage from "./assets/user.avif"
import "./App.css";


function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerEle = chatMessagesRef.current;
    if (containerEle) {
      containerEle.scrollTop = containerEle.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.length === 0 ? (
        <div className="empty-chat">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </div>
      ) : (
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          );
        })
      )}
    </div>
  );
}
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
