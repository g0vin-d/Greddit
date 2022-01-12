const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();
  res.status(200).json({
    status: 'success',
    data: {
      result: comments.length,
      comments,
    },
  });
});

exports.getOneComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const { comment, post } = req.body;
  const commenter = req.user._id;

  const newCom = await Comment.create({
    comment,
    commenter,
    post,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newCom,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
