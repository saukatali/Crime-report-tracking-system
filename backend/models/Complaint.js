const db = require('../config/db');

// Generate unique tracking code
function generateTrackingCode() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `CR-${timestamp}-${random}`.toUpperCase();
}

class Complaint {
  static async create(complaintData) {
    const { user_id, title, category, location, description, evidence_file, is_anonymous, evidence_files } = complaintData;
    const tracking_code = is_anonymous ? generateTrackingCode() : null;
    const evidence_json = evidence_files ? JSON.stringify(evidence_files) : null;
    
    const [result] = await db.query(
      `INSERT INTO complaints (user_id, title, category, location, description, evidence_file, evidence_files, is_anonymous, tracking_code, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [user_id || null, title, category, location, description, evidence_file, evidence_json, is_anonymous || false, tracking_code]
    );
    return { insertId: result.insertId, tracking_code };
  }

  static async findByUserId(userId) {
    const [rows] = await db.query(
      `SELECT c.*, u.name as user_name, u.email as user_email 
       FROM complaints c 
       LEFT JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? 
       ORDER BY c.created_at DESC`,
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT c.*, u.name as user_name, u.email as user_email, u.phone as user_phone 
       FROM complaints c 
       LEFT JOIN users u ON c.user_id = u.id 
       WHERE c.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByTrackingCode(trackingCode) {
    const [rows] = await db.query(
      'SELECT * FROM complaints WHERE tracking_code = ?',
      [trackingCode]
    );
    return rows[0];
  }

  static async updateStatus(id, status) {
    const [result] = await db.query(
      'UPDATE complaints SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows;
  }

  static async getAll() {
    const [rows] = await db.query(
      `SELECT c.*, u.name as user_name, u.email as user_email 
       FROM complaints c 
       LEFT JOIN users u ON c.user_id = u.id 
       ORDER BY c.created_at DESC`
    );
    return rows;
  }

  static async update(id, complaintData) {
    const { title, category, location, description } = complaintData;
    const [result] = await db.query(
      'UPDATE complaints SET title = ?, category = ?, location = ?, description = ? WHERE id = ?',
      [title, category, location, description, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM complaints WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }

  // Analytics methods
  static async getStats() {
    const [stats] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'Under Investigation' THEN 1 ELSE 0 END) as investigating,
        SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
      FROM complaints
    `);
    return stats[0];
  }

  static async getCategoryStats() {
    const [stats] = await db.query(`
      SELECT category, COUNT(*) as count 
      FROM complaints 
      GROUP BY category 
      ORDER BY count DESC
    `);
    return stats;
  }

  static async getMonthlyTrends() {
    const [trends] = await db.query(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM complaints
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY month
      ORDER BY month ASC
    `);
    return trends;
  }
}

module.exports = Complaint;
