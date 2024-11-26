import React, { useEffect, useState } from 'react'
import CustomPeiChart from '../components/CustomPeiChart'
import { useAuth } from '../context/AuthContext';
import { Alert } from 'reactstrap';
import '../style/pages/DashBoard.scss'
import { LuInfo } from "react-icons/lu";

function DashBoard() {
    const { tasks , setTasks, task_status_constants, updateSelectedTask, currentUser } = useAuth();
    const [chartData, setChartData] = useState([]);
  
    
    const pieChartDataFormat = () => {
      const taskChartData = Object.entries(tasks.reduce((acc, task) => {
        const status = task.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {})).map(([name, value]) => ({ name: task_status_constants[name], value }));
  
      setChartData(taskChartData);
    }
  
    useEffect(() => {
      pieChartDataFormat();
    }, [tasks])
  
    return (
      <div className='common-page dashboard-page'>
        {currentUser && currentUser.name &&  chartData.length > 0 && <Alert color="info">
            <h4 className="alert-heading"><LuInfo /> Dashboard! <span>Hi {currentUser.name}! You have tasks. View their status in the graph overview below.</span></h4>
        </Alert>}
        {currentUser && currentUser.name &&  chartData.length === 0 && <Alert color="info">
          <h4 className="alert-heading"><LuInfo />Sample Dashboard! <span>Hi {currentUser.name}! Once you have tasks, you can view them here</span></h4>
        </Alert>}
        <CustomPeiChart chartData={chartData} />
      </div>
    )
}

export default DashBoard