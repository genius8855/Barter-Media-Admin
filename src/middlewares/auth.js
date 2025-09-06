function authenticated(req, res, next) {
  try {
    if (req.session && req.session.adminId) {
    //   console.log("✅ Authenticated:", req.session.adminId);
      return next();
    }
    return res.redirect("/login");  // added return
  } catch (err) {
    console.error("❌ Authentication middleware error:", err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { authenticated };
