const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const serviceRoutes = require("./routes/serviceRoutes.js");
const providerRoutes = require("./routes/providerRoutes.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log("GET / received");

    res.json({
        message: "ServeEase backend is running"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/providers", providerRoutes);

module.exports = app;