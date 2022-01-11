const router = require('express').Router();
const subredditController = require('../controller/subreddit');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

router.post(
  '/create',
  authController.protect,
  subredditController.createSubreddit
);

//views

module.exports = router;
