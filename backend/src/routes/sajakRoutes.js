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
router.post("/", verifyUser, createSajak); //done

// GET /sajak/trending
router.get("/trending", getTrending); //done

// GET /sajak/recent
router.get("/recent", getRecentSajak); //done

// GET /sajak/:id
router.get("/:id", getSajakById); //done

// DELETE /sajak/:id
router.delete("/:id", verifyUser, deleteSajak);

// nest comments under sajak
router.use("/:id/comments", commentRoutes);

// GET /sajak/tag/:tag
router.get("/tag/:tag", getSajakByTag); //done

// GET /sajak/trending/tag/:tag
router.get("/trending/tag/:tag", getTrendingByTag); //done

module.exports = router;
