import { Notification } from "../models/notificationModel.js";

// send notification to user called in loginUser ang getUserById
export const fetchUsersNotification = (userId) => {
  const notifications = Notification.find(userId).sort({ timestamp: -1 });
  return notifications;
};

// taskAssignement Notification triggred on taskCreate and taskAssignment
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

// project Assignment for scrum Master
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

// project assignment notification for development team
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

// notification for task deadline
export const sendDeadlineNotification = async (userId, taskName, daysLeft) => {
  const deadlineNotification = new Notification({
    userId,
    message: `The deadline for the task "${taskName}" is approaching. You have ${daysLeft} days left.`,
    type: "deadline",
  });

  await deadlineNotification
    .save()
    .then((savedNotification)=>{
      console.log("Deadline Notification saved:", savedNotification);
    }).catch((error)=> {
    console.error("Error saving Deadline Notification:", error);
    });
};