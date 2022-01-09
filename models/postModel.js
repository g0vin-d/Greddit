const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have title'],
    trim: true,
    minlength: [10, 'A title must have characters more or equal than 10'],
  },
  message: {
    type: String,
    trim: true,
    required: true,
    maxlength: [100, 'A message must have characters less or equal than 100'],
  },
  image: String,
  postedAt: {
    type: Date,
    default: Date.now,
  },
  subreddit: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subreddit',
    required: [true, 'post must belong to subreddit'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'post must belong to an user'],
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
