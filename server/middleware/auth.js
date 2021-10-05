import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const auth = async (req, res, next) => {
  dotenv.config();
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const tokenData = jwt.verify(token, process.env.TOKEN_KEY);

      req.userId = tokenData?.userId;
    }
    next();
  } catch (error) {}
};

export default auth;
