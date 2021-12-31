const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please cleate username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provid valid email.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  photo: {
    type: String,
    default: 'defalut.jpg',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'password must be greater than 8 character'],
    maxlength: [30, 'password must be less than 30 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confim your password!!!'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "password don't match",
    },
  },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function (next) {
  // if password in not modified then we should just skip this hook
  if (!this.isModified('password')) return next();

  //encrypt password with bcrypt hash
  this.password = await bcrypt.hash(this.password, 12);

  // set passwordConfirm to undefined, since it is unnecessary afterward
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
