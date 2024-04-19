import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const querySchema = mongoose.Schema({
  title: {
    type: String,
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
  assignedMentorName: {
    type: String,
  },
  solution: {
    type: String,
  },
  status: {
    type: String,
    enum: ['UNASSIGNED', 'ASSIGNED', 'RESOLVED', 'OPEN', 'CLOSED'],
    default: 'UNASSIGNED',
  },
  conversationId: {
    type: ObjectId,
    ref: 'Conversation',
  },
});

const Query = mongoose.model('Query', querySchema);

export default Query;
