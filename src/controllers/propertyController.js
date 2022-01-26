const { all } = require("express/lib/application");
const Property = require("../models/PropertyModel");
const errorFunction = require("../utils/errorFunction");

module.exports = {
    getAllProperties: async (req, res) => {
        try {
            // Adding Pagination
            // Paginated response with size properties
            // GET http://localhost:5000/properties?page=1&size=4
            //This returnshould return only the first page with default size (say 4)

            let { page, size } = req.query;
            if (!page) page = 1;
            if (!size) size = 4;
            const limit = parseInt(size);
            const skip = (page - 1) * size;
            const allProperties = await Property.find().limit(limit).skip(skip);
            if (allProperties) {
                res.status(201);
                return res.json(
                    errorFunction(
                        false,
                        "Sending all properties",
                        allProperties
                    )
                );
            } else {
                res.status(403);
                return res.json(
                    errorFunction(true, "Error getting Properties")
                );
            }
        } catch (error) {
            res.status(400);
            return res.json(errorFunction(true, "Error getting property"));
        }
    },

    createNewProperty: async (req, res) => {
        try {
            const existingProperty = await Property.findOne({
                address: req.body.address,
            }).lean(true);
            if (existingProperty) {
                res.status(403);
                return res.json(errorFunction(true, "Property Already Exists"));
            } else {
                const newProperty = await Property.create({
                    address: req.body.address,
                    type: req.body.type,
                    bedroom: req.body.bedroom,
                    sittingroom: req.body.sittingroom,
                    kitchen: req.body.kitchen,
                    bathroom: req.body.bathroom,
                    toilet: req.body.toilet,
                    owner: req.body.owner,
                    description: req.body.description,
                    validFromDate: req.body.validFromDate,
                    validToDate: req.body.validToDate,
                    imageURI: req.body.imageURI,
                });
                if (newProperty) {
                    res.status(201);
                    return res.json(
                        errorFunction(false, "Property Created", newProperty)
                    );
                } else {
                    res.status(403);
                    return res.json(
                        errorFunction(true, "Error Creating Property")
                    );
                }
            }
        } catch (error) {
            res.status(400);
            console.log(error);
            return res.json(errorFunction(true, "Error Adding Property"));
        }
    },

    findPropertyById: async (req, res) => {
        // try {
        //     const property = await Property.findById(req.params.propertyId);
        //     res.json(property);
        //     if (property == null) {
        //         return res.status(404).json({ message: "Property not found" });
        //     }
        // } catch (err) {
        //     return res.status(500).json({ message: err.message });
        // }
    },

    updateAProperty: async (req, res) => {
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
            res.json({ updatedProperty });
        } catch (err) {
            res.json({ message: err });
        }
    },
};
