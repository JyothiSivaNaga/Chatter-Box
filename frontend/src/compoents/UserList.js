import React from "react";

const users = [
  { id: 1, name: "Poornima" },
  { id: 2, name: "Madhu" },
  { id: 3, name: "Jyothi" }
];

function UserList({ userId, selectedUser, onSelectUser }) {
  const currentId = userId ? Number(userId) : null;
  const availableUsers = currentId
    ? users.filter((user) => user.id !== currentId)
    : users;

  return (
    <div className="user-list">
      <div className="user-list-header">Contacts</div>
      {availableUsers.map((user) => (
        <div
          key={user.id}
          className={`user-item ${selectedUser === user.id ? "user-item-selected" : ""}`}
          onClick={() => onSelectUser(user.id)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;
