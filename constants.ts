
export const STORAGE_KEYS = {
  USERS: 'find_my_buddy_users',
  CURRENT_USER: 'find_my_buddy_auth_user',
};

export const INITIAL_ADMIN = {
  id: 'admin-001',
  name: 'System Admin',
  email: 'admin@gmail.com',
  password: 'admin123',
  address: 'Global HQ',
  pinCode: '000000',
  status: 'approved' as const,
  role: 'admin' as const,
  createdAt: new Date().toISOString(),
};
