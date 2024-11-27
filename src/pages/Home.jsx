import React from "react";
import { ReactComponent as WaveLogin } from "../assets/svg/wave-home.svg";
import "../style/pages/Home.scss";
import HomeBg1 from "../assets/images/home-bg1.jpg";
import HomeBg2 from "../assets/images/home-bg2.jpg";
import HomeBg3 from "../assets/images/home-bg3.jpg";
import { Button } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { login, activeTemplate } = useAuth();
  const navigate = useNavigate();
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
    <div className="home-page">
      {/* <h4>Home</h4> */}
      <div className="home-details">
        <div className="home-info">
          <h3 className="view-title">Why choose our Task Manager?</h3>
          <ul>
            <li>
              <span><FaCheckCircle className="checkmark" /></span> Plan and manage tasks effectively
            </li>
            <li>
              <span><FaCheckCircle className="checkmark" /></span> Organize projects efficiently
            </li>
            <li>
              <span><FaCheckCircle className="checkmark" /></span> Collaborate with team members
            </li>
            <li>
              <span><FaCheckCircle className="checkmark" /></span> Track progress and productivity
            </li>
          </ul>
          <div className="btn-container">
            <Link className="btn get-started-btn" to="/login">Get Started</Link>
            <Button className="btn guest-login-btn" onClick={guestLogin}>Login as Guest</Button>
          </div>
        </div>
        <div className="home-image">
          <img src={HomeBg1} alt="" />
        </div>
      </div>
      <WaveLogin className="wave-login" />
    </div>
  );
}

export default Home;
