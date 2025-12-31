const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null, // khách vãng lai
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
        },

        phoneNumber: {
            type: String,
            trim: true,
        },

        message: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["NEW", "IN_PROGRESS", "RESOLVED"],
            default: "NEW",
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Contact", contactSchema);
