const express = require("express");
const router = express.Router();

const { 
    createSajak,
    getSajakById,
    getTrending,
    getTrendingByTag,
    getSajakByTag,
    getRecentSajak,
    deleteSajak,
} = require("../controllers/sajakController");
const { verifyUser } = require("../middlewares/auth");

// comment routes
const commentRoutes = require("./commentRoutes");

// POST /sajak (kurang file)
router.post("/", verifyUser, createSajak);

// GET /sajak/:id
router.get("/:id", getSajakById);

// GET /sajak/trending
router.get("/trending", getTrending);

// GET /sajak/trending/tag/:tag
router.get("/trending/tag/:tag", getTrendingByTag);

// GET /sajak/tag/:tag
router.get("/tag/:tag", getSajakByTag);

// GET /sajak/recent
router.get("/recent", getRecentSajak);

// DELETE /sajak/:id
router.delete("/:id", verifyUser, deleteSajak);


// nest comments under sajak
router.use("/:id/comments", commentRoutes);

module.exports = router;