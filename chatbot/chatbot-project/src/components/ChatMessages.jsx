import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
export function ChatMessages({ chatMessages }) {
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

