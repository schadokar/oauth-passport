// load config
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const passportSetup = require("./config/passport-setup");
const passport = require("passport");
const session = require("express-session");

// application routes
const routes = require("./router");

// connect DB
connectDB();

// create an app instance
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// set ejs as view-engine
app.set("view engine", "ejs");

// setup public folder
app.use(express.static("./public"));

// enable session
app.use(
  session({ secret: "isitrequire", resave: false, saveUninitialized: false })
);

// Express body parser
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000,
  })
);

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// app routes
app.use("/", routes.appRoutes);
app.use("/auth", routes.googleAuthRoutes);
app.use("/auth", routes.twitterAuthRoutes);

app.listen(3000, () => {
  console.log("app is listening to port 3000");
});
