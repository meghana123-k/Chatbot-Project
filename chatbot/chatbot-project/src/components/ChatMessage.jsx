import RobotProfileImage from "../assets/robot.webp";
import UserProfileImage from "../assets/user.avif";
import './ChatMessage.css';
import dayjs from "dayjs";

export default function ChatMessage({ message, sender }) {
  const time = dayjs().valueOf();
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}
        <div className="chat-messages-time">
          {dayjs(time).format('h:mma')}
        </div>
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
