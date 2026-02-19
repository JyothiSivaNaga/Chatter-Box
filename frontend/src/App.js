import React, { useState } from "react";
import ChatWindow from "./compoents/ChatWindow";
import UserList from "./compoents/UserList";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [pendingUserId, setPendingUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSetUserId = () => {
    const trimmed = pendingUserId.trim();
    if (!trimmed) {
      return;
    }

    setUserId(trimmed);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <UserList
        userId={userId}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <div className="chat-section">
        {userId ? (
          <ChatWindow userId={userId} selectedUser={selectedUser} />
        ) : (
          <div className="user-id-panel">
            <div className="user-id-title">Enter your user ID</div>
            <div className="user-id-form">
              <input
                value={pendingUserId}
                onChange={(event) => setPendingUserId(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSetUserId();
                  }
                }}
                placeholder="e.g. 1"
              />
              <button onClick={handleSetUserId}>Start</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
