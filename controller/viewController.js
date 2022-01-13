const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Subreddit = require('../models/subgredditModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.overview = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).render('homepage', {
    title: 'Greddit | homepage',
    posts,
  });
});

exports.postDetail = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  console.log(post);

  res.status(200).render('postDetail', {
    title: 'Greddit | Post Detail',
    post,
  });
});

exports.allSubs = catchAsync(async (req, res, next) => {
  const subreddits = await Subreddit.find();

  res.status(200).render('createSubreddit', {
    title: 'Greddit | Create Subreddit',
    subreddits,
  });
});

exports.getSubreddit = catchAsync(async (req, res, next) => {
  const subreddit = await Subreddit.findOne({ name: req.params.name });

  if (!subreddit) {
    return next(new AppError('No subreddit exist with that name', 404));
  }

  const posts = await Post.find({ subreddit: subreddit._id });
  const users = await User.find({ subs_joined: subreddit._id });
  console.log(users);

  res.status(200).render('subreddit', {
    title: `Greddit | ${subreddit.name}`,
    subreddit,
    posts,
    users,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'subs_joined',
    select: 'name',
  });

  res.status(200).render('createPost', {
    title: 'Greddit | Create Post',
    user,
  });
});

exports.login = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Greddit',
  });
};
