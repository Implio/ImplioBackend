const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  managerId: {
    type: String
  },

  social: {
    type: String,
    required: true,
    minlength: 4
  },

  password: {
    type: String,
    required: true,
    minlength: 4
  },

  title: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  room: {
    type: String
  },

  schedule: {},

  hours: {
    type: Number
  },

  shift: {
    type: String
  },

  dob: {
    type: Date,
    required: true
  },

  tokens: [String]
});

UserSchema.statics.findBySocial = function(social, password, callback) {
  User.findOne({ social }, (err, doc) => {
    if (!doc) return callback({ error: 'No user with that social found' });

    if (bcrypt.compareSync(password, doc.password)) return callback(null, doc);

    return callback({ error: 'Password or social is incorrect' });
  });
};

UserSchema.statics.findByToken = function(token, callback) {
  let decoded;

  if (!token) return callback({ error: 'Please login' });

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return callback({ err: 'Invalid token, please try logging in again' });
  }

  User.findOne(
    {
      _id: decoded._id,
      tokens: token
    },
    (err, doc) => {
      if (!doc) return callback({ error: 'Please login' });
      if (err) return callback(err);

      callback(null, doc);
    }
  );
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'abc123').toString();

  user.tokens.push(token);
  user.save();

  return token;
};

UserSchema.methods.removeToken = function(token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: token
    }
  });
};

UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();

  return _.pick(userObject, [
    '_id',
    'title',
    'firstName',
    'lastName',
    'dob',
    'managerId',
    'isAdmin',
    'room',
    'schedule',
    'hours',
    'shift'
  ]);
};

UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
