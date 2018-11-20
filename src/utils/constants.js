const now = new Date().toISOString();
const user = {
  email: 'pms-admin@admin.com',
  password: 'password',
  role: 'admin',
  createdAt: now,
  updatedAt: now,
};

const DEFAULT_LIMIT = 10;

const DEFAULT_OFFSET = 0;

export {
  user, now, DEFAULT_LIMIT, DEFAULT_OFFSET,
};
