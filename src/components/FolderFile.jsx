import React from "react";
import "../style/components/Folder.scss";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { CiEdit } from "react-icons/ci";
function FolderFile({ project, color, toggle, setEditProjectForm }) {
    const { deleteSelectedProject, team } = useAuth();
    const editProject = () => {
        setEditProjectForm(project);
        toggle();
    }
    return (
        <div className="folder">
            <Link to={`/${project.template_type}/tasks/${project._id}`} >
                <svg
                    className="folder-svg"
                    width="247"
                    height="162"
                    viewBox="0 0 247 162"
                    fill={color ? color : "white"}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.5 23.5H227C231.728 23.5 235.224 23.5011 237.906 23.8617C240.574 24.2203 242.361 24.9264 243.718 26.2825C245.074 27.6386 245.78 29.4262 246.138 32.0939C246.499 34.776 246.5 38.2718 246.5 43V142C246.5 146.728 246.499 150.224 246.138 152.906C245.78 155.574 245.074 157.361 243.718 158.718C242.361 160.074 240.574 160.78 237.906 161.138C235.224 161.499 231.728 161.5 227 161.5H20C15.2718 161.5 11.776 161.499 9.09391 161.138C6.42621 160.78 4.63857 160.074 3.28249 158.718C1.9264 157.361 1.22032 155.574 0.861658 152.906C0.501062 150.224 0.5 146.728 0.5 142V23.5Z"
                        fill="white"
                    />
                    <path
                        d="M0.5 23.5H227C231.728 23.5 235.224 23.5011 237.906 23.8617C240.574 24.2203 242.361 24.9264 243.718 26.2825C245.074 27.6386 245.78 29.4262 246.138 32.0939C246.499 34.776 246.5 38.2718 246.5 43V142C246.5 146.728 246.499 150.224 246.138 152.906C245.78 155.574 245.074 157.361 243.718 158.718C242.361 160.074 240.574 160.78 237.906 161.138C235.224 161.499 231.728 161.5 227 161.5H20C15.2718 161.5 11.776 161.499 9.09391 161.138C6.42621 160.78 4.63857 160.074 3.28249 158.718C1.9264 157.361 1.22032 155.574 0.861658 152.906C0.501062 150.224 0.5 146.728 0.5 142V23.5Z"
                        stroke="#E6E4F0"
                    />
                    <path
                        d="M0.5 20C0.5 15.2718 0.501062 11.776 0.861658 9.09391C1.22032 6.42621 1.9264 4.63857 3.28249 3.28249C4.63857 1.9264 6.42621 1.22032 9.09391 0.861658C11.776 0.501062 15.2718 0.5 20 0.5H80.5C86.4796 0.5 89.3576 0.505916 92.034 1.39804C94.7104 2.29017 97.0163 4.01223 101.8 7.6L123 23.5H0.5V20Z"
                        fill={color ? color : "white"}
                        stroke="#E6E4F0"
                    />
                    <path d="M1 23H121.506L122.797 24H1V23Z" fill="white" />
                </svg>
                <div className="folder-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-info">
                        <p> <strong>Team :</strong> {project.team_id && team.find((squad) => (squad._id === project.team_id)) ? team.find((squad) => (squad._id === project.team_id)).name : "None"}</p>
                        <p> <strong>Workspace :</strong> {project.template_type}</p>
                        {/* <p className="project-date">{project.created_at}</p> */}
                    </div>
                </div>
            </Link>
            <div className="folder-btn">
                <Button outline color="danger" onClick={editProject}>
                    <CiEdit className="icon" />
                </Button>
                <Button outline color="danger" onClick={() => deleteSelectedProject(project._id)}>
                    <MdDeleteForever className="icon" />
                </Button>
            </div>
        </div>
    );
}

export default FolderFile;
