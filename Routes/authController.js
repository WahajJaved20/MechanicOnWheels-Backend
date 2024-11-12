const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Employees = require("../Models/employeeModel");

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Employees.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, { expiresIn: 60 * 60 * 24 });
        return res.status(200).json({ token: token, name: user.name, type: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

router.post('/verifyJWT', async (req, res) => {
	try {
		const { jwtToken } = req.body;
		let decodedToken;
		if (!jwtToken) {
			res.status(200).json({ message: 'Invalid JWT Token', type: "Failed" });
			return;
		}
		try {
			decodedToken = jwt.verify(jwtToken, process.env.TOKEN_KEY);
		} catch (error) {
			console.error(error);
			res.status(200).json({ message: 'Invalid JWT Token', type: "Failed" });
			return;
		}
		res.status(200).json({ message: decodedToken, type: "Success" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
module.exports = router;