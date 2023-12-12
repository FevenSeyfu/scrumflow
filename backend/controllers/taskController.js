import { Task } from "../models/taskModels.js";

// get all tasks list
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// get tasks by id
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// create New task
export const createTask = async (req, res) => {
  try {
    const {
      name,
      description,
      deadline,
      status,
      assignee,
      dependencies,
      sprint,
    } = req.body;

    // Create a new task
    const newTask = new Task({
      name,
      description,
      deadline,
      status,
      assignee,
      dependencies,
      sprint,
    });

    // Save the new task to the database
    const task = await newTask.save();

    res.status(201).json({
      message: "Task created successfully!",
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const {
      name,
      description,
      deadline,
      status,
      assignee,
      dependencies,
      sprint,
    } = req.body;

    // Find the task by ID
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Update task fields
    existingTask.name = name;
    existingTask.description = description;
    existingTask.deadline = deadline;
    existingTask.status = status;
    existingTask.assignee = assignee;
    existingTask.dependencies = dependencies;
    existingTask.sprint = sprint;

    // Save the updated task
    await existingTask.save();

    res.status(200).json({ message: "Task updated successfully." });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const existingTask = await Task.findByIdAndDelete(taskId);
        if(!existingTask){
            return response.status(404).json({message: 'Task not found'})
        }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

