import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/pages/LoginSignup.scss";
import graphImage from "../assets/images/graph.jpg";
import { ReactComponent as WaveLogin } from '../assets/svg/wave-login.svg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentUser, activeTemplate } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("User logged in successfully!");
      navigate(`/${activeTemplate}/dashboard`);
    } catch (error) {
      alert("Failed to log in: " + error.message);
    }
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate(`/${activeTemplate}/dashboard`);
  //   }
  // }, [currentUser])


  return (
    <div className="login-page mx-auto" >
      <div className="login-container">
        <img className="login-image" src={graphImage} alt="" />
        <Form className="login-form" onSubmit={handleSubmit}>
          <h2 className="text-center ">Login</h2>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button className="w-100 mt-3" color="primary">Login</Button>
          <p className="text-center mt-3 mb-0">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </Form>
      </div>
      <WaveLogin className="wave-login" />
    </div>
  );
}

export default Login;
