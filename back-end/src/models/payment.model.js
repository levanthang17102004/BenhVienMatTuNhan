const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        appointment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
            unique: true, // 1 appointment chỉ có 1 payment
            index: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        method: {
            type: String,
            enum: ["CASH", "VNPAY", "MOMO", "STRIPE", "PAYPAL"],
            required: true,
            index: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
            default: "PENDING",
            index: true,
        },

        paidAt: {
            type: Date,
        },

        transactionId: {
            type: String,
            trim: true,
            index: true,
        },

        gatewayResponse: {
            type: String, // lưu raw response (JSON string)
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);
