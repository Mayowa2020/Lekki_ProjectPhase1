const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyModel");

// Getting All Properties
router.get("/", async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Addina One Property
router.post("/", async (req, res) => {
    const property = new Property(req.body);

    try {
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Getting a Specific Prperty
router.get("/:propertyId", async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);
        res.json(property);
        if (property == null) {
            return res.status(404).json({ message: "Property not found" });
        };
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Updating a Specific Property
router.patch("/:propertyId", async (req, res) => {
    try {
        const updatedProperty = await Property.updateOne(
            { _id: req.params.propertyId },
            {
                $set: {
                    description: req.body.description,
                    bedroom: req.body.bedroom,
                    sittingroom: req.body.sittingroom,
                    kitchen: req.body.kitchen,
                    bathroom: req.body.bathroom,
                    toilet: req.body.toilet,
                    validToDate: req.body.validToDate,
                },
            }
        );
        res.json({updatedProperty})
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
