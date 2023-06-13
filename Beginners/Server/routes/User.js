const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { User, Company } = require("../models");
const bcrypt = require("bcrypt");
// generate token using sign
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  showUser = await User.findAll();
  res.json(showUser);
});

router.route("/login_user").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User not found" });
    return;
  }

  if (password != user.password) {
    res.json({ error: "No correct password" });
    return;
  }

  // json web token is going to hash the username and id
  // third parameter is secret word to protect token
  const accessToken = sign(
    {
      username: user.username,
      id: user.id,
      isCompany: user.isCompany,
      email: user.email,
      password: user.password,
    },
    "important"
  );

  // after getting this accessToken it is stored in sessionStorage and use as part of header when request is made
  res.json(accessToken);
});

// Register page routes
router.route("/").post(async (req, res) => {
  const user = req.body;
  // regax
  const eemaill = /^[^\s@]+@[^\s@]+\.[^\s]{2,8}$/i;
  const checkUser = await User.findOne({ where: { username: user.username } });

  if (user.email !== "" && user.password !== "" && user.username !== "") {
    if (!eemaill.test(user.email)) {
      return res.json({
        error: "Provide valid email",
      });
    } else {
      if (!checkUser) {
        // user got registered
        const userObject = User.create(user);
        res.json({
          success: "User created successfully",
        });
      } else {
        res.json({ error: "User already found" });
      }
    }
  } else if (user.email == "" || user.password == "" || user.username == "") {
    res.json({ error: "Empty Fields" });
  } else {
    res.json({ error: "Please provide valid details" });
  }
});

// async and await waiting for the data to be inserting and doing other things
router.route("/update").post(validateToken, async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const { username, password } = req.body;
  const updateUser = req.body;

  const userId = req.user.id;
  const updated = User.update(updateUser, { where: { id: userId } });
  res.json(userId);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/reset").post(async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const { username, password, email } = req.body;
  const updateUser = req.body;
  const checkUser = await User.findOne({
    where: { username: username, email: email },
  });

  if (!checkUser) {
    res.json({ error: "User and Email not found!" });
  } else {
    const userId = checkUser.id;
    const updated = User.update(
      { password: password },
      { where: { id: userId } }
    );
    res.json({ success: "Password reset successfully!" });
  }
});

router.route("/auth").get(validateToken, (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const userId = req.user;
  console.log(userId);
  res.json(userId);
});

// router.get("/profile", (req, res)=> {
//   console.log("HELLO")
//   const userId = req.user;
// //   // let profile;
//    const id = userId.id;
//    const profile = Company.findOne({ where: { UserId: id } });
//   res.json(profile);
// })

router.route("/profile").get(validateToken, (req, res) => {
  // using sequelize to post data
  console.log("hello")
  // accessing data
  // body has data in json
  // const user = User.findOne({ where: { username: req.user.username } });
  const userId = req.user;
  // let profile;
  const id = userId.id;
  const profile = Company.findOne({ where: { UserId: id } });
  res.json(profile);
});

module.exports = router;
