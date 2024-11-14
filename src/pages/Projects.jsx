import React, { useEffect, useState } from "react";
import "../style/pages/projects.scss";
import FolderFile from "../components/FolderFile";
import { useAuth } from "../context/AuthContext";
import CreateEditProjects from "../components/CreateEditProjects";

const folderColors = ['#dfffdc', '#e8fcdc', '#fff9e6', '#f8f5dc', '#ffe6f6', '#f0fff0', '#fdf7fd', '#fcecec', '#f0f5f5', '#ffe4f1', '#f8f8ff', '#f5f5fd', '#fceeee', '#f2f8f2', '#e0ffff', '#e6ffe6', '#f0fff8', '#cfffdc', '#fce8dc', '#fff1e6', '#f5f5dc', '#ffe6e6', '#fff0f0', '#fdfdfd', '#fcecec', '#fff5f5', '#ffe4e1', '#fff8f8', '#fdf5f5', '#fceeee', '#fff2f2', 'lightblue', 'cadetblue', 'teal', 'tomato', 'darksalmon', 'darkseagreen']

function Projects() {
  const { tasks, projects, fetchProjects, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!currentUser) return;
    fetchProjects(currentUser.id);
  }, [tasks]);

  return (
    <div className="projects-page common-page">
      <div className="folder-modal-container">
        <h2 className="view-title">Folders</h2>
        <CreateEditProjects isOpen={isOpen} toggle={toggle} />
      </div>
      <div className="folder-container">
        {projects.map((project, index) => (
          <FolderFile
            key={project.id}
            color={folderColors[index % folderColors.length]}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
