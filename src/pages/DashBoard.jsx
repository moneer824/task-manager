import React, { useEffect, useState } from 'react'
import CustomPeiChart from '../components/CustomPeiChart'
import { useAuth } from '../context/AuthContext';

function DashBoard() {
    const { tasks , setTasks, task_status_constants, updateSelectedTask } = useAuth();
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
      <div className='common-page'>
        <CustomPeiChart chartData={chartData} />
      </div>
    )
}

export default DashBoard