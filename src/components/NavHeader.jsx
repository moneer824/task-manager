import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/components/Navbar.scss";
import { Button } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import ChooseWorkspace from "./ChooseWorkspace";
import  { ROUTES_WITHOUT_SIDE_NAV } from "../services/constant";
import MobileViewMenu from "./MobileViewMenu";

function NavHeader() {
  const location = useLocation();
  const { currentUser, login, logout, activeTemplate } = useAuth();
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate("/login");
  }

  const guestLogin = async () => {
    try {
      await login("sample@gmail.com", "1234");
      alert("Guest logged in successfully!");
      navigate(`/${activeTemplate}/dashboard`);
    } catch (error) {
      alert("Failed to log in: " + error.message);
    }
  }
  return (
    <div>
        <nav id="navbar" className={ROUTES_WITHOUT_SIDE_NAV.includes(location.pathname) ? "welcome-nav" : ""}>
          <div className="workspace-icon-container">
            <Link className="logo" to={`/${activeTemplate}/dashboard`}>Task Manager</Link>
          </div>
          <div className="nav-links">
            {currentUser ? (
              <> 
                <Button color="danger" className="btn logout-btn" onClick={userLogout}>Logout</Button>
                <MobileViewMenu />
                <ChooseWorkspace />
              </>
            ) : (
              <>
                <Link className={`nav-btn ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                <Link className={`nav-btn ${location.pathname === "/login" ? "active" : ""}`} to="/login">Login</Link>
                <Link className={`nav-btn ${location.pathname === "/signup" ? "active" : ""}`} to="/signup">Signup</Link>
                <button className="guest-btn nav-btn" onClick={guestLogin}>Guest</button> 
              </>
            )}
          </div>
        </nav>
    </div>
  );
}

export default NavHeader;
