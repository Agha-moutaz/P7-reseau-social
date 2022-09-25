const express = require('express');
const router = express.Router();
const auth= require('../middleware/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getUserByToken', userCtrl.getUserByToken);
router.get('/', auth, userCtrl.getAllUsers);
router.post('/updateUser', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;