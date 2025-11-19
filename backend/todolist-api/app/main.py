from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers.tasks_controller import router as tasks_router
from app.database.session import engine
from app.database.base import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)