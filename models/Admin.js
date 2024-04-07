import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Checks the enters password with stored hashed password by using bcrypt
adminSchema.methods.matchPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//Before storing the password convert into hash
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
