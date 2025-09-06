function authenticated(req, res, next) {
  try {
    if (req.session && req.session.adminId) {
      return next();
    }
    res.redirect("/login");
  } catch (err) {
    console.error("Authentication middleware error:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { authenticated };
