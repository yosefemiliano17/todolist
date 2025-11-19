from sqlalchemy.orm import Session
from app.models.tasks_entity import Task
from typing import List, Optional

class TasksRepository:

    def get_all(self, db: Session) ->List[Task]: 
        return db.query(Task).all()
    
    def get_by_id(self, db: Session, task_id: int) -> Optional[Task]:
        return db.query(Task).filter(Task.id == task_id).first()
    
    def get_by_completed(self, db: Session, completed: bool) -> List[Task]:
        return db.query(Task).filter(Task.completed == completed).all()
    
    def save(self, db: Session, text: str) -> Task: 
        new_task = Task(text=text)
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    
    def update(self, db: Session, task: Task) -> Task: 
        db.commit()
        db.refresh(task)
        return task
    
    def delete(self, db: Session, task: Task): 
        db.delete(task)
        db.commit()