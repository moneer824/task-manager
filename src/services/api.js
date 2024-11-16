import axios from "axios";

const API_URL = "http://localhost:5000";

export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
export const createUser = (user) => axios.post(`${API_URL}/users`, user);

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const getTask = (id) => axios.get(`${API_URL}/tasks/${id}`);
export const getTaskByUserId = (userId) => axios.get(`${API_URL}/tasks?created_by=${userId}`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const updateTask = (id, updates) => axios.patch(`${API_URL}/tasks/${id}`, updates);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);

export const getProjects = (userId) => axios.get(`${API_URL}/projects?created_by=${userId}`);
export const getProject = (id) => axios.get(`${API_URL}/projects/${id}`);
export const createProject = (project) => axios.post(`${API_URL}/projects`, project);
export const updateProject = (id, updates) => axios.patch(`${API_URL}/projects/${id}`, updates);
export const deleteProject = (id) => axios.delete(`${API_URL}/projects/${id}`);

export const getTeam = (user_id) => axios.get(`${API_URL}/teams?user_id=${user_id}`);
export const createTeam = (team) => axios.post(`${API_URL}/teams`, team);
export const updateTeam = (id, updates) => axios.patch(`${API_URL}/teams/${id}`, updates);
export const deleteTeam = (id) => axios.delete(`${API_URL}/teams/${id}`);