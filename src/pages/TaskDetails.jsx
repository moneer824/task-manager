import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTaskByTaskId } from '../services/api';
import "../style/pages/TaskDetails.scss";
import { TEMPLATE_NAME } from '../services/constant';
import { Alert, Button, Input } from 'reactstrap';

const TaskDetails = () => {
  const { task_id, template_type } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const { activeTemplate, setActiveTemplate } = useAuth();


  const taskDetailsFetch = async () => {
    // fetch task details
    try {
      const response = await getTaskByTaskId(task_id);
      console.log('res', response.data);
      if (response.data) {
        setTaskDetails(response.data);
      }

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    if (template_type != activeTemplate && TEMPLATE_NAME.includes(template_type)) {
      setActiveTemplate(template_type);
    }
  }, [])

  useEffect(() => {
    taskDetailsFetch()
  }, [])

  return (
    <div className='tasks-details-page common-page'>
      {taskDetails && (
        <div className='task-details-container'>
          <div className='task-details-left-container'>
            <h1>Task Details</h1>
            <div className='task-info'>
              <h3>{taskDetails.title}</h3>
              <p>{taskDetails.description}</p>
            </div>
            <div className='task-comments'>
              <h4 color="info"> Comments</h4>
              <div className='comment'>
                <p>comment 1</p>
                <p>comment 2</p>
                <p>comment 3</p>
              </div>

              <Input type='textarea' placeholder='Add Comments'  />

              <Button size='sm'>Add Comments</Button>


                
              
            </div>
          </div>
          <div className='task-details-right-container'>
            <p>{taskDetails.priority}</p>
            <p>{taskDetails.status}</p>
            <p>{taskDetails.start_date}</p>
            <p>{taskDetails.end_date}</p>
            <p>assignee : {taskDetails.assignee}</p>
            <p>project id : {taskDetails.project_id}</p>
            <p>workspace :{taskDetails.template_type}</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default TaskDetails