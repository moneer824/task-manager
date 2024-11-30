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
import { TEMPLATE_NAME } from "../services/constant";

const initialProjectFormData = {
  title: "",
  description: "",
  created_at: "",
  template_type: "",
  user_id: "",
  team_id: "",
};
function CreateEditProjects({ isOpen, toggle }) {
  const [projectFormData, setProjectFormData] = useState(initialProjectFormData);
  const { addProject, currentUser, team } = useAuth();

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    projectFormData.user_id = currentUser.id;
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
                required
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
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="taskDescription">Workspace</Label>
              <Input type="select" name="template_type" id="projectTemplate" value={projectFormData.template_type} onChange={handleProjectChange} required>
                <option value="">Select Workspace</option>
                {TEMPLATE_NAME.map((name) => (
                  <option key={name} value={name}>{name.toLocaleUpperCase()}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="taskDescription">Assign to Team</Label>
              <Input type="select" name="team_id" id="projectTeam" value={projectFormData.team_id} onChange={handleProjectChange} >
                <option value="">Select Team</option>
                {team.map((squad) => (
                  <option key={squad._id} value={squad._id}>{squad.name.toLocaleUpperCase()}</option>
                ))}
              </Input>
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
