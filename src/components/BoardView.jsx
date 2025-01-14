import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../style/components/BoardView.scss";
import { useAuth } from "../context/AuthContext";
import CreateTasksModal from "./CreateTasksModal";
import BoardTask from "./BoardTask";
import { useParams } from "react-router-dom";
import NoContent from "./NoContent";
import { TEMPLATE_NAME } from "../services/constant";

function BoardView() {
  const { tasks, setTasks, task_status_constants, updateSelectedTask, activeTemplate, setActiveTemplate } = useAuth();
  const [taskType, setTaskType] = useState('add');
  const [editTaskData, setEditTaskData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const { project_id } = useParams();
  const toggle = () => setIsOpen(!isOpen);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    let task_id = null;
    if (source.droppableId !== destination.droppableId) {
      // Update the task's status to match the new column
      const updatedTasks = tasksData.map((task) => {
        if (task._id === result.draggableId) {
          task_id = task._id
          console.log('task_id', task._id, destination.droppableId)
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

  useEffect(() => {
    if (project_id == 'all') {
      setTasksData(tasks);
    } else {
      let filteredTasks = tasks.filter((task) => task.project_id === project_id);
      setTasksData(filteredTasks);
    }
  }, [tasks, project_id]);

  return (
    <div className="kanban-board-container">
      <div className="create-task-modal">
        <h3>Tasks</h3>
        <CreateTasksModal setTaskType={setTaskType} taskType={taskType} editTaskData={editTaskData} isOpen={isOpen} toggle={toggle} />
      </div>
      <div className="abcd">
        {tasks.length > 0 && tasksData.length > 0 && <DragDropContext onDragEnd={handleDragEnd}>
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
                      <span className="kanban-column-info">{tasksData.filter((task) => task.status === status).length}</span>
                    </div>
                    <div className="kanban-tasks">
                      {tasksData
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <BoardTask task={task} setEditTaskData={setEditTaskData} setTaskType={setTaskType} toggle={toggle} />
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
        </DragDropContext>}
        {tasks.length === 0 && <NoContent title="Task" info="You do not have any Task" toggle={toggle} />}
        {tasks.length > 0 && tasksData.length === 0 && <NoContent title="Task" info="You have Task but they are not assigned to this project." toggle={toggle} />}
      </div>
    </div>
  );
}

export default BoardView;
