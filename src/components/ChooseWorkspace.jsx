import React, { useState } from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import {
    Button,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
  } from "reactstrap";
import { useAuth } from "../context/AuthContext";
function ChooseWorkspace() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {templateConstants , setTaskStatusConstants, activeTemplate, setActiveTemplate} = useAuth();

    const ChangeTemplate = (name) => {
        setActiveTemplate(name);
        setTaskStatusConstants(templateConstants[name]);
        toggle();
    }
  return (
    <div>
      <Button color="light" className="workspace-btn" onClick={toggle}>
        <AiOutlineAlignLeft className="workspace-icon" />
        <div>
        <p className="workspace-name">{activeTemplate.toLocaleUpperCase()}</p>
            <p>WORKSPACE</p>
        </div>
      </Button>
      <Offcanvas isOpen={isOpen} toggle={toggle} className="workspace-offcanvas">
        <OffcanvasHeader toggle={toggle}>
          Choose Workspace
        </OffcanvasHeader>
        <OffcanvasBody>
            <div className="workspace-container">
                {Object.keys(templateConstants).map((key) => (
                    <Button color={key === activeTemplate ? "primary" : "dark"} outline={key !== activeTemplate} key={key} onClick={()=>ChangeTemplate(key)}>{key.toLocaleUpperCase()}</Button>
                ))}
            </div>
          
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default ChooseWorkspace;
