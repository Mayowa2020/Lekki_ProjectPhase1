const errorFunction = require("../utils/errorFunction");
const validationSchema = require("../helpers/validation_schema");

// create a middleware function for validating users payload

const propertyValidation = async (req, res, next) => {
    const payload = {
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
    };
    const { error } = validationSchema.validate(payload);
    if (error) {
        res.status(406);
        return res.json(
            errorFunction(true, `Error in User Data : ${error.message}`)
        );
    } else {
        next();
    }
};

module.exports = propertyValidation;
