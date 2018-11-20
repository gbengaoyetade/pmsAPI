const bcrypt = require('bcryptjs');

const now = new Date().toISOString();
const passwordToHash = process.env.ADMIN_PASSWORD || 'password';
const salt = bcrypt.genSaltSync(5);
const password = bcrypt.hashSync(passwordToHash, salt);
const user = {
  email: 'pms-admin@admin.com',
  password,
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
