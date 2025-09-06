require('dotenv').config();
const express = require("express")
const session = require('express-session');
const app = express();
const path = require("path")
const productsRoute = require("./routes/products");
const homeSliderRoute = require("./routes/homeSlider");
const adminAuthRoute = require('./routes/auth');
const connectDB = require('./config/connect');
const { authenticated } = require('./middlewares/auth');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'gfg-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // secure: true, (add only when req is from https, recommended on production)
        maxAge: 1000 * 60 * 60 //1 hour
     }
}));

connectDB();

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/products", authenticated, productsRoute);
app.use("/homeSlider", authenticated, homeSliderRoute);
app.use("/auth", authenticated, adminAuthRoute);

const port = 8081;

app.listen(port, () => {
    console.log(`Express server started at http://localhost:${port}`);
});