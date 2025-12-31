const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        appointment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            unique: true,
            required: true,
        },

        amount: Number,

        method: {
            type: String,
            enum: ["CASH", "VNPAY", "MOMO", "STRIPE"],
        },

        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED"],
            default: "PENDING",
        },

        paidAt: Date,
        transactionId: String,
        gatewayResponse: String,
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Payment", paymentSchema);
