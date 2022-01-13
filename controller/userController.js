const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.joinSubreddit = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user.subs_joined.includes(req.params.subid)) {
    user.subs_joined.push(req.params.subid);
    await user.save();
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
exports.leaveSubreddit = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.subs_joined.includes(req.params.subid)) {
    user.subs_joined.pull(req.params.subid);
    await user.save();
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
