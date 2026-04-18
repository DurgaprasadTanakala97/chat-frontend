import "./ChatContainer.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, pushNewMessage } from "../store/slices/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageSkelton from "./skeletons/MessageSkelton";
import MessageInput from "./MessageInput";
import { getSocket } from "../lib/socket";

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  // ✅ Load messages when user changes
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [selectedUser?._id, dispatch]);

  // ✅ Auto scroll to last message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Socket listener (FIXED)
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !selectedUser?._id) return;

    const handleNewMessage = (msg) => {
      dispatch(pushNewMessage(msg));
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser?._id, dispatch]);

  // ✅ Format time
const formatMessageTime = (date) => {
  if (!date) return ""; // ✅ handle empty

  const d = new Date(date);

  if (isNaN(d.getTime())) return ""; // ✅ handle invalid date
    
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

  // ✅ Show skeleton while loading
  if (isMessagesLoading) {
    return (
      <div className="chat-container">
        <ChatHeader />
        <MessageSkelton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader />

      {/* ✅ Messages */}
      <div className="messages-area">
        {messages.length === 0 && (
          <div className="empty-chat">
            Start a conversation 👋
          </div>
        )}
        {messages?.map((message, index) => {
          const isSender = message?.senderId === authUser?._id;

          return (
            <div
              key={message._id || message.createdAt || index} // ✅ FIXED KEY
              ref={index === messages.length - 1 ? messageEndRef : null}
              className={`message-row ${
                isSender ? "sender" : "receiver"
              }`}
            >
              {/* Avatar */}
              <div className="avatar">
                <img
                  src={
                    isSender
                      ? authUser?.avatar?.url || "/avatar-holder.avif"
                      : selectedUser?.avatar?.url || "/avatar-holder.avif"
                  }
                  alt="avatar"
                />
              </div>

              {/* Message Bubble */}
              <div className="message-bubble">
                {/* Media */}
                {message.media && (
                  <>
                    {message.media.includes(".mp4") ||
                    message.media.includes(".webm") ||
                    message.media.includes(".mov") ? (
                      <video
                        src={message.media}
                        controls
                        className="message-media"
                      />
                    ) : (
                      <img
                        src={message.media}
                        alt="attachment"
                        className="message-media"
                      />
                    )}
                  </>
                )}

                {/* Text */}
                {message.text && (
                  // <p className="message-text">{message.text}</p>
                  <p className="message-text">
                   {message.text || message.message || "No message"}
                </p>
                )}

                {/* Time */}
              <span className="message-time">
              {message.createdAt && formatMessageTime(message.createdAt)}
              </span>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;