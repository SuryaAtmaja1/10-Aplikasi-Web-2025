const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokens");

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

const msPerDay = 24 * 60 * 60 * 1000;
const refreshTokenMaxAge =
  (process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7) * msPerDay;

exports.googleCallback = async (req, res) => {
  try {
    const user = req.user; // user from passport Google strategy

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token in DB
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: refreshTokenMaxAge, // e.g., 7 days
    });

    // SUCCESS redirect
    return res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:3000"}`
    );
  } catch (err) {
    console.error("Google Login Error:", err.message);

    // FAILED redirect
    return res.redirect(
      `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/auth/login/?googleLogin=failed`
    );
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username)
      return res
        .status(400)
        .json({ message: "Email, password, and username required" });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already registered" });

    const user = new User({ username, email, password });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // save refresh token server-side (optional, for invalidate/rotation)
    user.refreshTokens.push(refreshToken);
    await user.save();

    // set refresh token cookie
    res.cookie("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: refreshTokenMaxAge,
    });

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);

    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push(refreshToken);
    await user.save();

    res.cookie("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: refreshTokenMaxAge,
    });

    res.json({
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // verify token validity
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, payload) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const user = await User.findById(payload.userId);
      if (!user) return res.status(403).json({ message: "User not found" });

      // check token exists in user's stored refresh tokens (optional)
      if (!user.refreshTokens.includes(token)) {
        return res.status(403).json({ message: "Refresh token revoked" });
      }

      // create new access token (and optionally rotate refresh token)
      const accessToken = generateAccessToken(user._id);

      // OPTIONAL: rotate refresh token
      // const newRefreshToken = generateRefreshToken(user._id);
      // user.refreshTokens = user.refreshTokens.filter(t => t !== token);
      // user.refreshTokens.push(newRefreshToken);
      // await user.save();
      // res.cookie('refreshToken', newRefreshToken, { ...COOKIE_OPTIONS, maxAge: refreshTokenMaxAge });

      res.json({ accessToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // Remove token from DB if userId is known
      if (req.userId) {
        await User.findByIdAndUpdate(req.userId, {
          $pull: { refreshTokens: refreshToken },
        });
      }
    }

    // Clear cookies
    res.clearCookie("accessToken", COOKIE_OPTIONS);
    res.clearCookie("refreshToken", COOKIE_OPTIONS);

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
