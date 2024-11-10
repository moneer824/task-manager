// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUser, getUsers , getTasks, getTaskByUserId, createTask, updateTask } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const task_status_constants = {
    ready: "Ready",
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed",
};

  const signup = async (email, password) => {
    const newUser = { email, password };
    await createUser(newUser);
    // setCurrentUser(newUser);
  };

  const login = async (email, password) => {
    const response = await getUsers();
    const user = response.data.find((user) => user.email === email && user.password === password);
    if (user){
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const fetchTasks = async (id) => {
    try {
      const response = await getTaskByUserId(id);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      await createTask(task);
      fetchTasks(currentUser.id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelectedTask = async (id, updates) => {
    try {
      await updateTask(id, updates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchTasks(currentUser.id);
    }
  }, [currentUser])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    tasks,
    setTasks,
    addTask,
    task_status_constants,
    updateSelectedTask
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
