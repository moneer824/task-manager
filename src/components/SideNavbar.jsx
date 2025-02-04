import React from "react";
import "../style/components/SideNavbar.scss";
import { Link, useLocation } from "react-router-dom";
import {
  RiDashboardHorizontalFill,
  RiDashboard2Line,
} from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { ROUTES_WITHOUT_SIDE_NAV } from "../services/constant";
import { useAuth } from "../context/AuthContext";
import { FaUserGroup } from "react-icons/fa6";

function SideNavbar() {
  const location = useLocation();
  const { activeTemplate } = useAuth();
  return ROUTES_WITHOUT_SIDE_NAV.includes(location.pathname) ? (
    ""
  ) : (
    <div className="side-navbar">
      <div className="logo-container">
        <img className="logo" src="/assets/images/logo.png" alt="" />
      </div>
      <div className="nav-links">
        <Link to={`/${activeTemplate}/dashboard`} className="left-tooltip">
          <RiDashboardHorizontalFill className="icon " />
          <span className="tooltiptext">Dashboard</span>
        </Link>
        <Link to={`/${activeTemplate}/projects`} className="left-tooltip">
          <BsListTask className="icon " />
          <span className="tooltiptext">Projects</span>
        </Link>
        <Link to={`/${activeTemplate}/tasks/all`} className="left-tooltip">
          <BiTask className="icon " />
          <span className="tooltiptext">Tasks</span>
        </Link>
        <Link to={`/${activeTemplate}/teams`} className="left-tooltip">
          <FaUserGroup className="icon " />
          <span className="tooltiptext">Teams</span>
        </Link>
      </div>
      <img className="active-user" src="/assets/images/avatar/female/1.png" alt="" />
    </div>
  );
}

export default SideNavbar;
