"use client";

import { createPresence, IPresence } from "@yomo/presence";
import CursorChat from "@yomo/react-cursor-chat";
import "@yomo/react-cursor-chat/dist/style.css";
import { useEffect, useState } from "react";

const App = () => {
  const user = {
    id: Math.random().toString(36).substring(7), // random id (e.g. 5b3f1e)
    name: "Peter Parker",
    avatar: "https://i.pravatar.cc/150?img=3",
  };
  const [presence, setPresence] = useState<Promise<IPresence> | null>(null);
  useEffect(() => {
    (async () => {
      let url =
        process.env.NEXT_PUBLIC_PRESENCE_URL || "https://lo.yomo.dev:8443/v1";
      const presence = createPresence(url, {
        publicKey: process.env.NEXT_PUBLIC_PRESENCE_PUBLIC_KEY,
        id: user.id,
        autoDowngrade: true, // downgrade to websocket automatically if webTransport not work
      });
      setPresence(presence);
    })();
  }, []);

  if (!presence) return <div>Loading...</div>;

  return (
    <div>
      <CursorChat
        presence={presence}
        id={user.id}
        name={user.name}
        avatar={user.avatar}
      />
    </div>
  );
};

export default App;
