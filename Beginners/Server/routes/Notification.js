const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { validateToken } = require("../middleware/AuthMiddleware");
const { Notification, Employee, Job } = require("../models");

router.route("/").get(validateToken, async(req, res) => {
    const id = req.user.id;
    const EmployeeObject = await Employee.findOne({ where: { UserId: id } });
    const EmployeeId = EmployeeObject.id;
    const showNotification = await Notification.findAll({
        where: { EmployeeId: EmployeeId },
    });
    res.json(showNotification);
});

router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const message = req.body.message;
    const jobId = req.body.JobId;
    const jobObject = Job.findOne({ where: { id: jobId } });
    const title = jobObject.title;
    const noti = Notification.create({
        message: message + ` by ${jobObject.title}`,
        EmployeeId: req.body.EmployeeId,
    });
    res.json(noti);
});

module.exports = router;

// const express = require("express");
// const { sequelize } = require("../models");
// const router = express.Router();

// const { validateToken } = require("../middleware/AuthMiddleware");
// const { Notification, Employee, Job, User } = require("../models");

// router.route("/").get(validateToken, async(req, res) => {
//     console.log(`LOGGEDF IN USER ID: ${req.user.id}`)


//     const id = req.user.id;
//     const EmployeeObject = await Employee.findOne({ where: { UserId: id } });
//     // const EmployeeId = EmployeeObject.id;
//     const showNotification = await Notification.findAll({
//         where: { UserId: id },
//     });
//     // const UserObject = await User.findOne({ where: { id: id } });
//     // const UserId = UserObject.id;
//     // const showNotification = await Notification.findAll({
//     //     where: { UserId: UserId },
//     // });
//     res.json(showNotification);
// });

// router.route("/").post((req, res) => {
//     // using sequelize to post data
//     // accessing data
//     // body has data in json
//     const message = req.body.message;
//     const jobId = req.body.JobId;
//     // const jobObject = Job.findOne({ where: { id: jobId } });
//     // const title = jobObject.title;
//     const noti = Notification.create({
//         message: message,
//         EmployeeId: req.body.EmployeeId,
//     });
//     res.json(noti);
// });

// module.exports = router;