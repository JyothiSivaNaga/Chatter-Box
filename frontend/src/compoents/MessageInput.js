import React, { useState } from "react";

function MessageInput({ onSend, disabled = false }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (disabled) return;
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div className="input-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={disabled ? "Select a user first" : "Message..."}
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;
