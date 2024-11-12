const jwt = require("jsonwebtoken");
const User = require("../Models/employeeModel");

module.exports = async (req, res, next) => {
  const {authToken} = req.body;
  if (!authToken) return res.status(401).send({ message: "Access denied." });
  try {
    const verified = jwt.verify(authToken, process.env.TOKEN_KEY);
    console.log(verified)
    let user = await User.findById(verified._id);
    if (!user) return res.status(400).send({ message: "Invalid Auth Token, Please Login Again" });
    req.user = user;
    if (user.accessLevel !== "admin") return res.status(403).send({ message: "Access denied." });
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid Auth Token, Please Login Again" });
  }
};