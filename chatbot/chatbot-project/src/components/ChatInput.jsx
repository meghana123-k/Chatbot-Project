
import { useState } from "react";
import Chatbot from "./lib/chatbot";

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
export default ChatInput;