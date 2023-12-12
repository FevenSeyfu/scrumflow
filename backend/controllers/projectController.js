import { Project } from "../models/projectModel.js";

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
      projectOwner,
      scrumMaster,
      teamMembers,
      tasks,
    });

    await newProject.save();

    res.status(201).json({ message: "Project created successfully." });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//get all rpojects
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

    await existingProject.save();

    res.status(200).json({ message: "Project updated successfully." });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const existingProject = await Project.findByIdAndDelete(projectId);
        if(!existingProject){
            return response.status(404).json({message: 'Post not found'})
        }
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
