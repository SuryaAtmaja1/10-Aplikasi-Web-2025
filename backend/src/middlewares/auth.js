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
// exports.verifyUser = (req, res, next) => {
//   try {
//     // Try Authorization header first
//     let token = null;
//     const authHeader = req.headers['authorization'];
//     if (authHeader) {
//       token = authHeader.split(' ')[1];
//     }

//     // If not found, try cookies
//     if (!token && req.cookies && req.cookies.accessToken) {
//       token = req.cookies.accessToken;
//     }

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
//       if (err) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//       }
//       req.userId = payload.userId;
//       next();
//     });
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     res.status(500).json({ message: 'Server error in authentication' });
//   }
// };


// exports.verifyUser = (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
//       if (err) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//       }
//       req.userId = payload.userId;
//       next();
//     });
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     res.status(500).json({ message: 'Server error in authentication' });
//   }
// };

