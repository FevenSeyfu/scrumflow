import { Notification } from "../models/notificationModel.js";

export const fetchUsersNotification = (userId) => {
  const notifications = Notification.find(userId).sort({ timestamp: -1 });
  return notifications;
};

export const sendTaskAssignmentNotification = async (assignee, taskName) => {
  const notification = new Notification({
    userId: assignee,
    message: `You have been assigned a new task: ${taskName}`,
    type: "taskAssignment",
  });

  await notification
    .save()
    .then((savedNotification) => {
      console.log("Notification saved:", savedNotification);
    })
    .catch((error) => {
      console.error("Error saving notification:", error);
    });
};

export const sendScrumMasterProjectAssignmentNotification = async (
  assignee,
  taskName
) => {
  const notificationToScrumMaster = new Notification({
    userId: assignee,
    message: `You have been assigned as Scrum Master for the project: ${taskName}`,
    type: "projectAssignment",
  });

  await notificationToScrumMaster
    .save()
    .then((savedNotification) => {
      console.log("Notification saved to Scrum Master:", savedNotification);
    })
    .catch((error) => {
      console.error("Error saving notification to Scrum Master:", error);
    });
};

export const sendTeamMemberProjectAssignmentNotification = async (
  assignee,
  taskName
) => {
  const notificationToTeamMember = new Notification({
    userId: assignee,
    message: `You have been assigned to the project: ${taskName}`,
    type: "projectAssignment",
  });

  await notificationToTeamMember
    .save()
    .then((savedNotification) => {
      console.log("Notification saved to team member:", savedNotification);
    })
    .catch((error) => {
      console.error("Error saving notification to team member:", error);
    });
};
