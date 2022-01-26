// now Validating our post request using Joi
const Joi = require("@hapi/joi");

const validationSchema = Joi.object().keys({
    address: Joi.string().alphanum().required(),
    type: Joi.string().required(),
    bedroom: Joi.number().integer().positive().greater(0).required(),
    sittingroom: Joi.number().integer().positive().greater(0).required(),
    kitchen: Joi.number().integer().positive().greater(0).required(),
    bathroom: Joi.number().integer().positive().greater(0).required(),
    toilet: Joi.number().integer().positive().greater(0).required(),
    owner: Joi.string().min(10).max(30).required(),
    description: joi.array().items(joi.string().alphanum().trim(true)).required(),
    validFromDate: Joi.date().iso().default(),
    validToDate: Joi.alternatives([Joi.date(), Joi.string().valid("")]),
    imageURI: Joi.string().uri(),
});

module.exports = validationSchema;
