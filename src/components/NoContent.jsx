import React from "react";
import "../style/components/NoContent.scss";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function NoContent({ title, info, toggle }) {
  const { template_type } = useParams();
  const { tasks } = useAuth();
  return (
    <div className="add-folder">
      <h4>{info}</h4>
      <button className="new-folder" onClick={toggle}>
        <img src="/assets/images/create_new.png" alt="" />
        <h3>Create New {title}</h3>
      </button>
      {title === "Task" && tasks.length > 0 && <p><span>Go to tasks page and assign existing</span> <Link style={{ textDecoration: "none", fontWeight: "bold" }} to={`/${template_type}/tasks/all`}>Tasks</Link></p>}
    </div>
  );
}

export default NoContent;
