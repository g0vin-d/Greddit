const router = require('express').Router();
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

//apis
router.get('/', postController.getAllPost);
router.post('/', authController.protect, postController.createPost);
router.patch('/upvote/:id', authController.protect, postController.upvotePost);
router.patch(
  '/downvote/:id',
  authController.protect,
  postController.downvotePost
);

router.patch('/:id', authController.protect, postController.updatePost);

//views

module.exports = router;
