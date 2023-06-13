const express = require("express");
const { sequelize } = require("../models");

const router = express.Router();
const { Job } = require("../models");
const Sequelize = require("sequelize");
const { readSync } = require("fs");
const Op = Sequelize.Op;

//show  2 lastet job in home page
router.get("/", async (req, res) => {

  showJob = await Job.findAll({
    limit: 2,
    order: [["id", "DESC"]],
  });

 res.json(showJob);

});

//show all jobs through browse buttons
router.get("/browsealljob", async (req, res)=> {
    showJob = await Job.findAll();
    res.json(showJob);
})

// router.route("/").post((req, res) =>{
//     console.log("Hello")
// })
// async and await waiting for the data to be inserting and doing other things

router.route("/").post((req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const experience = req.body.experience;
  const responsibility = req.body.responsibility;
  const benefits = req.body.benefits;
  const vacancy = req.body.vacancy;
  const salary = req.body.salary;
  const gender = req.body.gender;
  const category = req.body.category;
  const type = req.body.type;
  const image = req.body.image;

//empty fields validation for post a job

  if (
    title == "" ||
    description == "" ||
    location == "" ||
    experience == "" ||
    responsibility == "" ||
    benefits == "" ||
    vacancy == "" ||
    salary == "" ||
    gender == "" ||
    category == "" ||
    type == "" ||
    image == ""

  ) {
    res.json({ error: "Empty Fields" });
    return;
  } else {
    const job = req.body;
    Job.create(job);
    res.json(job);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  getRelatedJob = await Job.findByPk(id);
  res.json(getRelatedJob);
});

router.get("/companyJob/:id", async (req, res) => {
  const id = req.params.id;
  getRelatedJob = await Job.findAll({ where: { UserId: id } });
  res.json(getRelatedJob);
});

router.get("/jobs", async (req, res) => {
  getLatestJob = await Job.findAll({
    limit: 2,
    order: [["id", "DESC"]],
  });
  res.json(getLatestJob);
});

router.post("/search", async (req, res) => {
  const job = req.body;
  showJob = await Job.findAll({
    where: {
      title: {
        [Op.like]: `%${job.keyword}%`,
      },
      location: {
        [Op.like]: `%${job.location}%`,
      },
      type: {
        [Op.like]: `%${job.type}%`,
      },
    },
  });
  res.json(showJob);
});

module.exports = router;
