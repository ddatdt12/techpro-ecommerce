const bcrypt = require('bcryptjs');

const password = bcrypt.hashSync('123456', 12);

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: password,
    confirmPassword: password,
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: password,
    confirmPassword: password,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: password,
    confirmPassword: password,
  },
];

module.exports = users;
