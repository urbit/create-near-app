import { useEffect, useState } from "react";
import io from "socket.io-client";

function useRedirectMap() {
  const [devJson, setDevJson] = useState({
    components: {},
    data: {},
  });

  useEffect(() => {
    const socket = io("ws://127.0.0.1:8081", {
      reconnectionAttempts: 1, // Limit reconnection attempts
    });

    socket.on("fileChange", (d) => {
      console.log("File change detected via WebSocket", d);
      setDevJson(d);
    });

    socket.on("connect_error", () => {
      console.warning("WebSocket connection error. Switching to HTTP.");
      setUWebSocket(false);
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return devJson;
}

export default useRedirectMap;