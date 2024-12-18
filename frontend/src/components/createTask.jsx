import React, { useState } from "react";
import { createTask } from "../services/api";
import { Link } from "react-router-dom";

function TaskEditor() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    status: "Pending",
  });
  const [tasks, setTasks] = useState([]); // Maintain a list of created tasks

  const assignees = ["John", "Emily", "Andrew", "Emma", "Kiran"]; // Predefined assignee names

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    // Capture the current date in readable format
    const createdDate = new Date().toLocaleString();

    // Send task to backend
    const response = await createTask(task, token);

    if (response && response.status === 201) {
      alert("Task created successfully!");

      // Update UI with newly created task, including creation date
      const newTask = { ...task, createdDate };
      setTasks([...tasks, newTask]);

      // Clear the form after submission
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
  };

  return (
    <div>
      <h1>Create Task</h1>

      {/* Input fields for task creation */}
      <div>
        <input
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <input
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        
        {/* Dropdown for assignee names */}
        <select
          value={task.assignee}
          onChange={(e) => setTask({ ...task, assignee: e.target.value })}
        >
          <option value="">Select Assignee</option>
          {assignees.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <input
          placeholder="Due Date"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <button onClick={handleSubmit}>Create Task</button>
      </div>

      {/* Section to dynamically show created tasks */}
      <div style={{ marginTop: "20px" }}>
        <h2>Tasks Created</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((t, index) => (
              <li key={index}>
                <strong>Title:</strong> {t.title} | <strong>Description:</strong>{" "}
                {t.description || "N/A"} | <strong>Assignee:</strong> {t.assignee} |{" "}
                <strong>Due Date:</strong> {t.dueDate || "N/A"} | <strong>Status:</strong>{" "}
                {t.status} | <strong>Created Date:</strong> {t.createdDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks created yet.</p>
        )}
      </div>

      {/* Link to Dashboard */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Go to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default TaskEditor;