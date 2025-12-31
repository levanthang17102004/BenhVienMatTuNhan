const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },

        name: { type: String, required: true },

        specialty_ids: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Specialty" },
        ],

        qualifications: String,
        experience: Number,
        basePrice: Number,

        phone: String,
        contactEmail: String,
        address: String,

        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },

        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Doctor", doctorSchema);
