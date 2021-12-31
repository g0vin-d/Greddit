const router = require('express').Router();
const postController = require('../controller/postController');
const authController = require('../controller/authController');

router.get('/posts', postController.getAllPost);
router.post('/post', authController.protect, postController.createPost);
router.patch('/post/:id', authController.protect, postController.updatePost);

module.exports = router;
