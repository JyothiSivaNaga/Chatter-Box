import React, { useEffect, useState, useRef } from "react";
import MessageInput from "./MessageInput";

const userNames = {
  1: "Poornima",
  2: "Madhu",
  3: "Jyothi"
};

function ChatWindow({ userId, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const selectedUserRef = useRef(selectedUser);

  // Keep ref in sync with selectedUser
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    if (!userId) {
      return undefined;
    }

    const ws = new WebSocket(`ws://localhost:8000/ws/${userId}`);

    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        const messageSenderId = messageData.sender_id;
        
        // Only append if the message is from the currently selected user
        if (selectedUserRef.current && Number(selectedUserRef.current) === Number(messageSenderId)) {
          setMessages((prev) => [
            ...prev,
            { text: messageData.content, fromSelf: false },
          ]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
      setSocket(null);
    };
  }, [userId]);

  useEffect(() => {
    if (!userId || !selectedUser) {
      setMessages([]);
      return;
    }

    // Load conversation history
    fetch(`http://localhost:8000/history/${userId}/${selectedUser}`)
      .then((res) => res.json())
      .then((data) => {
        const historyMessages = data.map((msg) => ({
          text: msg.content,
          fromSelf: msg.sender_id === Number(userId),
        }));
        setMessages(historyMessages);
      })
      .catch((err) => {
        console.error("Failed to load history:", err);
        setMessages([]);
      });
  }, [userId, selectedUser]);

  const sendMessage = (content) => {
    if (!selectedUser) {
      return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    setMessages((prev) => [...prev, { text: content, fromSelf: true }]);

    socket.send(JSON.stringify({
      content: content,
      receiver_id: selectedUser
    }));
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        {selectedUser ? `Chatting with ${userNames[selectedUser] || "User " + selectedUser}` : "Select a user to chat"}
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.fromSelf ? "message-self" : "message-other"}`}
          >
            <div className="message-sender">
              {msg.fromSelf ? "You" : userNames[selectedUser] || "User " + selectedUser}
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>
      <MessageInput onSend={sendMessage} disabled={!selectedUser} />
    </div>
  );
}

export default ChatWindow;
