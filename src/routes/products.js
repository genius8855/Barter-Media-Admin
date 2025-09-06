const express = require("express")
const { addProducts, upload, getProducts, deleteProducts } = require("../controllers/productsController")
const Products = require("../models/products")
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Products.find({});

        res.render("products", { products })
        // res.status(200).json({ message: "✅ Products fetched successfully", products });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
})

router.get("/add",(req,res)=>{
    res.render("addProduct")
})
router.post('/create', upload.single("image"), addProducts);
router.get('/get', getProducts);


module.exports = router;