const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;
