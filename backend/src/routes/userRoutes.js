const express = require("express");
const router = express.Router();

const { 
    getUserById,
    getUserData,
    updateUserData,
    deleteUserData,
} = require("../controllers/userController");
const { verifyUser } = require("../middlewares/auth");

// Get user data by ID
// GET /user/:id
router.get("/:id", getUserById);

// router.use(requireSignin);
router.use(verifyUser);

// GET User Data (account owner)
// GET /user 
router.get("/", getUserData);

// Update User Data
// PATCH /user
router.patch("/", updateUserData);

// DELETE User Data
// DELETE /user
router.delete("/", deleteUserData);

module.exports = router;