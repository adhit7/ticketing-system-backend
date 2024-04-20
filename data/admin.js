import bcrypt from 'bcryptjs';

const admin = [
  {
    name: 'Admin1',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('12345', 10),
  },
];

export default admin;
