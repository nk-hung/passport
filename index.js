require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const PORT = process.env.PORT || 3001;

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

const store = session.MemoryStore();
app.use(
  session({
    saveUninitialized: false,
    secret: process.env.KEY_SESSION,
    cookie: {
      maxAge: 1000 * 10,
    },
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/status", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "ok",
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      res.json({ body: req.body });
    } catch (error) {
      res.json({
        error: error.status,
      });
    }
  }
);

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      status: "success",
      data: {
        user: "khuz7",
      },
    });
  }
  res.status(404).json({
    status: "false",
    message: "Missing",
  });
});
const user = {
  username: "123",
  password: 123,
};

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("username::: ", username);
    if (username === user.username && password === user.password) {
      return done(null, {
        username,
        password,
        active: true,
      });
    }
    done(null, false);
  })
);

passport.serializeUser((user, done) => done(null, user.username));

passport.deserializeUser((username, done) => {
  // check username
  if (username === user.username) {
    return done(null, {
      username,
      active: true,
    });
  }
  done(null, false);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:::`, PORT);
});
