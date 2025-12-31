const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        location: String,
        capacity: Number,
        status: String,
        imageUrl: String,
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Facility", facilitySchema);
