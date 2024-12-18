const Task = require("../models/Task");

// Get tasks with optional filtering
exports.getTasks = async (req, res) => {
  try {
    const { status, assignee, startDate, endDate } = req.query;
    const filter = { userId: req.user.id };

    if (status) filter.status = status;
    if (assignee) filter.assignee = assignee;
    if (startDate && endDate) filter.dueDate = { $gte: startDate, $lte: endDate };

    const tasks = await Task.find(filter);

    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve tasks",
      error: error.message,
    });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, assignee, dueDate } = req.body;
    const task = await Task.create({ ...req.body, userId: req.user.id });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Task creation failed",
      error: error.message,
    });
  }
};

// Update a specific task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Task update failed",
      error: error.message,
    });
  }
};

// Delete a specific task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Task deletion failed",
      error: error.message,
    });
  }
};