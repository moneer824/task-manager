import React from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import "../style/components/MobileViewMenu.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiDashboardHorizontalFill, RiDashboard2Line } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { IoMenu, IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import ChooseWorkspace from "./ChooseWorkspace";
import WorkspaceButton from "./WorkspaceButton";

function MobileViewMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { logout, activeTemplate } = useAuth();
  const navigate = useNavigate();

  const userLogout = () => {
    alert("Logged out successfully!");
    logout();
  }
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="mobile-view-menu">
      <Button color="light" onClick={toggle}>
        <IoMenu />
      </Button>
      <Offcanvas
        direction="end"
        className="sidebar-offcanvas"
        isOpen={isOpen}
        toggle={toggle}
      >
        <OffcanvasBody>
          <div className="logo-container">
            <h5>Task Manager</h5>
            <button className="custom-btn-close" onClick={toggle}>
              <IoClose />
            </button>
          </div>
          <div>
            <div className="nav-links">
              <Link to={`/${activeTemplate}/dashboard`} className="nav-link" onClick={toggle}>
                <RiDashboardHorizontalFill className="icon " />
                <span className="">Dashboard</span>
              </Link>
              <Link to={`/${activeTemplate}/projects`} className="nav-link" onClick={toggle}>
                <BsListTask className="icon " />
                <span className="">Projects</span>
              </Link>
              <Link to={`/${activeTemplate}/tasks/all`} className="nav-link" onClick={toggle}>
                <BiTask className="icon " />
                <span className="">Tasks</span>
              </Link>
              <Link to={`/${activeTemplate}/teams`} className="nav-link" onClick={toggle}>
                <RiDashboard2Line className="icon " />
                <span className="">Group Members</span>
              </Link>
              <ChooseWorkspace />
              <WorkspaceButton />
              <Button color="danger" className="btn" onClick={userLogout}>Logout</Button>
            </div>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default MobileViewMenu;
