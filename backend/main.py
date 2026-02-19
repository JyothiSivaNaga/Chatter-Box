# backend/main.py

from fastapi import FastAPI, WebSocket, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from websocket_manager import manager
from sqlalchemy.orm import Session
from database import get_db
from models import Message
from auth import router as auth_router
from history import router as history_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(history_router)

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await manager.connect(user_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()

            content = data["content"]
            receiver_id = data.get("receiver_id")

            message = Message(
                content=content,
                sender_id=user_id,
                receiver_id=receiver_id
            )

            db.add(message)
            db.commit()

            if receiver_id:
                await manager.send_private(content, receiver_id, user_id)
            else:
                await manager.broadcast(content, user_id)

    except Exception:
        manager.disconnect(user_id)
