const now = new Date().toISOString();
const user = {
  email: 'pms-admin@admin.com',
  password: 'password',
  role: 'admin',
  createdAt: now,
  updatedAt: now,
};

const location = {
  name: 'isolo',
  totalMale: '3000',
  totalFemale: '2999',
  total: '5999',
  createdBy: '1',
  updatedBy: '1',
};
const anotherLocation = {
  name: 'okota',
  totalMale: '30',
  totalFemale: '20',
  total: '50',
  createdBy: '1',
  updatedBy: '1',
  parentId: '1',
};
const anotherUser = {
  email: 'sage@admin.com',
  role: 'user',
  password: 'password',
  userId: '2',
};

const DEFAULT_LIMIT = 10;

const DEFAULT_OFFSET = 0;

export {
  user,
  now,
  location,
  anotherLocation,
  anotherUser,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
};
