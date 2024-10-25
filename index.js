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
app.use(cors({origin: "http://localhost:5173"}));
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

const userController = require("./routes/userController");
app.use("/user", verifyAdminAccess, userController);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});