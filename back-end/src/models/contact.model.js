const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        name: String,
        email: String,
        phoneNumber: String,
        message: String,

        status: {
            type: String,
            enum: ["NEW", "IN_PROGRESS", "RESOLVED"],
            default: "NEW",
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Contact", contactSchema);
