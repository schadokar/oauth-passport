const router = require("express").Router();
const passport = require("passport");

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//   /auth/google/callback
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["profile"],
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect(`/profile?name=${req.user.displayName}`);
  }
);

module.exports = router;
