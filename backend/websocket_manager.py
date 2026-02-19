from fastapi import WebSocket
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}  # user_id -> websocket

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id, None)

    async def send_private(self, content: str, receiver_id: int, sender_id: int):
        websocket = self.active_connections.get(receiver_id)
        if websocket:
            message_data = {
                "content": content,
                "sender_id": sender_id,
                "receiver_id": receiver_id
            }
            await websocket.send_text(json.dumps(message_data))

    async def broadcast(self, content: str, sender_id: int):
        message_data = {
            "content": content,
            "sender_id": sender_id
        }
        for connection in self.active_connections.values():
            await connection.send_text(json.dumps(message_data))

manager = ConnectionManager()
