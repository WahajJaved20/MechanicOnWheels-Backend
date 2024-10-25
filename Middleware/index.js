const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

module.exports = async (req, res, next) => {
  const fullToken = req.header("Authorization");
  console.log(fullToken)
  if (!fullToken) return res.status(401).send({ message: "Access denied." });
  try {
    const verified = jwt.verify(fullToken, process.env.TOKEN_KEY);
    console.log(verified)
    let user = await User.findById(verified._id);
    if (!user) return res.status(400).send({ message: "Invalid Token" });
    req.user = user;
    if (user.accessLevel !== "admin") return res.status(403).send({ message: "Access denied." });
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid Token" });
  }
};