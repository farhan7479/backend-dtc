const mongoose = require("mongoose");

const dutySchema = new mongoose.Schema({
  name : {type : String },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  crew: { type: mongoose.Schema.Types.ObjectId, ref: "Crew", required: true },
  dutyType: { type: String, enum: ["linked", "unlinked"], required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  restPeriod: { type: Number, default: 0 }, // in minutes
});

module.exports = mongoose.model("Duty", dutySchema);
