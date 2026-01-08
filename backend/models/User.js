const db = require('../config/db');

class User {
  static async create(userData) {
    const { name, email, phone, address, password } = userData;
    const [result] = await db.query(
      'INSERT INTO users (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, address, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, address, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, userData) {
    const { name, email, phone, address } = userData;
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    // First delete all complaints associated with this user
    await db.query('DELETE FROM complaints WHERE user_id = ?', [id]);
    
    // Then delete the user
    const [result] = await db.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = User;
