const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();

// REQUIRED for Render to handle session cookies properly
app.set("trust proxy", 1);

app
  .use(bodyParser.json())
  .use(
    session({
      // Use an environment variable for the secret!
      secret: process.env.SESSION_SECRET || "temporary_local_secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        // secure: true is required for HTTPS on Render, but set to false for local testing
        secure: process.env.NODE_ENV === "production",
      },
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(
    cors({
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      origin: "*",
    }),
  )
  // Unified header middleware
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    next();
  });

// Wakes up passport configuration
require("./config/passport");

// --- Auth Routes ---
app.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true, // MUST be true to persist the login
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  },
);

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// --- Main Routes ---
app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});