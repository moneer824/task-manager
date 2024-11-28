import React, { useState } from 'react'
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
import { useAuth } from '../context/AuthContext';

const initialTeamFormData = {
    name: '',
    members: [],
}

function AddTeams() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [teamFormData, setTeamFormData] = useState(initialTeamFormData);
  const { addNewTeam, currentUser } = useAuth();

  const handleAddTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const addTeamSubmit = (e) => {
    e.preventDefault();
    teamFormData.user_id = currentUser.id;
    addNewTeam(teamFormData);
    console.log(teamFormData);
  }

  return (
    <div>
    <Button color="success" onClick={toggle} size="sm">
      Add New Team
    </Button>
    <Offcanvas
      isOpen={isOpen}
      toggle={toggle}
      direction="end"
      className="custom-common-offcanvas"
    >
      <OffcanvasHeader toggle={toggle}>Add Team</OffcanvasHeader>
      <OffcanvasBody>
        <Form onSubmit={addTeamSubmit}>
          <FormGroup>
            <Label for="projectTitle">Team Name</Label>
            <Input
              type="text"
              name="name"
              id=""
              placeholder="Enter Team Name"

              value={teamFormData.name}
              onChange={handleAddTeamChange}

              required
            />
          </FormGroup>
          <Button color="success" type="submit">
            Submit
          </Button>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  </div>
  )
}

export default AddTeams