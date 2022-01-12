const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const post = await Post.create(req.body);

  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .populate({
      path: 'subreddit',
      select: 'name',
    })
    .populate({
      path: 'user',
      select: 'username',
    });

  res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError('No post found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.upvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const user_id = req.user._id;
  if (!post.upvotes.includes(user_id)) {
    post.upvotes.push(user_id);
  }

  if (post.downvotes.includes(user_id)) {
    post.downvotes.pull(user_id);
  }

  await post.save();

  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.downvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const user_id = req.user._id;
  if (!post.downvotes.includes(user_id)) {
    post.downvotes.push(user_id);
  }

  if (post.upvotes.includes(user_id)) {
    post.upvotes.pull(user_id);
  }

  await post.save();

  res.status(200).json({
    status: 'success',
    post,
  });
});
