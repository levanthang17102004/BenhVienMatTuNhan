const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        hashPassword: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["USER", "DOCTOR", "ADMIN"],
            default: "USER",
        },

        isActive: {
            type: Boolean,
            default: false,
        },

        refreshTokenHash: {
            type: String,
            select: false,
        },

        lastLogin: Date,
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
