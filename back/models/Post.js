
const mongoose = require ('mongoose');
const Comment = require('./Comment');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true},
    text:{ type: String, required: true},
    imageUrl: { type: String, required: false},
    likes:{ type: Number, default:0},
    dislikes:{ type: Number, default:0},
    usersLiked:{ type: [String]},
    usersDisliked:{ type: [String]},
    createdAt: {type: Number}
   // comments: { type: [Comment]},
},{timestamps: true});

module.exports = mongoose.model('post', postSchema);