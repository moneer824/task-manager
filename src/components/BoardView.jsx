import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../style/components/BoardView.scss";
import { useAuth } from "../context/AuthContext";
import CreateTasksModal from "./CreateTasksModal";
import BoardTask from "./BoardTask";
function BoardView() {
    const { tasks , setTasks, task_status_constants, updateSelectedTask } = useAuth();

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
                                <div className="kanban-column-details">
                                    <h2 className="kanban-column-title">{title} </h2>
                                    <span className="kanban-column-info">{tasks.filter((task) => task.status === status).length}</span>
                                </div>
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
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <BoardTask task={task} />
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
