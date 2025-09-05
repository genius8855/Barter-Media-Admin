const HomeSlider = require('../models/homeSlider');

const addHomeSlider = async (req, res) => {
    try {
        const { heading, description } = req.body;

        if (!req.files || req.files.length !== 1) {
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
}