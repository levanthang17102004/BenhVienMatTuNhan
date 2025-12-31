const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        description: {
            type: String,
            required: true,
        },

        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        publicationDate: {
            type: Date,
        },

        relatedImages: {
            type: [String],
            default: [],
        },

        status: {
            type: String,
            enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
            default: "DRAFT",
            index: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false,
    }
);

module.exports = mongoose.model("News", newsSchema);
