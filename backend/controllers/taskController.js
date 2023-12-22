import { Task } from "../models/taskModels.js";
import { User } from "../models/userModels.js";
import {
  sendTaskAssignmentNotification,
  sendDeadlineNotification,
} from "../utils/notifications.js";
import { validateUserForNotification } from "../middlewares/validationMiddleware.js";

export const assignTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { assignee } = req.body;

    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Validate assignee
    const validation = await validateUserForNotification(
      assignee,
      "Development Team"
    );
    if (!validation.isValid) {
      return res.status(403).json({ message: validation.message });
    }

    // Update assignee field
    existingTask.assignee = assignee;

    // Trigger notification
    if (validation.user) {
      await sendTaskAssignmentNotification(assignee, existingTask.name);
    }

    // Save the updated task to DB
    await existingTask.save();

    res.status(200).json({ message: "Task assigned successfully." });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignee dependencies sprint");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate(
      "assignee dependencies sprint"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

    const newTask = new Task({
      name,
      description,
      deadline,
      status,
      assignee,
      dependencies,
      sprint,
    });

    // Trigger notification
    if (assignee) {
      const validation = await validateUserForNotification(
        assignee,
        "Development Team"
      );
      if (!validation.isValid) {
        return res.status(403).json({ message: validation.message });
      }
      sendTaskAssignmentNotification(assignee, name);
    }

    const task = await newTask.save();

    // Calculate days left for the deadline and trigger deadline notification if less than 3 days left
    const daysLeft = Math.ceil(
      (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );
    if (daysLeft <= 3) {
      await sendDeadlineNotification(assignee, name, daysLeft);
    }

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

    const existingTask = await Task.findById(taskId).populate("dependencies");

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Validate assignee
    const validation = await validateUserForNotification(
      assignee,
      "Development Team"
    );
    if (!validation.isValid) {
      return res.status(403).json({ message: validation.message });
    }

    // Trigger notification
    if (validation.user) {
      await sendTaskAssignmentNotification(assignee, existingTask.name);
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

    // Check task completion after update
    const completionStatus = await checkTaskCompletion(taskId);
    res.status(200).json({
      message: "Task updated successfully.",
      completionStatus,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const existingTask = await Task.findByIdAndDelete(taskId);
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    //  remove task from the linked project as well
    const projectContainingTask = await Project.findOne({
      tasks: existingTask._id,
    });

    if (projectContainingTask) {
      projectContainingTask.tasks = projectContainingTask.tasks.filter(
        (taskId) => taskId.toString() !== existingTask._id.toString()
      );
      await projectContainingTask.save();
    }


    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkTaskCompletion = async (taskId) => {
  const task = await Task.findById(taskId).populate("dependencies");

  if (!task) {
    return { completed: false, message: "Task not found." };
  }

  if (task.dependencies.some((dep) => dep.status !== "Done")) {
    return { completed: false, message: "Dependencies are not completed." };
  }

  return {
    completed: task.status === "Done",
    message: "Task completion status checked.",
  };
};
