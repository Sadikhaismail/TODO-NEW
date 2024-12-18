import React, { useState } from "react";
import { updateTask } from "../services/api";

const TaskEditor = ({ task, onUpdate, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [assignee, setAssignee] = useState(task.assignee);
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  
  const handleSubmit = async () => {
    const token = document.cookie.split("=")[1];
    const updatedTask = {
      ...task,
      title,
      description,
      status,
      assignee,
      dueDate,
    };

    try {
      const response = await updateTask(updatedTask._id, updatedTask, token);
      if (response && response.status === 200) {
        alert("Task updated successfully!");
        onUpdate(); // Trigger the parent Dashboard's task refresh
        onClose();
      } else {
        alert("Error updating task.");
      }
    } catch (error) {
      console.error("Error while editing task:", error);
    }
  };

  return (
    <div style={modalStyle}>
      <h2>Edit Task</h2>
      <label>Title: </label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Description: </label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Status: </label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <label>Assignee: </label>
      <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
        <option value="Emily">Emily</option>
        <option value="Jack">Jack</option>
        <option value="Jon">Jon</option>
        <option value="Emma">Emma</option>
        <option value="Andrew">Andrew</option>
      </select>

      <label>Due Date: </label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <div>
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
      </div>
    </div>
  );
};

// Inline Modal Style
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
  zIndex: "1000",
};

export default TaskEditor;