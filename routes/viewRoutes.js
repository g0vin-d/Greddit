const router = require('express').Router();
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

// auth views
router.get('/login', viewController.login);

// overview
router.get('/', authController.isLoggedIn, viewController.overview);

// subs
router.get('/r/allSubs', authController.isLoggedIn, viewController.allSubs);

// posts
router.get(
  '/post/create',
  authController.isLoggedIn,
  authController.protect,
  viewController.createPost
);
router.get('/post/:id', authController.isLoggedIn, viewController.postDetail);

module.exports = router;
