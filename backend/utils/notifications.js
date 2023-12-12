import { Notification } from "../models/notificationModel.js";

export const fetchUsersNotification = (userId) => {
    const notifications =  Notification.find(userId).sort({ timestamp: -1 });
    return notifications
}

export const sendTaskAssignmentNotification = async(assignee,taskName) => {
    const notification = new Notification({
        userId: assignee,
        message: `You have been assigned a new task: ${taskName}`,
        type: 'taskAssignment',
      });
      
    await notification.save()
    .then(savedNotification => {
        console.log('Notification saved:', savedNotification);
    })
    .catch(error => {
        console.error('Error saving notification:', error);
    });
}