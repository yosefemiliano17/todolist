import { useEffect, useState } from "react";
import {
  getTasks,
  getTasksByCompleted,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasksApi";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import type { Task } from "../types/Tasks";

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const load = async () => {
    if (filter === "all") setTasks(await getTasks());
    else if (filter === "completed") setTasks(await getTasksByCompleted(true));
    else setTasks(await getTasksByCompleted(false));
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleAdd = async (text: string) => {
    await createTask(text);
    load();
  };

  const handleUpdate = async (task: Task) => {
    await updateTask(task);
    load();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    load();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">To-Do List</h1>
      <TaskForm onAddTask={handleAdd} />
      <div className="flex gap-3 mt-4 justify-center">
        <button
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pendientes
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("completed")}
        >
          Terminadas
        </button>
      </div>
      <div className="mt-4">
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
