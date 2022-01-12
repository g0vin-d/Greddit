const router = require('express').Router();
const commentController = require('../controller/commentController');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

router.get('/', authController.protect, commentController.getAllComments);
router.get('/:id', authController.protect, commentController.getOneComment);
router.post('/', authController.protect, commentController.createComment);
router.delete('/:id', authController.protect, commentController.deleteComment);

module.exports = router;
