from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from database import SessionLocal, engine
from models import Base, Athlete, Workout, SwimmingWorkout, RunningWorkout, LiftingWorkout
from fastapi.middleware.cors import CORSMiddleware

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Training Performance Analytics API",
    description="Backend system for tracking and analyzing athlete training data",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# Database Dependency
# --------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --------------------
# Pydantic Models
# --------------------
class AthleteCreate(BaseModel):
    email: str
    password: str
    name: str
    age: int | None = None

class WorkoutBase(BaseModel):
    athlete_id: int
    date: date

class SwimmingWorkoutCreate(WorkoutBase):
    distance_meters: float
    time_minutes: float
    stroke: str

class RunningWorkoutCreate(WorkoutBase):
    distance_km: float
    time_minutes: float
    terrain: str

class LiftingWorkoutCreate(WorkoutBase):
    exercise: str
    weight_kg: float
    reps: int
    sets: int

# --------------------
# Health Check
# --------------------
@app.get("/")
def health_check():
    return {"status": "API is running"}

# --------------------
# Athlete Endpoints
# --------------------
@app.post("/athletes/")
def create_athlete(athlete: AthleteCreate, db: Session = Depends(get_db)):
    db_athlete = Athlete(**athlete.dict())
    db.add(db_athlete)
    db.commit()
    db.refresh(db_athlete)
    return db_athlete

@app.get("/athletes/")
def get_athlete(db: Session = Depends(get_db)):
    athletes = db.query(Athlete).all()
    return athletes

# --------------------
# Workout Endpoints
# --------------------
@app.post("/workouts/swimming/")
def add_swimming_workout(workout: SwimmingWorkoutCreate, db: Session = Depends(get_db)):
    db_workout = Workout(athlete_id=workout.athlete_id, date=workout.date, type="swimming")
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)

    db_swim = SwimmingWorkout(
        workout_id=db_workout.id,
        distance_meters=workout.distance_meters,
        time_minutes=workout.time_minutes,
        stroke=workout.stroke
    )
    db.add(db_swim)
    db.commit()
    db.refresh(db_swim)

    return {"workout": db_workout, "swimming": db_swim}


@app.post("/workouts/running/")
def add_running_workout(workout: RunningWorkoutCreate, db: Session = Depends(get_db)):
    db_workout = Workout(athlete_id=workout.athlete_id, date=workout.date, type="running")
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)

    db_run = RunningWorkout(
        workout_id=db_workout.id,
        distance_km=workout.distance_km,
        time_minutes=workout.time_minutes,
        terrain=workout.terrain
    )
    db.add(db_run)
    db.commit()
    db.refresh(db_run)

    return {"workout": db_workout, "running": db_run}


@app.post("/workouts/lifting/")
def add_lifting_workout(workout: LiftingWorkoutCreate, db: Session = Depends(get_db)):
    db_workout = Workout(athlete_id=workout.athlete_id, date=workout.date, type="lifting")
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)

    db_lifting = LiftingWorkout(
        workout_id=db_workout.id,
        exercise=workout.exercise,
        weight_kg=workout.weight_kg,
        reps=workout.reps,
        sets=workout.sets
    )
    db.add(db_lifting)
    db.commit()
    db.refresh(db_lifting)

    return {"workout": db_workout, "lifting": db_lifting}