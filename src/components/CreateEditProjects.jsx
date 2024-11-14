import React from "react";
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

function CreateEditProjects({ isOpen, toggle }) {
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
          <strong>This is the Offcanvas body.</strong>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default CreateEditProjects;
