import React, { useEffect } from 'react'
import BoardView from '../components/BoardView'
import '../style/pages/Tasks.scss'
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { TEMPLATE_NAME } from '../services/constant';

function Tasks() {
  const { activeTemplate, setActiveTemplate} = useAuth();
  const { template_type } = useParams();

  useEffect(() => {
      if (template_type != activeTemplate && TEMPLATE_NAME.includes(template_type)) {
          setActiveTemplate(template_type);
      }
  }, [])

  return (
    <div className='tasks-page common-page'>
        <BoardView />
    </div>
  )
}

export default Tasks