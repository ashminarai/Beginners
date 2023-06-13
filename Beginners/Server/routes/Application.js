const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { validateToken } = require("../middleware/AuthMiddleware");
const { Application, Employee, Job } = require("../models");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: "1000000000",
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const minType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (minType && extname) {
      return cb(null, true);
    }
    cb("Give proper format for image");
  },
}).single("cv");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  getRelatedApplicant = await Application.findAll({
    where: {
      UserId: id,
    },
  });
  res.json(getRelatedApplicant);
});

router.get("/show/:id", async (req, res) => {
  const id = req.params.id;
  getRelatedApplicant = await Application.findOne({
    where: {
      id: id,
    },
  });
  res.json(getRelatedApplicant);
});

router.post("/select/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Error");
  updateEmployee = await Application.update(
    {
      isAccepted: true,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.json(updateEmployee);
});

router.route("/").post(upload, async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const application = req.body;
  const { cv } = req.file.path;
  console.log(application.userId);

  const employeeId = await Employee.findOne({
    where: {
      UserId: application.userId,
    },
  });

  const userTest = await Job.findOne({
    where: {
      id: application.JobId,
    },
  });

  const checkApplicant = await Application.findOne({
    where: {
      UserId: application.userId,
    },
  });
  if (!employeeId) {
    res.json({
      error: "You have to update information before submitting application.",
    });
  } else if (employeeId) {
    if (!checkApplicant) {
      const applicationToAdd = Application.create({
        cv: req.file.path,
        coverLetter: application.coverLetter,
        JobId: application.JobId,
        EmployeeId: employeeId.id,
        UserId: userTest.UserId,
      });
      res.json({
        success: "Your application is sent. Wait for reply..",
      });
    } else if (checkApplicant) {
      res.json({
        error: "Your application has already been sent!",
      });
    }
  }
});

module.exports = router;

// const express = require("express");
// const { sequelize } = require("../models");
// const router = express.Router();

// const { validateToken } = require("../middleware/AuthMiddleware");
// const { Application, Employee, Job } = require("../models");

// const multer = require("multer");
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: "1000000000",
//   },
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const minType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));
//     if (minType && extname) {
//       return cb(null, true);
//     }
//     cb("Give proper format for image");
//   },
// }).single("cv");

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   getRelatedApplicant = await Application.findAll({
//     where: {
//       UserId: id,
//       // UserId:id,
//     },
//   });
//   return res.json(getRelatedApplicant);
// });

// router.get("/show/:id", async (req, res) => {
//   const id = req.params.id;
//   getRelatedApplicant = await Application.findOne({
//     where: {
//       id: id,
//     },
//   });
//   return res.json(getRelatedApplicant);
// });

// router.get("/", async (req, res) => {
//   res.send("dhcd");
// });

// router.post("/select/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log("Error");
//   updateEmployee = await Application.update(
//     {
//       isAccepted: true,
//     },
//     {
//       where: {
//         id: id,
//       },
//     }
//   );
//   res.json(updateEmployee);
// });

// // router.route("/").post(upload, (req, res)=> {
// //     const body = req.body
// //     console.log(body)
// //     console.log("HELLO")
// // })

// router.post("/", upload, async (req, res) => {
//   // using sequelize to post data
//   console.log("hello");
//   // accessing data
//   // body has data in json
//   const application = req.body;
//   const { cv } = req.file.path;
//   console.log(application.userId);

//   const employeeId = await Employee.findOne({
//     where: {
//       id: application.userId,
//     },
//   });

//   const userTest = await Job.findOne({
//     where: {
//       id: application.JobId,
//     },
//   });

//   const checkApplicant = await Application.findOne({
//     where: {
//       id: application.userId,
//     },
//   });
//   if (!employeeId) {
//     res.json({
//       error: "You have to update information before submitting application.",
//     });
//   }
//    else if (employeeId) {
//   if (!checkApplicant) {
//     const applicationToAdd = Application.create({
//       cv: req.file.path,
//       coverLetter: application.coverLetter,

//       JobId: application.JobId,
//       EmployeeId: employeeId.id,
//       UserId: userTest.UserId,
//     });
//     res.json({
//       success: "Your application is sent. Wait for reply..",
//     });
//   } else if (checkApplicant) {
//     res.json({
//       error: "Your application has already been sent!",
//     });
//   }
//   }
// });

// module.exports = router;
