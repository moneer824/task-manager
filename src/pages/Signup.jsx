import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";

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
    <Form
      className="signup-page mx-auto px-5 py-5"
      style={{ maxWidth: "800px", boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}
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
  );
}

export default Signup;
