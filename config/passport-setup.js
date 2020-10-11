const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        "google.id": profile.id,
      });
      if (user) {
        console.log("user is already registered: ", user);
      } else {
        user = await new User({
          google: {
            id: profile.id,
            token: accessToken,
            email: profile.emails[0].value || undefined,
          },
          displayName: profile.displayName,
        }).save();
      }
      done(null, user);
    }
  )
);

// Twitter strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      let user = await User.findOne({
        "twitter.id": profile.id,
      });
      if (user) {
        console.log("user is already registered: ", user);
      } else {
        user = await new User({
          twitter: {
            id: profile.id,
            token,
            tokenSecret,
            email: profile.emails[0].value || "undefined",
          },
          displayName: profile.displayName,
        }).save();
      }
      done(null, user);
    }
  )
);
