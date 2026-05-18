from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

# Database configuration with environment variable support
import os
from dotenv import load_dotenv

load_dotenv()

# Use environment variable or default to SQLite for development
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./habits.db")

# Configure engine based on database type
try:
    if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
        engine = create_engine(
            SQLALCHEMY_DATABASE_URL, 
            connect_args={"check_same_thread": False}
        )
    else:
        # For PostgreSQL (Supabase) - add SSL configuration
        # Supabase requires SSL connections
        engine = create_engine(
            SQLALCHEMY_DATABASE_URL,
            connect_args={"sslmode": "require"}
        )
    
    # Test connection
    with engine.connect() as conn:
        print("Database connection successful")
        
except Exception as e:
    print(f"Database connection error: {e}")
    # Fallback to SQLite if production database fails
    SQLALCHEMY_DATABASE_URL = "sqlite:///./habits.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, 
        connect_args={"check_same_thread": False}
    )
    print("Falling back to SQLite database")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Habit(Base):
    __tablename__ = "habits"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    color = Column(String, default="#667eea")
    created_at = Column(Date, default=datetime.now)
    
    logs = relationship("HabitLog", back_populates="habit", cascade="all, delete-orphan")

class HabitLog(Base):
    __tablename__ = "habit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    date = Column(Date, default=datetime.now)
    
    habit = relationship("Habit", back_populates="logs")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()