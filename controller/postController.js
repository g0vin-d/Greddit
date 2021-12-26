const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");

exports.createPost = catchAsync(async (req, res, next) => {
    const post = await Post.create(req.body);

    res.status(200).json({
        status: "success",
        post,
    });
});
