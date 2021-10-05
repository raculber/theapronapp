import express from "express";

import User from "../models/user.js";

import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const router = express.Router();

export const createUser = async (req, res) => {
  let { enteredEmail, enteredPassword, reenteredPass } = req.body;

  enteredEmail = enteredEmail.trim();
  enteredPassword = enteredPassword.trim();
  reenteredPass = reenteredPass.trim();

  const findEmail = await User.exists({ email: enteredEmail });

  if (findEmail) return res.json({ message: "User already exists" });
  else if (enteredPassword !== reenteredPass)
    return res.json({ message: "Passwords must match" });
  else if (!emailValidator.validate(enteredEmail))
    return res.json({ message: "Invalid email" });
  else if (enteredPassword.length < 6)
    return res.json({ message: "Password must be at least six characters" });
  else {
    try {
      const userId = uuidv4();
      const securedPass = await bcrypt.hash(enteredPassword, 12);

      console.log(userId);
      console.log(securedPass);
      const user = new User({
        userId: userId,
        email: enteredEmail,
        password: securedPass,
      });
      await user.save();
      const accessToken = jwt.sign(
        { email: enteredEmail, userId: userId },
        process.env.TOKEN_KEY
      );

      res.json({
        token: accessToken,
      });
    } catch (error) {
      res.json({ message: error });
    }
  }
};

export const signInUser = async (req, res) => {
  let { enteredEmail, enteredPassword } = req.body;

  enteredEmail = enteredEmail.trim();
  enteredPassword = enteredPassword.trim();
};
export default router;
