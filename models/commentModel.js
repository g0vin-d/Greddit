const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'there should be comment'],
      maxlength: [500, 'comment shouldnt be greter than 500 letters'],
      trim: true,
    },
    commenter: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'commnet must belong to an user.'],
    },
    commentedAt: {
      type: Date,
      default: Date.now,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'comment must belong to a post'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'commenter',
    select: 'username',
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
