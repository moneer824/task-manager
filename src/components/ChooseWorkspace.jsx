import React, { useState } from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { TEMPLATE_CONSTANTS } from "../services/constant";
import { Link, useNavigate } from "react-router-dom";
function ChooseWorkspace() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { setTaskStatusConstants, activeTemplate, setActiveTemplate } = useAuth();
  const navigate = useNavigate();

  const ChangeTemplate = (name) => {
    setActiveTemplate(name);
    toggle();
    navigate(`/${name}/tasks/all`);
  };
  return (
    <div>
      <Button color="light" className="workspace-btn" onClick={toggle}>
        <AiOutlineAlignLeft className="workspace-icon" />
        <div>
          <p className="workspace-name">{activeTemplate.toLocaleUpperCase()}</p>
          <p>WORKSPACE</p>
        </div>
      </Button>
      <Offcanvas
        isOpen={isOpen}
        toggle={toggle}
        className="workspace-offcanvas"
      >
        <OffcanvasHeader toggle={toggle}>Choose Workspace</OffcanvasHeader>
        <OffcanvasBody>
          <div className="workspace-container">
            {Object.keys(TEMPLATE_CONSTANTS).map((name) => (
              <Button
                color={name === activeTemplate ? "primary" : "dark"}
                outline={name !== activeTemplate}
                name={name}
                onClick={() => ChangeTemplate(name)}
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
