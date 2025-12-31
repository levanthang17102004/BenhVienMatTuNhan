const mongoose = require("mongoose");

const prescriptionItemSchema = new mongoose.Schema(
    {
        medicalRecord_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MedicalRecord",
            required: true,
        },

        medicineName: String,
        dosage: String,
        quantity: Number,
        unit: String,
        note: String,
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("PrescriptionItem", prescriptionItemSchema);
