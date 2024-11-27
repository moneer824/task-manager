// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  // createUser,
  getUsers,
  getTaskByUserId,
  createTask,
  updateTask,
  deleteTask,
  getProjects,
  createProject,
  deleteProject,
  getTeam,
  getUserById,
  loginUser,
  signupUser,
} from "../services/api";

import { TEMPLATE_CONSTANTS } from "../services/constant";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL_v2 = process.env.REACT_APP_API_URL_V2;
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const [activeTemplate, setActiveTemplate] = useState("other");
  const [task_status_constants, setTaskStatusConstants] = useState(
    TEMPLATE_CONSTANTS[activeTemplate]
  );

  const signupNewUser = async (user) => {
    await signupUser(user);
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      if (response && response.data && response.data.user) {
        setCurrentUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${API_URL_v2}/users/refresh-token`,{},{  withCredentials: true}
      );

      if (response.status !== 200) {
        throw new Error("Failed to refresh token");
      }

      return true; // Indicating that the token refresh was successful
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false; 
    }
  };

  const fetchTasks = async (id) => {
    try {
      const response = await getTaskByUserId(id, activeTemplate);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      await createTask(task);
      await fetchTasks(currentUser.id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelectedTask = async (id, updates) => {
    try {
      await updateTask(id, updates);
      await fetchTasks(currentUser.id);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelectedTask = async (id) => {
    try {
      await deleteTask(id);
      await fetchTasks(currentUser.id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async (id) => {
    try {
      const response = await getProjects(id);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProject = async (project) => {
    try {
      await createProject(project);
      await fetchProjects(currentUser.id);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelectedProject = async (id) => {
    try {
      await deleteProject(id);
      await fetchProjects(currentUser.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamDetails = async (id) => {
    try {
      const response = await getTeam(id);
      if (response.data.length > 0) {
        setTeam(response.data[0]);
      }
      console.log("j", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async (id) => {
    try {
      const response = await getUserById(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMemberDetails = () => {
    team.members.map(async (member) => {
      const res = await getUserDetails(member);
      setTeamMembers((prev) => [...prev, res]);
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      fetchTasks(currentUser.id);
      fetchProjects(currentUser.id);
      getTeamDetails(currentUser.id);
    } else {
      setTasks([]);
      setProjects([]);
      setTeam(null);
      setTeamMembers([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
      fetchTasks(currentUser.id);
      setTaskStatusConstants(TEMPLATE_CONSTANTS[activeTemplate]);
  }, [activeTemplate]);

  useEffect(() => {
    if (!team || team.members.length === 0) {
      return;
    }
    getMemberDetails();
  }, [team]);

  const value = {
    currentUser,
    signupNewUser,
    login,
    logout,
    tasks,
    setTasks,
    addTask,
    task_status_constants,
    updateSelectedTask,
    deleteSelectedTask,
    fetchProjects,
    projects,
    addProject,
    deleteSelectedProject,
    team,
    getUserDetails,
    teamMembers,
    setTaskStatusConstants,
    activeTemplate,
    setActiveTemplate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
