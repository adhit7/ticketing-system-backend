import mongoose from 'mongoose';

const batchSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    students: {
      type: Array,
    },
    mentor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;
