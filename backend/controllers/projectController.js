import { Project } from "../models/projectModel.js";
import { assignForProject} from '../utils/assignments.js'

// create new project
export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      projectOwner,
      scrumMaster,
      teamMembers,
      tasks,
    } = req.body;

    const newProject = new Project({
      name,
      description,
      startDate,
      projectOwner: req.user._id,
      scrumMaster,
      teamMembers,
      tasks,
    });

    // Handle assinging projects
    const assignmentResult = await assignForProject(
      newProject._id,
      scrumMaster,
      teamMembers
    );

    if (!assignmentResult.success) {
      return res.status(403).json({ message: assignmentResult.message });
    }

    await newProject.save();
    res.status(201).json({ message: "Project created successfully." });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// assign projects
export const assignProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { scrumMaster, teamMembers } = req.body;

    // Fetch the project by ID
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Update project fields
    existingProject.scrumMaster = scrumMaster;
    existingProject.teamMembers = teamMembers;

    // Save the updated project
    await existingProject.save();

    // Handle assigning projects
    const assignmentResult = await assignForProject(
      projectId,
      scrumMaster,
      teamMembers
    );

    if (!assignmentResult.success) {
      return res.status(403).json({ message: assignmentResult.message });
    }

    res.status(200).json({ message: "Project assigned successfully." });
  } catch (error) {
    console.error("Error assigning project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//get all  projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "projectOwner scrumMaster teamMembers tasks"
    );
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//get project bt id
export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate(
      "projectOwner scrumMaster teamMembers tasks"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error getting project by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// update project
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const {
      name,
      description,
      startDate,
      projectOwner,
      scrumMaster,
      teamMembers,
      tasks,
    } = req.body;

    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    existingProject.name = name;
    existingProject.description = description;
    existingProject.startDate = startDate;
    existingProject.projectOwner = projectOwner;
    existingProject.scrumMaster = scrumMaster;
    existingProject.teamMembers = teamMembers;
    existingProject.tasks = tasks;

    // Handle assinging projects
    const assignmentResult = await assignForProject(
      projectId,
      scrumMaster,
      teamMembers
    );

    if (!assignmentResult.success) {
      return res.status(403).json({ message: assignmentResult.message });
    }
    // save the updated project to database
    await existingProject.save();

    // Check project completion after update
    const completionStatus = await checkProjectCompletion(projectId);
    res.status(200).json({
      message: "Project updated successfully.",
      completionStatus,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const existingProject = await Project.findByIdAndDelete(projectId);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkProjectCompletion = async (projectId) => {
  const project = await Project.findById(projectId).populate("tasks");

  if (!project) {
    return { completed: false, message: "Project not found." };
  }

  const incompleteTasks = project.tasks.filter(
    (task) => task.status !== "Done"
  );

  return {
    completed: incompleteTasks.length === 0,
    message: "Project completion status checked.",
  };
};
