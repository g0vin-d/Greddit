const router = require('express').Router();
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

// auth views
router.get('/login', viewController.login);

// overview
router.get('/', authController.isLoggedIn, viewController.overview);
router.get(
  '/profile',
  authController.isLoggedIn,
  authController.protect,
  viewController.profile
);

// subs
router.get('/r/allSubs', authController.isLoggedIn, viewController.allSubs);
router.get('/r/:name', authController.isLoggedIn, viewController.getSubreddit);

// posts
router.get(
  '/post/create',
  authController.isLoggedIn,
  authController.protect,
  viewController.createPost
);
router.get('/post/:id', authController.isLoggedIn, viewController.postDetail);

module.exports = router;
