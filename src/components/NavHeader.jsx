import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/components/Navbar.scss";
import { Button } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import ChooseWorkspace from "./ChooseWorkspace";

function NavHeader() {
    const location = useLocation();
    const {  login, logout } = useAuth();
    const navigate = useNavigate();

    const userLogout = () => {
        logout();
        navigate("/login");
    }

    const guestLogin = async () => {
        try {
            await login("sample@gmail.com", "1234");
            alert("Guest logged in successfully!");
            navigate("/");
          } catch (error) {
            alert("Failed to log in: " + error.message);
        }
    }
  return (
    <div>
      {location.pathname === "/login" || location.pathname === "/signup" ? (
        <nav className="welcome-nav login-page">
          <h2 className="">Welcome to Task Manager</h2>
          <div className="nav-links">
            <Link className="btn-primary" to="/login">Login</Link>
            <Link className="btn-primary" to="/signup">Signup</Link>
            <button className="guest-btn btn-primary" onClick={guestLogin}>Guest</button>
            {/* <p className="guest-btn">Guest</p> */}
          </div>
        </nav>
      ) : (
        <nav id="navbar">
          {/* <div className="logo">Task Manager</div> */}
          <div className="workspace-icon-container">

            <Link className="logo" to="/">Task Manager</Link>
          </div>
          <div className="nav-links">
            <Button color="danger" className="btn logout-btn"  onClick={userLogout}>Logout</Button>
            
          {/* <ChooseWorkspace /> */}
          </div>
        </nav>
      )}
    </div>
  );
}

export default NavHeader;
