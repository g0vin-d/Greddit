const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createComment = catchAsync(async (req, res, next) => {
  const { comment, post } = req.body;
  const commenter = req.user._id;

  const newCom = await Comment.create({
    comment,
    commenter,
    post,
  });

  res.status(200).json({
    status: 'success',
    data: {
      newCom,
    },
  });
});
