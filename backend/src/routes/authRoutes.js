const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {verifyUser} = require("../middlewares/auth");
const passport = require("../config/passport");

// public
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

// Google Auth
// Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback
);

// protected
router.use(verifyUser);
router.post('/logout', authController.logout);

module.exports = router;
