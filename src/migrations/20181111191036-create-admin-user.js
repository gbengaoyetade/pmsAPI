const now = new Date().toISOString();
const user = {
  email: 'pms-admin@admin.com',
  password: process.env.ADMIN_PASSWORD || 'password',
  role: 'admin',
  createdAt: now,
  updatedAt: now,
};
module.exports = {
  up: (queryInterface) => {
    queryInterface.bulkInsert('Users', [user]);
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('Users', { email: user.email });
  },
};
