import React, { useEffect, useState } from 'react'
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

function AddTeams({editTeamForm, toggleEditTeamForm, isOpen}) {
  const [teamFormData, setTeamFormData] = useState(initialTeamFormData);
  const { addNewTeam, currentUser, editSelectedTeam } = useAuth();
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
    if (editTeamForm) {
        editSelectedTeam(editTeamForm._id, teamFormData);
    }else{
        addNewTeam(teamFormData);
    }
    toggleEditTeamForm();
  }

  useEffect(() => {
    if (editTeamForm) {
      console.log('editTeamForm', editTeamForm);
      setTeamFormData(editTeamForm);
      let members = editTeamForm.members.map((member) => ({label: member.name, value: member.id}));
      
      setSelectedOptions(members);
    }else{
      setTeamFormData(initialTeamFormData);
      setSelectedOptions([]);
    }
  }, [editTeamForm])

  return (
    <div>
    <Button color="success" onClick={toggleEditTeamForm} size="sm">
      Add New Team
    </Button>
    <Offcanvas
      isOpen={isOpen}
      toggle={toggleEditTeamForm}
      direction="end"
      className="custom-common-offcanvas"
    >
      <OffcanvasHeader toggle={toggleEditTeamForm}>{editTeamForm ? 'Edit Team' : 'Add Team'}</OffcanvasHeader>
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
            <MemberMultiselect selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} editTeamForm={editTeamForm}/>
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