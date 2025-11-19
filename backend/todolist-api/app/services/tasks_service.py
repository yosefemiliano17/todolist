from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.tasks_repository import TasksRepository

class TasksService:
    def __init__(self, repository: TasksRepository): 
        self.repository = repository
    
    def create_task(self, db: Session, text: str):
        return self.repository.save(db, text)
    
    def get_all_tasks(self, db: Session):
        return self.repository.get_all(db)
    
    def get_tasks_by_completed(self, db: Session, completed: bool):
        return self.repository.get_by_completed(db, completed)
    
    def update_task(self, db: Session, task_id: int, text: str, completed: bool):
        task = self.repository.get_by_id(db, task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        task.text = text
        task.completed = completed
        return self.repository.update(db, task)
    
    def delete_task(self, db: Session, task_id: int):
        task = self.repository.get_by_id(db, task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        self.repository.delete(db, task)