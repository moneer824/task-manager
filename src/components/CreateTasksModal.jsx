import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Form, FormGroup, Label, Input } from 'reactstrap';
import '../style/components/CreateTasks.scss';
import { useAuth } from '../context/AuthContext';


const initialTaskFormData = {
    title: '',
    description: '',
    assignee: '',
    priority: 'High',
    status: 'ready',
    project_id: '',
}

function CreateTasksModal({ taskType , editTaskData, toggle, isOpen }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
  );
  const {currentUser, addTask, task_status_constants, updateSelectedTask , projects} = useAuth();
  const [taskFormData, setTaskFormData] = useState( initialTaskFormData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskType === 'edit') {
      taskFormData.start_date = startDate
      updateSelectedTask(editTaskData.id, taskFormData);
    }else{
      taskFormData.start_date = startDate
      taskFormData.created_by = currentUser.id
      console.log(taskFormData);
      addTask(taskFormData);
    }
    toggle();
  };

  useEffect(() => {
    if (!isOpen) {
      setTaskFormData(initialTaskFormData);
    }
  }, [isOpen]) // clearing data and taskType on closing the form

  useEffect(() => {
    if (taskType === 'edit' && editTaskData) {
      setTaskFormData(editTaskData);
    }
  }, [taskType , editTaskData]) 
  



  return (
    <div>
      <Button color="success" onClick={toggle} size="sm">
        New Task
      </Button>
      <Offcanvas isOpen={isOpen} toggle={toggle} direction="end" className="custom-common-offcanvas">
        <OffcanvasHeader toggle={toggle}>{taskType === 'edit' ? 'Edit Task' : 'Create New Task'}</OffcanvasHeader>
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
              <Label for="taskPriority">Add to Project</Label>
              <Input type="select" name="project_id" id="taskProject" value={taskFormData.project_id} onChange={handleChange}>
                <option value="">NA</option>
                {projects.map((project) => (
                  <option value={project.id}>{project.title}</option>
                ))}
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
