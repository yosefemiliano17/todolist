import { useState } from 'react';

interface Props {
    onAddTask: (text: string) => void;
}

export default function TaskForm({ onAddTask }: Props) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim()) return;
        onAddTask(text);
        setText('');
    };

    return (
        <div className="flex gap-2 mt-4">
            <input
                type="text"
                className="border p-2 w-full rounded"
                placeholder="Escribe una tarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Guardar
            </button>
        </div>
    );
}