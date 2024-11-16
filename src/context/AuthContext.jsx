// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUser, getUsers , getTasks, getTaskByUserId, createTask, updateTask, deleteTask, getProjects, createProject, deleteProject, getTeam, getUserById } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team , setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  // const task_status_constants = {
  //   ready: "Ready",
  //   open: "Open",
  //   in_progress: "In Progress",
  //   dev_completed: "Dev Completed",
  //   completed: "Completed",
  //   closed: "Closed",
  // };
  const task_status_constants = {
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
      console.log('j',response.data);
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

  const getMemberDetails =  () => {
    team.members.map( async (member) =>{
      const res = await getUserDetails(member)
      setTeamMembers((prev) => [...prev, res]);
    })
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchTasks(currentUser.id);
      fetchProjects(currentUser.id);
      getTeamDetails(currentUser.id);
    }
  }, [currentUser])

  useEffect(() => {
    if(!team || team.members.length === 0){
      return;
    }
    getMemberDetails();
  }, [team])

  const value = {
    currentUser,
    signup,
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
    teamMembers
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
