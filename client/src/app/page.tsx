'use client'

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { region, serverUrl } from "../constants/constants";

export default function Home() {
  const [messages, setMessages] = useState([]);

  return (
    <>
      <SocketListener messages={messages} setMessages={setMessages} />
      <MessageComponent messages={messages} />
    </>
  )
}

function SocketListener({
  messages,
  setMessages
}) {    
  useEffect(() => {    
    // DO NOT MOVE SOCKET TO A DIFFERENT PLACE OR ELSE IT WILL BREAK
    // IT HAS TO BE CREATED HERE
    const socket = io(serverUrl);    
    const msg = `Hello from ${region} client`;
    sendMessageToServer(socket, msg);

    recieveForwardedMessages(socket, messages, setMessages);

    return () => disconnect(socket);
  }, []);

  return null;
}

function MessageComponent({
  messages
}) {
  return (
    <main>
      <h1>Frontend for {region}</h1>
      {
        messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))
      }
    </main>
  )
}

function sendMessageToServer(socket, msg: string) {
  socket.on("connect", () => {
    socket.emit("message", msg);
  });
}

function recieveForwardedMessages(socket, messages, setMessages) {
  socket.on("broadcast", (msg) => {
    setMessages((prevMessages) => [msg, ...prevMessages]);
    console.log(messages);
  });
}

function disconnect(socket) {
  socket.disconnect();
}