const router = require('express').Router();
const postController = require('../controller/postController');
const authController = require('../controller/authController');

router.get('/', postController.getAllPost);
router.post('/', authController.protect, postController.createPost);
router.patch('/:id', authController.protect, postController.updatePost);

module.exports = router;
