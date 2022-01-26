const express = require("express");
const router = express.Router();

const PropertyController = require("../controllers/propertyController");

//Getting All Properties
router.get("/", PropertyController.getAllProperties);

// Creating or Addind a New Property
router.post("/", PropertyController.createNewProperty );



// router.get("/", async (req, res) => {
//     try {
//         let { page, size } = req.query;
//         if (!page) {
//             page = 1;
//         }
//         if (!size) {
//             size = 2;
//         }

//         const limit = parseInt(size, 10);
//         const skip = (page - 1) * size + limit;

//         const properties = await Property.find({},  { __v: 0 })
//             .limit(limit)
//             .skip(skip);
//         res.send({ page, size, data: properties });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

//Getting a Specific Prperty
router.get("/:propertyId", PropertyController.findPropertyById);

// Updating a Specific Property
router.patch("/:propertyId", PropertyController.updateAProperty );

// show list of properties on a single page base on defined criteria
// Filter properties by either no of bedrooms, no of bathroom, owner etc
//Find property by address

module.exports = router;
