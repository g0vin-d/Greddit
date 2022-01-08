const router = require('express').Router();
const subredditController = require('../controller/subreddit');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

router.post(
  '/create',
  authController.protect,
  subredditController.createSubreddit
);

router.get('/allSubs', viewController.allSubs);

module.exports = router;
