import type { Task } from "../entities/Task";
import { api } from "./api";

export const tasksService = {
  async fetchTasks(): Promise<Task[]> {
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },

  async createTask(attributes: Omit<Task, "id">): Promise<Task> {
    const { data } = await api.post<Task>("/tasks", attributes);
    return data;
  },

  async updateTask(
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ): Promise<Task> {
    const { data } = await api.patch<Task>(`/tasks/${id}`, attributes);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
