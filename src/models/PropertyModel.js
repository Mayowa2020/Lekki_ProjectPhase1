const mongoose = require("mongoose");
// const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const propertySchema = new mongoose.Schema({
    property: {
        address: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        bedroom: {
            type: Number,
            required: true,
        },
        sittingroom: {
            type: Number,
            required: true,
        },
        kitchen: {
            type: Number,
            required: true,
        },
        bathroom: {
            type: Number,
            required: true,
        },
        toilet: {
            type: Number,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        description: {
            type: [String],
            required: true,
        },
        validFromDate: {
            type: Date,
            default: Date.now,
        },
        validToDate: {
            type: Date,
        },
        imageURL: { type: String },
    },
});
// propertySchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Property", propertySchema);
