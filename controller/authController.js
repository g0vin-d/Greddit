const promisify = require('util').promisify;
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  //generate token
  const token = signToken(newUser._id);
  // send response and token
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check if email or passwords are correct
  // turning select on for password
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting a token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in! Please log in again to get acces',
        401
      )
    );
  }

  // verification of token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)check if users exists, it token was old and use deleted account afterward
  const currentUser = await User.findById(decode.id);

  if (!currentUser) {
    return next(
      new AppError('User belonging to this token does not longer exist', 401)
    );
  }

  //4) check if user changed password after token issued
  // haven't build reset functionality yet

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});
