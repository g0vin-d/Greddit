const Post = require("../models/postModel");

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);

        res.status(200).json({
            status: "success",
            post,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            error: err.message,
            message: "Invalid data sent!!!!",
        });
    }
};
