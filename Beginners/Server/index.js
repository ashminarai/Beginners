const express = require("express");
const app = express();
// to directly parse the post request as JSON format
app.use(express.json());
const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const cors = require("cors");

const db = require("./models");

app.use(cors());

// Routers
const employeeRouter = require("./routes/Employee");
app.use("/employee", employeeRouter);

const jobRouter = require("./routes/Job");
app.use("/job", jobRouter);

const notificationRouter = require("./routes/Notification");
app.use("/notification", notificationRouter);

const qualificationRouter = require("./routes/Qualification");
app.use("/qualification", qualificationRouter);

// const eventRouter = require("./routes/Event");
// app.use("/event", eventRouter);

const companyRouter = require("./routes/Company");
app.use("/company", companyRouter);

const applicationRouter = require("./routes/Application");
app.use("/application", applicationRouter);

const AdminBroSequelize = require("@admin-bro/sequelize");
AdminBro.registerAdapter(AdminBroSequelize);
const userRouter = require("./routes/User");

app.use("/users", userRouter);
const adminBro = new AdminBro({
    rootPath: "/admin",
    loginPath: "/admin/login",
    databases: [db],
    branding: {
        companyName: "Job App Beginners",
        softwareBrothers: false,
    },
});

//static image
app.use("/public", express.static("./public"));

const router = AdminBroExpress.buildRouter(adminBro);

// const categoriesRouter = require("./routes/Categories")
// app.use("/categories", categoriesRouter)
app.use(adminBro.options.rootPath, router);
db.sequelize.sync().then(() => {
    app.listen(3006, () => {
        console.log("RUNNING");
    });
});