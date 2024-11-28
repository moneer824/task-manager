import React, { useState } from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { TEMPLATE_CONSTANTS } from "../services/constant";
import { Link, useNavigate } from "react-router-dom";
function ChooseWorkspace() {
  // const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const { activeTemplate, setActiveTemplate, isWorkspaceOpen, toggleWorkspace } = useAuth();
  const navigate = useNavigate();

  const ChangeTemplate = (name) => {
    setActiveTemplate(name);
    toggleWorkspace();
    console.log(window.location);
    navigate(`/${name}/dashboard`);
  };
  return (
    <div>
      <Offcanvas
        isOpen={isWorkspaceOpen}
        toggle={toggleWorkspace}
        className="workspace-offcanvas"
      >
        <OffcanvasHeader toggle={toggleWorkspace}>Choose Workspace</OffcanvasHeader>
        <OffcanvasBody>
          <div className="workspace-container">
            {Object.keys(TEMPLATE_CONSTANTS).map((name) => (
              <Button
                color={name === activeTemplate ? "primary" : "dark"}
                outline={name !== activeTemplate}
                name={name}
                onClick={() => ChangeTemplate(name)}
                key={name}
              >
                {name.toLocaleUpperCase()}
              </Button>

            ))}
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default ChooseWorkspace;
