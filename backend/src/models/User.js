const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        phone: String,
        role: {
            type: String,
            enum: ["customer", "provider", "admin"],
            default: "customer"
        },
        address: Object
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);