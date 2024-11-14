import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link , useNavigate } from "react-router-dom";
import "../style/pages/LoginSignup.scss";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login , currentUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("User logged in successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to log in: " + error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser])
  

  return (
    <Form className="login-page mx-auto px-5 py-5" style={{ maxWidth: "800px", boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }} onSubmit={handleSubmit}>
      <h2 className="text-center ">Login</h2>
      <p className="text-center">Welcome to Task Manager</p>
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
      <p className="text-center mt-3">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </Form>
  );
}

export default Login;
