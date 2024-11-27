import React from "react";
import { Button } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { AiOutlineAlignLeft } from "react-icons/ai";

function WorkspaceButton() {
    const { activeTemplate, toggleWorkspace } = useAuth();
  return (
    <Button color="light" className="workspace-btn" onClick={toggleWorkspace}>
      <AiOutlineAlignLeft className="workspace-icon" />
      <div>
        <p className="workspace-name">{activeTemplate.toLocaleUpperCase()}</p>
        <p>WORKSPACE</p>
      </div>
    </Button>
  );
}

export default WorkspaceButton;
