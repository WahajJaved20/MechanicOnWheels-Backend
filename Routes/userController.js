const Employees = require("../Models/employeeModel")
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/addNewEmployee", async (req, res) => {
    try {
        let { name, email, password, accessLevel, age, phoneNumber } = req.body;
        const employee = new Employees({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            accessLevel,
            age,
            phoneNumber
        });
        await employee.save();
        return res.status(200).json({ type: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ type: "Failure", message: "Internal Server Error" });
    }
})

module.exports = router;