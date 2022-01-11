const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Subreddit = require('../models/subgredditModel');
const Post = require('../models/postModel');

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

exports.createPost = catchAsync(async (req, res, next) => {
  const subreddits = await Subreddit.find();

  res.status(200).render('createPost', {
    title: 'Greddit | Create Post',
    subreddits,
  });
});

exports.login = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Greddit',
  });
};
