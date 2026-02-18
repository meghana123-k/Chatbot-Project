import { useState, useEffect, useRef } from "react";
import Chatbot from "./lib/chatbot";
import RobotProfileImage from "./assets/robot.webp"
import UserProfileImage from "./assets/user.avif"
import "./App.css";

function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
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
