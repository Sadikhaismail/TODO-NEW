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
        onUpdate();
        onClose();
      } else {
        alert("Error updating task.");
      }
    } catch (error) {
      console.error("Error while editing task:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={onClose}></div>

      {/* Modal */}
      <div style={modalStyle}>
        <div style={containerStyle}>
          <h2 style={headingStyle}>Edit Task</h2>

          <label style={labelStyle}>Title:</label>
          <input
            style={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label style={labelStyle}>Description:</label>
          <input
            style={inputStyle}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Flex Container for Status, Assignee, and Due Date */}
          <div style={flexContainerStyle}>
            <div style={flexItemStyle}>
              <label style={labelStyle}>Status:</label>
              <select
                style={inputStyle}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div style={flexItemStyle}>
              <label style={labelStyle}>Assignee:</label>
              <select
                style={inputStyle}
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value="Emily">Emily</option>
                <option value="Jack">Jack</option>
                <option value="Jon">Jon</option>
                <option value="Emma">Emma</option>
                <option value="Andrew">Andrew</option>
              </select>
            </div>

            <div style={flexItemStyle}>
              <label style={labelStyle}>Due Date:</label>
              <input
                type="date"
                style={inputStyle}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons container */}
          <div style={buttonContainerStyle}>
            <button
              style={{ ...buttonStyle, ...blackButtonHover }}
              onMouseEnter={(e) => {
                e.target.style.background = "#111"; // Darker black
                e.target.style.color = "white";
                e.target.style.border = "1px solid #111";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "black";
                e.target.style.color = "white";
                e.target.style.border = "none";
              }}
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              style={{ ...buttonStyle, ...blackButtonHover }}
              onMouseEnter={(e) => {
                e.target.style.background = "#111"; // Darker black
                e.target.style.color = "white";
                e.target.style.border = "1px solid #111";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "black";
                e.target.style.color = "white";
                e.target.style.border = "none";
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Styling
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
  borderRadius: "8px",
  zIndex: "1000",
  width: "90%",
  maxWidth: "450px",
  overflowY: "auto",
};

const overlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: "999",
};

const containerStyle = {
  padding: "20px",
  fontSize: "14px",
};

const headingStyle = {
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  margin: "10px 0 5px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "5px 0 15px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const flexContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const flexItemStyle = {
  flex: 1,
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const blackButtonHover = {
  background: "black",
  color: "white",
  border: "none",
};

export default TaskEditor;
