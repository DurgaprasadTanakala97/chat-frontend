import { io } from "socket.io-client";

let socket = null;

// ✅ connect
export const connectSocket = (userId) => {
  if (!userId || typeof userId !== "string") return null;

  if (socket) return socket;

  socket = io("https://chat-backend-0iad.onrender.com", {
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);
  });

  return socket;
};

// ✅ get existing socket
export const getSocket = () => {
  return socket;
};

// ✅ disconnect
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};