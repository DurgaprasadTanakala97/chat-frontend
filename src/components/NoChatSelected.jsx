import { MessageSquare } from "lucide-react";
import "./NoChatSelected.css";

const NoChatSelected = () => {
  return (
    <>
      <div className="nochat-container">
        <div className="nochat-content">
          
          {/* Icon display */}
          <div className="icon-wrapper">
            <div className="icon-box">
              <MessageSquare className="icon" />
            </div>
          </div>

          {/* Welcome text */}
          <h2 className="title">Welcome to Quick-chat</h2>
          <p className="subtitle">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </>
  );
};

export default NoChatSelected;