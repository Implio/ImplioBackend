const mongoose = require('mongoose');
const shortid = require('shortid');
const _ = require('lodash');

const MessageModel = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },

  date: {
    type: Date,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  fromUserId: {
    type: String,
    required: true
  },

  toUserId: {
    type: String,
    required: true
  }
});

const Message = mongoose.model('Message', MessageModel);

module.exports = Message;
