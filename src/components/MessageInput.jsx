import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {getSocket} from '../lib/socket'
import { sendMessage } from "../store/slices/chatSlice";
import { Image, Send, X } from "lucide-react";
import "./MessageInput.css";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);

  // ✅ Handle Media
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type;

    if (type.startsWith("image/")) {
      setMedia(file);
      setMediaType("image");

      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result);
      reader.readAsDataURL(file);

    } else if (type.startsWith("video/")) {
      setMedia(file);
      setMediaType("video");

      const videoUrl = URL.createObjectURL(file);
      setMediaPreview(videoUrl);

    } else {
      toast.error("Only image or video allowed");
      removeMedia();
    }
  };

  // ✅ Remove Media
  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Send Message
const handleSendMessage = async (e) => {
  e.preventDefault();

  if (!text.trim() && !media) return;

  const data = new FormData();
  data.append("text", text.trim());
  if (media) data.append("media", media);

  try {
    await dispatch(sendMessage(data)); // ✅ auto UI update
    setText("");
    removeMedia();
  } catch (error) {
    console.log(error);
  }
};

  // ✅ Socket Listener
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !selectedUser?._id) return;

    const handleNewMessage = (newMessage) => {
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        dispatch({ type: "chat/pushMessage", payload: newMessage });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser?._id, dispatch]);

  return (
    <div className="message-container">
      
      {/* Preview */}
      {mediaPreview && (
        <div className="preview-box">
          <div className="preview-wrapper">
            {mediaType === "image" ? (
              <img src={mediaPreview} alt="preview" />
            ) : (
              <video src={mediaPreview} controls />
            )}

            <button onClick={removeMedia} className="remove-btn">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="input-area">
        
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          onChange={handleMediaChange}
          hidden
        />

        <button
          type="button"
          className="icon-btn"
          onClick={() => fileInputRef.current.click()}
        >
          <Image size={20} />
        </button>

        <button
          type="submit"
          className="send-btn"
          disabled={!text.trim() && !media}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;