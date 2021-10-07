import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  console.log("Request");
  console.log(req);
  try {
    const token = req.headers["access-token"];

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
