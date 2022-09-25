
const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    text:{ type: String, required: true},
    imageUrl: { type: String, required: false},
    likes:{ type: Number, default:0},
    dislikes:{ type: Number, default:0},
    usersLiked:{ type: [String]},
    usersDisliked:{ type: [String]},
    createdAt: {type: Number},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Post"
    // }],
},{timestamps: true});

module.exports = mongoose.model('Post', postSchema);