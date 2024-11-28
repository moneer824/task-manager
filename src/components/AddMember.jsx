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

function AddMember() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
        <Form >
          <FormGroup>
            <Label for="projectTitle">Task Title</Label>
            <Input
              type="text"
              name="title"
              id="projectTitle"
              placeholder="Enter Project title"

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

              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="taskDescription">Description</Label>
            <Input type="select" name="template_type" id="projectTemplate"  required>
              <option value="">Select Workspace</option>
              {/* {TEMPLATE_NAME.map((name) => (
                <option value={name}>{name.toLocaleUpperCase()}</option>
              ))} */}
            </Input>
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

export default AddMember