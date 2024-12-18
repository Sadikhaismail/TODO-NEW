import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/api";
import { useNavigate } from "react-router-dom";
import TaskEditor from "./TaskEditor";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  // Fetch tasks with filters applied
  useEffect(() => {
    const fetchTasks = async () => {
      const token = document.cookie.split("=")[1];
      const response = await getTasks(token);
      let filteredTasks = response.data.tasks;

      if (statusFilter !== "all") {
        filteredTasks = filteredTasks.filter((task) => task.status === statusFilter);
      }
      if (assigneeFilter !== "all") {
        filteredTasks = filteredTasks.filter((task) => task.assignee === assigneeFilter);
      }

      setTasks(filteredTasks);
    };
    fetchTasks();
  }, [statusFilter, assigneeFilter]);

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

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <label>Status Filter:</label>
        <select onChange={(e) => handleStatusFilter(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label>Assignee Filter:</label>
        <select onChange={(e) => handleAssigneeFilter(e.target.value)}>
          <option value="all">All Assignees</option>
          <option value="Emily">Emily</option>
          <option value="Jack">Jack</option>
        </select>
      </div>

      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "5px" }}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Assignee: {task.assignee}</p>
              <p>Created Date: {task.createdAt}</p>
              <button onClick={() => openEditModal(task)} style={{ marginRight: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(task._id)} style={{ background: "red", color: "white" }}>
                Delete
              </button>
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
            // Refresh the tasks list
            window.location.reload();
          }}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default Dashboard;