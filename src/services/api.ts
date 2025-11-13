import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export type ApiError = {
  message: string;
  status?: number;
  data?: unknown;
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const normalizedError: ApiError = {
      message:
        (error.response?.data as any)?.message ||
        error.message ||
        "Erro inesperado ao chamar a API.",
      status: error.response?.status,
      data: error.response?.data,
    };

    return Promise.reject(normalizedError);
  }
);
