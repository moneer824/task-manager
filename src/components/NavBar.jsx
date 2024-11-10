import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Navbar.scss";
import { Button } from "reactstrap";

function NavBar() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/login" ? (
        <nav className="welcome-nav">
          <h2 className="">Welcome to Task Manager</h2>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <p className="guest-btn">Guest</p>
          </div>
        </nav>
      ) : (
        <nav id="navbar">
          <div className="logo">Task Manager</div>
          <div className="nav-links">
          <Button className="btn btn-primary">Logout</Button>
          </div>
        </nav>
      )}
    </div>
  );
}

export default NavBar;
