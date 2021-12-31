const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

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
