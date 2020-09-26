function getCurrentUser(req, res) {
  if (!req.user) return res.status(200).json({ error: "User session not found" });
  return res.status(200).json({ user: req.user });
}

module.exports = {
  getCurrentUser
};
