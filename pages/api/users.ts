
import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../lib/db';

async function ensureTable(db: any) {
  const sql = `
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
    )
  `;
  await db.execute(sql);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = getDb();

    // Ensure table exists on first run
    try {
      await ensureTable(db);
    } catch (e: any) {
      return res.status(500).json({
        message: 'SQL Table Error',
        details: e.message,
        code: e.code
      });
    }

    if (req.method === 'GET') {
      const [rows]: any = await db.execute('SELECT * FROM users ORDER BY createdAt DESC');

      if (rows.length === 0) {
        // Return seed admin if empty
        return res.status(200).json([{
          id: 'admin-001',
          name: 'System Admin',
          email: 'admin@gmail.com',
          password: 'admin123',
          role: 'admin',
          status: 'approved',
          pinCode: '000000',
          address: 'Global HQ',
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }]);
      }
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { name, email, address, phone, pinCode, password } = req.body;
      const id = 'u_' + Math.random().toString(36).substr(2, 9);
      const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

      await db.execute(
        'INSERT INTO users (id, name, email, address, phone, pinCode, password, status, role, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, name, email, address, phone || null, pinCode, password, 'pending', 'user', createdAt]
      );
      return res.status(201).json({ id, name, email, status: 'pending' });
    }

    if (req.method === 'PATCH') {
      const { id } = req.query;
      const { status } = req.body;
      await db.execute('UPDATE users SET status = ? WHERE id = ?', [status, id]);
      return res.status(200).json({ message: 'Updated' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('API_HANDLER_CRASH:', error);
    return res.status(500).json({
      message: 'Database Connection Exception',
      details: error.message,
      code: error.code || 'NO_CODE'
    });
  }
}
