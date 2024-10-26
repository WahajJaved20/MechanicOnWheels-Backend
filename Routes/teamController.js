const Employees = require("../Models/employeeModel")
const express = require("express");
const router = express.Router();

router.get("/getTeamData", async (req, res) => {
    try {
        const employees = await Employees.find();

        const refinedSet = employees.map(item => ({
            id: item._id,
            ...item._doc
        }));
        return res.status(200).json(refinedSet);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;