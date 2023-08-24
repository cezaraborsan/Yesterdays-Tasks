import React, { useState } from "react";

const TaskItem = ({ task, deleteTask, updateTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSave = () => {
    if (editedTitle.trim() !== "" && editedDescription.trim() !== "") {
      updateTask(task.id, editedTitle, editedDescription);
      setIsEditing(false);
    }
  };

  return (
    <li className={`task ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="editing-task">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="task-buttons-container">
            <button
              className="delete-button task-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="complete-button task-button"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="task-container">
          <div className="task-content">
            <div>
              <div className="task-title">{task.title}</div>
              <div className="task-description">{task.description}</div>
            </div>
            <button className="edit-button" onClick={handleEdit}>
              <svg
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.700195"
                  y="1.10001"
                  width="27.8"
                  height="27.8"
                  rx="13.9"
                  fill="white"
                />
                <path
                  d="M9 17.688V20.6H11.9269L20.2 12.3232L17.278 9.39999L9 17.688Z"
                  fill="#CD695B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.2781 8.60001C17.4904 8.59997 17.694 8.6843 17.844 8.83444L20.766 11.7577C21.0783 12.0701 21.0783 12.5764 20.766 12.8888L12.4929 21.1656C12.3428 21.3157 12.1393 21.4 11.9271 21.4H9.0002C8.55837 21.4 8.2002 21.0418 8.2002 20.6V17.688C8.2002 17.476 8.28435 17.2726 8.43417 17.1226L16.7122 8.83466C16.8622 8.68446 17.0658 8.60005 17.2781 8.60001ZM17.2785 10.5318L9.8002 18.0191L11.5956 19.8L19.0691 12.3232L17.2785 10.5318Z"
                  fill="#3B3D43"
                />
                <rect
                  x="0.700195"
                  y="1.10001"
                  width="27.8"
                  height="27.8"
                  rx="13.9"
                  stroke="#CD695B"
                />
              </svg>
            </button>
          </div>

          <div className="task-buttons-container">
            <button
              className="delete-button task-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <button
              className="complete-button task-button"
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
