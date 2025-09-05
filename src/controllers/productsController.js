const Products = require("../models/products");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const upload = multer({ storage });

const addProducts = async (req, res) => {
    try {
        const { heading, description, caption } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "❌ Image is required" });
        }

        const imageUrl = req.file.path;

        const product = new Products({
            heading,
            description,
            caption,
            images: imageUrl,
        });

        await product.save();
        // res.status(201).json({ message: "✅ Product added successfully", product });
        res.redirect("/products")
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        res.status(200).json({ message: "✅ Products fetched successfully", products });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
};

module.exports = {
    addProducts,
    getProducts,
    upload,
};
