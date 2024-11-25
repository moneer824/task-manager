import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import "../style/pages/LoginSignup.scss";
import folderImage from "../assets/images/folder.jpg";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const { signupNewUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupNewUser({email, password , name, role});
      alert("User signed up successfully!");
    } catch (error) {
      alert("Failed to sign up: " + error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <img className="signup-image" src={folderImage} alt="" />
        <Form
          className="signup-form"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center">Sign Up</h2>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input
              name="name"
              type="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
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
          <Button className="w-100 mt-3" color="primary">Sign Up</Button>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>

    </div>
  );
}

export default Signup;
