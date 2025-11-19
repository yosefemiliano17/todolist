from pydantic import BaseModel
from typing import Optional

class TaskCreateDTO(BaseModel):
    text: str

class TaskUpdateDTO(BaseModel):
    text: Optional[str] = None
    completed: Optional[bool] = None

class TaskResponseDTO(BaseModel):
    id: int
    text: str
    completed: bool

    class Config:
        orm_mode = True
