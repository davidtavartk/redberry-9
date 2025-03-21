import { Task } from "@/types/types";
import api, { personalToken } from "./apiClient";

interface TaskPayload {
  name: string;
  description?: string;
  due_date?: string;
  status_id: number;
  priority_id: number;
  department_id: number;
  employee_id?: number | null;
};


export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getTaskById = async (id: number): Promise<Task> => {
  try {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task by id:", error);
    throw error;
  }
};



export const createTask = async (taskData: TaskPayload): Promise<string> => {
  try {
    const response = await api.post<string>("/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${personalToken}`,
      },
    });
    console.log("Task Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

