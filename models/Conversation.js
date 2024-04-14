const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const converstationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Learner',
  },
  messages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});

const Converstation = model('converstation', converstationSchema);

export default Converstation;
