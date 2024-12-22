import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/api";
import { useNavigate } from "react-router-dom";
import TaskEditor from "./TaskEditor";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [dueDateFilter, setDueDateFilter] = useState(""); // Filter by Due Date
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

// Hover state for Red button
  const [isLogoutHovered, setIsLogoutHovered] = useState(false); // Hover state for Logout button
  const [isCreateTaskHovered, setIsCreateTaskHovered] = useState(false); // Hover state for Create Task button
  

  const navigate = useNavigate();

  // Fetch tasks with filters applied
  useEffect(() => {
    const fetchTasks = async () => {
      const token = document.cookie.split("=")[1];
      const response = await getTasks(token);
      let filteredTasks = response.data.tasks;

      // Apply filters
      if (statusFilter !== "all") {
        filteredTasks = filteredTasks.filter((task) => task.status === statusFilter);
      }
      if (assigneeFilter !== "all") {
        filteredTasks = filteredTasks.filter((task) => task.assignee === assigneeFilter);
      }
      if (dueDateFilter) {
        filteredTasks = filteredTasks.filter((task) => task.dueDate === dueDateFilter);
      }

      setTasks(filteredTasks);
    };
    fetchTasks();
  }, [statusFilter, assigneeFilter, dueDateFilter]);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0";
    navigate("/login");
  };

  const handleDelete = async (taskId) => {
    const token = document.cookie.split("=")[1];
    try {
      const response = await deleteTask(taskId, token);
      if (response && response.status === 200) {
        alert("Task deleted successfully!");
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        alert("Error deleting task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const openEditModal = (task) => {
    setIsEditModalOpen(true);
    setSelectedTask(task);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleAssigneeFilter = (assignee) => {
    setAssigneeFilter(assignee);
  };

  const handleDueDateFilter = (date) => {
    setDueDateFilter(date);
  };

  // Helper function to format date (only date, no time)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats date as MM/DD/YYYY or based on user's locale
  };

  return (
    <div style={containerStyle}>
      <div style={dashboardContainerStyle}>
        <div style={headerContainerStyle}>
          <h1 style={headerStyle}>Dashboard</h1>
          <button
            onClick={handleLogout}
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
            style={isLogoutHovered ? logoutButtonStyleHovered : logoutButtonStyle}
          >
            Logout
          </button>
        </div>

        <div style={filterContainerStyle}>
          <div style={filterGroupStyle}>
            <label>Status Filter:</label>
            <select onChange={(e) => handleStatusFilter(e.target.value)} style={selectStyle}>
              <option value="all">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={filterGroupStyle}>
            <label>Assignee Filter:</label>
            <select onChange={(e) => handleAssigneeFilter(e.target.value)} style={selectStyle}>
              <option value="all">All Assignees</option>
              <option value="Emily">Emily</option>
              <option value="John">John</option>
              <option value="Andrew">Andrew</option>
              <option value="Emma">Emma</option>
              <option value="Kiran">Kiran</option>
            </select>
          </div>

          <div style={filterGroupStyle}>
            <label>Due Date Filter:</label>
            <input 
              type="date"
              onChange={(e) => handleDueDateFilter(e.target.value)}
              style={selectStyle}
            />
          </div>

          <button
            onClick={() => navigate("/create-task")}
            onMouseEnter={() => setIsCreateTaskHovered(true)}
            onMouseLeave={() => setIsCreateTaskHovered(false)}
            style={isCreateTaskHovered ? createTaskButtonStyleHovered : createTaskButtonStyle}
          >
            Create Task
          </button>
        </div>

        <div>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} style={taskCardStyle}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div style={taskDetailsStyle}>
                  <div><strong>Status:</strong> {task.status}</div>
                  <div><strong>Assignee:</strong> {task.assignee}</div>
                  <div><strong>Due Date:</strong> {formatDate(task.dueDate)}</div>
                </div>
                <div style={buttonContainerStyle}>
                  <button 
 onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
 onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
 onClick={() => openEditModal(task)}
 style={iconButtonStyleGreen}>
                    <FaEdit />
                  </button>
                  <button 
 onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
 onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
 onClick={() => handleDelete(task._id)}
 style={iconButtonStyleRed}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available at the moment.</p>
          )}
        </div>

        {isEditModalOpen && selectedTask && (
          <TaskEditor
            task={selectedTask}
            onUpdate={() => {
              window.location.reload();
            }}
            onClose={closeEditModal}
          />
        )}
      </div>
    </div>
  );
}

// Styling
const containerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  color: "#333",
  minHeight: "100vh",
};

const dashboardContainerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
};

const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const headerStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const logoutButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "black",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const logoutButtonStyleHovered = {
  ...logoutButtonStyle,
  backgroundColor: "#444",
};

const filterContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "900px",
  marginBottom: "20px",
  alignItems: "center",
};

const filterGroupStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginRight: "50px"
};

const selectStyle = {
  padding: "10px",
  fontSize: "14px",
  marginTop: "5px",
  borderRadius: "5px",
  width: "200px",
};

const taskCardStyle = {
  padding: "15px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  position: "relative",
};

const taskDetailsStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  gap: "10px",
};

const iconButtonStyleGreen = {
  padding: "8px",
  backgroundColor: "transparent",
  border: "1px solid green",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  transition: "transform 0.3s ease, color 0.3s ease",
  color: "green",
};



const iconButtonStyleRed = {
  padding: "8px",
  backgroundColor: "transparent",
  border: "1px solid red",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  transition: "transform 0.3s ease, color 0.3s ease",
  color: "red",
};



const createTaskButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "green",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const createTaskButtonStyleHovered = {
  ...createTaskButtonStyle,
  backgroundColor: "#4CAF50",
};

export default Dashboard;
