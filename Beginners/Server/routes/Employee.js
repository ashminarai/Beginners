const express = require("express");
const {
    sequelize
} = require("../models");
const router = express.Router();
const {
    Employee
} = require("../models");

router.get("/", async(req, res) => {
    showEmployee = await Employee.findAll();
    res.json(showEmployee);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const employee = req.body;
    const {
        fullName,
        description,
        address,
        qualification,
        mainSkill,
        secondarySkill,
        experience,
        interest
    } = req.body;
    if (fullName != "" &&
        description != "" && address != "" && qualification != "" && mainSkill != "" && secondarySkill != "" && experience != "" &&
        interest != "") {
        Employee.create(employee);
        res.json({
            success: "User updated successfully!"
        });

    } else {
        res.json({
            error: "Empty fields are not accepted"
        })
    }


});

module.exports = router;

// const express = require("express");
// const { sequelize } = require("../models");
// const router = express.Router();
// const { Employee } = require("../models");

// router.get("/", async (req, res) => {
//   showEmployee = await Employee.findAll();
//   res.json(showEmployee);
// });

// // async and await waiting for the data to be inserting and doing other things
// router.route("/").post((req, res) => {
//   // using sequelize to post data
//   // accessing data
//   // body has data in json
//   const employee = req.body;
//   const {
//     fullName,
//     description,
//     address,
//     qualification,
//     mainSkill,
//     secondarySkill,
//     experience,
//   } = req.body;
//   if (
//     fullName != "" &&
//     description != "" &&
//     address != "" &&
//     qualification != "" &&
//     mainSkill != "" &&
//     secondarySkill != "" &&
//     experience != "" 
//   ) {
//     Employee.create(employee);
//     res.json({
//       success: "User updated successfully!",
//     });
//   } else {
//     res.json({
//       error: "Empty fields are not accepted",
//     });
//   }
// });

// module.exports = router;
