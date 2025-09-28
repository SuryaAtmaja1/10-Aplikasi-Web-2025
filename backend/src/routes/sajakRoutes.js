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
const upload = require("../middlewares/upload")

// comment routes
const commentRoutes = require("./commentRoutes");

// POST /sajak 
router.post("/", verifyUser, upload.single("image"), createSajak);

// GET /sajak/trending
router.get("/trending", getTrending); //done

// GET /sajak/recent
router.get("/recent", getRecentSajak); //done

// nest comments under sajak
router.use("/:id/comments", commentRoutes);

// GET /sajak/tag/:tag
router.get("/tag/:tag", getSajakByTag); //done

// GET /sajak/trending/tag/:tag
router.get("/trending/tag/:tag", getTrendingByTag); //done

// GET /sajak/:id
router.get("/:id", getSajakById); //done

// DELETE /sajak/:id
router.delete("/:id", verifyUser, deleteSajak);


module.exports = router;
