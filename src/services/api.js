import axios from "axios";

// const API_URL_v2 = "http://localhost:5000/api"; // local backend server mongodb for development
// const API_URL_v2 = "https://task-manager-backend-06dy.onrender.com/api"; // actual backend server mongodb
// backend server mongodb
const API_URL_v2 = process.env.REACT_APP_API_URL_V2;

// Users api
export const loginUser = (user) => axios.post(`${API_URL_v2}/users/login`, user , { withCredentials: true });
export const signupUser = (user) => axios.post(`${API_URL_v2}/users/signup`, user );
export const getUsers = () => axios.get(`${API_URL_v2}/users`);
export const getUserById = (id) => axios.get(`${API_URL_v2}/users/${id}`);

// Tasks api
export const getTaskByUserId = (userId, template_type) => axios.get(`${API_URL_v2}/tasks?created_by=${userId}&template_type=${template_type}` , { withCredentials: true });
export const createTask = (task) => axios.post(`${API_URL_v2}/tasks`, task , { withCredentials: true });
export const updateTask = (id, updates) => axios.patch(`${API_URL_v2}/tasks/${id}`, updates, { withCredentials: true });
export const deleteTask = (id) => axios.delete(`${API_URL_v2}/tasks/${id}` , { withCredentials: true });

// Projects api
export const createProject = (project) => axios.post(`${API_URL_v2}/projects`, project, { withCredentials: true });
export const getProjects = (userId) => axios.get(`${API_URL_v2}/projects?user_id=${userId}`, { withCredentials: true });
export const updateProject = (id, updates) => axios.patch(`${API_URL_v2}/projects/${id}`, updates, { withCredentials: true });
export const deleteProject = (id) => axios.delete(`${API_URL_v2}/projects/${id}`, { withCredentials: true });

// Teams api
export const createTeam = (team) => axios.post(`${API_URL_v2}/teams`, team, { withCredentials: true });
export const getTeam = (user_id) => axios.get(`${API_URL_v2}/teams?user_id=${user_id}`, { withCredentials: true });

// &template_type=template_type