import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const tokenData = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = tokenData?.userId;
      next();
    } else {
      res.status(401).send({ message: "User not authenticated" });
    }
  } catch (error) {}
};

export default auth;
