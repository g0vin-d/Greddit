const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A post must have title"],
        trim: true,
        maxlength: [40, "A title must have characters less or equal than 40"],
        minlength: [10, "A title must have characters more or equal than 10"],
    },
    message: {
        type: String,
        trim: true,
        maxlength: [40, "A title must have characters less or equal than 40"],
        required: true,
    },
    image: String,
    postedAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
