const { Model,Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    caption: { type: String, required: true },
    images: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = model('Products', productSchema);

module.exports = Products;