import { MessageSquare } from "lucide-react";
import "./NoChatSelected.css";

const NoChatSelected = () => {
  return (
    <div className="nochat-container">
      <div className="nochat-content">

        {/* Floating icon */}
        <div className="icon-wrapper">
          <div className="icon-box">
            <MessageSquare className="icon" />
          </div>
        </div>

        {/* Text */}
        <h2 className="title">Welcome to Quick-chat</h2>
        <p className="subtitle">
          Select a conversation from the sidebar to start chatting.
        </p>

        {/* Animated dots */}
        <div className="nochat-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;