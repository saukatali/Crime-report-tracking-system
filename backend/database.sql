-- Create Database
CREATE DATABASE IF NOT EXISTS crime_reporting_db;
USE crime_reporting_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Complaints Table
CREATE TABLE IF NOT EXISTS complaints (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  evidence_file VARCHAR(255),
  status ENUM('Pending', 'Under Investigation', 'Resolved', 'Rejected') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

-- Police Updates Table
CREATE TABLE IF NOT EXISTS police_updates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  complaint_id INT NOT NULL,
  update_message TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
  INDEX idx_complaint_id (complaint_id)
);

-- Insert sample data
INSERT INTO users (name, email, phone, address, password) VALUES
('Rajesh Sharma', 'rajesh.sharma@email.com', '9876543210', '123 MG Road, Delhi', '$2a$10$YourHashedPasswordHere'),
('Priya Singh', 'priya.singh@email.com', '9876543211', '456 Park Street, Mumbai', '$2a$10$YourHashedPasswordHere');

-- Sample complaints
INSERT INTO complaints (user_id, title, category, location, description, status) VALUES
(1, 'Laptop Stolen from Office', 'Theft', 'Connaught Place, Delhi', 'My laptop was stolen from my office desk during lunch break.', 'Pending'),
(1, 'Chain Snatching Incident', 'Robbery', 'Saket, Delhi', 'A person on a motorcycle snatched my chain near the market.', 'Under Investigation'),
(2, 'Car Break-in', 'Theft', 'Bandra West, Mumbai', 'Someone broke into my car and stole valuables.', 'Resolved');
