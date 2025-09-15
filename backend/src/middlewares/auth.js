const jwt = require('jsonwebtoken');

// verifyUser middleware
exports.verifyUser = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.userId = payload.userId;
    next();
  });
};
