from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Athlete(Base):
    __tablename__ = "athletes"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)

    workouts = relationship("Workout", back_populates="athlete")

class Workout(Base):
    __tablename__ = "workouts"

    id = Column(Integer, primary_key=True, index=True)
    athlete_id = Column(Integer, ForeignKey("athletes.id"))
    date = Column(Date, nullable=False)
    type = Column(String, nullable=False)

    athlete = relationship("Athlete", back_populates="workouts")
    swimming = relationship("SwimmingWorkout", back_populates="workout", uselist=False)
    running = relationship("RunningWorkout", back_populates="workout", uselist=False)
    lifting = relationship("LiftingWorkout", back_populates="workout", uselist=False)

class SwimmingWorkout(Base):
    __tablename__ = "swimming_workouts"

    id = Column(Integer, primary_key=True, index=True)
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    distance_meters = Column(Float, nullable=False)
    time_minutes = Column(Float, nullable=False)
    stroke = Column(String, nullable=False)

    workout = relationship("Workout", back_populates="swimming")

class RunningWorkout(Base):
    __tablename__ = "running_workouts"

    id = Column(Integer, primary_key=True, index=True)
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    measurement = Column(String, nullable=False)
    distance_run = Column(Float, nullable=False)
    duration_seconds = Column(Integer, nullable=False)
    terrain = Column(String, nullable=False)
    calories = Column(Integer, nullable=False)

    workout = relationship("Workout", back_populates="running")

class LiftingWorkout(Base):
    __tablename__ = "lifting_workouts"

    id = Column(Integer, primary_key=True, index=True)
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    exercise = Column(String, nullable=False)
    weight_kg = Column(Float, nullable=False)
    reps = Column(Integer, nullable=False)
    sets = Column(Integer, nullable=False)

    workout = relationship("Workout", back_populates="lifting")