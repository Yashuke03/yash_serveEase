const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        business_name: {
            type: String,
            required: true,
            unique: true
        },

        description: {
            type: String
        },

        experience: {
            type: Number
        },

        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service"
            }
        ],

        location: {
            type: String
        },

        rating: {
            type: Number,
            default: 0
        },

        isverified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Provider", providerSchema);