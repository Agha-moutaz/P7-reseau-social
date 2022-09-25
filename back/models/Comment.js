
const mongoose = require ('mongoose');

const commentSchema = mongoose.Schema({
    userId: { type: String, required: true},
    likes:{ type: Number, default:0},
    dislikes:{ type: Number, default:0},
    usersLiked:{ type: [String]},
    usersDisliked:{ type: [String]},
    createdAt: {type: Date, default: new Date()},

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
});

module.exports = mongoose.model('comment', commentSchema);