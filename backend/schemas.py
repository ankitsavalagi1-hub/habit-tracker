from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class HabitBase(BaseModel):
    name: str
    description: Optional[str] = None
    color: Optional[str] = "#667eea"

class HabitCreate(HabitBase):
    pass

class HabitLogBase(BaseModel):
    habit_id: int
    date: date

class HabitLogCreate(HabitLogBase):
    pass

class HabitLog(HabitLogBase):
    id: int
    
    class Config:
        orm_mode = True

class Habit(HabitBase):
    id: int
    created_at: date
    logs: List[HabitLog] = []
    
    class Config:
        orm_mode = True

class LogDate(BaseModel):
    date: date