const HomeSlider = require('../models/homeSlider');
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

const addHomeSlider = async (req, res) => {
    try {
        const { heading, description } = req.body;

        if (!req.files || req.files.length !== 2) {
            return res.status(400).json({ error: "Exactly 2 images are required" });
        }

        const imageUrls = req.files.map(file => file.path);

        const homeSlider = new HomeSlider({
            heading,
            description,
            images: imageUrls,
        });

        await homeSlider.save();
        res.status(201).json({ message: "✅ Product added successfully", homeSlider });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
}

module.exports = {
    addHomeSlider,
    upload,
}