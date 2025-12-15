-- CREATE DATABASE IF NOT EXISTS tourism_guide;
-- USE tourism_guide;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_session_id VARCHAR(255),
    user_message TEXT,
    ai_response TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin user (Password: admin123)
-- Note: In a real app, passwords should be hashed. This is for initial setup.
-- You should implement a script to hash this.
INSERT INTO users (username, password_hash, role) VALUES ('admin', '$2b$10$YourHashedPasswordHere', 'admin') 
ON DUPLICATE KEY UPDATE id=id;
