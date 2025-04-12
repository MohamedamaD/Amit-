const { verifyToken } = require("../utils/jwt");

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // {id: 0, email: 0, role:0}
    const decoded = verifyToken(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmE3MDI3Yjk3MDEzNjZlMmFkMzY0ZCIsImVtYWlsIjoibW9oYW1lZEBnbWFpbC5jb20iLCJpYXQiOjE3NDQ0NjU5NTksImV4cCI6MTc0NDQ2OTU1OX0.Cyd38COO6vtc45L8nVHS_Z_Bl_8F0s8yaQMzysKLQJs
    req.user = decoded; // {id: 0, email: 0, role:0}
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authMiddleware };
