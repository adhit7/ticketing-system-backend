import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const querySchema = mongoose.Schema({
  title: {
    type: String,
    // minlength: 5,
    // maxlength: 255,
    // trim: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // minlength: 5,
    // maxlength: 1000,
    // trim: true,
    required: true,
  },
  tags: {
    type: [String],
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
  raisedBy: {
    type: ObjectId,
    required: true,
    ref: 'Learner',
  },
  assignedTo: {
    type: ObjectId,
    ref: 'Mentor',
  },
  solution: {
    type: String,
    minlength: 5,
    maxlength: 1000,
    trim: true,
  },
  status: {
    type: String,
    enum: ['UNASSIGNED', 'ASSIGNED', 'RESOLVED', 'OPEN', 'CLOSE'],
    default: 'UNASSIGNED',
  },
  conversation: {
    type: ObjectId,
    ref: 'Conversation',
  },
});

const Query = mongoose.model('Query', querySchema);

export default Query;
