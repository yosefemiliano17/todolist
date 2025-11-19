import type { Task } from "../types/Tasks";
import { useState } from "react";
import Modal from "./Modal";

interface Props {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [editText, setEditText] = useState(task.text);

  const saveEdit = () => {
    onUpdate({ ...task, text: editText });
    setIsEditModal(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded mt-2">
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onUpdate({ ...task, completed: !task.completed })}
        />
        <span className={`${task.completed ? "text-gray-400 line-through" : ""}`}>
          {task.text}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          className="text-blue-500"
          onClick={() => setIsEditModal(true)}
        >
          Editar
        </button>

        <button
          className="text-red-600"
          onClick={() => setIsDeleteModal(true)}
        >
          Borrar
        </button>
      </div>

      <Modal
        isOpen={isEditModal}
        title="Editar tarea"
        onClose={() => setIsEditModal(false)}
      >
        <input
          className="border p-2 rounded w-full"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={saveEdit}
        >
          Guardar cambios
        </button>
      </Modal>

      <Modal
        isOpen={isDeleteModal}
        title="Confirmar borrado"
        onClose={() => setIsDeleteModal(false)}
      >
        <p>¿Seguro que deseas borrar esta tarea?</p>

        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full"
          onClick={() => {
            onDelete(task.id);
            setIsDeleteModal(false);
          }}
        >
          Sí, borrar
        </button>
      </Modal>
    </div>
  );
}
