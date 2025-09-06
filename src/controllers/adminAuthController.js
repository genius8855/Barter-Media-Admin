const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const oneTimeSignup = async (req, res) => {
//     const { username, password } = req.body;
//     const hashed = await bcrypt.hash(password, saltRounds);
//     const admin = await new Admin({
//         username,
//         password: hashed,
//     })
//     await admin.save();
//     return res.json({message: 'User created'});
// }

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required" });
        }
        const admin = await Admin.findOne({ username: username });

        if (!admin) {
            return res.status(404).json({ error: "No such username exists" });
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.render("login", { errorMsg: "Invalid credentials" })
        }

        req.session.adminId = admin._id;
        res.redirect("/")
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "❌ Server error", details: error.message });
    }
}

module.exports = {
    login,
}