import bcrypt from 'bcryptjs';

const admin = [
  {
    name: 'Admin1',
    email: 'admin@email.com',
    password: bcrypt.hashSync('12345', 10),
  },
];

export default admin;
