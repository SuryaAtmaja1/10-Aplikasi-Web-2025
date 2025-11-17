const express = require("express");
const router = express.Router();

const {
  createSajak,
  editSajak,
  getSajakById,
  getTrending,
  getTrendingByTag,
  getSajakByTag,
  getRecentSajak,
  deleteSajak,
  searchSajak,
  getSajakByUser
} = require("../controllers/sajakController");
const { verifyUser } = require("../middlewares/auth");
const upload = require("../middlewares/upload")

// comment routes
const commentRoutes = require("./commentRoutes");

// POST /sajak 
router.post("/", verifyUser, upload.single("image"), createSajak);

// GET /sajak/search
router.get("/search", searchSajak);

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

// GET /sajak/user/:userid
router.get("/user/:userId", getSajakByUser); //done

// DELETE /sajak/:id
router.delete("/:id", verifyUser, deleteSajak);

// PATCH /sajak 
router.patch("/:id", verifyUser, upload.single("image"), editSajak);



module.exports = router;
