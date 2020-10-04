const passport = require("passport");
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

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: "/auth/twitter/callback",
    },
    async (token, tokenSecret, profile, done) => {
      let user = await User.findOne({
        twitterId: profile.id,
      });
      if (user) {
        console.log("user is already registered: ", user);
      } else {
        user = await new User({
          twitterId: profile.id,
          displayName: profile.displayName,
        }).save();
      }
      done(null, user);
      console.log(profile.emails, token, tokenSecret);
    }
  )
);
