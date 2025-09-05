const express = require("express")
const { addProducts, upload, getProducts } = require("../controllers/productsController")

const router = express.Router();

router.post('/', upload.single("image"), addProducts);
router.get('/', getProducts);

module.exports = router;