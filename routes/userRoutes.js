const router = require('express').Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.patch(
  '/join/:subid',
  authController.protect,
  userController.joinSubreddit
);
router.patch(
  '/leave/:subid',
  authController.protect,
  userController.leaveSubreddit
);

module.exports = router;
