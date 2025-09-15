//

// Create new sajak
exports.createSajak = (req, res) => {
  return res.status(201).json({ message: "createSajak" });
};

// Get sajak by ID
exports.getSajakById = (req, res) => {

};

// Get all trending sajak
exports.getTrending = (req, res) => {
  return res.status(200).json({ message: "getTrending" });
};

// Get trending sajak by tag
exports.getTrendingByTag = (req, res) => {

};

// Get sajak by tag
exports.getSajakByTag = (req, res) => {

};

// Get recent sajak
exports.getRecentSajak = (req, res) => {
  return res.status(200).json({ message: "getRecentSajaks" });
};

// Delete sajak
exports.deleteSajak = (req, res) => {

};
