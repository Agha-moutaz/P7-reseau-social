const express = require('express');
const post = require('../models/Post');
const fs = require('fs');
const Post = require('../models/Post');
const router = express.Router();

exports.createPost = (req, res, next) => {
    console.log(req.body)
    const postObject = req.body;
    //delete postObject._userId;
    const post = new Post({
        ...postObject,
        createdAt: new Date(),
        userId: req.auth.userId,
       // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json(post)) 
        .catch(error => {console.log(error); res.status(400).json({error})});
};
exports.getOnePost = (req, res, next) => {
    Post.findOne({
            _id: req.params.id
        })
        .then(Post => res.status(201).json(Post))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((Posts) => {
            res.status(201).json(Posts)
            console.log(Posts)
        }
        )
        
        .catch(error =>{
            console.log(error);
            res.status(400).json({error});
        });  
};


exports.modifyPost = async(req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
        ...req.body
    };

    delete postObject._userId;

    try {
        const post = await Post.findOne({
            _id: req.params.id
        })

        if (!post) {
            return res.status(404).json ({message: 'not found'})
        }

        if (post.userId != req.auth.userId) {
            res.status(403).json({
                message: 'Non-autorisé'
            });
        } else {
            await Post.updateOne({
                _id: req.params.id
            }, postObject)

            res.status(200).json({message: 'post modifiée!'})
        }
    }
    catch(error) {
        console.log (error)
        res.status(400).json({error})
    }
};

exports.deletePost = (req, res, next) => {
    const post = new Post()
    Post.findOne({ _id: req.params.id})
        .then((post) => {
            if (post.userId != req.auth.userId){
                res.status(403).json({ message: 'Non autorisé'});
            }else{
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`,()=> {
                    post.deleteOne({_id: req.params.id})
                        .then(() => {res.status(200).json({message:'post suprimée !'})})
                        .catch(error => res.status(401).json({ error}));
                });
            }
        })
        .catch(error => {res.status(500).json({ error})});
};

            

exports.likePost = async (req, res, next) => {
    try{
       
        const onePost = await Post.findOne({ _id: req.params.id})
        
        if (!onePost.usersLiked.includes(req.body.userId) && req.body.like === 1){
            await Post.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {likes: 1},
                    $push: {usersLiked: req.body.userId}
                }
            )
        
            return res.status(201).json({message: 'post liked +1'})
            
        }
        if(onePost.usersLiked.includes(req.body.userId) && req.body.like === 0){
            await Post.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {likes: -1},
                    $pull: {usersLiked: req.body.userId},
                }
            )
            return res.status(201).json({message: 'post liked 0'})
            
        }
                
        if (!onePost.usersDisliked.includes(req.body.userId) && req.body.like === -1){
            await Post.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {dislikes: 1},
                    $push: {usersDisliked: req.body.userId},
                }
            )
            return res.status(201).json({message: 'post disliked +1'})
            
        }
        if(onePost.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
            await Post.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {dislikes: -1},
                    $pull: {usersDisliked: req.body.userId}
                }
            )
            return res.status(201).json({message: 'post disliked 0'})
            
        }
        throw "unknown action"
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({ error})
    }
};