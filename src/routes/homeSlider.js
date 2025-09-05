const express = require('express');
const router = express.Router();
const { addHomeSlider, upload } = require('../controllers/homeSliderController');
const HomeSlider = require('../models/homeSlider');

router.post('/create', upload.array("images", 2), addHomeSlider);

router.get("/", async (req, res) => {
    try {
        const homeSlider = await HomeSlider.find({});

        res.render("products", { homeSlider });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
})

module.exports = router;