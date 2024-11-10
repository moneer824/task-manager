import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../style/components/BoardView.scss";
import { Alert, Button } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import CreateTasksModal from "./CreateTasksModal";

function BoardView() {
//   const [tasks, setTasks] = useState([]);

    const { tasks , setTasks, task_status_constants, updateSelectedTask } = useAuth();

    // const columns = {
    //     ready: "Ready",
    //     open: "Open",
    //     in_progress: "In Progress",
    //     completed: "Completed",
    // };

    const handleDragEnd = (result) => {

        const { source, destination } = result;

        if (!destination) return;
        let task_id = null;

        if (source.droppableId !== destination.droppableId) {
        // Update the task's status to match the new column
            const updatedTasks = tasks.map((task) => {
                if (task.id === result.draggableId) {
                    task_id = task.id
                    console.log('task_id',task.id , destination.droppableId)
                return { ...task, status: destination.droppableId };
                }
                return task;
            });
            if (task_id) {
                // updateTask(task_id, { status: destination.droppableId });
                updateSelectedTask(task_id, { status: destination.droppableId });

                setTasks(updatedTasks);
            }
        }
    };
    return (
        <div className="kanban-board-container">
            <div className="create-task-modal">
                <CreateTasksModal />
            </div>
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-board">
            {Object.entries(task_status_constants).map(([status, title]) => (
                <Droppable key={status} droppableId={status}>
                {(provided) => (
                    <div
                    className="kanban-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                    <h2 className="kanban-column-title">{title}</h2>
                    {/* <hr /> */}
                    <div className="kanban-tasks">
                        {tasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                            <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                            >
                            {(provided) => (
                                <div
                                className="kanban-task"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                <h4 className="title">{task.title}</h4>
                                <p className="info">{task.description}</p>
                                <div className="task-details">
                                    <p className="detail-title">Priority</p>
                                    <Alert color={task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "primary"} className="detail-info">
                                    {task.priority}
                                    </Alert>
                                </div>
                                <hr />
                                <div className="task-details" >
                                    <p className="detail-title" >Start Date</p>
                                    <Alert color="primary" className="detail-info black-bg">
                                    {task.start_date}
                                    </Alert>
                                </div>
                                </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                    </div>
                )}
                </Droppable>
            ))}
            </div>
        </DragDropContext>
        </div>
    );
}

export default BoardView;
