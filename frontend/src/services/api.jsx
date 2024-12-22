import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Should point to your server
  withCredentials: true,
});

// Token Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
export const registerUser = (data) => api.post("/auth/register", data);

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  if (response?.data?.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

// Task Management
export const getTasks = () => api.get("/tasks");
export const createTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;