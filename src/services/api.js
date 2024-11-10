import axios from "axios";

const API_URL = "http://localhost:5000";

export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (user) => axios.post(`${API_URL}/users`, user);

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const updateTask = (id, updates) => axios.put(`${API_URL}/tasks/${id}`, updates);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
