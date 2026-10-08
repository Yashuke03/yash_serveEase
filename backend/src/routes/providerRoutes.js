
const express = require("express");
const mongoose = require("mongoose");

const Provider = require("../models/Provider");
const Service = require("../models/Service");

const protect = require("../middleware/auth");
const allowRoles = require("../middleware/role");

const router = express.Router();

// ==========================================
// 1. GET ALL PROVIDERS - PUBLIC
// ==========================================

router.get("/", async (req, res) => {
    try {
        const providers = await Provider.find()
            .populate("services");

        res.status(200).json(providers);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch providers"
        });
    }
});

// ==========================================
// 2. CREATE PROVIDER PROFILE - PROTECTED
// ==========================================

router.post(
    "/profile",
    protect,
    allowRoles("provider"),
    async (req, res) => {
        try {
            const userId = req.user._id;

            const {
                business_name,
                description,
                experience,
                location
            } = req.body || {};

            if (
                typeof business_name !== "string" ||
                !business_name.trim()
            ) {
                return res.status(400).json({
                    message: "Business name is required"
                });
            }

            const existingProvider = await Provider.findOne({
                userId
            });

            if (existingProvider) {
                return res.status(409).json({
                    message: "Provider profile already exists"
                });
            }

            const provider = await Provider.create({
                userId,
                business_name: business_name.trim(),
                description,
                experience,
                location
            });

            res.status(201).json({
                message: "Provider profile created successfully",
                provider
            });

        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    message: "Provider or business name already exists"
                });
            }

            if (error.name === "ValidationError") {
                return res.status(400).json({
                    message: error.message
                });
            }

            res.status(500).json({
                message: "Failed to create provider profile"
            });
        }
    }
);

// ==========================================
// 3. UPDATE OWN PROVIDER PROFILE
// ==========================================

router.put(
    "/profile/:userId",
    protect,
    allowRoles("provider"),
    async (req, res) => {
        try {
            const { userId } = req.params;

            if (!mongoose.isValidObjectId(userId)) {
                return res.status(400).json({
                    message: "Invalid user ID"
                });
            }

            if (req.user._id.toString() !== userId) {
                return res.status(403).json({
                    message: "You can only update your own profile"
                });
            }

            const {
                business_name,
                description,
                experience,
                location
            } = req.body || {};

            const updates = {};

            if (business_name !== undefined) {
                updates.business_name = business_name;
            }

            if (description !== undefined) {
                updates.description = description;
            }

            if (experience !== undefined) {
                updates.experience = experience;
            }

            if (location !== undefined) {
                updates.location = location;
            }

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({
                    message: "No valid fields provided for update"
                });
            }

            const provider = await Provider.findOneAndUpdate(
                { userId: req.user._id },
                { $set: updates },
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

            res.status(200).json({
                message: "Provider profile updated successfully",
                provider
            });

        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    message: "Business name already exists"
                });
            }

            if (error.name === "ValidationError") {
                return res.status(400).json({
                    message: error.message
                });
            }

            res.status(500).json({
                message: "Failed to update provider profile"
            });
        }
    }
);

// ==========================================
// 4. GET LOGGED-IN PROVIDER'S SERVICES
// ==========================================

router.get(
    "/my-services",
    protect,
    allowRoles("provider"),
    async (req, res) => {
        try {
            const provider = await Provider.findOne({
                userId: req.user._id
            }).populate("services");

            if (!provider) {
                return res.status(404).json({
                    message: "Provider profile not found"
                });
            }

            res.status(200).json({
                message: "Services fetched successfully",
                services: provider.services
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch provider services"
            });
        }
    }
);

// ==========================================
// 5. ADD SERVICE TO PROVIDER PROFILE
// ==========================================

router.post(
    "/services/:serviceId",
    protect,
    allowRoles("provider"),
    async (req, res) => {
        try {
            const { serviceId } = req.params;

            if (!mongoose.isValidObjectId(serviceId)) {
                return res.status(400).json({
                    message: "Invalid service ID"
                });
            }

            const service = await Service.findById(serviceId);

            if (!service || service.status !== "active") {
                return res.status(404).json({
                    message: "Active service not found"
                });
            }

            const provider = await Provider.findOneAndUpdate(
                { userId: req.user._id },
                {
                    $addToSet: {
                        services: service._id
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            ).populate("services");

            if (!provider) {
                return res.status(404).json({
                    message: "Create your provider profile first"
                });
            }

            res.status(200).json({
                message: "Service added to provider profile",
                services: provider.services
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to add service"
            });
        }
    }
);

// ==========================================
// 6. REMOVE SERVICE FROM PROVIDER PROFILE
// ==========================================

router.delete(
    "/services/:serviceId",
    protect,
    allowRoles("provider"),
    async (req, res) => {
        try {
            const { serviceId } = req.params;

            if (!mongoose.isValidObjectId(serviceId)) {
                return res.status(400).json({
                    message: "Invalid service ID"
                });
            }

            const provider = await Provider.findOneAndUpdate(
                { userId: req.user._id },
                {
                    $pull: {
                        services: serviceId
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            ).populate("services");

            if (!provider) {
                return res.status(404).json({
                    message: "Provider profile not found"
                });
            }

            res.status(200).json({
                message: "Service removed successfully",
                services: provider.services
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to remove service"
            });
        }
    }
);

// ==========================================
// 7. GET PROVIDER BY ID - PUBLIC
// ==========================================

// IMPORTANT:
// Keep this route below /my-services.

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid provider ID"
            });
        }

        const provider = await Provider.findById(id)
            .populate("services");

        if (!provider) {
            return res.status(404).json({
                message: "Provider not found"
            });
        }

        res.status(200).json(provider);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch provider"
        });
    }
});

module.exports = router;
