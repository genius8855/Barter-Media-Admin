const express = require("express")
const { addProducts, upload, getProducts } = require("../controllers/productsController")

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("products")
})
router.post('/create', upload.single("image"), addProducts);
// router.get('/', getProducts);

module.exports = router;