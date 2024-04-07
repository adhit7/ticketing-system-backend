import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const learnerSchema = mongoose.Schema(
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
      required: true,
    },
    tempToken: {
      type: String,
    },
    batch: {
      type: String,
      required: true,
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
learnerSchema.methods.matchPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//Before storing the password convert into hash
learnerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Learner = mongoose.model('Learner', learnerSchema);

export default Learner;
