const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        basePrice: {
            type: Number,
            required: true
        },

        duration: {
            type: Number
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Service", serviceSchema);