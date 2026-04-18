import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/slices/chatSlice"; // ✅ fix action
import "./ChatHeader.css";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.chat); // ✅ fixed name
  const { onlineUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);
  
  return (
    <div className="chat-header">
      <div className="header-content">
        
        {/* User Info */}
        <div className="user-info">
          
          {/* Avatar */}
          <div className="avatar">
            <img
              src={ selectedUser?.avatar?.url || "/avatar-holder.avif"}
              alt="user"
            />
            {isOnline && <span className="online-dot"></span>}
          </div>

          {/* Name & Status */}
          <div className="user-text">
            <h3>{selectedUser?.fullName || "User"}</h3>
            <p>{isOnline ? "offline" : "Online"}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="close-btn"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;