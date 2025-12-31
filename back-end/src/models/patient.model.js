const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },

        name: String,
        age: Number,

        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHER"],
        },

        phone: String,
        contactEmail: String,
        address: String,

        medicalHistory: [String],

        insuranceProvider: String,
        insuranceNumber: String,

        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Patient", patientSchema);
