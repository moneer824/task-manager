import React from "react";
import "../style/components/SideNavbar.scss";
import { Link, useLocation } from "react-router-dom";
import {
  RiDashboardHorizontalFill,
  RiDashboard2Line,
} from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";

function SideNavbar() {
  const location = useLocation();
  return location.pathname === "/login" || location.pathname === "/signup" ? (
    ""
  ) : (
    <div className="side-navbar">
      <div className="logo-container">
        <img className="logo" src="/assets/images/logo.png" alt="" />
      </div>
      <div className="nav-links">
        <Link to="/" className="left-tooltip">
          <RiDashboardHorizontalFill className="icon " />
          <span className="tooltiptext">Dashboard</span>
        </Link>
        <Link to="/projects" className="left-tooltip">
          <BsListTask className="icon " />
          <span className="tooltiptext">Projects</span>
        </Link>
        <Link to="/tasks/all" className="left-tooltip">
          <BiTask className="icon " />
          <span className="tooltiptext">Tasks</span>
        </Link>
        {/* <Link to="/" className="left-tooltip">
          <RiDashboard2Line className="icon " />
          <span className="tooltiptext">Admin</span>
        </Link> */}
        <Link to="/teams" className="left-tooltip">
          <RiDashboard2Line className="icon " />
          <span className="tooltiptext">Group Members</span>
        </Link>
      </div>
        <img className="active-user" src="/assets/images/avatar/female/1.png" alt="" />
    </div>
  );
}

export default SideNavbar;
