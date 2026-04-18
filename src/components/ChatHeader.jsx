import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/slices/chatSlice";
import "./ChatHeader.css";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div className="chat-header">
      <div className="header-content">
        {/* User Info */}
        <div className="user-info">
          {/* Avatar */}
          <div className="avatar-container">
            <img
              className="avatar"
              src={selectedUser?.avatar?.url || "/avatar-holder.avif"}
              alt={selectedUser?.fullName || "User"}
            />
            {isOnline && <span className="online-dot" />}
          </div>

          {/* Name & Status */}
          <div className="user-text">
            <h3>{selectedUser?.fullName || "User"}</h3>
            <p className={isOnline ? "is-online" : "is-offline"}>
              <span 
                className="status-indicator" 
                style={{ backgroundColor: isOnline ? "#22c55e" : "var(--text-muted)" }} 
              />
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="close-btn"
          title="Close chat"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;