import React, { useState } from "react";
import {
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useAuth } from "../context/AuthContext";

const initialProjectFormData = {
  title: "",
  description: "",
  created_at: "",
  created_by: "",
};
function CreateEditProjects({ isOpen, toggle }) {
  const [projectFormData, setProjectFormData] = useState(initialProjectFormData);
  const { addProject, currentUser } = useAuth();

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    projectFormData.created_by = currentUser.id;
    projectFormData.created_at = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
    await addProject(projectFormData);
    toggle();
  };
  return (
    <div>
      <Button color="success" onClick={toggle} size="sm">
        Create New Project
      </Button>
      <Offcanvas
        isOpen={isOpen}
        toggle={toggle}
        direction="end"
        className="custom-common-offcanvas"
      >
        <OffcanvasHeader toggle={toggle}>New Project</OffcanvasHeader>
        <OffcanvasBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="projectTitle">Task Title</Label>
              <Input
                type="text"
                name="title"
                id="projectTitle"
                placeholder="Enter Project title"
                value={projectFormData.title}
                onChange={handleProjectChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="taskDescription">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="projectDescription"
                placeholder="Enter Project description"
                value={projectFormData.description}
                onChange={handleProjectChange}
              />
            </FormGroup>
            <Button color="success" type="submit">
              Submit
            </Button>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default CreateEditProjects;
