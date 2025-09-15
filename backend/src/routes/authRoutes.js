const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {verifyUser} = require("../middlewares/auth");

// public
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

// protected
router.use(verifyUser);
router.post('/logout', authController.logout);

module.exports = router;
