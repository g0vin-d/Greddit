const router = require('express').Router();
const subredditController = require('../controller/subreddit');
const authController = require('../controller/authController');

router.post(
  '/sub',
  authController.protect,
  subredditController.createSubreddit
);

module.exports = router;
