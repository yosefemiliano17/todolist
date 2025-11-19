import axios from "axios";
import type { Task } from "../types/Tasks";

const API_URL = "http://localhost:8000/tasks";

export const getTasks = async () => {
    const res = await axios.get<Task[]>(API_URL);
    return res.data;
}

export const getTasksByCompleted = async (completed: boolean) => {
    const res = await axios.get<Task[]>(`${API_URL}/completed/${completed}`);
    return res.data;
}

export const createTask = async (text: string) => {
    const res = await axios.post<Task>(API_URL, { text });
    return res.data;
}

export const updateTask = async (task: Task) => {
    const res = await axios.put<Task>(`${API_URL}/${task.id}`, task);
    return res.data;
}

export const deleteTask = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
}