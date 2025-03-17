import { Department, Employee, Priority, Status, TaskComment } from "@/types/types";
import api from "./apiClient";

export const getStatuses = async (): Promise<Status[]> => {
  try {
    const response = await api.get<Status[]>("/statuses");
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
};

export const getDepartments = async (): Promise<Department[]> => {
  try {
    const response = await api.get<Department[]>("/departments");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const getPriorities = async (): Promise<Priority[]> => {
  try {
    const response = await api.get<Priority[]>("/priorities");
    return response.data;
  } catch (error) {
    console.error("Error fetching priorities:", error);
    throw error;
  }
};

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await api.get<Employee[]>("/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching priorities:", error);
    throw error;
  }
};

export const getTaskComments = async (taskId: number): Promise<[TaskComment]> => {
  try {
    const response = await api.get<[TaskComment]>(`/tasks/${taskId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for task ${taskId}:`, error);
    throw error;
  }
};
