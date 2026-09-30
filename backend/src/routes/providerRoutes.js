const express = require("express");
const Provider = require("../models/Provider");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const providers = await Provider.find();

        res.json(providers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch providers",
            error: error.message
        });
    }
});

router.put("/profile/:userId", async (req, res) => {
    try {
        const { business_name, description, experience } = req.body;

        const provider = await Provider.findOneAndUpdate(
            { user_id: req.params.userId },
            {
                business_name,
                description,
                experience
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!provider) {
            return res.status(404).json({
                message: "Provider profile not found"
            });
        }

        res.json({
            message: "Provider profile updated successfully",
            provider
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update provider profile",
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);

        if (!provider) {
            return res.status(404).json({
                message: "Provider not found"
            });
        }

        res.json(provider);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch provider",
            error: error.message
        });
    }
});

module.exports = router;