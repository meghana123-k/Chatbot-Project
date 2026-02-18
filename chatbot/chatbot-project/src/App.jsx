import { useState, useEffect, useRef } from "react";
import Chatbot from "./lib/chatbot";
import "./App.css";
function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(event) {
    setInputText(event.target.value);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  async function sendMessage() {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);
    setInputText("");

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to chatbot"
        size="30"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading || !inputText.trim()}
        className="send-button"
      >
        {isLoading ? "Loading..." : "Send"}
      </button>
    </div>
  );
}
function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src="images\robot.webp" className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src="images\user.avif" className="chat-message-profile" />
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
