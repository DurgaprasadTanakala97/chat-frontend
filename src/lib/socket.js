import { io } from "socket.io-client";

let socket = null;

// ✅ connect
export const connectSocket = (userId) => {
  if (!userId || typeof userId !== "string") return null;

  if (socket) return socket;

  const URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "https://chat-backend-0iad.onrender.com";

  socket = io(URL, {
    query: { userId },
    withCredentials: true,
    transports: ["websocket"],
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