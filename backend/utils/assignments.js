import {
  sendScrumMasterProjectAssignmentNotification,
  sendTeamMemberProjectAssignmentNotification,
} from "./notifications.js";
import { validateUserForNotification } from "../middlewares/validationMiddleware.js";

export const assignForProject = async (projectId, scrumMaster, teamMembers) => {
  try {
    // Trigger notification to Scrum Master
    const scrumMasterUserValidation = await validateUserForNotification(
      scrumMaster,
      "Scrum Master"
    );
    if (!scrumMasterUserValidation.isValid) {
      return { success: false, message: scrumMasterUserValidation.message };
    }
    sendScrumMasterProjectAssignmentNotification(scrumMaster, projectId);

    // Trigger notification to team members
    for (const teamMemberId of teamMembers) {
      const teamMemberUserValidation = await validateUserForNotification(
        teamMemberId,
        "Development Team"
      );
      if (!teamMemberUserValidation.isValid) {
        return { success: false, message: teamMemberUserValidation.message };
      }
      sendTeamMemberProjectAssignmentNotification(teamMemberId, projectId);
    }

    return { success: true, message: "Project assigned successfully." };
  } catch (error) {
    console.error("Error assigning project:", error);
    return { success: false, message: "Internal Server Error" };
  }
};
