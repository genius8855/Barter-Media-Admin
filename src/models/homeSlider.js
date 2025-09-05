const { Model, Schema, model } = require("mongoose");

const homeSliderSchema = new Schema(
    {
        heading: { type: String, required: true },
        description: { type: String, required: true },
        images: { type: [String], required: true },
    },
    { timestamps: true }
);

const HomeSlider = model('HomeSlider', homeSliderSchema);

module.exports = HomeSlider;