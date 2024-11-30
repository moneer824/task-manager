import React, { useEffect, useState } from 'react'
import CustomPeiChart from '../components/CustomPeiChart'
import { useAuth } from '../context/AuthContext';
import { Alert } from 'reactstrap';
import '../style/pages/DashBoard.scss'
import { LuInfo } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import { TEMPLATE_NAME } from '../services/constant';

function DashBoard() {
    const { tasks , task_status_constants, currentUser, activeTemplate, setActiveTemplate } = useAuth();
    const [chartData, setChartData] = useState([]);
    const { template_type } = useParams();
  
    
    const pieChartDataFormat = () => {
      const taskChartData = Object.entries(tasks.reduce((acc, task) => {
        const status = task.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {})).map(([name, value]) => ({ name: task_status_constants[name], value }));
  
      setChartData(taskChartData);
    }

    useEffect(() => {
        console.log('jjj')
        if (template_type != activeTemplate && TEMPLATE_NAME.includes(template_type)) {
            console.log('jjjlll')
            setActiveTemplate(template_type);
        }
    }, [])
  
    useEffect(() => {
        console.log('tasks',tasks)
      pieChartDataFormat();
    }, [tasks])
  
    return (
      <div className='common-page dashboard-page'>
        {currentUser && currentUser.name &&  chartData.length > 0 && <Alert color="info">
            <h4 className="alert-heading"><LuInfo /> Dashboard! <span>Hi <strong>{currentUser.name}!</strong> You have tasks. View their status in the graph overview below.</span></h4>
        </Alert>}
        {currentUser && currentUser.name &&  chartData.length === 0 && <Alert color="info">
          <h4 className="alert-heading"><LuInfo />Sample Dashboard! <span>Hi  <strong>{currentUser.name}!</strong> Once you have tasks, you can view them here</span></h4>
        </Alert>}
        <CustomPeiChart chartData={chartData} />
      </div>
    )
}

export default DashBoard