const mongoose = require('mongoose');

const subredditSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A subreddit must have a name'],
      unique: true,
      maxlength: [
        20,
        'A subreddit name must have name less or equal character than 20',
      ],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'subreddit must belong to an user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
// subredditSchema.virtual('usersJoined', {
//   ref: 'User',
//   foreignField: 'post',
//   localField: '_id',
//   options: { sort: { commentedAt: -1 } },
// });

const Subreddit = mongoose.model('Subreddit', subredditSchema);

module.exports = Subreddit;
