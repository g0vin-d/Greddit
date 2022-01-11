const router = require('express').Router();
const commentController = require('../controller/commentController');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

router.post('/', authController.protect, commentController.createComment);

module.exports = router;
