import React, { useState } from "react";
import { createTask } from "../services/api";
import { Link } from "react-router-dom";

function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    status: "Pending",
  });
  const [tasks, setTasks] = useState([]);
  const [createButtonHovered, setCreateButtonHovered] = useState(false); // Hover state for Create Task button
  const [dashboardButtonHovered, setDashboardButtonHovered] = useState(false); // Hover state for Dashboard button
  const [errors, setErrors] = useState({
    title: "",
    assignee: "",
    description: "",
    dueDate: ""
  });

  const assignees = ["John", "Emily", "Andrew", "Emma", "Kiran"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs and set error messages
    let formErrors = { title: "", assignee: "", description: "", dueDate: "" };
    if (!task.title) formErrors.title = "Title is required!";
    if (!task.assignee) formErrors.assignee = "Assignee is required!";
    if (!task.description) formErrors.description = "Description is required!";
    if (!task.dueDate) formErrors.dueDate = "Due Date is required!";
    setErrors(formErrors);

    if (Object.values(formErrors).some((error) => error)) {
      return; // Stop if there are validation errors
    }

    const token = localStorage.getItem("token");
    const createdDate = new Date().toLocaleString();

    try {
      const response = await createTask(task, token);
      if (response && response.status === 201) {
        alert("Task created successfully!");
        setTasks([...tasks, { ...task, createdDate }]);
        setTask({
          title: "",
          description: "",
          assignee: "",
          dueDate: "",
          status: "Pending",
        });
      } else {
        alert("Error creating task.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating task.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={dashboardLinkStyle}>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <p style={dashboardTextStyle}>
            To{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>View</span>,{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>Delete</span>, and{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>Edit</span> tasks, click on{" "}
            <button
              style={dashboardButtonHovered ? { ...dashboardButtonStyle, backgroundColor: "black" } : dashboardButtonStyle}
              onMouseEnter={() => setDashboardButtonHovered(true)}
              onMouseLeave={() => setDashboardButtonHovered(false)}
            >
              Dashboard
            </button>
          </p>
        </Link>
      </div>

      <div style={formContainerStyle}>
        <h1 style={headingStyle}>Create Task</h1>
        <form onSubmit={handleSubmit} style={inputContainerStyle}>
          <input
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            style={inputStyle}
          />
          {errors.title && <span style={errorStyle}>{errors.title}</span>}

          <textarea
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            style={{ ...inputStyle, height: "100px" }}
          />
          {errors.description && <span style={errorStyle}>{errors.description}</span>}

          <select
            value={task.assignee}
            onChange={(e) => setTask({ ...task, assignee: e.target.value })}
            style={inputStyle}
          >
            <option value="">Select Assignee</option>
            {assignees.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.assignee && <span style={errorStyle}>{errors.assignee}</span>}

          <input
            type="date"
            placeholder="Due Date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            style={inputStyle}
          />
          {errors.dueDate && <span style={errorStyle}>{errors.dueDate}</span>}

          <button
            type="submit"
            style={createButtonHovered ? { ...buttonStyle, backgroundColor: "#000" } : buttonStyle}
            onMouseEnter={() => setCreateButtonHovered(true)}
            onMouseLeave={() => setCreateButtonHovered(false)}
          >
            Create Task
          </button>
        </form>
      </div>

      <div style={tasksContainerStyle}>
        <h2>Tasks Created</h2>
        {tasks.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {tasks.map((t, index) => (
              <li key={index} style={taskItemStyle}>
                <div>
                  <strong>Title:</strong> {t.title}
                </div>
                <div>
                  <strong>Description:</strong> {t.description || "N/A"}
                </div>
                <div>
                  <strong>Assignee:</strong> {t.assignee}
                </div>
                <div>
                  <strong>Due Date:</strong> {t.dueDate || "N/A"}
                </div>
                <div>
                  <strong>Status:</strong> {t.status}
                </div>
                <div>
                  <strong>Created Date:</strong> {t.createdDate}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks created yet.</p>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  color: "#333",
  minHeight: "100vh",
};

const dashboardLinkStyle = {
  marginBottom: "20px",
  textAlign: "center",
};

const dashboardTextStyle = {
  fontSize: "16px",
  color: "#00000",
};

const dashboardButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#006400",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "600px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headingStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "black",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  marginBottom: "20px",
};

const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#1a1a2e",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background-color 0.3s ease",
};

const taskItemStyle = {
  padding: "15px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f9f9f9",
  color: "#333",
};

const tasksContainerStyle = {
  marginTop: "30px",
  width: "100%",
  maxWidth: "600px",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
};

export default CreateTask;
