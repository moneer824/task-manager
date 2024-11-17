// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUser,
  getUsers,
  getTasks,
  getTaskByUserId,
  createTask,
  updateTask,
  deleteTask,
  getProjects,
  createProject,
  deleteProject,
  getTeam,
  getUserById,
} from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// const templateConstants = [
//   {
//     name: "Other",
//     value: "other",
//     status: {
//       ready: "Ready",
//       open: "Open",
//       in_progress: "In Progress",
//       dev_completed: "Dev Completed",
//       completed: "Completed",
//       closed: "Closed",
//     },
//   },
//   {
//     name: "IT",
//     value: "it",
//     status: {
//       ready: "Ready",
//       open: "Open",
//       in_progress: "In Progress",
//       dev_completed: "Dev Completed",
//       testing: "Testing",
//       deployed: "Deployed",
//       closed: "Closed",
//     },
//   },
//   {
//     name: "HR",
//     value: "hr",
//     status: {
//       recruiting: "Recruiting",
//       onboarding: "Onboarding",
//       active: "Active",
//       leave: "Leave",
//       exit_process: "Exit Process",
//       closed: "Closed",
//     },
//   },
//   {
//     name: "Sales",
//     value: "sales",
//     status: {
//       lead_generated: "Lead Generated",
//       contacted: "Contacted",
//       proposal_sent: "Proposal Sent",
//       negotiation: "Negotiation",
//       closed_won: "Closed - Won",
//       closed_lost: "Closed - Lost",
//     },
//   },
//   {
//     name: "Finance",
//     value: "finance",
//     status: {
//       budgeted: "Budgeted",
//       processing: "Processing",
//       approved: "Approved",
//       invoiced: "Invoiced",
//       paid: "Paid",
//       audited: "Audited",
//       closed: "Closed",
//     },
//   },
//   {
//     name: "Marketing",
//     value: "marketing",
//     status: {
//       planned: "Planned",
//       in_progress: "In Progress",
//       campaign_live: "Campaign Live",
//       under_review: "Under Review",
//       completed: "Completed",
//       archived: "Archived",
//     },
//   },
// ];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const templateConstants = {

    it: {
      it_ready: "Ready",
      it_open: "Open",
      it_in_progress: "In Progress",
      it_dev_completed: "Dev Completed",
      it_testing: "Testing",
      it_deployed: "Deployed",
      it_closed: "Closed",
    },
    hr: {
      hr_recruiting: "Recruiting",
      hr_onboarding: "Onboarding",
      hr_active: "Active",
      hr_leave: "Leave",
      hr_exit_process: "Exit Process",
      hr_closed: "Closed",
    },
    sales: {
      sales_lead_generated: "Lead Generated",
      sales_contacted: "Contacted",
      sales_proposal_sent: "Proposal Sent",
      sales_negotiation: "Negotiation",
      sales_closed_won: "Closed - Won",
      sales_closed_lost: "Closed - Lost",
    },
    finance: {
      finance_budgeted: "Budgeted",
      finance_processing: "Processing",
      finance_approved: "Approved",
      finance_invoiced: "Invoiced",
      finance_paid: "Paid",
      finance_audited: "Audited",
      finance_closed: "Closed",
    },
    marketing: {
      marketing_planned: "Planned",
      marketing_in_progress: "In Progress",
      marketing_campaign_live: "Campaign Live",
      marketing_under_review: "Under Review",
      marketing_completed: "Completed",
      marketing_archived: "Archived",
    },
    other: {
      ready: "Ready",
      open: "Open",
      in_progress: "In Progress",
      dev_completed: "Dev Completed",
      completed: "Completed",
      closed: "Closed",
    },
  };
  

  const [activeTemplate, setActiveTemplate] = useState("other");
  const [task_status_constants, setTaskStatusConstants] = useState(
    templateConstants[activeTemplate]
  );

  // const task_status_constants = {
  //   open: "Open",
  //   in_progress: "In Progress",
  //   completed: "Completed",
  // };

  const signup = async (email, password) => {
    const newUser = { email, password };
    await createUser(newUser);
    // setCurrentUser(newUser);
  };

  const login = async (email, password) => {
    const response = await getUsers();
    const user = response.data.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
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
    if (currentUser) {
      fetchTasks(currentUser.id);
      fetchProjects(currentUser.id);
      getTeamDetails(currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!team || team.members.length === 0) {
      return;
    }
    getMemberDetails();
  }, [team]);

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
    teamMembers,
    templateConstants,
    setTaskStatusConstants,
    activeTemplate,
    setActiveTemplate
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
