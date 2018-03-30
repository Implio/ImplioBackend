const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  social: {
    type: String,
    required: true,
    minlength: 4,
  },

  password: {
    type: String,
    required: true,
    minlength: 4,
  },

  title: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  tokens: [String]
});

UserSchema.statics.findBySocial = function(social, password, callback) {
  const User = this;

  User.findOne({ social }, (err, doc) => {
    if (!doc) return callback({ err: 'No user with that social found' });

    if(bcrypt.compareSync(password, doc.password))
      return callback(null, doc);

    return callback({message: "Password doesn't match"});
  });
};

UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();

  return _.pick(userObject, ['_id', 'title', 'firstName', 'lastName']);
}

UserSchema.pre('save', function(next) { 
  const user = this;

  if(user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
