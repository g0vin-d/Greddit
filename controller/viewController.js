const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Subreddit = require('../models/subgredditModel');

exports.overview = (req, res, next) => {
  res.status(200).render('homepage', {
    title: 'Greddit',
  });
};

exports.allSubs = catchAsync(async (req, res, next) => {
  const subreddits = await Subreddit.find();

  res.status(200).render('createSubreddit', {
    title: 'Greddit | Create Subreddit',
    subreddits,
  });
});

exports.login = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Greddit',
  });
};
