# 💬 Real-Time Chat Application

A full-stack real-time chat application built using **FastAPI, WebSockets, SQLAlchemy, SQLite, and React**.

This application supports:
- ✅ User Registration & Login
- ✅ Secure Password Hashing (bcrypt)
- ✅ JWT Authentication
- ✅ Private Messaging
- ✅ Broadcast Messaging
- ✅ Chat History Retrieval
- ✅ Real-Time Communication using WebSockets

---

# 📌 Project Overview

This project demonstrates a hybrid communication architecture:

- **REST APIs** → Used for authentication and chat history
- **WebSocket** → Used for real-time messaging
- **SQLite** → Stores users and messages permanently
- **JWT** → Provides stateless authentication

---

# 🏗️ System Architecture

```
Frontend (React)
|
|--- REST API (HTTP)
|        |--- /register
|        |--- /login
|        |--- /history
|
|--- WebSocket (ws://)
|
FastAPI Backend
|
WebSocket Manager
|
SQLAlchemy ORM
|
SQLite DB
```

---

# 📂 Folder Structure

```
backend/
│
├── auth.py
├── database.py
├── history.py
├── main.py
├── models.py
├── schemas.py
├── websocket_manager.py
└── chat.db

frontend/
│
├── src/
│   ├── App.js
│   ├── ChatWindow.js
│   ├── UserList.js
│   ├── MessageInput.js
│   └── index.js
│
├── package.json
└── public/
```

---

# ⚙️ Backend Documentation

## 🔐 auth.py

Handles user authentication.

### Features:
- Password hashing using bcrypt
- Password verification
- JWT token generation

### APIs:

#### POST `/register`
Registers a new user.

Request:
```json
{
  "username": "john",
  "password": "1234"
}
```

Response:

```json
{
  "message": "User created"
}
```

---

#### POST `/login`

Authenticates user and returns JWT.

Response:

```json
{
  "access_token": "jwt_token_here"
}
```

---

## 🗄 database.py

Configures SQLite database connection using SQLAlchemy.

* Creates engine
* Creates session factory
* Provides `get_db()` dependency

Database file:

```
chat.db
```

---

## 📦 models.py

Defines database tables.

### User Table

| Column   | Type    |
| -------- | ------- |
| id       | Integer |
| username | String  |
| password | String  |

---

### Message Table

| Column      | Type     |
| ----------- | -------- |
| id          | Integer  |
| content     | String   |
| sender_id   | Integer  |
| receiver_id | Integer  |
| timestamp   | DateTime |

If `receiver_id` is NULL → Message is broadcast.

---

## 📄 schemas.py

Defines Pydantic models for:

* Request validation
* Response formatting
* ORM serialization

---

## 📜 history.py

Provides REST APIs to retrieve messages.

### GET `/history`

Returns all messages.

### GET `/history/{user1}/{user2}`

Returns private chat between two users.

### GET `/broadcast-history`

Returns broadcast messages only.

---

## ⚡ websocket_manager.py

Manages active WebSocket connections.

### Internal Structure

```
active_connections = {
    user_id: websocket_connection
}
```

### Methods

* `connect()` → Store connection
* `disconnect()` → Remove connection
* `send_private()` → Send to one user
* `broadcast()` → Send to all users

---

## 🚀 main.py

Main application file.

### Responsibilities:

* Create database tables
* Enable CORS
* Include routers
* Define WebSocket endpoint

### WebSocket Endpoint

```
/ws/{user_id}
```

### WebSocket Flow

1. Accept connection
2. Receive JSON message
3. Save to database
4. Send privately or broadcast

---

# 💻 Frontend Overview

## App.js

Main layout:

* User ID input
* Contacts list
* Chat window rendering

## UserList.js

Displays all users except current user.

## ChatWindow.js

* Opens WebSocket
* Fetches history
* Displays messages
* Handles real-time updates

## MessageInput.js

* Controlled input field
* Sends messages
* Clears input after sending

---

# 🔄 Complete System Flow

1️⃣ User registers → Password hashed → Stored in DB
2️⃣ User logs in → JWT returned
3️⃣ WebSocket connection established
4️⃣ User sends message
5️⃣ Message stored in DB
6️⃣ Message delivered instantly
7️⃣ History fetched using REST API

---

# 🔒 Security Features

* bcrypt password hashing
* JWT authentication
* ORM-based SQL protection
* CORS configuration

---

# ⚠️ Limitations

* SQLite not scalable for high traffic
* WebSocket connections stored in memory
* No authentication validation inside WebSocket
* No message encryption

---

# 🚀 Future Improvements

* PostgreSQL instead of SQLite
* Redis for scaling WebSocket connections
* WebSocket authentication
* Message encryption
* Typing indicators
* Read receipts
* Docker deployment

---

# ▶️ How to Run

## Backend

```
pip install -r requirements.txt
uvicorn main:app --reload
```

Server runs at:

```
http://127.0.0.1:8000
```

---

## Frontend

```
npm install
npm start
```

App runs at:

```
http://localhost:3000
```

---

# 🧠 Key Concepts Used

* REST APIs
* WebSockets
* JWT Authentication
* SQLAlchemy ORM
* Asynchronous Programming
* Dependency Injection

---

# 📌 Conclusion

This project demonstrates a full-stack real-time messaging system combining:

* Secure authentication
* Persistent data storage
* Instant messaging
* Modular backend design
* Interactive React frontend

It is suitable for:

* Academic submission
* Portfolio project
* Interview demonstration
* Full-stack learning reference
