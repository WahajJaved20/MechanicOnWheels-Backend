const User = require("../Models/userModel")
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/addUser", async (req, res) => {
    try {
        let { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
        await user.save();
        return res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;