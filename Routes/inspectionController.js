const Inspection = require("../Models/carInspectionModel")
const express = require("express");
const router = express.Router();

router.post("/addNewInspection", async (req, res) => {
    try {
        let { customerName, mileage, yearMakeModel, contact, ro, vin, license, email, serviceDate, servicedAt, nextService,
            interiorExteriorFields, batteryFields, underHoodFields, underVehicleFields, brakeFields, preInspectionReport, postInspectionReport } = req.body;
        const inspection = new Inspection({
            customerName, mileage, yearMakeModel, contact, ro, vin, license, email, serviceDate, servicedAt, nextService,
            interiorExteriorFields, batteryFields, underHoodFields, underVehicleFields, brakeFields, preInspectionReport, postInspectionReport
        })
        await inspection.save();
        return res.status(200).json({ type: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ type: "Failure", message: "Internal Server Error" });
    }
})

router.get("/getRecentInspection", async (req, res) => {
    try {
        const inspection = await Inspection.findOne();
        return res.status(200).json({ ss: inspection })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ type: "Failure", message: "Internal Server Error" });
    }
})
router.get("/getInspections", async (req, res) => {
    try {
        const inspection = await Inspection.find();
        return res.status(200).json(inspection)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ type: "Failure", message: "Internal Server Error" });
    }
})
router.get("/getInspectionById/:id", async (req, res) => {
    try {
        const inspection = await Inspection.findById(req.params.id);
        return res.status(200).json({ ss: inspection })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ type: "Failure", message: "Internal Server Error" });
    }
})
module.exports = router;