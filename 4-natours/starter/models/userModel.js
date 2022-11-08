const mongoose = require('mongoose');
const validator = require('validator');
// name , email , photo , password , password confirm

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name !'],
  },
  email: {
    type: String,
    required: [true, 'please provide us your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password !'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a confirm password !'],
    validate: {
      // this only works on CREATE and  SAVE !!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same !',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
