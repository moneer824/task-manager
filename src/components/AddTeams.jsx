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
import MemberMultiselect from './MemberMultiselect';

const initialTeamFormData = {
    name: '',
    members: [],
}

function AddTeams() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [teamFormData, setTeamFormData] = useState(initialTeamFormData);
  const { addNewTeam, currentUser } = useAuth();
  const [selectedOptions, setSelectedOptions] = useState([]);

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
    teamFormData.members = selectedOptions.map((option) => option.value);
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
          <FormGroup>
            <Label for="projectTitle">Team Members</Label>
            <MemberMultiselect selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>
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