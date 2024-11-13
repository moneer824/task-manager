import React, { useState } from "react";
import "../style/components/BoardView.scss";
import { FormGroup, Input, Label } from "reactstrap";
import { MdDeleteForever } from "react-icons/md";
import Select from "react-select";
import { useAuth } from "../context/AuthContext";
import { CiEdit } from "react-icons/ci";

function BoardTask({task}) {
    const { updateSelectedTask } = useAuth();
    const [selectedPriority, setSelectedPriority ] = useState({ value: task.priority , label: task.priority });
    const [selectedDate, setSelectedDate ] = useState(null);

    const options = [
        { value: "High", label: "High" },
        { value: "Medium", label: "Medium" },
        { value: "Low", label: "Low" },
    ];

    const priorityChange = async (option) => {
        setSelectedPriority(option);
        updateSelectedTask(task.id, { priority: option.value });
    };

    const dateChange = async (e) => {
        setSelectedDate(e.target.value);
        updateSelectedTask(task.id, { start_date : e.target.value });
    };

  return (
    <div  className="kanban-task">

        <h4 className="title">{task.title}</h4>
        <p className="info">{task.description.slice(0, 85)} {task.description.length > 85 ? "..." : ""}</p>
    
        <FormGroup className="task-details">
            <Label className="detail-title" for="taskPriority">Priority</Label>
            <Select
                className="customreact-select-container"
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                    ...theme.colors,
                    primary25: 'rgb(246 250 255)',
                    primary50: 'white', // on click color
                    neutral20: selectedPriority.value === "High" ? "red" : selectedPriority.value === "Medium" ? "#00a5d8" : "#009b5f", // border + svg color
                    neutral80: selectedPriority.value === "High" ? "red" : selectedPriority.value === "Medium" ? "#00a5d8" : "#009b5f", // text color
                    neutral30: selectedPriority.value === "High" ? "red" : selectedPriority.value === "Medium" ? "#00a5d8" : "#009b5f", // hover border color
                    primary: selectedPriority.value === "High" ? "red" : selectedPriority.value === "Medium" ? "#00a5d8" : "#009b5f", // selected option + focused outline
                    },
                })}
            
                styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "#f8d7da",
                    borderColor: selectedPriority.value === "High" ? "#f8d7da" : selectedPriority.value === "Medium" ? "#b3edff" : "#cfffef",
                    backgroundColor: selectedPriority.value === "High" ? "#fff0f1" : selectedPriority.value === "Medium" ? "#e8faff" : "#effffa",
                    borderRadius: "4px",
                    padding: "0 6px",
                    width: "140px",
                    borderWidth: "1px",
                    fontSize: "14px",
                    fontWeight: "500",
                }),
                }}
                options={options}
                onChange={priorityChange}
                value={selectedPriority }
            />
        </FormGroup>
        
        <FormGroup className="task-details">
            <Label className="detail-title" for="startDate">Start Date</Label>
            <Input  className="detail-info" type="date" name="startDate" id="taskStartDate" value={selectedDate || task.start_date} onChange={dateChange}/>
        </FormGroup>
        <hr />
        <div className="task-details">
            <button className="edit-btn"><CiEdit className="icon "/></button>
            <button className="delete-btn"><MdDeleteForever  className="icon "/></button>
        </div>
    </div>
  )
}

export default BoardTask