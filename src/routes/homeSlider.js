const express = require('express');
const router = express.Router();
const { addHomeSlider, upload, deleteHomeSlider } = require('../controllers/homeSliderController');
const HomeSlider = require('../models/homeSlider');
const { authenticated } = require('../middlewares/auth');

router.post('/create', upload.array("images", 2), addHomeSlider);

router.get("/", async (req, res) => {
    try {
        const homeSlider = await HomeSlider.find({});

        res.render("homeSlider", { homeSlider });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
});

router.delete('/delete', deleteHomeSlider);

module.exports = router;
