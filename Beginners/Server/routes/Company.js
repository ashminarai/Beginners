const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Company } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async (req, res) => {
  showCompany = await Company.findAll();
  res.json(showCompany);
});

router.route("/").post((req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const company = req.body;

  const { name, description, address, phone, email, founderName, vision } =
    req.body;
  if (
    name != "" &&
    description != "" &&
    phone != "" &&
    email != "" &&
    founderName != "" &&
    vision != "" &&
    address != ""
  ) {
    Company.create(company);
    res.json({
      success: "User updated successfully!",
    });
  } else {
    res.json({
      error: "Empty fields are not accepted",
    });
  }

  res.json(company);
});

module.exports = router;
