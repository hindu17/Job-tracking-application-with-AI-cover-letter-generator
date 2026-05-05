// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, "secretkey");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;   // ✅ THIS LINE IS IMPORTANT

import jwt from "jsonwebtoken";

export default function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }

    // ✅ Handle BOTH formats:
    // "Bearer token" OR just "token"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // contains { id: userId }
    next();

  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
}