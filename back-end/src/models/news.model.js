const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        title: String,
        slug: { type: String, unique: true },
        description: String,

        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        publicationDate: Date,
        relatedImages: [String],

        status: {
            type: String,
            enum: ["DRAFT", "PUBLISHED"],
            default: "DRAFT",
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("News", newsSchema);
