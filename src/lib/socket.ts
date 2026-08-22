import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const serverUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    socket = io(serverUrl, {
      withCredentials: true,
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("[Socket Frontend] Connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Socket Frontend] Disconnected:", reason);
    });
  }

  return socket;
};
