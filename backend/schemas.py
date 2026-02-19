# backend/schemas.py

from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class MessageResponse(BaseModel):
    id: int
    content: str
    sender_id: int
    receiver_id: int | None
    timestamp: datetime

    class Config:
        from_attributes = True
