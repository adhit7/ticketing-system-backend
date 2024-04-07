import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const mentorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    },
    batch: {
      type: Array,
    },
    tempToken: {
      type: String,
    },
    query: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

//Checks the enters password with stored hashed password by using bcrypt
mentorSchema.methods.matchPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//Before storing the password convert into hash
mentorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;
