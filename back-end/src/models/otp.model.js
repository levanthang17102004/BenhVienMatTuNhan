const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
            note: "Email nhận OTP",
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null, // Nullable – chỉ có khi user đã tồn tại
        },

        otpHash: {
            type: String,
            required: true,
            select: false, // không trả OTP hash khi query
            note: "Hash của OTP",
        },

        type: {
            type: String,
            enum: ["REGISTER", "FORGOT_PASSWORD", "VERIFY_EMAIL"],
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true,
        },

        isUsed: {
            type: Boolean,
            default: false,
        },

        attemptCount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false }, // chỉ cần createdAt
        versionKey: false,
    }
);

/**
 * Hash OTP trước khi lưu
 * (truyền OTP plain vào otpHash)
 */
otpSchema.pre("save", async function (next) {
    if (!this.isModified("otpHash")) return next();
    this.otpHash = await bcrypt.hash(this.otpHash, 10);
    next();
});

/**
 * So sánh OTP khi verify
 */
otpSchema.methods.compareOtp = async function (plainOtp) {
    return bcrypt.compare(plainOtp, this.otpHash);
};

module.exports = mongoose.model("Otp", otpSchema);
