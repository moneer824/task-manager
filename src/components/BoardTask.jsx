import React, { useEffect, useState } from "react";
import "../style/components/BoardView.scss";
import { FormGroup, Input, Label } from "reactstrap";
import { MdDeleteForever } from "react-icons/md";
import Select from "react-select";
import { useAuth } from "../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import { IoMdOpen } from "react-icons/io";
import { PRIORITY_COLORS } from "../constant/ReactSelectConstants";
import { Link } from "react-router-dom";
function BoardTask({ task, setTaskType, setEditTaskData, toggle }) {
    const { updateSelectedTask, deleteSelectedTask, activeTemplate } = useAuth();
    const [selectedPriority, setSelectedPriority] = useState({ value: task.priority, label: task.priority });
    const [selectedDate, setSelectedDate] = useState(null);

    const options = [
        { value: "High", label: "High" },
        { value: "Medium", label: "Medium" },
        { value: "Low", label: "Low" },
    ];

    const priorityChange = async (option) => {
        setSelectedPriority(option);
        updateSelectedTask(task._id, { priority: option.value });
    };

    const dateChange = async (e) => {
        setSelectedDate(e.target.value);
        updateSelectedTask(task._id, { start_date: e.target.value });
    };

    const handleEditTask = () => {
        setTaskType("edit")
        setEditTaskData(task)
        toggle()
        console.log(task)
    };

    const handleDeleteTask = (id) => {
        deleteSelectedTask(id)
    };

    useEffect(() => {
        setSelectedPriority({ value: task.priority, label: task.priority });
        setSelectedDate(task.start_date);
    }, [task])


    return (
        <div className="kanban-task">

            <h4 className="title">{task.title}</h4>
            <p className="info">{task.description.slice(0, 76)} {task.description.length > 76 ? "..." : ""}</p>

            <FormGroup className="task-details">
                <Label className="detail-title" for="taskPriority">Priority</Label>
                <Select
                    // styles={{ width: "100px", height: "20px" }}
                    className="customreact-select-container"
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: 'rgb(246 250 255)',
                            primary50: 'white', // on click color
                            neutral20: PRIORITY_COLORS[selectedPriority.value].theme, // border + svg color
                            neutral80: PRIORITY_COLORS[selectedPriority.value].theme, // text color
                            neutral30: PRIORITY_COLORS[selectedPriority.value].theme, // hover border color
                            primary: PRIORITY_COLORS[selectedPriority.value].theme, // selected option + focused outline
                        },
                    })}

                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: selectedPriority.value === "High" ? "#f8d7da" : selectedPriority.value === "Medium" ? "#b3edff" : "#009b5f40",
                            backgroundColor: selectedPriority.value === "High" ? "#fff0f1" : selectedPriority.value === "Medium" ? "#e8faff" : "#effffa",
                            borderRadius: "4px",
                            padding: "0 0px",
                            width: "120px",
                            borderWidth: "1px",
                            fontSize: "14px",
                            fontWeight: "500",
                        }),
                    }}
                    options={options}
                    onChange={priorityChange}
                    value={selectedPriority}
                />
            </FormGroup>

            <FormGroup className="task-details">
                <Label className="detail-title" for="startDate">Start Date</Label>
                <Input className="detail-info" type="date" name="startDate" id="taskStartDate" value={selectedDate || task.start_date} onChange={dateChange} />
            </FormGroup>
            {/* <hr /> */}
            <div className="task-details edit-delete-container">
                <Link to={`/${activeTemplate}/tasks-detials/${task._id}`} className="view-btn top-tooltip"><IoMdOpen className="icon " /><span className="tooltiptext">Open</span></Link>
                {/* <button className="open-btn top-tooltip"><IoMdOpen className="icon " /><span className="tooltiptext">Open</span></button> */}
                <div className="edit-delete-btn">
                    <button className="edit-btn top-tooltip" onClick={handleEditTask}><CiEdit className="icon " /><span className="tooltiptext">Edit</span></button>
                    <button className="delete-btn top-tooltip" onClick={() => handleDeleteTask(task._id)}><MdDeleteForever className="icon " /><span className="tooltiptext">Delete</span></button>
                </div>
            </div>
        </div>
    )
}

export default BoardTask