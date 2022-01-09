const router = require('express').Router();
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

//apis
router.get('/', postController.getAllPost);
router.post('/', authController.protect, postController.createPost);
router.patch('/:id', authController.protect, postController.updatePost);

//views
router.get(
  '/create',
  authController.isLoggedIn,
  authController.protect,
  viewController.createPost
);

module.exports = router;
