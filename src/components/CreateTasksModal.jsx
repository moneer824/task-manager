import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import '../style/components/CreateTasks.scss';
import { useAuth } from '../context/AuthContext';


const initialTaskFormData = {
  title: '',
  description: '',
  assignee: '',
  priority: 'Low',
  status: '',
  project_id: ''
}

function CreateTasksModal({ taskType, editTaskData, toggle, isOpen, setTaskType }) {
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
  );
  const [endDate, setEndDate] = useState("-");
  const { currentUser, addTask, task_status_constants, updateSelectedTask, projects, teamMembers, activeTemplate, team } = useAuth();
  const [taskFormData, setTaskFormData] = useState(initialTaskFormData);

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
      updateSelectedTask(editTaskData._id, taskFormData);
    } else {
      taskFormData.start_date = startDate
      taskFormData.end_date = endDate
      taskFormData.created_by = currentUser.id
      taskFormData.template_type = activeTemplate
      console.log(taskFormData);
      addTask(taskFormData);
    }
    toggle();
  };

  useEffect(() => {
    if (!isOpen) {
      setTaskFormData(initialTaskFormData);
      setTaskType("add");
    }
  }, [isOpen]) // clearing data and taskType on closing the form

  useEffect(() => {
    if (taskType === 'edit' && editTaskData) {
      setTaskFormData(editTaskData);
    }
  }, [taskType, editTaskData])

  return (
    <div>
      <Button color="success" onClick={toggle} size="sm">
        Create New Task
      </Button>
      <Offcanvas isOpen={isOpen} toggle={toggle} direction="end" className="custom-common-offcanvas">
        <OffcanvasHeader toggle={toggle}>{taskType === 'edit' ? 'Edit Task' : 'Create New Task'}</OffcanvasHeader>
        <OffcanvasBody>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="taskTitle">Task Title</Label>
              <Input type="text" name="title" id="taskTitle" placeholder="Enter task title" value={taskFormData.title} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="taskDescription">Description</Label>
              <Input type="textarea" name="description" id="taskDescription" placeholder="Enter task description" value={taskFormData.description} onChange={handleChange} required />
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
                {projects.filter((project) => project.template_type === activeTemplate).map((project) => (
                  <option value={project._id}>{project.title}</option>
                ))}
              </Input>
            </FormGroup>
            {taskFormData.project_id != '' && projects.find((project) => project._id === taskFormData.project_id)?.team_id == '' ? <Alert color="warning" style={{ fontSize: '12px', marginTop: '5px', padding: '5px 12px' }}><strong> Add team </strong>to the project, then you can assign task to the team member, you can also do it later</Alert> : <FormGroup>
              <Label for="taskAssignee">Assignee</Label>
              <Input type="select" name="assignee" id="taskAssignee" value={taskFormData.assignee} onChange={handleChange}>
                <option value="">NA</option>
                {team.find((squad) => squad._id === projects.find((project) => project._id === taskFormData.project_id)?.team_id)?.members.map((member) => (
                  <option value={member.id}>{member.name}</option>
                ))}
              </Input>
            </FormGroup>}

            <FormGroup>
              <Label for="taskStatus">Status</Label>
              <Input type="select" name="status" id="taskStatus" value={taskFormData.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                {Object.keys(task_status_constants).map((key) => (
                  <option value={key}>{task_status_constants[key]}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input type="date" name="startDate" id="taskStartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="EndDate">End Date</Label>
              <Input type="date" name="EndDate" id="taskEndDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
