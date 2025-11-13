const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/userModel.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const username = profile.displayName;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
          // Create new user automatically
          user = new User({
            username,
            email,
            googleId: profile.id,
            // password: "", // optional, blank for Google accounts
            // refreshTokens: [],
          });
          await user.save();
        } else if (!user.googleId) {
          // link existing user to Google ID only if not already linked
          user.googleId = profile.id;
          await user.save();
        }

        done(null, user); // pass user to callback route
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;

