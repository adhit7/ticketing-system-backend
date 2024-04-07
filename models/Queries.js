import mongoose from 'mongoose';

const querySchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 1000,
    trim: true,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  preferredLanguage: {
    type: String,
    required: true,
  },
  availableTime: {
    from: {
      type: String,
      required: true,
    },
    till: {
      type: String,
      required: true,
    },
  },
  rasiedBy: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  assignedTo: {
    type: ObjectId,
    ref: 'User',
  },
  converstationId: {
    type: ObjectId,
    ref: 'converstation',
  },
  solution: {
    type: String,
    minlength: 5,
    maxlength: 1000,
    trim: true,
  },
  feedback: {
    type: String,
    minlength: 5,
    maxlength: 1000,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  status: {
    type: String,
    enum: [UNASSIGNED, ASSIGNED, RESOLVED, OPEN, CLOSE, REOPEN],
    default: UNASSIGNED,
  },
});

const Query = mongoose.model('Query', querySchema);

export default Query;
