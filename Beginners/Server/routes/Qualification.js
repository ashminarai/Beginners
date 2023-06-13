const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Qualification } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async(req, res) => {
    showQualification = await Qualification.findAll();
    res.json(showQualification);
});

router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const qualification = req.body;
    Qualification.create(qualification);
    res.json(qualification);
});

module.exports = router;