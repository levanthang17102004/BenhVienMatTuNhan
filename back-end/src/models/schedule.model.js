const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
    {
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
            index: true,
        },

        workDate: { type: Date, required: true },

        startTime: String,
        endTime: String,
        slotDuration: Number,

        maxPatients: Number,
        currentLoad: { type: Number, default: 0 },

        version: { type: Number, default: 0 },

        status: {
            type: String,
            enum: ["AVAILABLE", "FULL", "CLOSED"],
            default: "AVAILABLE",
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
