import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTaskByTaskId } from '../services/api';
import "../style/pages/TaskDetails.scss";
import { TEMPLATE_NAME } from '../services/constant';
import CreateTasksModal from '../components/CreateTasksModal';

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
      <div>

      <h1>Task Details</h1>
      {taskDetails && (
        <div>
          <h3>{taskDetails.title}</h3>
          <p>{taskDetails.description}</p>
          <p>{taskDetails.priority}</p>
          <p>{taskDetails.status}</p>
          <p>{taskDetails.start_date}</p>
          <p>{taskDetails.end_date}</p>
          <p>assignee : {taskDetails.assignee}</p>
          <p>project id : {taskDetails.project_id}</p>
          <p>workspace :{taskDetails.template_type}</p>

        </div>
      )}
      </div>
      <div>
      </div>
    </div>
  )
}

export default TaskDetails