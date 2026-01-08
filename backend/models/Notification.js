const db = require('../config/db');

class Notification {
  static async create(notificationData) {
    const { user_id, complaint_id, title, message, type } = notificationData;
    const [result] = await db.query(
      'INSERT INTO notifications (user_id, complaint_id, title, message, type) VALUES (?, ?, ?, ?, ?)',
      [user_id, complaint_id || null, title, message, type || 'info']
    );
    return result.insertId;
  }

  static async getByUserId(userId) {
    const [rows] = await db.query(
      `SELECT n.*, c.title as complaint_title 
       FROM notifications n 
       LEFT JOIN complaints c ON n.complaint_id = c.id 
       WHERE n.user_id = ? 
       ORDER BY n.created_at DESC`,
      [userId]
    );
    return rows;
  }

  static async getUnreadCount(userId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
      [userId]
    );
    return rows[0].count;
  }

  static async markAsRead(notificationId, userId) {
    const [result] = await db.query(
      'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
      [notificationId, userId]
    );
    return result.affectedRows;
  }

  static async markAllAsRead(userId) {
    const [result] = await db.query(
      'UPDATE notifications SET is_read = TRUE WHERE user_id = ?',
      [userId]
    );
    return result.affectedRows;
  }

  static async delete(notificationId, userId) {
    const [result] = await db.query(
      'DELETE FROM notifications WHERE id = ? AND user_id = ?',
      [notificationId, userId]
    );
    return result.affectedRows;
  }

  // Create notification when complaint status changes
  static async createStatusNotification(complaintId, userId, oldStatus, newStatus) {
    const statusMessages = {
      'Pending': { title: '⏳ Complaint Submitted', message: 'Your complaint has been submitted and is pending review.' },
      'Under Investigation': { title: '🔍 Investigation Started', message: 'Your complaint is now under investigation by authorities.' },
      'Resolved': { title: '✅ Complaint Resolved', message: 'Great news! Your complaint has been resolved.' },
      'Rejected': { title: '❌ Complaint Rejected', message: 'Your complaint has been rejected. Please contact support for more details.' }
    };

    const notification = statusMessages[newStatus];
    if (notification) {
      return this.create({
        user_id: userId,
        complaint_id: complaintId,
        title: notification.title,
        message: notification.message,
        type: newStatus === 'Resolved' ? 'success' : newStatus === 'Rejected' ? 'error' : 'info'
      });
    }
  }
}

module.exports = Notification;
