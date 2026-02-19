CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50),
    pinCode VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    role ENUM('admin', 'user') DEFAULT 'user',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Default Admin User
INSERT INTO users (id, name, email, address, phone, pinCode, password, status, role, createdAt)
VALUES 
('admin-001', 'System Admin', 'admin@gmail.com', 'Global HQ', NULL, '000000', 'admin123', 'approved', 'admin', NOW())
ON DUPLICATE KEY UPDATE id=id;
