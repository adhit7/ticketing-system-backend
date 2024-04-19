import mongoose from 'mongoose';

const converstationSchema = mongoose.Schema({
  queryId: {
    type: String,
  },
  messages: [
    {
      messageId: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Converstation = mongoose.model('converstation', converstationSchema);

export default Converstation;
