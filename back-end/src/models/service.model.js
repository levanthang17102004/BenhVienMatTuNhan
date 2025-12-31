const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        code: { type: String, unique: true },
        name: String,
        description: String,
        category: String,
        price: Number,
        duration: Number,
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Service", serviceSchema);
