const Subreddit = require('../models/subgredditModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createSubreddit = catchAsync(async (req, res, next) => {
  req.body.creator = req.user._id;
  const subreddit = await Subreddit.create(req.body);

  res.status(200).json({
    status: 'success',
    subreddit,
  });
});
