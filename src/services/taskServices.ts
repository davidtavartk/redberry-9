import { Task } from "@/types/types";
import api from "./apiClient";

export const getAllTasks = async (): Promise<Task[]> => {
    try {
      const response = await api.get<Task[]>("/tasks");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };