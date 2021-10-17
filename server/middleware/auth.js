import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (token) {
    const tokenData = jwt.verify(
      token,
      process.env.TOKEN_KEY,
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "User not authenticated" });
        } else {
          req.userId = decoded.userId;
          next();
        }
      }
    );
  }
};

export default auth;
