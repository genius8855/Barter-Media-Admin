const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homeSlider');
});

router.get("/add",(req,res)=>{
    res.render("addHomeSlider")
});

module.exports = router;                            