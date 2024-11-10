const mongoose = require("mongoose");

const inspectionSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
  },
  yearMakeModel: {
    type: String
  },
  contact: {
    type: String
  },
  ro: {
    type: Number,
  },
  vin: {
    type: Number,
  },
  license: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: this.email != "" ? true : false,
    max: 255,
    min: 6,
  },
  serviceDate: {
    type: String,
  },
  servicedAt: {
    type: Number,
  },
  nextService: {
    type: Number,
  },
  interiorExteriorFields: {
    type: Object
  },
  batteryFields: {
    type: Object
  },
  underHoodFields: {
    type: Object
  },
  underVehicleFields: {
    type: Object
  },
  brakeFields: {
    type: Object
  },
  preInspectionReport: {
    type: Object
  },
  postInspectionReport: {
    type: Object
  },
  
});

module.exports = mongoose.model("inspections", inspectionSchema);