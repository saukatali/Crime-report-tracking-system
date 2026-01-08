-- Add notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  complaint_id INT,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
);

-- Add anonymous tracking to complaints table
ALTER TABLE complaints 
ADD COLUMN is_anonymous BOOLEAN DEFAULT FALSE,
ADD COLUMN tracking_code VARCHAR(50) UNIQUE,
ADD COLUMN evidence_files JSON;

-- Allow NULL user_id for anonymous complaints
ALTER TABLE complaints MODIFY user_id INT NULL;

-- Add indexes for better performance
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_complaints_tracking ON complaints(tracking_code);
CREATE INDEX idx_complaints_anonymous ON complaints(is_anonymous);
