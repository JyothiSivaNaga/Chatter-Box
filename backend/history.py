# backend/history.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Message
from schemas import MessageResponse
from sqlalchemy import or_, and_
from typing import List

router = APIRouter()

@router.get("/history", response_model=List[MessageResponse])
def get_history(db: Session = Depends(get_db)):
    messages = db.query(Message).all()
    return messages

@router.get("/history/{user1_id}/{user2_id}", response_model=List[MessageResponse])
def get_conversation_history(user1_id: int, user2_id: int, db: Session = Depends(get_db)):
    messages = db.query(Message).filter(
        or_(
            and_(Message.sender_id == user1_id, Message.receiver_id == user2_id),
            and_(Message.sender_id == user2_id, Message.receiver_id == user1_id)
        )
    ).order_by(Message.timestamp).all()
    return messages

@router.get("/broadcast-history", response_model=List[MessageResponse])
def get_broadcast_history(db: Session = Depends(get_db)):
    messages = db.query(Message).filter(
        Message.receiver_id == None
    ).order_by(Message.timestamp).all()
    return messages
