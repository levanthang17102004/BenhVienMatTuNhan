const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        otpHash: { type: String, required: true, select: false },

        type: {
            type: String,
            enum: ["REGISTER", "FORGOT_PASSWORD", "VERIFY_EMAIL"],
            required: true,
        },

        expiresAt: { type: Date, required: true },
        isUsed: { type: Boolean, default: false },
        attemptCount: { type: Number, default: 0 },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", otpSchema);
