import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema(
  {
    sender: { type: String },
    content: { type: String, trim: true },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;
