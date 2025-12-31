const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
            index: true,
        },

        hashPassword: {
            type: String,
            required: true,
            select: false, // không trả về khi query
        },

        role: {
            type: String,
            enum: ["user", "admin", "doctor"],
            default: "user",
        },

        isActive: {
            type: Boolean,
            default: false, // true sau khi verify OTP
        },

        refreshTokenHash: {
            type: String,
            select: false,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/**
 * Hash password trước khi lưu
 * (giả sử client gửi lên field "password")
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("hashPassword")) return next();
    this.hashPassword = await bcrypt.hash(this.hashPassword, 10);
    next();
});

/**
 * So sánh password khi login
 */
userSchema.methods.comparePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.hashPassword);
};

module.exports = mongoose.model("User", userSchema);
