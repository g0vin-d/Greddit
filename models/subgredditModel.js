const mongoose = require("mongoose");

const subredditSchema = new moongoose.Schema({
    name: {
        type: String,
        required: [true, "A subreddit must have a name"],
        unique: true,
        maxlength: [
            20,
            "A subreddit name must have name less or equal character than 20",
        ],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
});

const Subreddit = mongoose.model("Subreddit", subredditSchema);

module.exports = Subreddit;
