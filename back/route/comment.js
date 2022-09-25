const express = require ('express');
const router = express.Router();
const auth= require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.get('/', auth, commentCtrl.getAllComments);
router.post('/', auth, multer, commentCtrl.createComment);
router.post('/:id/like', auth, commentCtrl.likeComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.put('/:id', auth, multer, commentCtrl.modifyComment);
router.delete('/:id', auth, multer, commentCtrl.deleteComment);




module.exports = router;