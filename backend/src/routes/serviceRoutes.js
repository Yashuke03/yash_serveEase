const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { category, search } = req.query;

        const filter = {};

        if (category) {
            filter.categoryId = category;
        }

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        const services = await Service.find(filter);

        res.json(services);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch services",
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service",
            error: error.message
        });
    }
});

module.exports = router;