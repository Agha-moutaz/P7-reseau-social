const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sharp = require('sharp')

// Création d'un nouvel utilisateur

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        
       const user = new User({
        email: req.body.email,
        password:hash,
        name:req.body.name,
       }); 
       user.save()
       .then(() =>res.status(201).json({message:' utilisateur créé !'}))
       .catch(error => {console.log(error); res.status(400).json({error})});
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
User.findOne({email: req.body.email})
.then(user => {
    if (!user ||  Object.keys(user).length === 0) {
        res.status(401).json({message: ' paire identifiant/mot de passe incorrecte'});
    } else {
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                res.status(401).json( {message: 'paire identifiant/mot de passe incorrect'});
            } else {
                res.status(200).json({
                    ...user.toJSON(),
                    token: jwt.sign(
                        {userId: user._id},
                        `${process.env.TOKEN_SECRET}`,
                        {expiresIn: '24h'}
                    )
                });
            }    
        })
        .catch(error => {
            console.log(error)
            res.status(500).json( {error});
        });
    }
})
.catch(error => {
    console.log(error)

    res.status(500).json({error})
})
};


// Récupération d'un utilisateur

exports.getUserByToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
        const userId = decodedToken.userId;
        if (userId) {
            User.findOne({_id: userId})
            .then((result) => {console.log(result); res.status(200).json(result)}) 
            .catch(error => {console.log(error); res.status(400).json({error})});
        } 
    } catch(error) {
        res.status(401).json({ error });
    }
};


exports.getAllUsers = (req, res, next) => {
    User.find()
        .then((User) => {
            res.status(200).json(User)
        })
        .catch(error =>{
            res.status(400).json({error});
        });  
};


// Modification d'un utilisateur

exports.updateUser = async(req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    const userId = decodedToken.userId;

    try {
        const user = await User.findOne({
            _id: userId
        })

        const hash = req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password
        const userObject = {
            ...req.body,
            password: hash,
            avatar: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : user.avatar
        };

        if(req.file && req.file.filename) {
            sharp(`${__dirname}/../images/${req.file.filename}`)
            .resize(50, 50, {
                kernel: sharp.kernel.nearest,
                withoutEnlargement: true,
                withoutReduction: true,
                fit: 'contain',
            })
            .toFile(`${__dirname}/../images/avatar-${req.file.filename}`)
            .then(() => {
                console.log("RESIZED....")
            });
        }

        if (!user) {
            return res.status(404).json ({message: 'not found'})
        }

        await User.updateOne({
            _id: userId
        }, userObject)

        const newUser = await User.findOne({
            _id: userId
        })

        res.status(200).json({message: 'user mis à jour!', user: newUser.toJSON()})
        
    }
    catch(error) {
        console.log (error)
        res.status(400).json({error})
    }
};

    // Suppression d'un utilisateur

    exports.deleteUser = (req, res, next) => {
        console.log('delete')
        
        User.remove()
        User.findOne({ _id: req.params.id}).remove()
            .then((user) => {
                if (user._id != req.auth.userId){

                    res.status(403).json({ message: 'Non autorisé'});
                }else{
                    const filename = user.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`,()=> {
                        user.deleteOne({_id: req.params.id})
                            .then(() => {res.status(200).json({message:'user suprimée !'})})
                            .catch(error => res.status(401).json({ error}));
                    });
                }
            })
            .catch(error => {res.status(500).json({ error})});
    };


