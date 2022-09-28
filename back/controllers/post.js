const express = require('express');
const fs = require('fs');
const Post = require('../models/Post');
const ObjectId = require('mongodb').ObjectId

exports.createPost = (req, res, next) => {
    const postObject = req.body;
    //delete postObject._userId;
    const post = new Post({
        ...postObject,
        createdAt: new Date().getTime(),
        user: req.auth.userId,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
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
    Post.find().populate('user').sort({createdAt: -1}).exec()
        .then((Posts) => {
            res.status(200).json(Posts)
        })
        .catch(error =>{
            res.status(400).json({error});
        });  
};

exports.modifyPost = async(req, res, next) => {
    var postObject = req.file ? {
        ...JSON.parse(req.body.post),
        } : {
        ...req.body
    };
    if (req.file) {
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    delete postObject._userId;

    try {
        const post = await Post.findOne({
            _id: req.params.id
        })

        if (!post) {
            return res.status(404).json ({message: 'not found'})
        }

        if (post.user != req.auth.userId || !req.auth.isAdmin) {
            res.status(403).json({
                message: 'Non autorisé'
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
    console.log(req.params)
    Post.findOne({ _id: new ObjectId(req.params.id)})
        .then((post) => {
            if(!post){
                return res.status(404).json({ message: 'post non trouvé'})
            }
            if (post.user != req.auth.userId && !req.auth.isAdmin){
                res.status(403).json({ message: 'Non autorisé'});
            }else{
                if(post.imageUrl){
                    const filename = post.imageUrl.split('/images/')[1];
                
                    fs.unlink(`images/${filename}`,()=> {
                        
                    });
                }
                post.deleteOne({_id: req.params.id})
                    .then(() => {res.status(200).json({message:'post suprimée !'})})
                    .catch(error => {
                        console.log(error)
                        res.status(401).json({ error})
                });
            }
        })
        .catch(error => 
            {
                console.log(error)
                res.status(500).json({ error})
    });
};



exports.likePost = async (req, res, next) => {
    try{
       
        const onePost = await Post.findOne({ _id: req.params.id})
        
        if(req.body.like != 1 && req.body.like != -1) {
            return res.status(401).json({message: 'unauthorized'})
        }

        if (!onePost.usersLiked.includes(req.auth.userId) && req.body.like === 1){
            await likePost();
            if(onePost.usersDisliked.includes(req.auth.userId)) {
                await removeDislikePost()           
            }            
        }
        if(onePost.usersLiked.includes(req.auth.userId) && req.body.like === 1){
            await removeLikePost()          
        }
                
        if (!onePost.usersDisliked.includes(req.auth.userId) && req.body.like === -1){
            await dislikePost()
            if (onePost.usersLiked.includes(req.auth.userId)){
                await removeLikePost() 
            }     
        }
        if(onePost.usersDisliked.includes(req.auth.userId) && req.body.like === -1) {
            await removeDislikePost()           
        }

        const postUpdated = await Post.findOne({ _id: req.params.id})
        return res.status(201).json({message: 'post liked +1', dislikes: postUpdated.dislikes, likes: postUpdated.likes})

        
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({ error})
    }

    async function likePost(){
        await Post.updateOne(
            {_id :req.params.id}, 
            {
                $inc: {likes: 1},
                $push: {usersLiked: req.auth.userId}
            }
        )
    }
    async function removeLikePost(){
        await Post.updateOne(
            {_id :req.params.id}, 
            {
                $inc: {likes: -1},
                $pull: {usersLiked: req.auth.userId},
            }
        )       
    }
    async function dislikePost(){
        await Post.updateOne(
            {_id :req.params.id}, 
            {
                $inc: {dislikes: 1},
                $push: {usersDisliked: req.auth.userId},
            }
        )  
    }
    async function removeDislikePost(){
        await Post.updateOne(
            {_id :req.params.id}, 
            {
                $inc: {dislikes: -1},
                $pull: {usersDisliked: req.auth.userId}
            }
        ) 
    }
};