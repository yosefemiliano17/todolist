from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.tasks_dto import TaskCreateDTO, TaskUpdateDTO, TaskResponseDTO
from app.repositories.tasks_repository import TasksRepository
from app.services.tasks_service import TasksService

router = APIRouter(prefix="/tasks")

repo = TasksRepository()
service = TasksService(repository=repo)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", response_model=TaskResponseDTO)
def create_task(task_dto: TaskCreateDTO, db: Session = Depends(get_db)):
    task = service.create_task(db, text=task_dto.text)
    return task

@router.get("", response_model=list[TaskResponseDTO])
def get_all_tasks(db: Session = Depends(get_db)):
    tasks = service.get_all_tasks(db)
    return tasks

@router.get("/completed/{completed}", response_model=list[TaskResponseDTO])
def get_tasks_by_completed(completed: bool, db: Session = Depends(get_db)):
    tasks = service.get_tasks_by_completed(db, completed)
    return tasks

@router.put("/{task_id}", response_model=TaskResponseDTO)
def update_task(task_id: int, task_dto: TaskUpdateDTO, db: Session = Depends(get_db)):
    task = service.update_task(db, task_id=task_id, text=task_dto.text, completed=task_dto.completed)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    service.delete_task(db, task_id)
    return {"detail": "Task deleted successfully"}