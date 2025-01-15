import React, { useEffect, useState } from "react";
import "../style/pages/projects.scss";
import FolderFile from "../components/FolderFile";
import { useAuth } from "../context/AuthContext";
import CreateEditProjects from "../components/CreateEditProjects";
import NoContent from "../components/NoContent";
import { useParams } from "react-router-dom";
import { TEMPLATE_NAME } from "../services/constant";

const folderColors = ['#dfffdc', '#e8fcdc', '#fff9e6', '#f8f5dc', '#ffe6f6', '#f0fff0', '#fdf7fd', '#fcecec', '#f0f5f5', '#ffe4f1', '#f8f8ff', '#f5f5fd', '#fceeee', '#f2f8f2', '#e0ffff', '#e6ffe6', '#f0fff8', '#cfffdc', '#fce8dc', '#fff1e6', '#f5f5dc', '#ffe6e6', '#fff0f0', '#fdfdfd', '#fcecec', '#fff5f5', '#ffe4e1', '#fff8f8', '#fdf5f5', '#fceeee', '#fff2f2', 'lightblue', 'cadetblue', 'teal', 'tomato', 'darksalmon', 'darkseagreen']

function Projects() {
  const { tasks, projects, fetchProjects, currentUser, activeTemplate, setActiveTemplate } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [editProjectForm, setEditProjectForm] = useState(null);
  const toggle = () => {
    if (isOpen) {
      setEditProjectForm(null);
    }
    setIsOpen(!isOpen);
  };

  const { template_type } = useParams();

  useEffect(() => {
      if (template_type != activeTemplate && TEMPLATE_NAME.includes(template_type)) {
        setActiveTemplate(template_type);
      }
  }, [])

  useEffect(() => {
    if (!currentUser) return;
    fetchProjects(currentUser.id);
  }, [tasks]);

  return (
    <div className="projects-page common-page">
      <div className="folder-modal-container">
        <h3 className="view-title">Project Folders</h3>
        <CreateEditProjects isOpen={isOpen} toggle={toggle} editProjectForm={editProjectForm} />
      </div>
      <div className={`folder-container ${projects.length === 0 ? 'no-folder' : ''}`}>
        {projects.map((project, index) => (
          <FolderFile
            key={project._id}
            color={folderColors[index % folderColors.length]}
            project={project}
            toggle={toggle}
            setEditProjectForm={setEditProjectForm}
          />
        ))}
        {projects.length === 0 && <NoContent title="Project" info="You dont have any Project folder" toggle={toggle}/>}
      </div>
    </div>
  );
}

export default Projects;
