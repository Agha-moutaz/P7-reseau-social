const express = require('express');
const fs = require('fs');
const Post = require('../models/Post');
const Comment = require('../models/Comment');


//creation un commentaire

exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    //delete commentObject._userId;
    const comment = new Comment({
        ...commentObject,
        createdAt: new Date().getTime(),
        user: req.auth.userId,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    });
    comment.save()
        .then(() => res.status(201).json(comment)) 
        .catch(error => {console.log(error); res.status(400).json({error})});
};

// Récupérer un Comment

exports.getOneComment = (req, res, next) => {
    Comment.findOne({
            _id: req.params.id
        })
        .then(Comment => res.status(201).json(Comment))
        .catch(error => res.status(400).json({
            error
        }));
};

// Récupérer tous les commentaires d'un post

exports.getAllComments = (req, res, next) => {
   Comment.find().populate('user').sort({createdAt: -1}).exec()
        .then((Comments) => {
            res.status(200).json(Comments)
        })
        .catch(error =>{
            res.status(400).json({error});
        });  
};

// Modification un commentaire

exports.modifyComment = async(req, res, next) => {
    const commentObject = req.file ? {
        ...JSON.parse(req.body.comment),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
        ...req.body
    };

    delete commentObject._userId;

    try {
        const comment = await Comment.findOne({
            _id: req.params.id
        })

        if (!comment) {
            return res.status(404).json ({message: 'not found'})
        }

        if (comment.userId != req.auth.userId) {
            res.status(403).json({
                message: 'Non-autorisé'
            });
        } else {
            await Comment.updateOne({
                _id: req.params.id
            }, commentObject)

            res.status(200).json({message: 'comment modifiée!'})
        }
    }
    catch(error) {
        console.log (error)
        res.status(400).json({error})
    }
};

// Supprission un commentaire

exports.deleteComment = (req, res, next) => {
    const Comment = new Comment()
    Comment.findOne({ _id: req.params.id})
        .then((comment) => {
            if (comment.userId != req.auth.userId){
                res.status(403).json({ message: 'Non autorisé'});
            }else{
                const filename = comment.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`,()=> {
                    comment.deleteOne({_id: req.params.id})
                        .then(() => {res.status(200).json({message:'comment suprimée !'})})
                        .catch(error => res.status(401).json({ error}));
                });
            }
        })
        .catch(error => {res.status(500).json({ error})});
};

// like ou dislike un Commentaire
exports.likeComment = async (req, res, next) => {
    try{
       
        const oneComment = await Comment.findOne({ _id: req.params.id})
        
        if (!oneComment.usersLiked.includes(req.body.userId) && req.body.like === 1){
            await Comment.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {likes: 1},
                    $push: {usersLiked: req.body.userId}
                }
            )
        
            return res.status(201).json({message: 'comment liked +1'})
            
        }
        if(oneComment.usersLiked.includes(req.body.userId) && req.body.like === 0){
            await Comment.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {likes: -1},
                    $pull: {usersLiked: req.body.userId},
                }
            )
            return res.status(201).json({message: 'comment liked 0'})
            
        }
                
        if (!oneComment.usersDisliked.includes(req.body.userId) && req.body.like === -1){
            await Comment.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {dislikes: 1},
                    $push: {usersDisliked: req.body.userId},
                }
            )
            return res.status(201).json({message: 'comment disliked +1'})
            
        }
        if(oneComment.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
            await Comment.updateOne(
                {_id :req.params.id}, 
                {
                    $inc: {dislikes: -1},
                    $pull: {usersDisliked: req.body.userId}
                }
            )
            return res.status(201).json({message: 'comment disliked 0'})
            
        }
        throw "unknown action"
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({ error})
    }
};