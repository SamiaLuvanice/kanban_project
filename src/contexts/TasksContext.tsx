import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import type React from "react";
import { z } from "zod";

import type { Task } from "../entities/Task";
import { tasksService } from "../services/tasksService";
import type { ApiError } from "../services/api";

const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

interface TasksContextData {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  reloadTasks: () => Promise<void>;
  createTask: (attributes: Omit<Task, "id">) => Promise<Task>;
  updateTask: (id: string, attributes: Partial<Omit<Task, "id">>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TasksContext = createContext({} as TasksContextData);

export const TasksContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reloadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await tasksService.fetchTasks();
      setTasks(data);
    } catch (err) {
      const apiError = err as ApiError;
      console.error(apiError);
      setError(apiError.message ?? "Erro ao carregar tarefas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void reloadTasks();
  }, []);

  const createTask = async (attributes: Omit<Task, "id">): Promise<Task> => {
    try {
      setError(null);
      const newTask = await tasksService.createTask(attributes);
      setTasks((currentState) => [...currentState, newTask]);
      return newTask;
    } catch (err) {
      const apiError = err as ApiError;
      console.error(apiError);
      setError(apiError.message ?? "Erro ao criar tarefa.");
      throw apiError; 
    }
  };

  const updateTask = async (id: string, attributes: Partial<Omit<Task, "id">>) => {
    try {
      setError(null);

      const parsedAttributes = UpdateTaskSchema.parse(attributes);

      const updatedTask = await tasksService.updateTask(id, parsedAttributes);

      setTasks((currentState) =>
        currentState.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (err) {
      const apiError = err as ApiError;
      console.error(apiError);
      setError(apiError.message ?? "Erro ao atualizar tarefa.");
      throw apiError;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await tasksService.deleteTask(id);
      setTasks((currentState) => currentState.filter((task) => task.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      console.error(apiError);
      setError(apiError.message ?? "Erro ao deletar tarefa.");
      throw apiError;
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        reloadTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
