const mongoose = require("mongoose");

const specialtySchema = new mongoose.Schema(
    {
        code: { type: String, unique: true, required: true, uppercase: true },
        name: { type: String, required: true },
        description: String,
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Specialty", specialtySchema);
