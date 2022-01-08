const router = require('express').Router();
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

router.get('/login', viewController.login);
router.get('/', authController.isLoggedIn, viewController.overview);

module.exports = router;
