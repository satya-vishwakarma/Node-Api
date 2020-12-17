const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

/**
 * Get user data by user name 
 */
module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username }
  User.findOne(query, callback);
}

/**
 * Add user 
 */
module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

/**
 * compare password
 */
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}


/**
 * user list 
 */
module.exports.users  =  function (callback) {
  User.find({}, callback);
}

/**
 * Find in user model 
 */
module.exports.findData  = (where,callback)=> {
  User.find(where, callback);
};
