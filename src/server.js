require('dotenv').config();
const express = require("express")
const app = express();
const path = require("path")
const productsRoute = require("./routes/products")
const connectDB = require('./config/connect');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/products",productsRoute);

const port = 8081;

app.listen(port, () => {
    console.log(`Express server started at http://localhost:${port}`);
});