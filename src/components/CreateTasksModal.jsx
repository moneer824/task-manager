import React, { useState } from 'react';
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Form, FormGroup, Label, Input } from 'reactstrap';
import '../style/components/CreateTasks.scss';
import { useAuth } from '../context/AuthContext';


const initialTaskFormData = {
    title: '',
    description: '',
    assignee: '',
    priority: 'High',
    status: 'ready',
}
// {
//     "id": "1",
//     "title": "Implement User Authentication",
//     "status": "ready",
//     "priority": "High",
//     "assignee": "Osama",
//     "description": "Set up authentication flow using JWT. Integrate with frontend login and signup forms.",
//     "start_date": "2023-06-01",
//     "created_by": "cd2b"
//   }
function CreateTasksModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
  );
  const {currentUser, addTask, task_status_constants} = useAuth();
  const [taskFormData, setTaskFormData] = useState(initialTaskFormData);
  
  const toggle = () => setIsOpen(!isOpen);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    taskFormData.start_date = startDate
    taskFormData.created_by = currentUser.id
    console.log(taskFormData);
    addTask(taskFormData);
    toggle();
  };



  return (
    <div>
      <Button color="success" onClick={toggle}>
        New Task
      </Button>
      <Offcanvas isOpen={isOpen} toggle={toggle} direction="end" className="custom-task-offcanvas">
        <OffcanvasHeader toggle={toggle}>Create New Task</OffcanvasHeader>
        <OffcanvasBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="taskTitle">Task Title</Label>
              <Input type="text" name="title" id="taskTitle" placeholder="Enter task title" value={taskFormData.title} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="taskDescription">Description</Label>
              <Input type="textarea" name="description" id="taskDescription" placeholder="Enter task description" value={taskFormData.description} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="taskAssignee">Assignee</Label>
              <Input type="text" name="assignee" id="taskAssignee" placeholder="Assign to..." value={taskFormData.assignee} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="taskPriority">Priority</Label>
              <Input type="select" name="priority" id="taskPriority" value={taskFormData.priority} onChange={handleChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="taskStatus">Status</Label>
              <Input type="select" name="status" id="taskStatus" value={taskFormData.status} onChange={handleChange}>
                {Object.keys(task_status_constants).map((key) => (
                  <option value={key}>{task_status_constants[key]}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input type="date" name="startDate" id="taskStartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default CreateTasksModal;
