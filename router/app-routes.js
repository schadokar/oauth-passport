const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/profile", (req, res) => {
  res.redirect(`/profile?name=${req.body.name}`);
});

router.get("/profile", (req, res) => {
  res.render("profile", { name: req.query.name });
});

router.get("/logout", (req, res) => {
  res.render("home");
});

module.exports = router;
