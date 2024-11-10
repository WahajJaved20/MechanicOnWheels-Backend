require("dotenv").config();
const cors = require("cors")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const { connect } = require("./Database/index.js");
const verifyAdminAccess = require("./Middleware/index.js")
connect();

app.use(bodyParser.json())
// app.use(cors({origin: "http://localhost:5173"}));
app.use(cors({origin: "https://mechanic-on-wheels-frontend.vercel.app"}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const authController = require("./Routes/authController")
app.use("/", authController);

const employeeController = require("./Routes/userController");
app.use("/employee", employeeController);
// app.use("/employee", verifyAdminAccess, employeeController);

const teamController = require("./Routes/teamController");
app.use("/team", teamController);

const inspectionController = require("./Routes/inspectionController")
app.use("/inspection", inspectionController);
 
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});