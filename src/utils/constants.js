const now = new Date().toISOString();
const user = {
  email: 'pms-admin@admin.com',
  password: 'password',
  role: 'admin',
  createdAt: now,
  updatedAt: now,
};

export { user, now };
