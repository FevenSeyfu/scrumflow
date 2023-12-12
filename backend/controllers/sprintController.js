import { Sprint } from "../models/sprintModels.js";

// get all sprints
export const getAllSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find();
    res.status(200).json(sprints);
  } catch (error) {
    console.error("Error getting sprints:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// get sprints by id
export const getSprintById = async (req, res) => {
  try {
    const sprintId = req.params.id;
    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).json({ message: "Sprint not found." });
    }
    res.status(200).json(sprint);
  } catch (error) {
    console.error("Error getting sprint by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// create new sprint
export const createSprint = async (req, res) => {
  try {
    const { name, startDate, endDate, duration, tasks } = req.body;

    // Create a new sprint
    const newSprint = new Sprint({
      name,
      startDate,
      endDate,
      duration,
      tasks,
    });

    // Save the new sprint to the database
    const sprint = await newSprint.save();

    res.status(201).json({
      message: "Sprint created successfully!",
      success: true,
      sprint,
    });
  } catch (error) {
    console.error("Error creating sprint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// update sprint
export const updateSprint = async (req, res) => {
  try {
    const sprintId = req.params.id;
    const { name, startDate, endDate, duration, tasks } = req.body;

    // Find the sprint by ID
    const existingSprint = await Sprint.findById(sprintId);

    if (!existingSprint) {
      return res.status(404).json({ message: "Sprint not found." });
    }

    // Update sprint fields
    existingSprint.name = name;
    existingSprint.startDate = startDate;
    existingSprint.endDate = endDate;
    existingSprint.duration = duration;
    existingSprint.tasks = tasks;

    // Save the updated sprint
    await existingSprint.save();

    res.status(200).json({ message: "Sprint updated successfully." });
  } catch (error) {
    console.error("Error updating sprint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// delete sprint bt id
export const deleteSprint = async (req, res) => {
  try {
    const sprintId = req.params.id;
    // Find the sprint by ID Delete the sprint
    const existingSprint = await Sprint.findByIdAndDelete(sprintId);
    if (!existingSprint) {
      return res.status(404).json({ message: "Sprint not found." });
    }
    res.status(200).json({ message: "Sprint deleted successfully." });
  } catch (error) {
    console.error("Error deleting sprint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
